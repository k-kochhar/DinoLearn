import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  ImageBackground,
  useWindowDimensions,
  Image
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path } from 'react-native-svg';
import { DinoLearnColors } from '@/constants/Colors';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function LandingPage() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { width } = useWindowDimensions();

  // Arrow right icon
  const ArrowRightIcon = () => (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </Svg>
  );

  // Academic cap icon
  const AcademicCapIcon = () => (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={DinoLearnColors.navyBlue}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </Svg>
  );

  // User group icon
  const UserGroupIcon = () => (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={DinoLearnColors.navyBlue}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </Svg>
  );

  // Light bulb icon
  const LightBulbIcon = () => (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={DinoLearnColors.navyBlue}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </Svg>
  );

  // Certificate icon
  const CertificateIcon = () => (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={DinoLearnColors.navyBlue}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
    </Svg>
  );

  // Book open icon
  const BookOpenIcon = () => (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </Svg>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: DinoLearnColors.paleMint }]}>
      <StatusBar style="dark" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Image 
                source={require('@/assets/images/dino-head.png')} 
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.logoText}>DinoLearn</Text>
          </View>
          
          {width > 768 && (
            <View style={styles.navContainer}>
              <Text style={styles.navLink}>Courses</Text>
              <Text style={styles.navLink}>Features</Text>
              <Text style={styles.navLink}>Testimonials</Text>
              <TouchableOpacity 
                style={styles.signInButton}
                onPress={() => router.push('/(tabs)')}
              >
                <Text style={styles.signInButtonText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={width > 768 ? {width: '48%'} : {width: '100%', marginBottom: 30}}>
            <Text style={styles.heroTitle}>
              Unlock Your Learning{'\n'}Potential
            </Text>
            
            <Text style={styles.heroText}>
              DinoLearn turns any topic into a 14-day learning adventure with daily lessons, 
              interactive quizzes, and smart progress tracking. Build real knowledge step by 
              step, one dino-sized bite at a time.
            </Text>
            
            <View style={styles.heroButtons}>
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={() => router.push('/(tabs)')}
              >
                <Text style={styles.primaryButtonText}>Get Started</Text>
                <ArrowRightIcon />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Learn More</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={width > 768 ? {width: '48%', position: 'relative'} : {width: '100%', position: 'relative', alignItems: 'center'}}>
            <View style={styles.imageBackground} />
            <Image 
              source={require('@/assets/images/Reading.png')} 
              style={[
                styles.heroImage,
                width <= 768 && {height: 225}
              ]}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Why Choose DinoLearn?</Text>
          <Text style={styles.sectionSubtitle}>
            Our platform is designed to provide you with the best learning experience possible.
          </Text>
          
          <View style={styles.featuresGrid}>
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <AcademicCapIcon />
              </View>
              <Text style={styles.featureTitle}>Adaptive Learning Paths</Text>
              <Text style={styles.featureText}>
                Our AI-powered system adapts to your learning style and pace, creating a 
                personalized curriculum that maximizes your learning efficiency.
              </Text>
            </View>
            
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <UserGroupIcon />
              </View>
              <Text style={styles.featureTitle}>Live Collaborative Sessions</Text>
              <Text style={styles.featureText}>
                Connect with peers and instructors in real-time collaborative sessions 
                to solve problems together and enhance your understanding through discussion.
              </Text>
            </View>
            
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <LightBulbIcon />
              </View>
              <Text style={styles.featureTitle}>Interactive Projects</Text>
              <Text style={styles.featureText}>
                Apply your knowledge through hands-on projects and receive immediate 
                feedback to help you identify areas for improvement and growth.
              </Text>
            </View>
            
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <CertificateIcon />
              </View>
              <Text style={styles.featureTitle}>Certification Programs</Text>
              <Text style={styles.featureText}>
                Earn industry-recognized certificates upon course completion to showcase 
                your skills and enhance your professional credentials.
              </Text>
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Start Your Learning Journey?</Text>
          <Text style={styles.ctaText}>
            Join thousands of students who are already advancing their careers and personal growth with DinoLearn.
          </Text>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.ctaButtonText}>Get Started For Free</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLogoSection}>
            <View style={styles.footerLogoContainer}>
              <View style={styles.footerLogoCircle}>
                <BookOpenIcon />
              </View>
              <Text style={styles.footerLogoText}>DinoLearn</Text>
            </View>
            <Text style={styles.footerTagline}>
              Empowering learners worldwide with accessible, high-quality education.
            </Text>
          </View>
          
          <View style={styles.footerLinksContainer}>
            <View style={styles.footerLinksColumn}>
              <Text style={styles.footerLinkHeader}>Quick Links</Text>
              <Text style={styles.footerLink}>Home</Text>
              <Text style={styles.footerLink}>Courses</Text>
              <Text style={styles.footerLink}>Features</Text>
              <Text style={styles.footerLink}>Testimonials</Text>
            </View>
            
            <View style={styles.footerLinksColumn}>
              <Text style={styles.footerLinkHeader}>Resources</Text>
              <Text style={styles.footerLink}>Blog</Text>
              <Text style={styles.footerLink}>Support</Text>
              <Text style={styles.footerLink}>Documentation</Text>
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.copyright}>
          <Text style={styles.copyrightText}>© {new Date().getFullYear()} DinoLearn. All rights reserved.</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '500',
    color: DinoLearnColors.navyBlue,
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  navLink: {
    fontSize: 15,
    color: DinoLearnColors.charcoalGray,
  },
  signInButton: {
    backgroundColor: DinoLearnColors.burntOrange,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  signInButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  heroSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    gap: 30,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '600',
    color: DinoLearnColors.navyBlue,
    marginBottom: 16,
    lineHeight: 42,
  },
  heroText: {
    fontSize: 16,
    color: DinoLearnColors.charcoalGray + 'CC',
    marginBottom: 24,
    lineHeight: 24,
  },
  heroButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: DinoLearnColors.burntOrange,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: DinoLearnColors.burntOrange,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  secondaryButtonText: {
    color: DinoLearnColors.burntOrange,
    fontWeight: '600',
    fontSize: 16,
  },
  imageBackground: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: DinoLearnColors.skyBlue + '80',
    opacity: 0.5,
    top: '50%',
    left: '50%',
    transform: [{ translateX: -100 }, { translateY: -100 }],
    zIndex: -1,
  },
  heroImage: {
    width: '100%',
    height: 300,
    alignSelf: 'center',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  statsItem: {
    alignItems: 'center',
    padding: 12,
  },
  statsNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: DinoLearnColors.navyBlue,
    marginBottom: 8,
  },
  statsLabel: {
    fontSize: 14,
    color: DinoLearnColors.charcoalGray + 'B3',
  },
  featuresSection: {
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: DinoLearnColors.navyBlue,
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: DinoLearnColors.charcoalGray + 'B3',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    maxWidth: 320,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: DinoLearnColors.skyBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: DinoLearnColors.navyBlue,
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    lineHeight: 22,
    color: DinoLearnColors.charcoalGray + 'B3',
  },
  ctaSection: {
    backgroundColor: DinoLearnColors.navyBlue,
    borderRadius: 16,
    padding: 30,
    margin: 20,
    alignItems: 'center',
    marginBottom: 60,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginBottom: 12,
  },
  ctaText: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  ctaButton: {
    backgroundColor: DinoLearnColors.burntOrange,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  ctaButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  footer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 30,
    borderTopWidth: 1,
    borderTopColor: DinoLearnColors.charcoalGray + '1A',
    gap: 30,
  },
  footerLogoSection: {
    maxWidth: 300,
  },
  footerLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  footerLogoCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: DinoLearnColors.navyBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLogoText: {
    fontSize: 18,
    fontWeight: '500',
    color: DinoLearnColors.navyBlue,
  },
  footerTagline: {
    fontSize: 14,
    color: DinoLearnColors.charcoalGray + 'B3',
    lineHeight: 20,
  },
  footerLinksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 40,
  },
  footerLinksColumn: {
    minWidth: 120,
  },
  footerLinkHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: DinoLearnColors.navyBlue,
    marginBottom: 16,
  },
  footerLink: {
    fontSize: 14,
    color: DinoLearnColors.charcoalGray + 'B3',
    marginBottom: 10,
  },
  copyright: {
    paddingTop: 20,
    paddingBottom: 10,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: DinoLearnColors.charcoalGray + '1A',
    alignItems: 'center',
  },
  copyrightText: {
    fontSize: 12,
    color: DinoLearnColors.charcoalGray + '80',
  }
}); 