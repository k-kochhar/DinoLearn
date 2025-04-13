import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Image,
  FlatList
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DinoLearnColors } from '@/constants/Colors';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DinoHeader } from '@/components/DinoHeader';
import Svg, { Path } from 'react-native-svg';

// Hardcoded leaderboard data
const leaderboardData = [
  { id: 1, name: 'Kshitij', points: 1250, isCurrentUser: true, avatar: require('@/assets/images/dino-head.png') },
  { id: 2, name: 'Tirth', points: 980, isCurrentUser: false, avatar: require('@/assets/images/Red_head.png') },
  { id: 3, name: 'Eric', points: 820, isCurrentUser: false, avatar: require('@/assets/images/Green_head.png') },
  { id: 4, name: 'Josh', points: 760, isCurrentUser: false, avatar: require('@/assets/images/Yellow_head.png') },
];

type LeaderboardItemProps = {
  rank: number;
  name: string;
  points: number;
  isCurrentUser: boolean;
  avatar: any;
  colors: any;
};

// Trophy icon for top ranks
const TrophyIcon = ({ color = DinoLearnColors.burntOrange }: { color?: string }) => (
  <Svg
    width={22}
    height={22}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
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

// Component for individual leaderboard item
const LeaderboardItem = ({ rank, name, points, isCurrentUser, avatar, colors }: LeaderboardItemProps) => {
  // Determine rank styles based on position
  const getRankStyle = () => {
    if (rank === 1) return { backgroundColor: '#FFD700' }; // Gold
    if (rank === 2) return { backgroundColor: '#C0C0C0' }; // Silver
    if (rank === 3) return { backgroundColor: '#CD7F32' }; // Bronze
    return { backgroundColor: DinoLearnColors.charcoalGray + '30' }; // Default
  };
  
  return (
    <View style={[
      styles.leaderboardItem, 
      isCurrentUser && styles.currentUserItem,
      { backgroundColor: isCurrentUser ? DinoLearnColors.skyBlue + '15' : colors.card }
    ]}>
      <View style={[styles.rankContainer, getRankStyle()]}>
        {rank <= 3 ? (
          <TrophyIcon color={rank === 1 ? '#8B4000' : 'white'} />
        ) : (
          <Text style={styles.rankText}>{rank}</Text>
        )}
      </View>
      
      <View style={styles.avatarContainer}>
        <Image 
          source={avatar} 
          style={styles.avatar}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.userInfo}>
        <Text style={[
          styles.userName, 
          { color: colors.text },
          isCurrentUser && styles.currentUserText
        ]}>
          {name} {isCurrentUser && "(You)"}
        </Text>
        
        <View style={styles.pointsContainer}>
          <View style={styles.xpIcon}>
            <Text style={styles.xpIconText}>XP</Text>
          </View>
          <Text style={[styles.pointsText, { color: colors.text + 'CC' }]}>{points} points</Text>
        </View>
      </View>
    </View>
  );
};

export default function LeaderboardScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Get the current user's rank and points
  const currentUser = leaderboardData.find(user => user.isCurrentUser);
  const currentUserRank = leaderboardData.findIndex(user => user.isCurrentUser) + 1;
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <DinoHeader showStreak={true} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Page Title */}
        <Text style={styles.pageTitle}>Rankings & XP</Text>
        
        {/* User's Stats */}
        <View style={[styles.userStatsContainer, { backgroundColor: colors.card }]}>
          <View style={styles.userRankContainer}>
            <Text style={styles.userRankLabel}>Your Rank</Text>
            <View style={styles.userRankValue}>
              <Text style={styles.userRankNumber}>{currentUserRank}</Text>
              <Text style={styles.userRankOrdinal}>{getOrdinalSuffix(currentUserRank)}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.userPointsContainer}>
            <Text style={styles.userPointsLabel}>XP Points</Text>
            <Text style={styles.userPointsValue}>{currentUser?.points}</Text>
          </View>
        </View>
        
        {/* Leaderboard List */}
        <View style={styles.leaderboardContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Top Students</Text>
          
          <FlatList 
            data={leaderboardData}
            renderItem={({ item, index }) => (
              <LeaderboardItem 
                rank={index + 1}
                name={item.name}
                points={item.points}
                isCurrentUser={item.isCurrentUser}
                avatar={item.avatar}
                colors={colors}
              />
            )}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
            contentContainerStyle={styles.leaderboardList}
          />
        </View>
        
        {/* How to Earn Points */}
        <View style={[styles.infoContainer, { backgroundColor: colors.card }]}>
          <Text style={[styles.infoTitle, { color: colors.text }]}>
            How to Earn XP
          </Text>
          
          <View style={styles.infoItem}>
            <View style={[styles.infoBullet, { backgroundColor: DinoLearnColors.skyBlue }]}>
              <Text style={styles.infoBulletText}>+10</Text>
            </View>
            <Text style={[styles.infoText, { color: colors.text }]}>
              Complete a daily lesson
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <View style={[styles.infoBullet, { backgroundColor: DinoLearnColors.burntOrange }]}>
              <Text style={styles.infoBulletText}>+5</Text>
            </View>
            <Text style={[styles.infoText, { color: colors.text }]}>
              Answer a question correctly
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <View style={[styles.infoBullet, { backgroundColor: DinoLearnColors.navyBlue }]}>
              <Text style={styles.infoBulletText}>+15</Text>
            </View>
            <Text style={[styles.infoText, { color: colors.text }]}>
              Keep a 3+ day streak
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper function to get ordinal suffix (1st, 2nd, 3rd, etc.)
function getOrdinalSuffix(n: number): string {
  if (n >= 11 && n <= 13) {
    return 'th';
  }
  
  switch (n % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: DinoLearnColors.navyBlue,
    marginTop: 16,
    marginBottom: 12,
  },
  userStatsContainer: {
    flexDirection: 'row',
    borderRadius: 16,
    marginBottom: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  userRankContainer: {
    flex: 1,
    alignItems: 'center',
  },
  userRankLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: DinoLearnColors.charcoalGray + 'CC',
    marginBottom: 8,
  },
  userRankValue: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  userRankNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: DinoLearnColors.burntOrange,
  },
  userRankOrdinal: {
    fontSize: 16,
    fontWeight: '600',
    color: DinoLearnColors.burntOrange,
    marginTop: 4,
  },
  divider: {
    width: 1,
    backgroundColor: DinoLearnColors.lightGray,
    marginHorizontal: 20,
  },
  userPointsContainer: {
    flex: 1,
    alignItems: 'center',
  },
  userPointsLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: DinoLearnColors.charcoalGray + 'CC',
    marginBottom: 8,
  },
  userPointsValue: {
    fontSize: 32,
    fontWeight: '700',
    color: DinoLearnColors.skyBlue,
  },
  leaderboardContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  leaderboardList: {
    gap: 12,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  currentUserItem: {
    borderWidth: 1,
    borderColor: DinoLearnColors.skyBlue + '30',
  },
  rankContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: DinoLearnColors.paleMint,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  avatar: {
    width: 36,
    height: 36,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  currentUserText: {
    color: DinoLearnColors.navyBlue,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  xpIcon: {
    backgroundColor: DinoLearnColors.burntOrange + '20',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
  },
  xpIconText: {
    fontSize: 12,
    fontWeight: '700',
    color: DinoLearnColors.burntOrange,
  },
  pointsText: {
    fontSize: 14,
  },
  infoContainer: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoBullet: {
    width: 36,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoBulletText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  infoText: {
    fontSize: 15,
  },
}); 