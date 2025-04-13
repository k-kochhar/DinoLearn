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
}

export function DinoHeader({ onMenuPress, showBackButton = false, backRoute = '/(tabs)', title }: DinoHeaderProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

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

        <TouchableOpacity 
          style={styles.menuButton}
          onPress={onMenuPress}
        >
          <IconSymbol name="line.3.horizontal" size={24} color={colors.text} />
        </TouchableOpacity>
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
  menuButton: {
    padding: 8,
    borderRadius: 8,
  },
}); 