/**
 * Drizzle ORM schema definition for the GratefulMoments database
 *
 * This schema mirrors the SwiftData Moment model from Models/Moment.swift
 * and defines the SQLite table structure using Drizzle ORM.
 */

import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

/**
 * Moments table schema
 *
 * Maps to SwiftData Moment model:
 * - id: Auto-increment primary key (added for SQLite)
 * - title: String (NOT NULL)
 * - note: String (NOT NULL, can be empty string)
 * - imageData: Data? (nullable text column for base64 strings)
 * - timestamp: Date (stored as integer Unix timestamp in milliseconds, NOT NULL)
 */
export const moments = sqliteTable('moments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  note: text('note').notNull(),
  imageData: text('image_data'), // nullable - maps to Swift's Data?
  timestamp: integer('timestamp').notNull(),
});

/**
 * Type inference for select operations
 * This gives us type-safe query results matching the Moment interface
 */
export type MomentRow = typeof moments.$inferSelect;

/**
 * Type inference for insert operations
 * This gives us type-safe insert operations (without id, which is auto-generated)
 */
export type MomentInsert = typeof moments.$inferInsert;
