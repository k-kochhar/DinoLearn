import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Image,
  Alert
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { DinoLearnColors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { DinoHeader } from '@/components/DinoHeader';
import { LoadingDino } from '@/components/LoadingDino';
import Svg, { Path } from 'react-native-svg';
import { generateRoadmap, RoadmapData } from '@/services/api';
import { dinosaurRoadmap } from '@/services/mock-data';

// Define missing colors
const primaryColor = DinoLearnColors.navyBlue; // Using navyBlue as primary color
const errorBackgroundColor = '#FEE2E2'; // Light red background for errors
const errorTextColor = '#DC2626'; // Red text color for errors

// Fallback roadmap data (used when API fails)
const fallbackRoadmapData = dinosaurRoadmap;

// Sample lesson data for Day 1
const lessonData = {
  "day": 1,
  "title": "What Are Dinosaurs?",
  "summary": "This lesson introduces dinosaurs, explaining what makes them unique among reptiles. You'll learn about their defining features, how they lived, and why they continue to fascinate scientists and the public today.",
  "lesson": [
    {
      "paragraph": "Dinosaurs were a diverse group of reptiles that lived during the Mesozoic Era, which lasted from about 252 to 66 million years ago. They ranged widely in size, from small chicken-sized creatures to enormous long-necked giants. Unlike other reptiles, dinosaurs had an upright stance, with legs positioned directly beneath their bodies, which made them more agile and powerful.",
      "question": {
        "prompt": "What physical trait helped set dinosaurs apart from other reptiles?",
        "options": [
          "Having flippers instead of legs",
          "Legs positioned directly beneath their bodies",
          "Cold-blooded metabolism",
          "Ability to fly"
        ],
        "answer": "Legs positioned directly beneath their bodies"
      }
    },
    {
      "paragraph": "The term 'dinosaur' comes from the Greek words 'deinos' meaning terrible, and 'sauros' meaning lizard. However, dinosaurs were not lizards. They were a unique group of reptiles with distinctive hips and limb structures. Some were herbivores, others were carnivores, and they adapted to a wide range of environments across the planet.",
      "question": {
        "prompt": "What does the word 'dinosaur' mean in Greek?",
        "options": [
          "Fast predator",
          "Old reptile",
          "Terrible lizard",
          "Big monster"
        ],
        "answer": "Terrible lizard"
      }
    },
    {
      "paragraph": "Dinosaurs lived during three major periods within the Mesozoic Era: the Triassic, Jurassic, and Cretaceous. During these times, they evolved and diversified into thousands of species. While some dinosaurs were fierce predators, others were peaceful plant-eaters, traveling in herds and caring for their young.",
      "question": {
        "prompt": "During which era did dinosaurs live?",
        "options": [
          "Cenozoic",
          "Mesozoic",
          "Paleozoic",
          "Precambrian"
        ],
        "answer": "Mesozoic"
      }
    },
    {
      "paragraph": "Dinosaurs continue to capture our imagination today due to their size, mystery, and the clues they left behind in the fossil record. Scientists study dinosaur bones, footprints, and other fossils to understand how they moved, what they ate, and how they might have behaved.",
      "question": {
        "prompt": "What do scientists study to learn about dinosaurs?",
        "options": [
          "Live recordings",
          "Ancient scrolls",
          "Fossils",
          "DNA samples"
        ],
        "answer": "Fossils"
      }
    }
  ]
};

export default function RoadmapScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Get topic from navigation params or use default
  const topic = params.topic ? String(params.topic) : "Dinosaurs";
  
  // In a real app, this would be persisted in storage or backend
  const [currentProgress, setCurrentProgress] = useState(3); // User has completed days 1 & 2, currently on day 3
  
  // State for roadmap data
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch roadmap data on component mount or when topic changes
  useEffect(() => {
    const fetchRoadmap = async () => {
      setIsLoading(true);
      try {
        // Use the topic from params
        const data = await generateRoadmap(topic);
        setRoadmapData(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch roadmap:", err);
        setError("Failed to load roadmap. Using offline content instead.");
        // Use fallback data but update the topic
        setRoadmapData({
          ...fallbackRoadmapData,
          topic: topic
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRoadmap();
  }, [topic]);
  
  // Icons
  const LockIcon = () => (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke={DinoLearnColors.charcoalGray + 'CC'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </Svg>
  );
  
  const CheckIcon = () => (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke={DinoLearnColors.skyBlue}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </Svg>
  );
  
  const ArrowRightIcon = () => (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </Svg>
  );

  const handleLessonPress = (day: number) => {
    if (day <= currentProgress) {
      // Get the title for the day, safely handling null roadmapData
      const dayTitle = roadmapData?.roadmap && roadmapData.roadmap.length >= day
        ? roadmapData.roadmap[day-1]?.title
        : fallbackRoadmapData.roadmap[day-1]?.title || "";
        
      // Navigate to the lesson page with the day parameter
      router.push({
        pathname: '/lesson',
        params: { 
          day,
          topic: roadmapData?.topic || topic,
          title: dayTitle
        }
      });
    } else {
      Alert.alert(
        "Lesson Locked", 
        "You need to complete previous lessons first to unlock this one.",
        [{ text: "OK" }]
      );
    }
  };

  const getLessonStatus = (day: number) => {
    if (day < currentProgress) {
      return "completed";
    } else if (day === currentProgress) {
      return "current";
    } else {
      return "locked";
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <DinoHeader showBackButton={true} backRoute="/(tabs)" title="Loading Roadmap..." />
        <LoadingDino 
          message="Drawing up your lesson plan!" 
          isLoading={isLoading}
        />
      </SafeAreaView>
    );
  }

  // Safety check - use fallback if roadmapData is still null after loading
  const displayRoadmap = roadmapData || fallbackRoadmapData;

  // Render main content if data is available
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <DinoHeader 
        showBackButton={true} 
        backRoute="/(tabs)" 
        title={`${displayRoadmap.topic}`} 
      />
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Course Header */}
        <View style={styles.courseHeader}>
          <View style={styles.courseImageContainer}>
            <Image 
              source={require('@/assets/images/Standing.png')} 
              style={styles.courseImage}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.courseInfo}>
            <Text style={[styles.courseTopic, { color: colors.primary }]}>
              {displayRoadmap.topic}
            </Text>
            <Text style={[styles.courseProgress, { color: colors.text + 'CC' }]}>
              {Math.floor((currentProgress - 1) / displayRoadmap.roadmap.length * 100)}% Complete
            </Text>
            
            <View style={[styles.progressBar, { backgroundColor: DinoLearnColors.lightGray }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${Math.floor((currentProgress - 1) / displayRoadmap.roadmap.length * 100)}%`,
                    backgroundColor: DinoLearnColors.burntOrange 
                  }
                ]} 
              />
            </View>
          </View>
        </View>
        
        {/* Roadmap */}
        <View style={styles.roadmapContainer}>
          <Text style={[styles.roadmapTitle, { color: colors.text }]}>
            14-Day Learning Journey
          </Text>
          
          <View style={styles.roadmapTimeline}>
            {displayRoadmap.roadmap.map((lesson, index) => {
              const status = getLessonStatus(lesson.day);
              
              return (
                <View key={lesson.day} style={styles.timelineItem}>
                  {/* Connector Line */}
                  {index < displayRoadmap.roadmap.length - 1 && (
                    <View 
                      style={[
                        styles.connector, 
                        { 
                          backgroundColor: status === "completed" 
                            ? DinoLearnColors.skyBlue 
                            : DinoLearnColors.lightGray 
                        }
                      ]} 
                    />
                  )}
                  
                  {/* Day Marker */}
                  <TouchableOpacity
                    style={[
                      styles.dayMarker,
                      status === "completed" && styles.completedMarker,
                      status === "current" && styles.currentMarker,
                    ]}
                    onPress={() => handleLessonPress(lesson.day)}
                    activeOpacity={status === "locked" ? 1 : 0.7}
                  >
                    {status === "completed" ? (
                      <CheckIcon />
                    ) : status === "locked" ? (
                      <LockIcon />
                    ) : (
                      <Text style={styles.dayNumber}>{lesson.day}</Text>
                    )}
                  </TouchableOpacity>
                  
                  {/* Lesson Card */}
                  <TouchableOpacity
                    style={[
                      styles.lessonCard,
                      status === "locked" && styles.lockedCard,
                      { backgroundColor: colors.card }
                    ]}
                    onPress={() => handleLessonPress(lesson.day)}
                    activeOpacity={status === "locked" ? 1 : 0.7}
                  >
                    <View style={styles.lessonContent}>
                      <View style={styles.lessonHeader}>
                        <Text 
                          style={[
                            styles.lessonDay,
                            { 
                              color: status === "locked" 
                                ? colors.text + '80' 
                                : DinoLearnColors.burntOrange 
                            }
                          ]}
                        >
                          Day {lesson.day}
                        </Text>
                        <Text 
                          style={[
                            styles.lessonTitle,
                            { 
                              color: status === "locked" 
                                ? colors.text + '80' 
                                : colors.text
                            }
                          ]}
                          numberOfLines={2}
                        >
                          {lesson.title}
                        </Text>
                      </View>
                      
                      {status !== "locked" && (
                        <View 
                          style={[
                            styles.lessonArrow,
                            status === "current" && { opacity: 0.8 }
                          ]}
                        >
                          <ArrowRightIcon />
                        </View>
                      )}
                    </View>
                    
                    {status === "current" && (
                      <View style={styles.currentTag}>
                        <Text style={styles.currentTagText}>Current</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  courseHeader: {
    marginTop: 24,
    marginBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  courseImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: DinoLearnColors.skyBlue + '30',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  courseImage: {
    width: 60,
    height: 60,
  },
  courseInfo: {
    flex: 1,
  },
  courseTopic: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  courseProgress: {
    fontSize: 14,
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  roadmapContainer: {
    paddingTop: 16,
  },
  roadmapTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 24,
  },
  roadmapTimeline: {
    paddingLeft: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    position: 'relative',
  },
  connector: {
    position: 'absolute',
    left: 19,
    top: 40,
    width: 2,
    height: 60,
    zIndex: -1,
  },
  dayMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: DinoLearnColors.paleMint,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: DinoLearnColors.navyBlue,
  },
  completedMarker: {
    backgroundColor: 'white',
    borderColor: DinoLearnColors.skyBlue,
  },
  currentMarker: {
    backgroundColor: DinoLearnColors.burntOrange + '20',
    borderColor: DinoLearnColors.burntOrange,
  },
  dayNumber: {
    fontWeight: '700',
    fontSize: 16,
    color: DinoLearnColors.navyBlue,
  },
  lessonCard: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: DinoLearnColors.skyBlue,
  },
  lockedCard: {
    borderLeftColor: DinoLearnColors.lightGray,
    opacity: 0.8,
  },
  lessonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lessonHeader: {
    flex: 1,
    paddingRight: 12,
  },
  lessonDay: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
  },
  lessonTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  lessonArrow: {
    padding: 4,
  },
  currentTag: {
    position: 'absolute',
    top: -8,
    right: 16,
    backgroundColor: DinoLearnColors.burntOrange,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  currentTagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
  },
  errorContainer: {
    padding: 16,
    backgroundColor: errorBackgroundColor,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  errorText: {
    color: errorTextColor,
    fontSize: 14,
    fontWeight: '500',
  },
}); 