import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';

export default function SignUpScreen() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const router = useRouter();

  const handleSignUp = () => {
    if (!emailOrPhone.trim()) {
      return;
    }
    // Navigate to OTP screen with email/phone number
    router.push({
      pathname: '/otp',
      params: { emailOrPhone: emailOrPhone.trim() },
    });
  };

  const showCheckmark = (value: string) => value.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.content}>
          {/* Back button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <View style={styles.backButtonCircle}>
              <MaterialIcons name="chevron-left" size={24} color="#424242" />
            </View>
          </TouchableOpacity>

          {/* Title and Subtitle */}
          <View style={styles.header}>
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.subtitle}>Start Your Journey with affordable price</Text>
          </View>

          {/* Email/Phone Number Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>EMAIL/PHONE NUMBER</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter Your Email/Phone Number"
                placeholderTextColor="#9E9E9E"
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
                keyboardType="default"
                autoCapitalize="none"
                autoComplete="email"
              />
              {showCheckmark(emailOrPhone) && (
                <View style={styles.checkmarkContainer}>
                  <MaterialIcons name="check" size={16} color="#FFFFFF" />
                </View>
              )}
            </View>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={[styles.signUpButton, !emailOrPhone.trim() && styles.signUpButtonDisabled]}
            onPress={handleSignUp}
            disabled={!emailOrPhone.trim()}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
            <View style={styles.arrowCircle}>
              <MaterialIcons name="chevron-right" size={16} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          {/* Social Login Section */}
          <View style={styles.socialSection}>
            <Text style={styles.socialText}>Or Sign Up With</Text>
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="facebook-f" size={20} color="#0D1634" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <AntDesign name="google" size={20} color="#0D1634" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="apple" size={20} color="#0D1634" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign In Link */}
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.push('/sign-in')}>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
  },
  backButton: {
    marginBottom: 24,
  },
  backButtonCircle: {
    width: 56,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0D1634',
    marginBottom: 8,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 14,
    color: '#9E9E9E',
    textAlign: 'left',
  },
  inputContainer: {
    marginBottom: 32,
  },
  label: {
    fontSize: 12,
    color: '#BDBDBD',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#424242',
    paddingVertical: 8,
  },
  checkmarkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: '#2563EB',
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  signUpButtonDisabled: {
    opacity: 0.5,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  arrowCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialSection: {
    marginBottom: 32,
  },
  socialText: {
    fontSize: 14,
    color: '#BDBDBD',
    textAlign: 'center',
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  signInText: {
    fontSize: 14,
    color: '#424242',
  },
  signInLink: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },
});

