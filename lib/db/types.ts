/**
 * TypeScript types for the database layer
 *
 * This file defines the Moment interface that mirrors the SwiftData Moment model
 * from Models/Moment.swift, adapting Swift types to TypeScript/JavaScript equivalents.
 */

/**
 * Moment model interface
 *
 * Mirrors the Swift Moment model:
 * - title: String → string
 * - note: String → string
 * - imageData: Data? → string | null (base64 encoded)
 * - timestamp: Date → number (Unix timestamp in milliseconds)
 *
 * The id field is added as the primary key for SQLite (auto-increment).
 */
export interface Moment {
  /** Auto-increment primary key */
  id: number;

  /** Moment title (required, non-empty) */
  title: string;

  /** Moment note/description (required, can be empty string) */
  note: string;

  /** Image data as base64 string, or null if no image */
  imageData: string | null;

  /** Unix timestamp in milliseconds (matches JavaScript Date.now() format) */
  timestamp: number;
}

/**
 * Input type for creating a new moment (without id, which is auto-generated)
 */
export type CreateMomentInput = Omit<Moment, 'id'>;
