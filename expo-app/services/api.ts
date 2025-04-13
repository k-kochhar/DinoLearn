import { API_ENDPOINTS } from '@/constants/ApiConfig';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { dinosaurRoadmap, dinosaurLessons } from './mock-data';

// Maximum number of retries for API calls
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // milliseconds

// Flag to use mock data instead of actual API calls
const USE_MOCK_DATA = false;

/**
 * Helper function to add delay
 * @param ms Milliseconds to delay
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get proper API URL based on environment
 * This handles different environments (simulator, device, etc.)
 */
const getApiUrl = (endpoint: string): string => {
  // When using a direct IP address (like we are), we should just return the endpoint as is
  // The IP address approach works on both physical devices and emulators
  return endpoint;
  
  // The code below would only be needed if we were using 'localhost' in our API_BASE_URL
  /*
  if (__DEV__) {
    // For Android emulator
    if (Platform.OS === 'android') {
      return endpoint.replace('localhost', '10.0.2.2');
    }
    
    // For iOS and web, localhost works
    return endpoint;
  }
  
  // For production
  return endpoint;
  */
};

/**
 * Interface for roadmap data
 */
export interface RoadmapData {
  topic: string;
  roadmap: {
    day: number;
    title: string;
  }[];
}

/**
 * Interface for roadmap item from API
 */
export interface RoadmapItem {
  _id: string;
  title: string;
  roadmap_data: RoadmapData;
}

/**
 * Interface for lesson data
 */
export interface LessonData {
  topic: string;
  day: number;
  title: string;
  summary: string;
  lesson: {
    paragraph: string;
    question: {
      prompt: string;
      options: string[];
      answer: string;
    };
  }[];
}

/**
 * Generate a learning roadmap for a specific topic
 * @param topic - The subject for which to create a roadmap
 * @returns A promise with the roadmap data
 */
export const generateRoadmap = async (topic: string): Promise<RoadmapData> => {
  // If using mock data, return the dinosaur roadmap directly
  if (USE_MOCK_DATA) {
    // Add a small delay to simulate API call
    await delay(300);
    console.log("Using mock roadmap data for:", topic);
    
    // We're currently only supporting "Dinosaurs" as a topic in mock mode
    return dinosaurRoadmap;
  }
  
  try {
    // Fetch all roadmaps
    const roadmaps = await fetchRoadmaps();
    
    // Try to find a matching roadmap by topic, case insensitive
    const matchingRoadmap = roadmaps.find(item => 
      item.roadmap_data.topic.toLowerCase() === topic.toLowerCase() ||
      item.title.toLowerCase().includes(topic.toLowerCase())
    );
    
    if (matchingRoadmap) {
      return matchingRoadmap.roadmap_data;
    }
    
    // If no matching roadmap is found, return the first one as default
    if (roadmaps.length > 0) {
      console.log(`No roadmap found for topic "${topic}". Using the first available roadmap instead.`);
      return roadmaps[0].roadmap_data;
    }
    
    // No roadmaps found at all, return fallback
    console.log(`No roadmaps found. Using fallback dinosaur roadmap.`);
    return dinosaurRoadmap;
    
  } catch (error) {
    console.error(`Error getting roadmap for topic "${topic}":`, error);
    // Return fallback data in case of error
    return dinosaurRoadmap;
  }
};

/**
 * Generate a lesson for a specific day in the roadmap
 * @param topic - The main subject
 * @param day - The day number in the roadmap
 * @param title - The title of the lesson
 * @returns A promise with the lesson data
 */
export const generateLesson = async (
  topic: string,
  day: number,
  title: string
): Promise<LessonData> => {
  // If using mock data, return the dinosaur lesson directly
  if (USE_MOCK_DATA) {
    // Add a small delay to simulate API call
    await delay(400);
    console.log(`Using mock lesson data for day ${day}: ${title}`);
    
    // Make sure day is a valid number between 1 and 14
    const validDay = Math.max(1, Math.min(14, day));
    
    // Return the lesson for the specified day
    return dinosaurLessons[validDay];
  }
  
  let retries = 0;
  
  // Get appropriate API URL
  const apiUrl = getApiUrl(API_ENDPOINTS.GENERATE_LESSON);
  
  while (retries <= MAX_RETRIES) {
    try {
      console.log(`API call: Generating lesson for topic "${topic}", day ${day}, title "${title}" (attempt ${retries + 1})`);
      console.log(`Using endpoint: ${apiUrl}`);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, day, title }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API error (${response.status}):`, errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Lesson API response:", JSON.stringify(data).substring(0, 150) + "...");
      return data;
    } catch (error) {
      console.error(`Error generating lesson (attempt ${retries + 1}):`, error);
      
      if (retries === MAX_RETRIES) {
        throw error;
      }
      
      // Wait before retrying
      await delay(RETRY_DELAY);
      retries++;
    }
  }
  
  // This should never be reached but TypeScript requires a return
  throw new Error("Maximum retries exceeded");
};

/**
 * Fetch all available roadmaps
 * @returns A promise with an array of roadmap items
 */
export const fetchRoadmaps = async (): Promise<RoadmapItem[]> => {
  let retries = 0;
  
  // Get appropriate API URL
  const apiUrl = getApiUrl(API_ENDPOINTS.GET_ROADMAPS);
  
  while (retries <= MAX_RETRIES) {
    try {
      console.log(`API call: Fetching all roadmaps (attempt ${retries + 1})`);
      console.log(`Using endpoint: ${apiUrl}`);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API error (${response.status}):`, errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Roadmaps API response:", JSON.stringify(data).substring(0, 150) + "...");
      return data;
    } catch (error) {
      console.error(`Error fetching roadmaps (attempt ${retries + 1}):`, error);
      
      if (retries === MAX_RETRIES) {
        throw error;
      }
      
      // Wait before retrying
      await delay(RETRY_DELAY);
      retries++;
    }
  }
  
  // This should never be reached but TypeScript requires a return
  throw new Error("Maximum retries exceeded");
}; 