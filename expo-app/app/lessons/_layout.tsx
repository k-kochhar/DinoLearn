import { Stack } from 'expo-router';
import React from 'react';

export default function LessonsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[courseId]" />
    </Stack>
  );
} 