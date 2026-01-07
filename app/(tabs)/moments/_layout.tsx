import { Stack } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';

export default function MomentsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTintColor: '#007AFF', // iOS blue for back button
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Grateful Moments',
          headerLargeTitle: true, // iOS-style large title
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // Non-functional placeholder for Task 6
                // Will be implemented in future milestones to navigate to create screen
                console.log('+ button tapped (placeholder)');
              }}
              style={{ padding: 8 }}
            >
              <Text style={{ fontSize: 28, color: '#007AFF', fontWeight: '300' }}>+</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Moment',
          presentation: 'card', // Standard push transition
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          title: 'New Moment',
          presentation: 'modal', // Modal presentation for create screen
          headerLeft: () => null, // Will add cancel button in the screen itself
        }}
      />
    </Stack>
  );
}
