import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { DinoLearnColors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

// Import SVG icons
import Svg, { Path } from 'react-native-svg';

type IconType = 'cpu' | 'rocket' | 'cursor' | 'bolt' | 'dino';

interface CourseCardProps {
  id: number;
  title: string;
  category: string;
  progress: number;
  iconType: IconType;
}

export function CourseCard({ id, title, category, progress, iconType }: CourseCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const renderIcon = () => {
    switch (iconType) {
      case 'dino':
        return (
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={DinoLearnColors.navyBlue} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M4 19.5c0-1.657 4.03-3 9-3 4.97 0 9 1.343 9 3v-8c0-1.657-4.03-3-9-3-4.97 0-9 1.343-9 3v8z" />
            <Path d="M4 12.5v-2C4 8.843 8.03 7.5 13 7.5c4.97 0 9 1.343 9 3v2" />
            <Path d="M4 9.5v-2C4 5.843 8.03 4.5 13 4.5c4.97 0 9 1.343 9 3v2" />
            <Path d="M15 4.5v5" />
            <Path d="M7 8.5v5" />
            <Path d="M19 8.5v5" />
          </Svg>
        );
      case 'cpu':
        return (
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={DinoLearnColors.navyBlue} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M9 3.75H7.5a1.5 1.5 0 00-1.5 1.5v.75M9 20.25H7.5a1.5 1.5 0 01-1.5-1.5v-.75M15 3.75h1.5a1.5 1.5 0 011.5 1.5v.75M15 20.25h1.5a1.5 1.5 0 001.5-1.5v-.75M4.5 9h.75a1.5 1.5 0 001.5-1.5V6M4.5 15h.75a1.5 1.5 0 011.5 1.5V18M19.5 9h-.75a1.5 1.5 0 01-1.5-1.5V6M19.5 15h-.75a1.5 1.5 0 00-1.5 1.5V18M8.25 12h7.5m-7.5 3h7.5m-7.5-6h7.5" />
          </Svg>
        );
      case 'rocket':
        return (
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={DinoLearnColors.navyBlue} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          </Svg>
        );
      case 'cursor':
        return (
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={DinoLearnColors.navyBlue} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M15 15l-6 6m0 0l-6-6m6 6V9a6 6 0 0112 0v3" />
          </Svg>
        );
      case 'bolt':
        return (
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={DinoLearnColors.navyBlue} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </Svg>
        );
      default:
        return null;
    }
  };

  return (
    <Link href={`/lessons/${id}/1` as any} asChild>
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor: DinoLearnColors.lightGray }
        ]}
        activeOpacity={0.7}
      >
        <View style={[styles.iconContainer, { backgroundColor: DinoLearnColors.skyBlue + '4D' }]}>
          {renderIcon()}
        </View>
        
        <Text 
          style={[styles.title, { color: DinoLearnColors.charcoalGray }]}
          numberOfLines={2}
        >
          {title}
        </Text>
        
        <Text style={[styles.category, { color: DinoLearnColors.charcoalGray + 'B3' }]}>
          {category}
        </Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressLabel, { color: DinoLearnColors.charcoalGray }]}>
              Progress
            </Text>
            <Text style={[styles.progressPercent, { color: DinoLearnColors.charcoalGray }]}>
              {progress}%
            </Text>
          </View>
          
          <View style={[styles.progressTrack, { backgroundColor: DinoLearnColors.border }]}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  backgroundColor: DinoLearnColors.burntOrange,
                  width: `${progress}%`
                }
              ]} 
            />
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 3,
    flex: 1,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    marginBottom: 20,
  },
  progressContainer: {
    marginTop: 'auto',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: '700',
  },
  progressTrack: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
}); 