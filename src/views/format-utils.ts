/**
 * Shared formatting utilities for terminal views.
 *
 * Provides ANSI-aware string padding and delta formatting for
 * plan and implementation comparison tables.
 *
 * @module
 */

import pc from 'picocolors';

/**
 * Pad a string to a fixed width (right-padded).
 *
 * Strips ANSI escape codes for accurate length calculation,
 * then pads with spaces to the target width.
 *
 * @param str - String to pad (may contain ANSI codes)
 * @param width - Target width in visible characters
 * @returns Padded string
 */
export function pad(str: string, width: number): string {
  // Strip ANSI codes for length calculation
  const stripped = str.replace(/\x1B\[\d+m/g, '');
  const padding = Math.max(0, width - stripped.length);
  return str + ' '.repeat(padding);
}

/**
 * Format a percentage delta string with color.
 *
 * Positive deltas (improvements) are green, negative are red.
 * For metrics where higher is better (tokens, sections, file refs, etc.)
 *
 * @param withVal - Value from "with docs" run
 * @param withoutVal - Value from "without docs" baseline
 * @returns Colored percentage string or N/A indicator
 */
export function formatDelta(withVal: number, withoutVal: number): string {
  if (withoutVal === 0) return withVal > 0 ? pc.green('N/A → ' + String(withVal)) : '—';
  const pct = ((withVal - withoutVal) / withoutVal * 100);
  const sign = pct >= 0 ? '+' : '';
  const formatted = `${sign}${Math.round(pct)}%`;
  return pct >= 0 ? pc.green(formatted) : pc.red(formatted);
}
