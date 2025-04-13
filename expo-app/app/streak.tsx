import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Image,
  Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { DinoLearnColors } from '@/constants/Colors';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DinoHeader } from '@/components/DinoHeader';
import Svg, { Path, Circle } from 'react-native-svg';

// Get screen width for calendar sizing
const { width } = Dimensions.get('window');
const daySize = (width - 64) / 7; // 7 days per week, with margins

export default function StreakScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Hardcoded streak data - would be fetched from backend in a real app
  const currentStreak = 4;
  const longestStreak = 8;
  const totalXpEarned = 125;
  
  // Generate past 30 days for the calendar
  const generateCalendarData = () => {
    const today = new Date();
    const calendar = [];
    
    // Include streak for today and past 3 days
    const activeDates = [0, 1, 2, 3]; // Days ago (0 = today, 1 = yesterday, etc.)
    
    // Generate the past 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      calendar.push({
        date,
        day: date.getDate(),
        isActive: activeDates.includes(i),
        isToday: i === 0, // Mark today's date
        // Add some random gaps in the streak history
        isGap: !activeDates.includes(i) && [5, 8, 12, 15, 20, 25].includes(i)
      });
    }
    
    return calendar.reverse(); // Show oldest to newest (left to right)
  };
  
  const calendarData = generateCalendarData();
  
  // Fire icon for streak
  const FireIcon = ({ size = 18 }: { size?: number }) => (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={DinoLearnColors.burntOrange}
      stroke="none"
    >
      <Path d="M12 23c-4.97 0-9-2.582-9-7v-.09c0-4.011 1.548-6.587 3.822-10.741.722-1.323 2.572-.667 2.578.86.004 1.066-.025 2.071.505 2.64.804.856 1.686.856 2.483.036l.054-.063c1.433-1.7 2.247-3.972 2.547-6.608.108-.944 1.322-1.258 1.858-.478C18.34 6.663 21 9.84 21 15.91c0 3.264-1.996 7.09-9 7.09zm0-2c4.617 0 7-2.082 7-5.09 0-5.027-2.253-7.544-3.867-9.439-.233 2.697-1.138 5.33-2.914 7.322-1.389 1.55-3.492 1.982-5.466.305-1.115-.944-1.703-2.386-1.753-4.184C3.827 11.906 3 13.926 3 15.91v.09c0 3.227 3.231 5 9 5z" />
    </Svg>
  );
  
  // Trophy icon
  const TrophyIcon = ({ size = 20 }: { size?: number }) => (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={DinoLearnColors.navyBlue}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <Path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <Path d="M4 22h16" />
      <Path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <Path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <Path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </Svg>
  );
  
  // Lightning bolt icon
  const LightningIcon = ({ size = 20 }: { size?: number }) => (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={DinoLearnColors.burntOrange}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </Svg>
  );

  // Function to format date as month name
  const getMonthName = (date: Date) => {
    return date.toLocaleString('default', { month: 'long' });
  };
  
  // Get month labels for the calendar
  const getMonthLabels = () => {
    const months: Record<string, boolean> = {};
    calendarData.forEach(item => {
      const month = getMonthName(item.date);
      months[month] = true;
    });
    return Object.keys(months);
  };
  
  const monthLabels = getMonthLabels();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <DinoHeader 
        showBackButton={true} 
        backRoute="/(tabs)" 
        title="Your Streak"
        showStreak={false}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Streak Header with Dinosaur */}
        <View style={styles.streakHeader}>
          <View style={styles.streakImageContainer}>
            <Image 
              source={require('@/assets/images/Stack of Books.png')} 
              style={styles.dinoImage}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.streakCounter}>
            <Text style={styles.streakCounterText}>{currentStreak}</Text>
            <FireIcon size={32} />
          </View>
          
          <Text style={styles.streakDescription}>
            {Number(currentStreak) === 1 
              ? 'day in a row!' 
              : 'days in a row!'
            }
          </Text>
        </View>
        
        {/* Streak Stats */}
        <View style={[styles.statsContainer, { backgroundColor: colors.card }]}>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: DinoLearnColors.navyBlue + '15' }]}>
              <TrophyIcon />
            </View>
            <View style={styles.statContent}>
              <Text style={[styles.statValue, { color: colors.text }]}>{longestStreak}</Text>
              <Text style={[styles.statLabel, { color: colors.text + 'CC' }]}>Longest Streak</Text>
            </View>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: DinoLearnColors.burntOrange + '15' }]}>
              <LightningIcon />
            </View>
            <View style={styles.statContent}>
              <Text style={[styles.statValue, { color: colors.text }]}>{totalXpEarned}</Text>
              <Text style={[styles.statLabel, { color: colors.text + 'CC' }]}>XP from Streaks</Text>
            </View>
          </View>
        </View>
        
        {/* Calendar Section */}
        <View style={styles.calendarSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Your Activity Calendar
          </Text>
          
          {/* Month Labels */}
          <View style={styles.monthsContainer}>
            {monthLabels.map((month, index) => (
              <Text key={index} style={[styles.monthLabel, { color: colors.text + 'CC' }]}>
                {month}
              </Text>
            ))}
          </View>
          
          {/* Calendar Grid */}
          <View style={styles.calendarGrid}>
            {calendarData.map((item, index) => (
              <View 
                key={index} 
                style={[
                  styles.calendarDay,
                  { 
                    width: daySize, 
                    height: daySize 
                  }
                ]}
              >
                <View 
                  style={[
                    styles.dayCircle,
                    item.isActive && styles.activeDay,
                    item.isToday && styles.todayDay,
                    item.isGap && styles.gapDay,
                    { 
                      width: daySize * 0.7, 
                      height: daySize * 0.7,
                      borderColor: colors.background
                    }
                  ]}
                >
                  <Text 
                    style={[
                      styles.dayText,
                      item.isActive && styles.activeDayText,
                      item.isToday && styles.todayText
                    ]}
                  >
                    {item.day}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          
          {/* Legend */}
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendCircle, styles.activeDay, { borderColor: colors.background }]} />
              <Text style={[styles.legendText, { color: colors.text }]}>Completed Day</Text>
            </View>
            
            <View style={styles.legendItem}>
              <View style={[styles.legendCircle, styles.todayDay, { borderColor: colors.background, width: 18, height: 18 }]} />
              <Text style={[styles.legendText, { color: '#1B5E20', fontWeight: '600' }]}>Today</Text>
            </View>
            
            <View style={styles.legendItem}>
              <View style={[styles.legendCircle, styles.gapDay, { borderColor: colors.background }]} />
              <Text style={[styles.legendText, { color: colors.text }]}>Missed Day</Text>
            </View>
          </View>
        </View>
        
        {/* Streak Tips */}
        <View style={[styles.tipsContainer, { backgroundColor: colors.card }]}>
          <Text style={[styles.tipsTitle, { color: colors.text }]}>
            Streak Tips
          </Text>
          
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <View style={styles.tipBullet} />
              <Text style={[styles.tipText, { color: colors.text }]}>
                Complete at least one lesson every day to maintain your streak
              </Text>
            </View>
            
            <View style={styles.tipItem}>
              <View style={styles.tipBullet} />
              <Text style={[styles.tipText, { color: colors.text }]}>
                Long streaks earn you bonus XP points each day
              </Text>
            </View>
            
            <View style={styles.tipItem}>
              <View style={styles.tipBullet} />
              <Text style={[styles.tipText, { color: colors.text }]}>
                Your streak resets if you miss a day of learning
              </Text>
            </View>
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
  streakHeader: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 32,
  },
  streakImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: DinoLearnColors.skyBlue + '30',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  dinoImage: {
    width: 100,
    height: 100,
  },
  streakCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  streakCounterText: {
    fontSize: 42,
    fontWeight: '800',
    color: DinoLearnColors.burntOrange,
  },
  streakDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: DinoLearnColors.charcoalGray,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    borderRadius: 16,
    marginBottom: 32,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: DinoLearnColors.lightGray,
    marginHorizontal: 16,
  },
  calendarSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  monthsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  monthLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  calendarDay: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  dayCircle: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
    color: DinoLearnColors.charcoalGray + '80',
  },
  activeDay: {
    backgroundColor: '#4CAF50' + '30', // Vibrant green with transparency
    borderWidth: 2,
    borderColor: '#4CAF50', // Solid green border
  },
  activeDayText: {
    color: '#1B5E20', // Darker green for text
    fontWeight: '700',
  },
  todayDay: {
    backgroundColor: '#4CAF50' + '50', // More opaque green for today
    borderWidth: 3,
    borderColor: '#4CAF50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  todayText: {
    color: '#1B5E20',
    fontWeight: '800',
  },
  gapDay: {
    backgroundColor: DinoLearnColors.burntOrange + '20',
    borderWidth: 2,
    borderColor: DinoLearnColors.burntOrange,
  },
  legendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
  },
  legendText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tipsContainer: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  tipBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: DinoLearnColors.burntOrange,
    marginTop: 6,
  },
  tipText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
  },
}); 