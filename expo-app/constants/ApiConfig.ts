// API URL configuration
// When running Expo on a physical device, we need to use the host machine's local IP address
// This allows the phone app to connect to your laptop's backend server

// Your laptop's IP address on the local network (both devices must be on same WiFi)
const API_BASE_URL = 'http://10.3.4.174:8000';

// API endpoints
export const API_ENDPOINTS = {
  GENERATE_ROADMAP: `${API_BASE_URL}/api/roadmap`,
  GENERATE_LESSON: `${API_BASE_URL}/api/lesson`,
};

export default API_BASE_URL; 