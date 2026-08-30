import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // eslint-config-next's core-web-vitals only bundles 6 jsx-a11y rules
  // (alt-text, aria-props, aria-proptypes, aria-unsupported-elements,
  // role-has-required-aria-props, role-supports-aria-props). The full
  // recommended set adds ~25 more covering keyboard interaction, focus
  // management, and label association — the WCAG 2.1 AA-relevant checks
  // this project didn't have any static coverage for before Phase 2 of
  // the UX/UI plan.
  //
  // Only `rules`/`languageOptions` are spread here, not the whole
  // flatConfigs.recommended object — it also declares a `jsx-a11y` plugin
  // registration, which collides with the one eslint-config-next's
  // core-web-vitals already registers (flat config errors on duplicate
  // plugin registration under the same name).
  {
    languageOptions: jsxA11y.flatConfigs.recommended.languageOptions,
    rules: jsxA11y.flatConfigs.recommended.rules,
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
