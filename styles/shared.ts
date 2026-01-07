/**
 * Shared styles using React Native StyleSheet API
 *
 * These styles provide reusable styling patterns across the app,
 * maintaining consistency with SwiftUI's default font and layout styles.
 */

import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const SharedStyles = StyleSheet.create({
  /**
   * Base screen container style
   * Equivalent to SwiftUI's default background behavior
   */
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  /**
   * Screen with centered content
   * Used for empty states and similar centered layouts
   */
  screenCentered: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  /**
   * Title text style
   * Equivalent to SwiftUI's .font(.title) with semibold weight
   */
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: Colors.textPrimary,
  },

  /**
   * Headline text style
   * Equivalent to SwiftUI's .font(.headline)
   */
  headline: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
  },

  /**
   * Body text style
   * Equivalent to SwiftUI's .font(.body)
   */
  body: {
    fontSize: 17,
    fontWeight: '400',
    color: Colors.textPrimary,
  },

  /**
   * Secondary body text style
   * Used for less prominent information
   */
  bodySecondary: {
    fontSize: 17,
    fontWeight: '400',
    color: Colors.textSecondary,
  },

  /**
   * Subheadline text style
   * Equivalent to SwiftUI's .font(.subheadline)
   */
  subheadline: {
    fontSize: 15,
    fontWeight: '400',
    color: Colors.textSecondary,
  },

  /**
   * Caption text style
   * Equivalent to SwiftUI's .font(.caption)
   */
  caption: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.textSecondary,
  },

  /**
   * Caption text style with semibold weight
   */
  captionSemibold: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
});
