import { Stack } from 'expo-router';
import React from 'react';

export default function CourseLessonLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[lessonId]" />
    </Stack>
  );
} 