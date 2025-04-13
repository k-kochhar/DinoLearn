import React, { useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  Animated, 
  Easing 
} from 'react-native';
import { DinoLearnColors } from '@/constants/Colors';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface LoadingDinoProps {
  message?: string;
  isLoading?: boolean;
}

export function LoadingDino({ 
  message = "Drawing up your lesson plan!", 
  isLoading = true 
}: LoadingDinoProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Animation values
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  
  // Start or stop the shaking animation based on loading state
  useEffect(() => {
    const startShakingAnimation = () => {
      // Reset the animation value
      shakeAnimation.setValue(0);
      
      // Define shaking animation sequence
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 1,
          duration: 50,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -1,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 50,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Only continue animation if still loading
        if (isLoading) {
          animationRef.current = setTimeout(startShakingAnimation, 800);
        } else {
          // Reset to neutral position when loading stops
          Animated.timing(shakeAnimation, {
            toValue: 0,
            duration: 300,
            easing: Easing.elastic(1),
            useNativeDriver: true,
          }).start();
        }
      });
    };
    
    if (isLoading) {
      startShakingAnimation();
    } else if (animationRef.current) {
      // Stop animation loop when loading is complete
      clearTimeout(animationRef.current);
      animationRef.current = null;
      
      // Return to neutral position smoothly
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 300,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }).start();
    }
    
    // Clean up animation when component unmounts
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
        animationRef.current = null;
      }
      shakeAnimation.stopAnimation();
    };
  }, [isLoading]);
  
  // Define the shake transform
  const shakeInterpolation = shakeAnimation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [-4, 0, 4],
  });
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View
        style={[
          styles.imageContainer,
          {
            transform: [
              { rotate: shakeAnimation.interpolate({
                  inputRange: [-1, 0, 1],
                  outputRange: ['-5deg', '0deg', '5deg']
                })
              },
              { translateX: shakeInterpolation }
            ]
          }
        ]}
      >
        <Image
          source={require('@/assets/images/Drawing.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>
      
      <Text style={[styles.loadingText, { color: colors.text }]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 180,
    height: 180,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: DinoLearnColors.navyBlue,
  },
}); 