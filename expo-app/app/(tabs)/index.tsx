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
  useWindowDimensions,
  ActivityIndicator,
  Alert,
  Keyboard,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { DinoLearnColors } from '@/constants/Colors';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DinoHeader } from '@/components/DinoHeader';
import { LoadingDino } from '@/components/LoadingDino';
import { CourseCard } from '@/components/CourseCard';
import Svg, { Path } from 'react-native-svg';

interface Course {
  id: number;
  title: string;
  category: string;
  progress: number;
  iconType: 'cpu' | 'rocket' | 'cursor' | 'bolt' | 'dino';
}

export default function Dashboard() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { width } = useWindowDimensions();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('recent');
  const [courses, setCourses] = useState<Course[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Simulating data fetch
    setCourses([
      {
        id: 1,
        title: "Introduction to Dinosaurs",
        category: "Paleontology",
        progress: 65,
        iconType: 'dino'
      },
      {
        id: 2,
        title: "Introduction to Machine Learning",
        category: "AI & Data Science",
        progress: 45,
        iconType: 'cpu'
      },
      {
        id: 3,
        title: "Advanced JavaScript Patterns",
        category: "Web Development",
        progress: 78,
        iconType: 'rocket'
      },
      {
        id: 4,
        title: "UI/UX Design Fundamentals",
        category: "Design",
        progress: 23,
        iconType: 'cursor'
      },
      {
        id: 5,
        title: "Mobile App Development",
        category: "App Development",
        progress: 62,
        iconType: 'bolt'
      },
      {
        id: 6,
        title: "Python for Data Analysis",
        category: "Data Science",
        progress: 15,
        iconType: 'cpu'
      }
    ]);
  }, []);

  // Filter courses based on search query
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search submission
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      Alert.alert("Enter a topic", "Please enter a topic to search for.");
      return;
    }
    
    setIsSearching(true);
    
    // Dismiss keyboard
    Keyboard.dismiss();
    
    // Navigate to loading screen with the query
    router.push({
      pathname: '/search-loading',
      params: { query: searchQuery.trim() }
    });
    
    // Reset searching state and clear query after a short delay
    setTimeout(() => {
      setIsSearching(false);
      setSearchQuery('');
    }, 500);
  };

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
      
      <DinoHeader onMenuPress={() => {/* Handle menu press */}} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.dinoTeacherContainer}>
            <Image 
              source={require('@/assets/images/Teaching.png')} 
              style={styles.dinoTeacherImage}
              resizeMode="contain"
            />
          </View>
          
          <Text style={[styles.searchTitle, { color: colors.primary }]}>
            What would you like to learn today?
          </Text>
          
          <View style={styles.searchInputContainer}>
            <View style={[
              styles.searchInputWrapper, 
              { 
                backgroundColor: colors.card,
                borderColor: DinoLearnColors.navyBlue + '10',
                borderWidth: 1
              }
            ]}>
              <View style={styles.searchIconContainer}>
                {isSearching ? (
                  <ActivityIndicator size="small" color={DinoLearnColors.burntOrange} />
                ) : (
                  <MagnifyingGlassIcon />
                )}
              </View>
              
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                placeholder="Search for a topic to learn..."
                placeholderTextColor={DinoLearnColors.charcoalGray + '80'}
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
                editable={!isSearching}
              />
              
              {searchQuery ? (
                <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
                  <Text style={styles.clearButtonText}>Clear</Text>
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
            
            <View style={styles.headerRight}>
              <TouchableOpacity
                style={styles.viewRoadmapButton}
                onPress={() => router.push('/roadmap')}
              >
                <Text style={styles.viewRoadmapText}>View Roadmap</Text>
              </TouchableOpacity>
              
              {/* API Test Button - for debugging */}
              <TouchableOpacity
                style={[styles.viewRoadmapButton, { backgroundColor: DinoLearnColors.burntOrange }]}
                onPress={() => router.push('/api-test')}
              >
                <Text style={styles.viewRoadmapText}>Test API</Text>
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
    paddingBottom: 16,
  },
  searchSection: {
    marginVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    color: DinoLearnColors.navyBlue,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    maxWidth: '100%',
  },
  searchIconContainer: {
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
    paddingVertical: 6,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  clearButtonText: {
    color: DinoLearnColors.burntOrange,
    fontWeight: '500',
    fontSize: 14,
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  viewRoadmapButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: DinoLearnColors.navyBlue,
  },
  viewRoadmapText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
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
  },
  dinoTeacherContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  dinoTeacherImage: {
    width: 150,
    height: 150,
  },
});
