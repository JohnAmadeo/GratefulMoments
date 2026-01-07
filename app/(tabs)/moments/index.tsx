import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useMoments } from '../../../lib/hooks/useMoments';
import { initializeSampleData } from '../../../lib/db/operations';
import type { Moment } from '../../../lib/db/types';
import { Colors } from '../../../constants/Colors';
import { SharedStyles } from '../../../styles/shared';

/**
 * Moments List Screen
 *
 * Main screen that displays all grateful moments in a scrollable list.
 * Migrated from GratefulMoments/Tabs/Moments/Moments.swift
 *
 * This implementation uses FlatList for performance and includes:
 * - Loading state while data is fetching
 * - Empty state when no moments exist (ContentUnavailableView equivalent)
 * - Simple list items with title and formatted timestamp
 * - Sample data initialization in development
 *
 * Note: Hexagon components and scroll animations are intentionally
 * omitted in this tracer bullet implementation (future milestones).
 */
export default function MomentsListScreen() {
  const { data: moments, isLoading, error, refetch } = useMoments();

  // Initialize sample data if database is empty (development only)
  useEffect(() => {
    // Only initialize sample data in development and if we have no moments
    if (__DEV__ && moments?.length === 0) {
      initializeSampleData().then(() => {
        refetch();
      });
    }
  }, [moments, refetch]);

  // Loading state
  if (isLoading) {
    return (
      <View style={[SharedStyles.screenCentered]}>
        <ActivityIndicator size="large" color={Colors.systemBlue} />
        <Text style={[SharedStyles.subheadline, styles.loadingText]}>
          Loading moments...
        </Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={[SharedStyles.screenCentered]}>
        <Text style={SharedStyles.headline}>Error loading moments</Text>
        <Text style={[SharedStyles.subheadline, styles.errorText]}>
          {error.message}
        </Text>
      </View>
    );
  }

  // Empty state - equivalent to ContentUnavailableView in Moments.swift:21-27
  if (!moments || moments.length === 0) {
    return (
      <View style={[SharedStyles.screenCentered]}>
        <Text style={styles.emptyStateIcon}>⚠️</Text>
        <Text style={[SharedStyles.headline, styles.emptyStateTitle]}>
          No moments yet!
        </Text>
        <Text style={[SharedStyles.subheadline, styles.emptyStateDescription]}>
          Post a note or photo to start filling this space with gratitude.
        </Text>
      </View>
    );
  }

  // Main list view
  return (
    <View style={SharedStyles.screen}>
      <FlatList
        data={moments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MomentListItem moment={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
}

/**
 * Individual moment list item component
 *
 * Displays a simple card with title and formatted timestamp.
 * In future milestones, this will be replaced with MomentHexagonView.
 */
function MomentListItem({ moment }: { moment: Moment }) {
  // Format timestamp to human-readable date
  const formattedDate = new Date(moment.timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <TouchableOpacity
      style={styles.listItem}
      activeOpacity={0.7}
      // Navigation to detail screen will be added in future milestones
      onPress={() => {
        console.log('Tapped moment:', moment.id);
        // TODO: Navigate to detail screen in future milestone
      }}
    >
      <View style={styles.listItemContent}>
        <Text style={SharedStyles.headline} numberOfLines={2}>
          {moment.title}
        </Text>
        <Text style={[SharedStyles.caption, styles.timestamp]}>
          {formattedDate}
        </Text>
        {moment.note && (
          <Text style={[SharedStyles.subheadline, styles.note]} numberOfLines={2}>
            {moment.note}
          </Text>
        )}
        {moment.imageData && (
          <View style={styles.imageIndicator}>
            <Text style={styles.imageIndicatorText}>📷 Has image</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
  },
  listItem: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.systemGray5,
  },
  listItemContent: {
    gap: 8,
  },
  timestamp: {
    marginTop: 4,
    color: Colors.systemGray,
  },
  note: {
    marginTop: 4,
  },
  imageIndicator: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: Colors.systemGray6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  imageIndicatorText: {
    fontSize: 12,
    color: Colors.systemGray,
  },
  loadingText: {
    marginTop: 12,
  },
  errorText: {
    marginTop: 8,
    textAlign: 'center',
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateDescription: {
    textAlign: 'center',
    paddingHorizontal: 32,
    lineHeight: 20,
  },
});
