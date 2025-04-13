import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  SafeAreaView,
  Alert
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DinoHeader } from '@/components/DinoHeader';
import { LoadingDino } from '@/components/LoadingDino';
import { fetchRoadmaps } from '@/services/api';

export default function SearchLoadingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Get query from params
  const query = params.query ? String(params.query) : "";
  
  // Track loading state
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch roadmaps and then redirect to roadmap
  useEffect(() => {
    const loadRoadmaps = async () => {
      try {
        // Fetch roadmaps from the API
        await fetchRoadmaps();
        
        // Wait a bit for better UX
        setTimeout(() => {
          // First stop the animation
          setIsLoading(false);
          
          // Then wait a brief moment for animation to finish
          setTimeout(() => {
            router.replace({
              pathname: '/roadmap',
              params: { topic: query }
            });
          }, 400);
        }, 1000);
      } catch (error) {
        console.error("Error fetching roadmaps:", error);
        
        // Stop the loading animation
        setIsLoading(false);
        
        // Show error alert
        Alert.alert(
          "Connection Error",
          "Failed to load roadmaps. Please check your internet connection and try again.",
          [
            {
              text: "Try Again",
              onPress: () => {
                setIsLoading(true);
                loadRoadmaps();
              }
            },
            {
              text: "Go Back",
              onPress: () => router.back(),
              style: "cancel"
            }
          ]
        );
      }
    };
    
    loadRoadmaps();
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