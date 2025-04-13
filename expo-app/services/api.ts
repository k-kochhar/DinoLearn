import { API_ENDPOINTS } from '@/constants/ApiConfig';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Maximum number of retries for API calls
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // milliseconds

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
  let retries = 0;
  
  // Get appropriate API URL
  const apiUrl = getApiUrl(API_ENDPOINTS.GENERATE_ROADMAP);
  
  while (retries <= MAX_RETRIES) {
    try {
      console.log(`API call: Generating roadmap for topic "${topic}" (attempt ${retries + 1})`);
      console.log(`Using endpoint: ${apiUrl}`);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API error (${response.status}):`, errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Roadmap API response:", JSON.stringify(data).substring(0, 150) + "...");
      return data;
    } catch (error) {
      console.error(`Error generating roadmap (attempt ${retries + 1}):`, error);
      
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