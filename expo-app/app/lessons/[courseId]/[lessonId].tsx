import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  useWindowDimensions 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path } from 'react-native-svg';
import { DinoLearnColors } from '@/constants/Colors';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DinoHeader } from '@/components/DinoHeader';

interface LessonSection {
  paragraph: string;
  question: {
    prompt: string;
    options: string[];
    answer: string;
  };
}

interface LessonData {
  day: number;
  title: string;
  summary: string;
  lesson: LessonSection[];
}

export default function LessonScreen() {
  const router = useRouter();
  const { courseId, lessonId } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { width } = useWindowDimensions();
  
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [progress, setProgress] = useState(0);

  // Mock lesson data for monkeys
  const lessonData: LessonData = {
    "day": parseInt(lessonId as string) || 1,
    "title": "Introduction to Monkeys",
    "summary": "In this lesson, we cover the basics about monkeys, their classification as primates, their global habitats, and the unique physical and behavioral characteristics that make them fascinating. You'll learn key facts about their behavior, traits, and intelligence.",
    "lesson": [
      {
        "paragraph": "Monkeys are a type of primate, known for their playful behavior, intelligence, and strong social bonds. They are adaptable creatures found in various environments—from dense forests to open savannas.",
        "question": {
          "prompt": "Which of the following best describes monkeys?",
          "options": [
            "Reptiles that lay eggs",
            "Primates known for their social behavior and intelligence",
            "Birds that migrate seasonally",
            "Fish found in coral reefs"
          ],
          "answer": "Primates known for their social behavior and intelligence"
        }
      },
      {
        "paragraph": "Monkeys can be categorized into two broad groups: Old World monkeys and New World monkeys. Old World monkeys are native to Africa and Asia, whereas New World monkeys inhabit parts of Central and South America.",
        "question": {
          "prompt": "Where are Old World monkeys typically found?",
          "options": [
            "Africa and Asia",
            "The Americas",
            "Europe and Australia",
            "Antarctica"
          ],
          "answer": "Africa and Asia"
        }
      },
      {
        "paragraph": "While monkey species vary widely in size—from the tiny marmoset to the larger baboon—they often share traits such as a tail and expressive facial features. Some species even have prehensile tails, which help them grasp branches.",
        "question": {
          "prompt": "Which of these is not a typical characteristic of monkeys?",
          "options": [
            "Expressive facial expressions",
            "Social behavior",
            "Having a prehensile tail in some species",
            "Being as large as an elephant"
          ],
          "answer": "Being as large as an elephant"
        }
      },
      {
        "paragraph": "Monkeys have also showcased impressive intelligence. Certain species use tools, solve problems, and learn from their surroundings, which illustrates their adaptability and cognitive abilities.",
        "question": {
          "prompt": "What skill have some monkey species developed that demonstrates their intelligence?",
          "options": [
            "Ability to fly",
            "Use of tools",
            "Hibernating during winter",
            "Constructing shelters from scratch"
          ],
          "answer": "Use of tools"
        }
      }
    ]
  };

  const handleAnswer = (questionIndex: number, answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  const checkAnswer = (questionIndex: number) => {
    setRevealed(prev => ({ ...prev, [questionIndex]: true }));
    
    // Update progress when user answers a question
    const answeredCount = Object.keys(revealed).length + 1;
    setProgress(Math.min(100, Math.round((answeredCount / lessonData.lesson.length) * 100)));
  };

  const isCorrect = (questionIndex: number, option: string) => {
    return revealed[questionIndex] && selectedAnswers[questionIndex] === option && option === lessonData.lesson[questionIndex].question.answer;
  };

  const isIncorrect = (questionIndex: number, option: string) => {
    return revealed[questionIndex] && selectedAnswers[questionIndex] === option && option !== lessonData.lesson[questionIndex].question.answer;
  };

  const showCorrectAnswer = (questionIndex: number, option: string) => {
    return revealed[questionIndex] && option === lessonData.lesson[questionIndex].question.answer;
  };

  // Icons
  const ChevronLeftIcon = () => (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M15 19l-7-7 7-7" />
    </Svg>
  );

  const ChevronRightIcon = () => (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M9 5l7 7-7 7" />
    </Svg>
  );

  const ChevronDownIcon = () => (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M19 9l-7 7-7-7" />
    </Svg>
  );

  const CheckCircleIcon = () => (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <Path d="M22 4L12 14.01l-3-3" />
    </Svg>
  );

  const XCircleIcon = () => (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 0v10m-4-4l8 8m0-8l-8 8" />
    </Svg>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <DinoHeader currentScreen="courses" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Course Navigation */}
        <View style={styles.navigation}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeftIcon />
            <Text style={[styles.backButtonText, { color: DinoLearnColors.navyBlue }]}>
              Back to Dashboard
            </Text>
          </TouchableOpacity>
          
          <View style={styles.progressIndicator}>
            <Text style={[styles.progressText, { color: colors.text }]}>
              Lesson {lessonData.day} of 14
            </Text>
            <View style={[styles.progressTrack, { backgroundColor: DinoLearnColors.border }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    backgroundColor: DinoLearnColors.burntOrange,
                    width: `${(parseInt(lessonId as string) / 14) * 100}%`
                  }
                ]} 
              />
            </View>
          </View>
        </View>
        
        {/* Lesson Header */}
        <View style={[styles.lessonHeader, { backgroundColor: colors.card }]}>
          <View style={[styles.lessonHeaderContent, { backgroundColor: DinoLearnColors.navyBlue }]}>
            <Text style={styles.lessonTitle}>
              Lesson {lessonData.day}: {lessonData.title}
            </Text>
            <Text style={styles.lessonSummary}>{lessonData.summary}</Text>
          </View>
          
          <View style={styles.lessonProgress}>
            <View style={styles.lessonProgressHeader}>
              <Text style={[styles.lessonProgressLabel, { color: colors.text }]}>
                Your Progress
              </Text>
              <Text style={[styles.lessonProgressPercent, { color: colors.text }]}>
                {progress}% Complete
              </Text>
            </View>
            <View style={[styles.lessonProgressTrack, { backgroundColor: DinoLearnColors.border }]}>
              <View 
                style={[
                  styles.lessonProgressFill, 
                  { 
                    backgroundColor: DinoLearnColors.burntOrange,
                    width: `${progress}%`
                  }
                ]} 
              />
            </View>
          </View>
        </View>
        
        {/* Lesson Content */}
        <View style={styles.lessonContent}>
          {lessonData.lesson.map((section, index) => (
            <View key={index} style={[styles.sectionCard, { backgroundColor: colors.card }]}>
              <View style={styles.sectionContent}>
                <View style={styles.paragraphContainer}>
                  <View style={[styles.sectionNumber, { backgroundColor: DinoLearnColors.skyBlue + '4D' }]}>
                    <Text style={[styles.sectionNumberText, { color: DinoLearnColors.navyBlue }]}>
                      {index + 1}
                    </Text>
                  </View>
                  
                  <Text style={[styles.paragraph, { color: colors.text }]}>
                    {section.paragraph}
                  </Text>
                </View>
                
                {/* Question Section */}
                <View style={styles.questionContainer}>
                  <TouchableOpacity 
                    style={[styles.questionHeader, { backgroundColor: DinoLearnColors.lightGray }]}
                    onPress={() => setActiveQuestionIndex(activeQuestionIndex === index ? null : index)}
                  >
                    <Text style={[styles.questionHeaderText, { color: DinoLearnColors.navyBlue }]}>
                      Knowledge Check
                    </Text>
                    <View style={{ transform: [{ rotate: activeQuestionIndex === index ? '180deg' : '0deg' }] }}>
                      <ChevronDownIcon />
                    </View>
                  </TouchableOpacity>
                  
                  {activeQuestionIndex === index && (
                    <View style={[styles.questionBody, { backgroundColor: colors.card, borderColor: colors.border }]}>
                      <Text style={[styles.questionPrompt, { color: colors.text }]}>
                        {section.question.prompt}
                      </Text>
                      
                      {section.question.options.map((option, optionIndex) => (
                        <TouchableOpacity 
                          key={optionIndex}
                          style={[
                            styles.option,
                            { 
                              borderColor: selectedAnswers[index] === option 
                                ? DinoLearnColors.navyBlue 
                                : colors.border,
                              backgroundColor: selectedAnswers[index] === option 
                                ? DinoLearnColors.skyBlue + '1A' 
                                : colors.card
                            },
                            isCorrect(index, option) && styles.correctOption,
                            isIncorrect(index, option) && styles.incorrectOption,
                            showCorrectAnswer(index, option) && !isCorrect(index, option) && styles.correctOption
                          ]}
                          onPress={() => !revealed[index] && handleAnswer(index, option)}
                          disabled={revealed[index]}
                        >
                          <View style={styles.optionContent}>
                            <View 
                              style={[
                                styles.optionCircle,
                                { 
                                  borderColor: selectedAnswers[index] === option 
                                    ? DinoLearnColors.navyBlue 
                                    : colors.border,
                                  backgroundColor: selectedAnswers[index] === option 
                                    ? DinoLearnColors.navyBlue 
                                    : 'transparent'
                                }
                              ]}
                            >
                              {selectedAnswers[index] === option && (
                                <View style={styles.optionCircleDot} />
                              )}
                            </View>
                            
                            <Text 
                              style={[
                                styles.optionText,
                                { color: colors.text },
                                isCorrect(index, option) && styles.correctOptionText,
                                isIncorrect(index, option) && styles.incorrectOptionText,
                                showCorrectAnswer(index, option) && !isCorrect(index, option) && styles.correctOptionText
                              ]}
                            >
                              {option}
                            </Text>
                            
                            {isCorrect(index, option) && (
                              <View style={styles.optionIcon}><CheckCircleIcon /></View>
                            )}
                            {isIncorrect(index, option) && (
                              <View style={styles.optionIcon}><XCircleIcon /></View>
                            )}
                            {!isCorrect(index, option) && !isIncorrect(index, option) && showCorrectAnswer(index, option) && (
                              <View style={styles.optionIcon}><CheckCircleIcon /></View>
                            )}
                          </View>
                        </TouchableOpacity>
                      ))}
                      
                      <View style={styles.questionFooter}>
                        {!revealed[index] ? (
                          <TouchableOpacity 
                            style={[
                              styles.checkButton,
                              { 
                                backgroundColor: selectedAnswers[index] 
                                  ? DinoLearnColors.burntOrange 
                                  : DinoLearnColors.lightGray,
                                opacity: selectedAnswers[index] ? 1 : 0.5
                              }
                            ]}
                            onPress={() => checkAnswer(index)}
                            disabled={!selectedAnswers[index]}
                          >
                            <Text 
                              style={[
                                styles.checkButtonText, 
                                { 
                                  color: selectedAnswers[index] 
                                    ? 'white' 
                                    : DinoLearnColors.charcoalGray
                                }
                              ]}
                            >
                              Check Answer
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <View style={[styles.feedbackBox, { backgroundColor: DinoLearnColors.lightGray }]}>
                            <Text 
                              style={[
                                styles.feedbackText,
                                selectedAnswers[index] === section.question.answer
                                  ? { color: DinoLearnColors.success }
                                  : { color: DinoLearnColors.error }
                              ]}
                            >
                              {selectedAnswers[index] === section.question.answer
                                ? "Correct! Well done."
                                : "Not quite. The correct answer is highlighted."}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
        
        {/* Navigation Buttons */}
        <View style={styles.lessonNavigation}>
          {parseInt(lessonId as string) > 1 ? (
            <TouchableOpacity 
              style={[styles.navButton, { backgroundColor: colors.card }]}
              onPress={() => router.push(`/lessons/${courseId}/${parseInt(lessonId as string) - 1}`)}
            >
              <ChevronLeftIcon />
              <Text style={[styles.navButtonText, { color: DinoLearnColors.navyBlue }]}>
                Previous Lesson
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={[styles.navButton, { backgroundColor: colors.card, opacity: 0.5 }]}>
              <ChevronLeftIcon />
              <Text style={[styles.navButtonText, { color: DinoLearnColors.navyBlue + '80' }]}>
                Previous Lesson
              </Text>
            </View>
          )}
          
          <TouchableOpacity 
            style={[styles.navButton, { backgroundColor: DinoLearnColors.burntOrange }]}
            onPress={() => router.push(`/lessons/${courseId}/${parseInt(lessonId as string) + 1}`)}
          >
            <Text style={styles.navButtonTextPrimary}>
              Next Lesson
            </Text>
            <ChevronRightIcon />
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
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: '500',
  },
  progressIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressTrack: {
    width: 80,
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  lessonHeader: {
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 4,
  },
  lessonHeaderContent: {
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  lessonTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    marginBottom: 12,
  },
  lessonSummary: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 24,
  },
  lessonProgress: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  lessonProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  lessonProgressLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  lessonProgressPercent: {
    fontSize: 15,
    fontWeight: '700',
  },
  lessonProgressTrack: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  lessonProgressFill: {
    height: '100%',
    borderRadius: 5,
    transition: 'width 0.5s',
  },
  lessonContent: {
    paddingHorizontal: 16,
    gap: 20,
  },
  sectionCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 3,
    marginBottom: 20,
  },
  sectionContent: {
    padding: 20,
  },
  paragraphContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  sectionNumber: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
  },
  sectionNumberText: {
    fontSize: 14,
    fontWeight: '700',
  },
  paragraph: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  questionContainer: {
    marginLeft: 40,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  questionHeaderText: {
    fontSize: 16,
    fontWeight: '700',
  },
  questionBody: {
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  questionPrompt: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 16,
  },
  option: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  correctOption: {
    borderColor: DinoLearnColors.success,
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
  },
  incorrectOption: {
    borderColor: DinoLearnColors.error,
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionCircleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  optionText: {
    fontSize: 15,
    flex: 1,
  },
  correctOptionText: {
    color: DinoLearnColors.success,
    fontWeight: '500',
  },
  incorrectOptionText: {
    color: DinoLearnColors.error,
    fontWeight: '500',
  },
  optionIcon: {
    marginLeft: 'auto',
  },
  questionFooter: {
    marginTop: 16,
    alignItems: 'flex-end',
  },
  checkButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  checkButtonText: {
    fontSize: 15,
    fontWeight: '500',
  },
  feedbackBox: {
    padding: 16,
    borderRadius: 8,
    width: '100%',
  },
  feedbackText: {
    fontSize: 15,
    fontWeight: '500',
  },
  lessonNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 30,
    gap: 16,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  navButtonText: {
    fontSize: 15,
    fontWeight: '500',
  },
  navButtonTextPrimary: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },
}); 