import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  SafeAreaView
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DinoHeader } from '@/components/DinoHeader';
import { LoadingDino } from '@/components/LoadingDino';

export default function SearchLoadingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Get query from params
  const query = params.query ? String(params.query) : "";
  
  // Track loading state
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading time and then redirect to roadmap
  useEffect(() => {
    const timeout = setTimeout(() => {
      // First stop the animation
      setIsLoading(false);
      
      // Then wait a brief moment for animation to finish
      setTimeout(() => {
        router.replace({
          pathname: '/roadmap',
          params: { topic: query }
        });
      }, 400);
    }, 2000); // Show the loading animation for 2 seconds
    
    return () => clearTimeout(timeout);
  }, [query]);
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <DinoHeader 
        showBackButton={true} 
        backRoute="/(tabs)" 
        title="Preparing Your Roadmap"
        showStreak={false}
      />
      
      <LoadingDino 
        message="Drawing up your lesson plan!" 
        isLoading={isLoading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
}); 