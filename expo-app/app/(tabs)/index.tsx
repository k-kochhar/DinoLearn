import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList,
  ScrollView,
  SafeAreaView,
  useWindowDimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { DinoLearnColors } from '@/constants/Colors';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DinoHeader } from '@/components/DinoHeader';
import { CourseCard } from '@/components/CourseCard';
import Svg, { Path } from 'react-native-svg';

interface Course {
  id: number;
  title: string;
  category: string;
  progress: number;
  iconType: 'cpu' | 'rocket' | 'cursor' | 'bolt';
}

export default function Dashboard() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { width } = useWindowDimensions();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('recent');
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Simulating data fetch
    setCourses([
      {
        id: 1,
        title: "Introduction to Machine Learning",
        category: "AI & Data Science",
        progress: 45,
        iconType: 'cpu'
      },
      {
        id: 2,
        title: "Advanced JavaScript Patterns",
        category: "Web Development",
        progress: 78,
        iconType: 'rocket'
      },
      {
        id: 3,
        title: "UI/UX Design Fundamentals",
        category: "Design",
        progress: 23,
        iconType: 'cursor'
      },
      {
        id: 4,
        title: "Mobile App Development with React Native",
        category: "App Development",
        progress: 62,
        iconType: 'bolt'
      },
      {
        id: 5,
        title: "Python for Data Analysis",
        category: "Data Science",
        progress: 15,
        iconType: 'cpu'
      },
      {
        id: 6,
        title: "Modern Frontend Frameworks",
        category: "Web Development",
        progress: 90,
        iconType: 'rocket'
      },
      {
        id: 7,
        title: "Responsive Web Design Mastery",
        category: "Design",
        progress: 38,
        iconType: 'cursor'
      },
      {
        id: 8,
        title: "Cloud Computing Essentials",
        category: "Cloud",
        progress: 55,
        iconType: 'bolt'
      }
    ]);
  }, []);

  // Filter courses based on search query
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Clear search query
  const clearSearch = () => setSearchQuery('');

  // Magnifying glass icon
  const MagnifyingGlassIcon = () => (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke={DinoLearnColors.charcoalGray + '80'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </Svg>
  );

  // Clock icon
  const ClockIcon = () => (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </Svg>
  );

  // Star icon
  const StarIcon = () => (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </Svg>
  );

  const renderCourseItem = ({ item }: { item: Course }) => (
    <View style={styles.courseCardWrapper}>
      <CourseCard
        id={item.id}
        title={item.title}
        category={item.category}
        progress={item.progress}
        iconType={item.iconType}
      />
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <DinoHeader currentScreen="dashboard" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Search Section */}
        <View style={styles.searchSection}>
          <Text style={[styles.searchTitle, { color: colors.primary }]}>
            What would you like to learn today?
          </Text>
          
          <View style={styles.searchInputContainer}>
            <View style={[styles.searchInputWrapper, { backgroundColor: colors.card }]}>
              <View style={styles.searchIconContainer}>
                <MagnifyingGlassIcon />
              </View>
              
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                placeholder="Search for courses, topics, or skills..."
                placeholderTextColor={DinoLearnColors.charcoalGray + '80'}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              
              {searchQuery ? (
                <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
                  <Text style={{ color: DinoLearnColors.burntOrange }}>Clear</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
        
        {/* Main Content */}
        <View style={[styles.mainContent, { backgroundColor: colors.card }]}>
          <View style={styles.mainHeader}>
            <View>
              <Text style={[styles.mainTitle, { color: colors.text }]}>
                Your Learning Journey
              </Text>
              <Text style={[styles.mainSubtitle, { color: colors.text + 'B3' }]}>
                Continue where you left off or explore new courses
              </Text>
              <View style={[styles.titleUnderline, { backgroundColor: DinoLearnColors.burntOrange + '33' }]} />
            </View>
            
            <View style={[styles.filtersContainer, { backgroundColor: DinoLearnColors.lightGray }]}>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  activeFilter === 'recent' && [
                    styles.activeFilterButton,
                    { backgroundColor: DinoLearnColors.burntOrange }
                  ]
                ]}
                onPress={() => setActiveFilter('recent')}
              >
                <ClockIcon />
                <Text
                  style={[
                    styles.filterText,
                    { color: activeFilter === 'recent' ? 'white' : DinoLearnColors.navyBlue }
                  ]}
                >
                  Recent
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  activeFilter === 'popular' && [
                    styles.activeFilterButton,
                    { backgroundColor: DinoLearnColors.burntOrange }
                  ]
                ]}
                onPress={() => setActiveFilter('popular')}
              >
                <StarIcon />
                <Text
                  style={[
                    styles.filterText,
                    { color: activeFilter === 'popular' ? 'white' : DinoLearnColors.navyBlue }
                  ]}
                >
                  Popular
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Courses */}
          {filteredCourses.length > 0 ? (
            <FlatList
              data={filteredCourses}
              renderItem={renderCourseItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.coursesList}
              numColumns={width > 768 ? 2 : 1}
              scrollEnabled={false}
            />
          ) : (
            <View style={styles.emptyStateContainer}>
              <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
                No courses match your search criteria.
              </Text>
              
              <TouchableOpacity
                style={[styles.emptyStateButton, { backgroundColor: DinoLearnColors.burntOrange }]}
                onPress={clearSearch}
              >
                <Text style={styles.emptyStateButtonText}>Clear Search</Text>
              </TouchableOpacity>
            </View>
          )}
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
  },
  searchSection: {
    minHeight: 180,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
  },
  searchInputContainer: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  searchIconContainer: {
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  clearButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  mainContent: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 4,
  },
  mainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  mainSubtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  titleUnderline: {
    width: 50,
    height: 4,
    borderRadius: 2,
    marginTop: 8,
  },
  filtersContainer: {
    flexDirection: 'row',
    borderRadius: 50,
    padding: 5,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
    gap: 6,
  },
  activeFilterButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  filterText: {
    fontSize: 15,
    fontWeight: '500',
  },
  coursesList: {
    gap: 20,
  },
  courseCardWrapper: {
    flex: 1,
    minWidth: 300,
    margin: 8,
  },
  emptyStateContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyStateButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 8,
  },
  emptyStateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  }
});
