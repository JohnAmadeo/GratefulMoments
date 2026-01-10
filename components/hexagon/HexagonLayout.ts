/**
 * HexagonLayout Configuration Module
 *
 * Defines layout constants for hexagon display in two size variants:
 * - standard: 200pt hexagons for most moments in the list
 * - large: 350pt hexagons for emphasizing the most recent moment
 *
 * Mirrors the Swift HexagonLayout enum from the original app.
 * Font sizes approximate SwiftUI system font sizes:
 * - .headline: ~17pt, semibold (600)
 * - .title.bold(): ~28pt, bold (700)
 * - .caption2: ~11pt
 * - .body: ~17pt
 */

/**
 * Layout configuration interface defining all dimensional and typographic values
 * for hexagon display.
 */
export interface HexagonLayoutConfig {
  /** Hexagon diameter in points */
  size: number;
  /** Bottom padding for timestamp as ratio of size (0.08) */
  timestampBottomPadding: number;
  /** Bottom padding for text content as ratio of size (0.25) */
  textBottomPadding: number;
  /** Calculated height for timestamp area: size * (textBottomPadding - timestampBottomPadding) */
  timestampHeight: number;
  /** Font size for title text in points */
  titleFontSize: number;
  /** Font weight for title text */
  titleFontWeight: '400' | '600' | '700';
  /** Font size for body text in points */
  bodyFontSize: number;
  /** Font weight for body text */
  bodyFontWeight: '400' | '600' | '700';
}

/**
 * Standard layout configuration for regular moments in the list.
 * Size: 200pt hexagon
 * Title: ~17pt semibold (.headline in SwiftUI)
 * Body: ~11pt regular (.caption2 in SwiftUI)
 */
export const STANDARD_LAYOUT: HexagonLayoutConfig = {
  size: 200.0,
  timestampBottomPadding: 0.08,
  textBottomPadding: 0.25,
  timestampHeight: 200.0 * (0.25 - 0.08), // 34pt
  titleFontSize: 17,
  titleFontWeight: '600',
  bodyFontSize: 11,
  bodyFontWeight: '400',
};

/**
 * Large layout configuration for the most recent/emphasized moment.
 * Size: 350pt hexagon
 * Title: ~28pt bold (.title.bold() in SwiftUI)
 * Body: ~17pt regular (.body in SwiftUI)
 */
export const LARGE_LAYOUT: HexagonLayoutConfig = {
  size: 350.0,
  timestampBottomPadding: 0.08,
  textBottomPadding: 0.25,
  timestampHeight: 350.0 * (0.25 - 0.08), // 59.5pt
  titleFontSize: 28,
  titleFontWeight: '700',
  bodyFontSize: 17,
  bodyFontWeight: '400',
};

/**
 * Layout type enum for type-safe layout selection
 */
export type HexagonLayoutType = 'standard' | 'large';

/**
 * Layouts object providing enum-like access to layout configurations
 */
export const HexagonLayouts = {
  standard: STANDARD_LAYOUT,
  large: LARGE_LAYOUT,
} as const;

/**
 * Utility function to get layout configuration by type.
 * Provides convenient type-safe access to layout constants.
 *
 * @param type - The layout type ('standard' or 'large')
 * @returns The corresponding layout configuration
 *
 * @example
 * const layout = getLayout('standard');
 * console.log(layout.size); // 200
 */
export function getLayout(type: HexagonLayoutType): HexagonLayoutConfig {
  return HexagonLayouts[type];
}
