/**
 * Database layer exports
 *
 * This file provides a centralized export point for all database-related
 * functionality, making it easy to import database operations and types
 * throughout the app.
 */

// Export all database operations
export {
  getAllMoments,
  getMomentById,
  createMoment,
  deleteMoment,
  initializeSampleData,
  clearAllMoments,
} from './operations';

// Export database client and initialization
export { db, initializeDatabase } from './client';

// Export types
export type { Moment, CreateMomentInput } from './types';

// Export schema (for advanced use cases)
export { moments } from './schema';
export type { MomentRow, MomentInsert } from './schema';
