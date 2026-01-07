import { View, Text, StyleSheet } from 'react-native';

/**
 * Moments List Screen
 *
 * This is a placeholder for the moments list screen that will be
 * fully implemented in Task 6. For now, it displays a simple message
 * to verify that the navigation structure is working correctly.
 */
export default function MomentsListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Grateful Moments</Text>
      <Text style={styles.subtitle}>List screen placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
