import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { IconSymbol } from './ui/IconSymbol';
import { DinoLearnColors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import Svg, { Path } from 'react-native-svg';

interface DinoHeaderProps {
  onMenuPress?: () => void;
  showBackButton?: boolean;
  backRoute?: string;
  title?: string;
  showStreak?: boolean;
}

export function DinoHeader({ 
  onMenuPress, 
  showBackButton = false, 
  backRoute = '/(tabs)', 
  title,
  showStreak = true
}: DinoHeaderProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Hardcoded streak count
  const streakCount = 4;

  // Back arrow icon
  const BackIcon = () => (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke={DinoLearnColors.navyBlue}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </Svg>
  );
  
  // Fire icon for streak
  const FireIcon = () => (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill={DinoLearnColors.burntOrange}
      stroke="none"
    >
      <Path d="M12 23c-4.97 0-9-2.582-9-7v-.09c0-4.011 1.548-6.587 3.822-10.741.722-1.323 2.572-.667 2.578.86.004 1.066-.025 2.071.505 2.64.804.856 1.686.856 2.483.036l.054-.063c1.433-1.7 2.247-3.972 2.547-6.608.108-.944 1.322-1.258 1.858-.478C18.34 6.663 21 9.84 21 15.91c0 3.264-1.996 7.09-9 7.09zm0-2c4.617 0 7-2.082 7-5.09 0-5.027-2.253-7.544-3.867-9.439-.233 2.697-1.138 5.33-2.914 7.322-1.389 1.55-3.492 1.982-5.466.305-1.115-.944-1.703-2.386-1.753-4.184C3.827 11.906 3 13.926 3 15.91v.09c0 3.227 3.231 5 9 5z" />
    </Svg>
  );

  // Navigate to streak screen
  const handleStreakPress = () => {
    router.push('/streak');
  };

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: colors.background,
        borderBottomColor: DinoLearnColors.skyBlue + '4D', // 30% opacity
      }
    ]}>
      <View style={styles.content}>
        {showBackButton ? (
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <BackIcon />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        ) : (
          <Link href={"/(tabs)" as any} asChild>
            <TouchableOpacity style={styles.logoContainer}>
              <View style={[styles.logoCircle, { backgroundColor: colors.card }]}>
                <Image 
                  source={require('@/assets/images/dino-head.png')} 
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              <Text style={[styles.logoText, { color: colors.primary }]}>DinoLearn</Text>
            </TouchableOpacity>
          </Link>
        )}

        {title ? (
          <Text style={[styles.titleText, { color: colors.primary }]}>{title}</Text>
        ) : (
          <View style={styles.spacer} />
        )}

        <View style={styles.rightContainer}>
          {showStreak && (
            <TouchableOpacity 
              style={styles.streakContainer}
              onPress={handleStreakPress}
            >
              <Text style={styles.streakText}>{streakCount}</Text>
              <FireIcon />
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={onMenuPress}
          >
            <IconSymbol name="line.3.horizontal" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  logo: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: DinoLearnColors.navyBlue,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: -1,
  },
  spacer: {
    flex: 1,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: DinoLearnColors.burntOrange + '15',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  streakText: {
    fontWeight: '700',
    fontSize: 14,
    color: DinoLearnColors.burntOrange,
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
  },
}); 