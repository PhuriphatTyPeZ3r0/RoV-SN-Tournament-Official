/**
 * Icon — Material Symbols Rounded wrapper
 *
 * Usage:
 *   <Icon name="trophy" />
 *   <Icon name="trophy" filled className="text-yellow-400 text-2xl" />
 *   <Icon name="progress_activity" spin />   ← loading spinner
 *
 * Icon names use the exact Google Material Symbols identifier (snake_case).
 * Reference: https://fonts.google.com/icons
 */

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// All icon names used in this project — sourced from Google Material Symbols Rounded
export type IconName =
  // Navigation & Actions
  | 'home'
  | 'menu'
  | 'close'
  | 'arrow_forward'
  | 'arrow_back'
  | 'chevron_right'
  | 'chevron_left'
  | 'expand_more'
  | 'expand_less'
  | 'more_vert'
  | 'open_in_new'
  // Status & Feedback
  | 'check_circle'
  | 'cancel'
  | 'error'
  | 'warning'
  | 'info'
  | 'help'
  | 'done'
  | 'done_all'
  | 'hourglass_empty'
  | 'hourglass_top'
  | 'schedule'
  | 'pending'
  | 'block'
  | 'visibility'
  | 'visibility_off'
  // User & Auth
  | 'person'
  | 'account_circle'
  | 'manage_accounts'
  | 'person_add'
  | 'person_remove'
  | 'group'
  | 'groups'
  | 'badge'
  | 'contacts'
  | 'admin_panel_settings'
  | 'security'
  | 'lock'
  | 'lock_open'
  | 'key'
  | 'login'
  | 'logout'
  | 'verified_user'
  | 'sports_martial_arts'
  // Tournament & Sports
  | 'emoji_events'   // trophy
  | 'military_tech'  // medal
  | 'workspace_premium' // crown
  | 'sports_esports'
  | 'casino'         // dice
  | 'stars'          // star
  | 'grade'          // filled star
  | 'local_fire_department' // fire
  | 'skull'          // danger/skull
  | 'shield'
  | 'gavel'          // judge/ban
  | 'diversity_3'    // team/friends
  | 'leaderboard'
  | 'scoreboard'
  // Schedule & Calendar
  | 'calendar_today'
  | 'calendar_month'
  | 'event'
  | 'event_available'
  | 'event_busy'
  | 'date_range'
  // Data & Content
  | 'table_chart'
  | 'bar_chart'
  | 'show_chart'
  | 'pie_chart'
  | 'analytics'
  | 'speed'          // tachometer
  | 'history'
  | 'list_alt'
  | 'format_list_numbered'
  | 'filter_list'
  | 'search'
  | 'zoom_in'
  | 'copy_all'
  | 'download'
  | 'upload'
  | 'cloud_upload'
  | 'save'
  | 'edit'
  | 'draw'
  | 'delete'
  | 'delete_outline'
  | 'add'
  | 'add_circle'
  | 'remove'
  | 'refresh'
  | 'redo'
  | 'send'
  | 'share'
  | 'file_present'   // csv / file
  | 'image'
  | 'photo_camera'
  // UI & Layout
  | 'palette'
  | 'dark_mode'
  | 'light_mode'
  | 'phone'
  | 'favorite'
  | 'code'
  | 'terminal'
  | 'account_tree'   // project-diagram / sitemap
  | 'hub'
  | 'auto_fix_high'  // magic wand
  | 'touch_app'      // hand-pointer
  | 'casino'         // dice/random
  | 'swap_horiz'     // random/shuffle
  | 'inbox'
  | 'scroll'
  | 'id_card'
  // Loading
  | 'progress_activity' // spinner
  | 'star'
  | 'calendar_add_on'
  | 'my_location'
  | 'ghost'
  | 'pending_actions'
  | 'supervised_user_circle'
  | 'person_off'
  | 'theater_comedy';

interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  name: IconName;
  /** Use the filled variant (FILL=1) */
  filled?: boolean;
  /** Use the bold weight variant (wght=600) */
  bold?: boolean;
  /** Apply spinning animation — useful for loading states */
  spin?: boolean;
  /** Optical size override (defaults to 24) */
  size?: 20 | 24 | 40 | 48;
}

export default function Icon({
  name,
  filled = false,
  bold = false,
  spin = false,
  size,
  className,
  style,
  ...rest
}: IconProps) {
  const variationSettings = [
    `'FILL' ${filled ? 1 : 0}`,
    `'wght' ${bold ? 600 : 400}`,
    `'GRAD' 0`,
    `'opsz' ${size ?? 24}`,
  ].join(', ');

  return (
    <span
      className={cn(
        'material-symbols-rounded',
        spin && 'ms-spin',
        className,
      )}
      style={{
        fontVariationSettings: variationSettings,
        ...style,
      }}
      aria-hidden="true"
      {...rest}
    >
      {name}
    </span>
  );
}
