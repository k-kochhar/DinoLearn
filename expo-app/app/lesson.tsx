import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Alert
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { DinoLearnColors } from '@/constants/Colors';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DinoHeader } from '@/components/DinoHeader';
import { LoadingDino } from '@/components/LoadingDino';
import Svg, { Path } from 'react-native-svg';
import { generateLesson, LessonData } from '@/services/api';
import { dinosaurLessons } from '@/services/mock-data';

// Define missing colors
const primaryColor = DinoLearnColors.navyBlue; // Using navyBlue as primary color
const errorBackgroundColor = '#FEE2E2'; // Light red background for errors
const errorTextColor = '#DC2626'; // Red text color for errors

// Sample lesson data (fallback when API fails)
const getFallbackLessonData = (day: number): LessonData => {
  // Make sure day is a valid number between 1 and 14
  const validDay = Math.max(1, Math.min(14, day));
  return dinosaurLessons[validDay];
};

interface QuestionState {
  selectedAnswer: string | null;
  isRevealed: boolean;
  isCorrect: boolean | null;
}

export default function LessonScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Get parameters from navigation
  const day = params.day ? Number(params.day) : 1;
  const topic = params.topic ? String(params.topic) : "Dinosaurs";
  const title = params.title ? String(params.title) : "";
  
  console.log(`Loading lesson for topic: ${topic}, day: ${day}, title: ${title}`);
  
  // State for API data
  const [lessonData, setLessonData] = useState<LessonData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Track the state of each question (selected answer, revealed state)
  const [questionsState, setQuestionsState] = useState<Record<number, QuestionState>>({});
  
  // Track lesson progress
  const [progress, setProgress] = useState(0);
  
  // Track XP points earned in this lesson
  const [earnedXP, setEarnedXP] = useState(0);
  
  // Fetch lesson data when component mounts or params change
  useEffect(() => {
    const fetchLesson = async () => {
      setIsLoading(true);
      try {
        const data = await generateLesson(topic, day, title);
        setLessonData(data);
        
        // Initialize question states
        setQuestionsState(data.lesson.reduce((acc, _, index) => {
          acc[index] = { selectedAnswer: null, isRevealed: false, isCorrect: null };
          return acc;
        }, {} as Record<number, QuestionState>));
        
        setError(null);
      } catch (err) {
        console.error("Failed to fetch lesson:", err);
        setError("Failed to load lesson. Using offline content instead.");
        
        // Use fallback data
        setLessonData(getFallbackLessonData(day));
        
        // Initialize question states with fallback data
        setQuestionsState(getFallbackLessonData(day).lesson.reduce((acc, _, index) => {
          acc[index] = { selectedAnswer: null, isRevealed: false, isCorrect: null };
          return acc;
        }, {} as Record<number, QuestionState>));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLesson();
  }, [day, topic, title]);
  
  // Icons
  const CheckCircleIcon = () => (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </Svg>
  );
  
  const XCircleIcon = () => (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </Svg>
  );
  
  const handleSelectAnswer = (questionIndex: number, answer: string) => {
    if (!lessonData || !questionsState[questionIndex] || questionsState[questionIndex].isRevealed) return;
    
    setQuestionsState(prev => ({
      ...prev,
      [questionIndex]: {
        ...prev[questionIndex],
        selectedAnswer: answer
      }
    }));
  };
  
  const handleCheckAnswer = (questionIndex: number) => {
    if (!lessonData) return;
    
    const correctAnswer = lessonData.lesson[questionIndex].question.answer;
    const selectedAnswer = questionsState[questionIndex].selectedAnswer;
    const isCorrect = selectedAnswer === correctAnswer;
    
    // Award XP points for correct answers
    if (isCorrect) {
      setEarnedXP(prev => prev + 5); // Add 5 XP for each correct answer
    }
    
    setQuestionsState(prev => ({
      ...prev,
      [questionIndex]: {
        ...prev[questionIndex],
        isRevealed: true,
        isCorrect
      }
    }));
    
    // Calculate progress based on answered questions
    const answeredCount = Object.values(questionsState).filter(q => q.isRevealed).length + 1;
    const newProgress = Math.floor((answeredCount / lessonData.lesson.length) * 100);
    setProgress(newProgress);
    
    // If all questions are answered, show completion alert with XP
    if (answeredCount === lessonData.lesson.length) {
      // Add 10 XP for completing the lesson
      setEarnedXP(prev => prev + 10);
      
      setTimeout(() => {
        Alert.alert(
          "Lesson Completed!",
          `Congratulations! You've earned ${earnedXP + 10} XP points in this lesson. Ready to move to the next one?`,
          [
            { text: "Not Now", style: "cancel" },
            { text: "Next Lesson", onPress: () => router.push('/roadmap') }
          ]
        );
      }, 1000);
    }
  };
  
  const isOptionCorrect = (questionIndex: number, option: string) => {
    if (!lessonData) return false;
    return questionsState[questionIndex]?.isRevealed && option === lessonData.lesson[questionIndex].question.answer;
  };
  
  const isOptionIncorrect = (questionIndex: number, option: string) => {
    if (!lessonData) return false;
    return questionsState[questionIndex]?.isRevealed && 
           questionsState[questionIndex]?.selectedAnswer === option && 
           option !== lessonData.lesson[questionIndex].question.answer;
  };

  // Loading state
  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <DinoHeader 
          showBackButton={true}
          backRoute="/roadmap"
          title={`Loading Day ${day}...`}
        />
        <LoadingDino 
          message="Drawing up your lesson plan!" 
          isLoading={isLoading}
        />
      </SafeAreaView>
    );
  }
  
  // Safety check - use fallback if lessonData is still null after loading
  const displayLesson = lessonData || getFallbackLessonData(day);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <DinoHeader 
        showBackButton={true}
        backRoute="/roadmap"
        title={`Day ${displayLesson.day}`}
      />
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Lesson Title and Summary */}
        <View style={[styles.titleContainer, { backgroundColor: DinoLearnColors.navyBlue }]}>
          <Text style={styles.title}>{displayLesson.title}</Text>
          <Text style={styles.summary}>{displayLesson.summary}</Text>
        </View>
        
        {/* Progress and XP Tracker */}
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressText, { color: colors.text }]}>Your Progress</Text>
            <Text style={[styles.progressPercentage, { color: colors.text }]}>{progress}% Complete</Text>
          </View>
          
          <View style={[styles.progressTrack, { backgroundColor: DinoLearnColors.lightGray }]}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${progress}%`, backgroundColor: DinoLearnColors.burntOrange }
              ]} 
            />
          </View>
          
          {/* XP Points earned */}
          {earnedXP > 0 && (
            <View style={styles.xpContainer}>
              <View style={styles.xpBadge}>
                <Text style={styles.xpText}>XP</Text>
              </View>
              <Text style={[styles.xpValue, { color: colors.text }]}>+{earnedXP} points earned</Text>
            </View>
          )}
        </View>
        
        {/* Lesson Content */}
        <View style={styles.lessonContent}>
          {displayLesson.lesson.map((section, index) => (
            <View key={index} style={[styles.sectionCard, { backgroundColor: colors.card }]}>
              {/* Reading Section */}
              <View style={styles.readingSection}>
                <View style={styles.sectionNumber}>
                  <Text style={styles.sectionNumberText}>{index + 1}</Text>
                </View>
                <Text style={[styles.paragraph, { color: colors.text }]}>{section.paragraph}</Text>
              </View>
              
              {/* Question Section */}
              <View style={styles.questionSection}>
                <Text style={[styles.questionPrompt, { color: colors.text }]}>
                  {section.question.prompt}
                </Text>
                
                <View style={styles.optionsContainer}>
                  {section.question.options.map((option, optionIndex) => (
                    <TouchableOpacity 
                      key={optionIndex}
                      style={[
                        styles.optionButton,
                        questionsState[index].selectedAnswer === option && styles.selectedOption,
                        isOptionCorrect(index, option) && styles.correctOption,
                        isOptionIncorrect(index, option) && styles.incorrectOption,
                        { borderColor: colors.border }
                      ]}
                      onPress={() => handleSelectAnswer(index, option)}
                      disabled={questionsState[index].isRevealed}
                    >
                      <Text 
                        style={[
                          styles.optionText,
                          { color: colors.text },
                          questionsState[index].selectedAnswer === option && styles.selectedOptionText,
                          isOptionCorrect(index, option) && styles.correctOptionText,
                          isOptionIncorrect(index, option) && styles.incorrectOptionText,
                        ]}
                      >
                        {option}
                      </Text>
                      
                      {isOptionCorrect(index, option) && (
                        <View style={styles.resultIcon}>
                          <CheckCircleIcon />
                        </View>
                      )}
                      
                      {isOptionIncorrect(index, option) && (
                        <View style={styles.resultIcon}>
                          <XCircleIcon />
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
                
                <View style={styles.actionContainer}>
                  {!questionsState[index].isRevealed ? (
                    <TouchableOpacity 
                      style={[
                        styles.checkButton,
                        !questionsState[index].selectedAnswer && styles.disabledButton,
                        { backgroundColor: DinoLearnColors.burntOrange }
                      ]}
                      onPress={() => handleCheckAnswer(index)}
                      disabled={!questionsState[index].selectedAnswer}
                    >
                      <Text style={styles.checkButtonText}>Check Answer</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={[
                      styles.feedbackContainer,
                      questionsState[index].isCorrect ? styles.correctFeedback : styles.incorrectFeedback
                    ]}>
                      <Text style={styles.feedbackText}>
                        {questionsState[index].isCorrect 
                          ? "Correct! Well done." 
                          : "Not quite. The correct answer has been highlighted."}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
        
        {/* Complete Lesson Button */}
        <View style={styles.completeLessonContainer}>
          <TouchableOpacity 
            style={[
              styles.completeButton,
              progress < 100 && { opacity: 0.6 },
              { backgroundColor: DinoLearnColors.burntOrange }
            ]}
            onPress={() => {
              if (progress === 100) {
                Alert.alert(
                  "Lesson Completed!",
                  `Congratulations! You've earned ${earnedXP + 10} XP points in this lesson. Ready to move to the next one?`,
                  [
                    { text: "Not Now", style: "cancel" },
                    { text: "Next Lesson", onPress: () => router.push('/roadmap') }
                  ]
                );
              } else {
                Alert.alert(
                  "Lesson Not Complete",
                  "Please answer all questions to complete this lesson.",
                  [{ text: "OK" }]
                );
              }
            }}
          >
            <Text style={styles.completeButtonText}>
              {progress === 100 ? "Complete & Continue" : "Answer All Questions to Continue"}
            </Text>
          </TouchableOpacity>
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
    paddingBottom: 40,
  },
  titleContainer: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  summary: {
    fontSize: 15,
    lineHeight: 22,
    color: 'white',
    opacity: 0.9,
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 15,
    fontWeight: '600',
  },
  progressPercentage: {
    fontSize: 15,
    fontWeight: '700',
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  lessonContent: {
    paddingHorizontal: 20,
    gap: 24,
  },
  sectionCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  readingSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: DinoLearnColors.paleMint,
    flexDirection: 'row',
    gap: 16,
  },
  sectionNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: DinoLearnColors.skyBlue + '40',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  sectionNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: DinoLearnColors.navyBlue,
  },
  paragraph: {
    flex: 1,
    fontSize: 15,
    lineHeight: 24,
  },
  questionSection: {
    padding: 20,
  },
  questionPrompt: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
  },
  selectedOption: {
    borderColor: DinoLearnColors.navyBlue,
    backgroundColor: DinoLearnColors.navyBlue + '10',
  },
  correctOption: {
    borderColor: '#22c55e',
    backgroundColor: '#22c55e20',
  },
  incorrectOption: {
    borderColor: '#ef4444',
    backgroundColor: '#ef444420',
  },
  optionText: {
    fontSize: 15,
  },
  selectedOptionText: {
    fontWeight: '600',
    color: DinoLearnColors.navyBlue,
  },
  correctOptionText: {
    fontWeight: '600',
    color: '#22c55e',
  },
  incorrectOptionText: {
    fontWeight: '600',
    color: '#ef4444',
  },
  resultIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContainer: {
    alignItems: 'center',
  },
  checkButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    minWidth: 150,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  checkButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  feedbackContainer: {
    padding: 16,
    borderRadius: 12,
    width: '100%',
  },
  correctFeedback: {
    backgroundColor: '#22c55e20',
  },
  incorrectFeedback: {
    backgroundColor: '#ef444420',
  },
  feedbackText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
  },
  completeLessonContainer: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 16,
  },
  completeButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  completeButtonText: {
    color: 'white',
    fontSize: 16,
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
    marginBottom: 20,
  },
  errorText: {
    color: errorTextColor,
    fontSize: 15,
    fontWeight: '600',
  },
  xpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  xpBadge: {
    backgroundColor: DinoLearnColors.burntOrange,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginRight: 8,
  },
  xpText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
  },
  xpValue: {
    fontWeight: '600',
    color: DinoLearnColors.burntOrange,
  },
}); 