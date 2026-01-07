/**
 * Navigation parameter types for type-safe routing with Expo Router
 *
 * These types define the parameters expected by each route in the app,
 * enabling TypeScript to catch routing errors at compile time.
 */

/**
 * Parameters for the moment detail screen
 * Route: /moments/[id]
 */
export interface MomentDetailParams {
  id: string; // Route params are always strings in Expo Router
}

/**
 * Helper type to convert string params to the expected type
 * Use this when consuming route params in screens
 */
export type MomentDetailParamsParsed = {
  id: number; // Convert string to number for database queries
};

/**
 * Parse moment detail params from route
 */
export function parseMomentDetailParams(params: MomentDetailParams): MomentDetailParamsParsed {
  return {
    id: parseInt(params.id, 10),
  };
}

/**
 * Root navigator param list
 * Defines all possible routes and their parameters
 */
export type RootStackParamList = {
  '(tabs)': undefined;
  'moments/index': undefined;
  'moments/[id]': MomentDetailParams;
  'moments/create': undefined;
};
