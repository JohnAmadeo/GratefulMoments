import { Stack } from 'expo-router';

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
