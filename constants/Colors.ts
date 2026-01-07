/**
 * Color constants extracted from Assets.xcassets/Colors/
 *
 * These colors are converted from the iOS Asset Catalog to hex values
 * to maintain visual parity with the Swift app.
 *
 * Color values extracted from:
 * - Ocean.colorset: RGB(0x00, 0x70, 0x7D) = #00707D
 * - Ruby.colorset: RGB(0xD2, 0x26, 0x2F) = #D2262F
 * - Ember.colorset: Display P3 RGB(0xFE, 0x7D, 0x00) ≈ #FF7D00 (approximated to sRGB)
 * - Sapphire.colorset: RGB(0x15, 0x39, 0x69) = #153969
 */

export const Colors = {
  // Named colors from Asset Catalog
  ocean: '#00707D',
  ruby: '#D2262F',
  ember: '#FF7D00', // Approximated from Display P3 to sRGB
  sapphire: '#153969',

  // Standard UI colors
  background: '#FFFFFF',
  textPrimary: '#000000',
  textSecondary: '#666666',

  // iOS system colors for UI elements
  systemBlue: '#007AFF',
  systemGray: '#8E8E93',
  systemGray2: '#AEAEB2',
  systemGray3: '#C7C7CC',
  systemGray4: '#D1D1D6',
  systemGray5: '#E5E5EA',
  systemGray6: '#F2F2F7',
};
