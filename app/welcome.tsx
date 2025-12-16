import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent />

      {/* Background with content */}
      <View style={[styles.mainContent, { paddingTop: insets.top }]}>
        {/* Back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <View style={styles.backButtonCircle}>
            <MaterialIcons name="chevron-left" size={24} color="#0D1634" />
          </View>
        </TouchableOpacity>

        {/* Spacer to push content down */}
        <View style={{ flex: 1 }} />

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Enjoy Your{'\n'}Vacation With{'\n'}Just One Click
          </Text>
        </View>
      </View>

      {/* Bottom white section */}
      <View style={[styles.bottomSection, { paddingBottom: insets.bottom + 40 }]}>
        {/* Pagination dots */}
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.dotInactive]} />
          <View style={[styles.dot, styles.dotInactive]} />
          <View style={[styles.dot, styles.dotActive]} />
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => router.push('/sign-in')}
          >
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => router.push('/sign-up')}
          >
            <Text style={styles.signUpText}>Sign Up</Text>
            <MaterialIcons name="chevron-right" size={20} color="#FFFFFF" style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
  },
  backButton: {
    marginTop: 16,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  backButtonCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  titleContainer: {
    marginBottom: 40,
    zIndex: 1,
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: '#0D1634',
    lineHeight: 52,
    letterSpacing: -1,
  },
  bottomSection: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 32,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 8,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotInactive: {
    backgroundColor: '#E0E0E0',
  },
  dotActive: {
    width: 24,
    backgroundColor: '#0D1634',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  signInButton: {
    flex: 1,
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  signInText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0D1634',
  },
  signUpButton: {
    flex: 1,
    height: 56,
    backgroundColor: '#0D1634',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#0D1634',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  signUpText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  arrowIcon: {
    marginLeft: 8,
  },
});
