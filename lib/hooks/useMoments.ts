/**
 * Tanstack Query hooks for Moment data access
 *
 * This file implements the React Query layer that abstracts database operations
 * and provides reactive data fetching for the UI. These hooks replicate the
 * behavior of SwiftUI's @Query(sort: \Moment.timestamp) from Moments.swift:7
 * by using Tanstack Query's cache invalidation combined with mutation callbacks.
 *
 * Design Decision #1: SwiftData-to-SQLite Query Semantics Mapping
 * We rely on query invalidation after mutations (onCreate, onDelete) to trigger
 * refetches, ensuring the UI updates automatically when data changes while
 * maintaining the "it just works" reactive feel of SwiftUI's @Query.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllMoments,
  getMomentById,
  createMoment,
  deleteMoment,
} from '../db/operations';
import type { CreateMomentInput } from '../db/types';

/**
 * Query key for the moments list
 * Using a constant array ensures consistent cache invalidation
 */
const MOMENTS_KEY = ['moments'] as const;

/**
 * Hook to fetch all moments
 *
 * Returns all moments sorted by timestamp in ascending order,
 * matching the behavior of @Query(sort: \Moment.timestamp) in Moments.swift:7
 *
 * @returns Query result with { data, isLoading, error, refetch }
 */
export function useMoments() {
  return useQuery({
    queryKey: MOMENTS_KEY,
    queryFn: getAllMoments,
  });
}

/**
 * Hook to fetch a single moment by ID
 *
 * This hook is disabled when id is undefined to prevent unnecessary queries.
 * Corresponds to fetching a specific moment for detail view display.
 *
 * @param id Moment ID to fetch
 * @returns Query result with single moment data
 */
export function useMoment(id: number | undefined) {
  return useQuery({
    queryKey: ['moment', id],
    queryFn: () => {
      if (!id) {
        throw new Error('Moment ID is required');
      }
      return getMomentById(id);
    },
    enabled: !!id,
  });
}

/**
 * Hook to create a new moment
 *
 * After successful creation, invalidates the moments list query to trigger
 * a refetch, ensuring the UI updates automatically with the new moment.
 * This replicates SwiftUI's automatic UI updates when SwiftData changes.
 *
 * @returns Mutation result with { mutate, mutateAsync, isPending, error }
 */
export function useCreateMoment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateMomentInput) => createMoment(input),
    onSuccess: () => {
      // Invalidate the moments list to trigger refetch
      queryClient.invalidateQueries({ queryKey: MOMENTS_KEY });
    },
  });
}

/**
 * Hook to delete a moment
 *
 * After successful deletion, invalidates both the moments list query and
 * the specific moment query to ensure the UI updates automatically.
 * This ensures deleted moments are removed from all views.
 *
 * @returns Mutation result with { mutate, mutateAsync, isPending, error }
 */
export function useDeleteMoment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteMoment(id),
    onSuccess: (_data, id) => {
      // Invalidate the moments list to trigger refetch
      queryClient.invalidateQueries({ queryKey: MOMENTS_KEY });
      // Also invalidate the specific moment query if it exists
      queryClient.invalidateQueries({ queryKey: ['moment', id] });
    },
  });
}
