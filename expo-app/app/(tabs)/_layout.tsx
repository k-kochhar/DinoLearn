import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors, DinoLearnColors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Customized SVG icons for DinoLearn
const HomeIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 19v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6M3 12l9-9 9 9M5 19c0 1 1 2 2 2h10c1 0 2-1 2-2v-7" />
  </Svg>
);

const BookIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <Path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </Svg>
);

const LeaderboardIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M18 21v-8M12 21V9M6 21v-4" />
  </Svg>
);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: DinoLearnColors.burntOrange,
        tabBarInactiveTintColor: DinoLearnColors.charcoalGray + '80',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderTopColor: 'rgba(0, 0, 0, 0.1)',
            borderTopWidth: 0.5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
          },
          default: {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
            borderTopWidth: 1,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-courses"
        options={{
          title: 'My Courses',
          tabBarIcon: ({ color }) => <BookIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color }) => <LeaderboardIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
