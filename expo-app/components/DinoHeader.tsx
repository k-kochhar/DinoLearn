import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { IconSymbol } from './ui/IconSymbol';
import { DinoLearnColors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface DinoHeaderProps {
  currentScreen?: 'dashboard' | 'courses' | 'library';
  userName?: string;
  userInitials?: string;
}

export function DinoHeader({ 
  currentScreen = 'dashboard', 
  userName = 'Kshitij', 
  userInitials = 'KS' 
}: DinoHeaderProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: colors.background,
        borderBottomColor: DinoLearnColors.skyBlue + '4D', // 30% opacity
      }
    ]}>
      <View style={styles.content}>
        <Link href={"/(tabs)" as any} asChild>
          <TouchableOpacity 
            style={styles.logoContainer}
            disabled={currentScreen === 'dashboard'}
          >
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

        <View style={styles.navContainer}>
          <Link href={"/(tabs)" as any} asChild>
            <TouchableOpacity 
              style={[
                styles.navItem, 
                currentScreen === 'dashboard' && styles.activeNavItem
              ]}
              disabled={currentScreen === 'dashboard'}
            >
              <Text 
                style={[
                  styles.navText, 
                  { color: colors.text },
                  currentScreen === 'dashboard' && { 
                    color: colors.primary, 
                    fontWeight: '700' 
                  }
                ]}
              >
                Dashboard
              </Text>
              {currentScreen === 'dashboard' && (
                <View style={[styles.activeIndicator, { backgroundColor: colors.tint }]} />
              )}
            </TouchableOpacity>
          </Link>

          <Link href={"/(tabs)/my-courses" as any} asChild>
            <TouchableOpacity 
              style={[
                styles.navItem,
                currentScreen === 'courses' && styles.activeNavItem
              ]}
              disabled={currentScreen === 'courses'}
            >
              <Text 
                style={[
                  styles.navText, 
                  { color: colors.text },
                  currentScreen === 'courses' && { 
                    color: colors.primary, 
                    fontWeight: '700' 
                  }
                ]}
              >
                My Courses
              </Text>
              {currentScreen === 'courses' && (
                <View style={[styles.activeIndicator, { backgroundColor: colors.tint }]} />
              )}
            </TouchableOpacity>
          </Link>

          <Link href={"/(tabs)/library" as any} asChild>
            <TouchableOpacity 
              style={[
                styles.navItem,
                currentScreen === 'library' && styles.activeNavItem
              ]}
              disabled={currentScreen === 'library'}
            >
              <Text 
                style={[
                  styles.navText, 
                  { color: colors.text },
                  currentScreen === 'library' && { 
                    color: colors.primary, 
                    fontWeight: '700' 
                  }
                ]}
              >
                Library
              </Text>
              {currentScreen === 'library' && (
                <View style={[styles.activeIndicator, { backgroundColor: colors.tint }]} />
              )}
            </TouchableOpacity>
          </Link>

          <TouchableOpacity style={[styles.profileButton, { backgroundColor: colors.card }]}>
            <View style={[styles.avatarCircle, { backgroundColor: DinoLearnColors.skyBlue }]}>
              <Text style={[styles.avatarText, { color: colors.primary }]}>{userInitials}</Text>
            </View>
            <Text style={[styles.userName, { color: colors.text }]}>{userName}</Text>
            <IconSymbol name="chevron.down" size={16} color={DinoLearnColors.charcoalGray + 'B3'} />
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
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  navItem: {
    position: 'relative',
  },
  activeNavItem: {
    // Active state is handled with the indicator
  },
  navText: {
    fontSize: 15,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -5,
    left: 0,
    right: 0,
    height: 2,
    borderRadius: 1,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '500',
  },
  userName: {
    fontSize: 14,
    fontWeight: '500',
  },
}); 