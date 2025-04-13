import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DinoLearnColors } from '@/constants/Colors';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DinoHeader } from '@/components/DinoHeader';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

export default function MyCoursesScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { width } = useWindowDimensions();
  
  const handleViewRoadmap = () => {
    router.push('/roadmap');
  };
  
  const handleContinueLearning = () => {
    // Based on the progress (28%, 2 of 7 lessons completed), 
    // the user should continue with lesson 3
    router.push('/lessons/101/3');
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <DinoHeader onMenuPress={() => {/* Handle menu press */}} />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>My Courses</Text>
        <Text style={[styles.subtitle, { color: colors.text + 'CC' }]}>
          Continue learning from where you left off
        </Text>
      </View>
      
      <View style={[styles.content, { backgroundColor: colors.background }]}>
        <View style={[styles.courseSection, { backgroundColor: colors.card }]}>
          {/* Course Card */}
          <View style={styles.courseCard}>
            {/* Course Header */}
            <View style={styles.courseHeader}>
              <View style={[styles.iconContainer, { backgroundColor: DinoLearnColors.skyBlue + '4D' }]}>
                <Image source={require('@/assets/images/Track.png')} style={{ width: 50, height: 50 }} />
              </View>
              
              <View style={styles.courseInfo}>
                <Text style={[styles.courseTitle, { color: colors.text }]}>
                  Dinosaurs
                </Text>
                <Text style={[styles.courseCategory, { color: colors.text + 'B3' }]}>
                  Paleontology
                </Text>
              </View>
            </View>
            
            {/* Course Progress */}
            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={[styles.progressLabel, { color: colors.text }]}>
                  Course Progress
                </Text>
                <Text style={[styles.progressPercent, { color: colors.text }]}>
                  28%
                </Text>
              </View>
              
              <View style={[styles.progressTrack, { backgroundColor: DinoLearnColors.lightGray }]}>
                <View 
                  style={[styles.progressFill, { backgroundColor: DinoLearnColors.burntOrange, width: '28%' }]} 
                />
              </View>
              
              <Text style={[styles.progressInfo, { color: colors.text + 'CC' }]}>
                2 of 7 lessons completed
              </Text>
            </View>
            
            {/* Last Accessed */}
            <View style={styles.lastAccessed}>
              <ClockIcon color={DinoLearnColors.navyBlue + 'CC'} />
              <Text style={[styles.lastAccessedText, { color: colors.text + 'CC' }]}>
                Last accessed: 2 days ago
              </Text>
            </View>
            
            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.continueButton, { backgroundColor: DinoLearnColors.burntOrange }]}
                onPress={handleContinueLearning}
              >
                <Text style={styles.continueButtonText}>
                  Continue{'\n'}Learning
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.roadmapButton, { backgroundColor: 'transparent', borderColor: DinoLearnColors.navyBlue }]}
                onPress={handleViewRoadmap}
              >
                <Text style={[styles.roadmapButtonText, { color: DinoLearnColors.navyBlue }]}>
                  View{'\n'}Roadmap
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Information Section */}
          <View style={styles.infoSection}>
            <Text style={[styles.infoTitle, { color: colors.text }]}>
              Course Overview
            </Text>
            <Text style={[styles.infoDescription, { color: colors.text + 'CC' }]}>
              This comprehensive course covers the fascinating world of dinosaurs, from their classification and habitats to their behaviors and extinction. Learn about different species, the Mesozoic Era, and the latest paleontological discoveries.
            </Text>
            
            <View style={styles.infoStats}>
              <View style={styles.infoStat}>
                <Text style={[styles.infoStatValue, { color: colors.text }]}>7</Text>
                <Text style={[styles.infoStatLabel, { color: colors.text + 'CC' }]}>Lessons</Text>
              </View>
              
              <View style={styles.infoStatDivider} />
              
              <View style={styles.infoStat}>
                <Text style={[styles.infoStatValue, { color: colors.text }]}>14</Text>
                <Text style={[styles.infoStatLabel, { color: colors.text + 'CC' }]}>Activities</Text>
              </View>
              
              <View style={styles.infoStatDivider} />
              
              <View style={styles.infoStat}>
                <Text style={[styles.infoStatValue, { color: colors.text }]}>3</Text>
                <Text style={[styles.infoStatLabel, { color: colors.text + 'CC' }]}>Hours</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Dinosaur icon
const DinoIcon = () => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 24 24"
    fill="none"
    stroke={DinoLearnColors.navyBlue}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M4 19.5c0-1.657 4.03-3 9-3 4.97 0 9 1.343 9 3v-8c0-1.657-4.03-3-9-3-4.97 0-9 1.343-9 3v8z" />
    <Path d="M4 12.5v-2C4 8.843 8.03 7.5 13 7.5c4.97 0 9 1.343 9 3v2" />
    <Path d="M4 9.5v-2C4 5.843 8.03 4.5 13 4.5c4.97 0 9 1.343 9 3v2" />
    <Path d="M15 4.5v5" />
    <Path d="M7 8.5v5" />
    <Path d="M19 8.5v5" />
  </Svg>
);

// Clock icon
const ClockIcon = ({ color }: { color: string }) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </Svg>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    maxWidth: 500,
    lineHeight: 24,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  courseSection: {
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 4,
    overflow: 'hidden',
  },
  courseCard: {
    padding: 24,
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  courseCategory: {
    fontSize: 16,
  },
  progressSection: {
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: '700',
  },
  progressTrack: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
  progressInfo: {
    fontSize: 14,
  },
  lastAccessed: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  lastAccessedText: {
    fontSize: 14,
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  continueButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  roadmapButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  roadmapButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  infoSection: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  infoDescription: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  infoStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  infoStat: {
    alignItems: 'center',
  },
  infoStatValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  infoStatLabel: {
    fontSize: 14,
  },
  infoStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E0E0E0',
  },
}); 