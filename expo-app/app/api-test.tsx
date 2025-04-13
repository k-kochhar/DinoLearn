import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { DinoLearnColors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { DinoHeader } from '@/components/DinoHeader';
import { generateRoadmap, generateLesson } from '@/services/api';
import API_BASE_URL, { API_ENDPOINTS } from '@/constants/ApiConfig';

export default function ApiTestScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [topic, setTopic] = useState('Dinosaurs');
  const [day, setDay] = useState('1');
  const [title, setTitle] = useState('Introduction');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'untested' | 'success' | 'failed'>('untested');

  const testRoadmapApi = async () => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    
    try {
      // First, test a basic connectivity check
      const connectionTest = await fetch(`${API_BASE_URL}/api`).catch(e => {
        throw new Error(`Connection test failed: ${e.message}`);
      });
      
      // Now test the actual roadmap API
      const data = await generateRoadmap(topic);
      setResult(JSON.stringify(data, null, 2));
    } catch (err: any) {
      console.error('API test error:', err);
      setError(err.message || 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const testLessonApi = async () => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    
    try {
      const data = await generateLesson(topic, parseInt(day), title);
      setResult(JSON.stringify(data, null, 2));
    } catch (err: any) {
      console.error('API test error:', err);
      setError(err.message || 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const testConnection = async () => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    setConnectionStatus('untested');
    
    try {
      console.log(`Testing connection to: ${API_BASE_URL}`);
      
      // Try a simple GET request to the root or API endpoint
      const response = await fetch(`${API_BASE_URL}/api`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }).catch(e => {
        throw new Error(`Connection test failed: ${e.message}`);
      });
      
      const responseText = await response.text();
      console.log(`Connection response: ${responseText.substring(0, 100)}...`);
      
      setConnectionStatus('success');
      setResult(`Connection successful!\nStatus: ${response.status}\nResponse: ${responseText.substring(0, 100)}...`);
    } catch (err: any) {
      console.error('Connection test error:', err);
      setConnectionStatus('failed');
      setError(`Connection failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <DinoHeader 
        showBackButton={true} 
        backRoute="/(tabs)" 
        title="API Test Screen" 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={[styles.title, { color: colors.text }]}>
            API Configuration
          </Text>
          
          <View style={styles.configItem}>
            <Text style={[styles.label, { color: colors.text }]}>Base URL:</Text>
            <Text style={[styles.value, { color: colors.primary }]}>{API_BASE_URL}</Text>
          </View>
          
          <View style={styles.configItem}>
            <Text style={[styles.label, { color: colors.text }]}>Roadmap Endpoint:</Text>
            <Text style={[styles.value, { color: colors.primary }]}>{API_ENDPOINTS.GENERATE_ROADMAP}</Text>
          </View>
          
          <View style={styles.configItem}>
            <Text style={[styles.label, { color: colors.text }]}>Lesson Endpoint:</Text>
            <Text style={[styles.value, { color: colors.primary }]}>{API_ENDPOINTS.GENERATE_LESSON}</Text>
          </View>
          
          <TouchableOpacity
            style={[
              styles.connectionButton, 
              connectionStatus === 'success' ? styles.successButton : 
              connectionStatus === 'failed' ? styles.failedButton : 
              styles.untestedButton
            ]}
            onPress={testConnection}
            disabled={isLoading}
          >
            <Text style={styles.connectionButtonText}>
              {connectionStatus === 'untested' ? 'Test Connection' :
               connectionStatus === 'success' ? 'Connection Successful ✓' : 
               'Connection Failed ✗'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.card}>
          <Text style={[styles.title, { color: colors.text }]}>
            Test API Endpoints
          </Text>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Topic:</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
              value={topic}
              onChangeText={setTopic}
              placeholder="Enter a topic"
              placeholderTextColor={colors.text + '80'}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Day (for lesson):</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
              value={day}
              onChangeText={setDay}
              placeholder="Enter day number"
              placeholderTextColor={colors.text + '80'}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Title (for lesson):</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter lesson title"
              placeholderTextColor={colors.text + '80'}
            />
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: DinoLearnColors.navyBlue }]}
              onPress={testRoadmapApi}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>Test Roadmap API</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, { backgroundColor: DinoLearnColors.burntOrange }]}
              onPress={testLessonApi}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>Test Lesson API</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={DinoLearnColors.navyBlue} />
            <Text style={[styles.loadingText, { color: colors.text }]}>
              Testing API connection...
            </Text>
          </View>
        )}
        
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>Error:</Text>
            <Text style={styles.errorMessage}>{error}</Text>
          </View>
        )}
        
        {result && (
          <View style={styles.resultContainer}>
            <Text style={[styles.resultTitle, { color: colors.text }]}>API Response:</Text>
            <ScrollView 
              style={[styles.resultScroll, { backgroundColor: colors.card }]}
              contentContainerStyle={styles.resultContent}
            >
              <Text style={[styles.resultText, { color: colors.text }]}>{result}</Text>
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    padding: 16,
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  configItem: {
    flexDirection: 'row',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    flex: 1,
  },
  inputGroup: {
    marginBottom: 16,
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
  },
  errorContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#FEECEC',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
  },
  errorTitle: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  errorMessage: {
    color: '#B91C1C',
    fontSize: 14,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  resultScroll: {
    maxHeight: 300,
    borderRadius: 8,
  },
  resultContent: {
    padding: 12,
  },
  resultText: {
    fontSize: 14,
    fontFamily: 'monospace',
  },
  connectionButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectionButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  successButton: {
    backgroundColor: '#22C55E',
  },
  failedButton: {
    backgroundColor: '#EF4444',
  },
  untestedButton: {
    backgroundColor: DinoLearnColors.navyBlue,
  },
}); 