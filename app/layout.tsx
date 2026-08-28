import type { Metadata } from "next";
import { cache } from "react";
import { Prompt } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { publicClient } from '@/utils/supabase/public';
import { withTimeout } from '@/lib/utils';
import NextTopLoader from 'nextjs-toploader';

// Root layout wraps every page, so this gates every page render — must
// never hang indefinitely on a slow/unreachable Supabase. 5s is generous
// for a single-row query but still bounded.
const TOURNAMENT_META_TIMEOUT_MS = 5000;

/**
 * Both generateMetadata() (for the season in <title>) and RootLayout()
 * (for the active theme) need the same "which tournament is active" row.
 * They used to each run their own `.from('tournaments')` query — this
 * dedupes that into one query via React's per-request cache(), and bounds
 * it with a timeout so an unreachable Supabase can't block every page.
 */
const getActiveTournamentMeta = cache(async () => {
  return withTimeout(
    publicClient
      .from('tournaments')
      .select('season, theme_style')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()
      .then((r) => r.data),
    TOURNAMENT_META_TIMEOUT_MS,
    null,
  );
});

const prompt = Prompt({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ["latin", "thai"],
  variable: "--font-prompt",
  display: 'swap',
});

async function getActiveSeason() {
  try {
    const data = await getActiveTournamentMeta();
    return data?.season || 2026;
  } catch (error: any) {
    if (error?.message?.includes('Dynamic server usage') || error?.digest === 'DYNAMIC_SERVER_USAGE') {
      throw error;
    }
    return 2026;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const season = await getActiveSeason();
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
    title: {
      default: `RoV SN Tournament ${season}`,
      template: "%s | RoV SN Tournament",
    },
    description: `Official tournament management system for RoV SN Tournament ${season}. View fixtures, standings, stats, and more.`,
    keywords: ["RoV", "Tournament", "Arena of Valor", "Esports", "SN Tournament"],
    authors: [{ name: "RoV SN Tournament Team" }],
    icons: {
      icon: "/logo.png",
      shortcut: "/logo.png",
      apple: "/logo.png",
    },
    openGraph: {
      title: `RoV SN Tournament ${season}`,
      description: `Official tournament management system for RoV SN Tournament ${season}`,
      type: "website",
      locale: "th_TH",
      images: ["/logo.png"],
    },
  };
}

function hexToRgb(hex: string): string {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  if (!result) return '0, 0, 0';
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

async function getActiveTheme() {
  try {
    const tour = await getActiveTournamentMeta();
    const themeId = tour?.theme_style || 'echo';

    const theme = await withTimeout(
      publicClient.from('themes').select('*').eq('id', themeId).maybeSingle().then((r) => r.data),
      TOURNAMENT_META_TIMEOUT_MS,
      null,
    );

    return theme || null;
  } catch (error: any) {
    // If it's a dynamic server usage error (e.g. cookies() called during static pre-rendering),
    // we must re-throw it so Next.js can mark the route as dynamic on demand without logs clutter.
    if (error?.message?.includes('Dynamic server usage') || error?.digest === 'DYNAMIC_SERVER_USAGE') {
      throw error;
    }
    console.error('Failed to load active theme:', error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const activeTheme = await getActiveTheme();

  const themeCss = activeTheme ? `
:root, [data-theme="${activeTheme.id}"] {
  --theme-primary: ${activeTheme.primary_color};
  --theme-primary-rgb: ${hexToRgb(activeTheme.primary_color)};
  --theme-secondary: ${activeTheme.secondary_color};
  --theme-secondary-rgb: ${hexToRgb(activeTheme.secondary_color)};
  --theme-bg-deep: ${activeTheme.bg_deep};
  --theme-bg-surface: ${activeTheme.bg_surface};
  --theme-primary-light: ${activeTheme.primary_light};
  --theme-primary-dark: ${activeTheme.primary_dark};
}
` : '';

  return (
    <html lang="th" data-theme={activeTheme?.id || 'echo'} className={`${prompt.variable}`} suppressHydrationWarning>
      <head>
        {/* Font Awesome — kept ONLY for brand icons (fab fa-discord, fa-facebook-f, etc.) */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {/* Material Symbols Rounded — primary UI icon set. Axis ranges
            narrowed to what components/common/Icon.tsx and globals.css
            actually request (wght is only ever 400/600, GRAD is always 0)
            instead of the full variable-font range — the unnarrowed
            request downloaded a 5.36MB woff2 (measured via Lighthouse),
            the single largest resource on any page in the app by a wide
            margin. GRAD is dropped entirely rather than pinned to 0..0,
            since omitting an axis just uses the font's own default. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL@20..48,400..600,0..1"
        />
        {themeCss && <style dangerouslySetInnerHTML={{ __html: themeCss }} />}
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <NextTopLoader 
          color="var(--theme-primary)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px var(--theme-primary),0 0 5px var(--theme-primary)"
        />
        <Providers>
          {children}
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
