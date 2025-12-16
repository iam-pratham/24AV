import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CustomDatePicker from '@/components/custom-date-picker';

export default function AccountSetupScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const emailOrPhone = params.emailOrPhone as string || '';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const showCheckmark = (value: string) => value.length > 0;

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleDateSelect = (selectedDate: Date) => {
    setBirthday(selectedDate);
  };

  const handleContinue = () => {
    if (!firstName.trim() || !lastName.trim() || !birthday || !email.trim() || !password.trim() || !acceptedTerms) {
      return;
    }
    // TODO: Save account setup data
    console.log('Account setup:', { firstName, lastName, birthday, email, password });
    // Navigate to main app after successful setup
    router.replace('/(tabs)');
  };

  const isFormValid = firstName.trim() && lastName.trim() && birthday && email.trim() && password.trim() && acceptedTerms;

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

          {/* Title */}
          <View style={styles.header}>
            <Text style={styles.title}>Set Up Your Account</Text>
          </View>

          {/* First Name Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>FIRST NAME</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter Your First Name"
                placeholderTextColor="#9E9E9E"
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
                autoComplete="given-name"
              />
              {showCheckmark(firstName) && (
                <View style={styles.checkmarkContainer}>
                  <MaterialIcons name="check" size={16} color="#FFFFFF" />
                </View>
              )}
            </View>
          </View>

          {/* Last Name Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>LAST NAME</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter Your Last Name"
                placeholderTextColor="#9E9E9E"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
                autoComplete="family-name"
              />
              {showCheckmark(lastName) && (
                <View style={styles.checkmarkContainer}>
                  <MaterialIcons name="check" size={16} color="#FFFFFF" />
                </View>
              )}
            </View>
          </View>

          {/* Birthday Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>BIRTHDAY</Text>
            <TouchableOpacity 
              style={styles.inputWrapper}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={[styles.input, !birthday && styles.placeholderText]}>
                {birthday ? formatDate(birthday) : 'Select Your Birthday'}
              </Text>
              {birthday ? (
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                  <Text style={styles.changeText}>Change</Text>
                </TouchableOpacity>
              ) : (
                <MaterialIcons name="calendar-today" size={20} color="#42A5F5" />
              )}
            </TouchableOpacity>
          </View>

          {/* Email Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>EMAIL ID</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter Your Email ID"
                placeholderTextColor="#9E9E9E"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              {showCheckmark(email) && (
                <View style={styles.checkmarkContainer}>
                  <MaterialIcons name="check" size={16} color="#FFFFFF" />
                </View>
              )}
            </View>
          </View>

          {/* Password Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>ACCOUNT PASSWORD</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter Your Password"
                placeholderTextColor="#9E9E9E"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="password-new"
              />
              {showCheckmark(password) && (
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.passwordToggle}
                >
                  <MaterialIcons 
                    name={showPassword ? "visibility" : "visibility-off"} 
                    size={20} 
                    color="#42A5F5" 
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Terms and Conditions */}
          <View style={styles.termsContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setAcceptedTerms(!acceptedTerms)}
            >
              {acceptedTerms && (
                <MaterialIcons name="check" size={16} color="#FFFFFF" />
              )}
            </TouchableOpacity>
            <View style={styles.termsTextContainer}>
              <Text style={styles.termsText}>
                I agree to 24AV's{' '}
                <Text style={styles.termsLink}>Terms of Service</Text>
                {', '}
                <Text style={styles.termsLink}>Payments Terms of Service</Text>
              </Text>
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity 
            style={[styles.continueButton, !isFormValid && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={!isFormValid}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
            <View style={styles.arrowCircle}>
              <MaterialIcons name="chevron-right" size={16} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Custom Date Picker */}
        <CustomDatePicker
          visible={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          onSelect={handleDateSelect}
          initialDate={birthday || new Date()}
          maximumDate={new Date()}
          minimumDate={new Date(1900, 0, 1)}
        />
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
    paddingTop: 12,
    paddingBottom: 20,
  },
  backButton: {
    marginBottom: 16,
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
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D1634',
    textAlign: 'left',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 11,
    color: '#BDBDBD',
    marginBottom: 6,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 6,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#424242',
    paddingVertical: 6,
  },
  placeholderText: {
    color: '#9E9E9E',
  },
  checkmarkContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#42A5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 13,
    color: '#42A5F5',
    fontWeight: '500',
    marginLeft: 8,
  },
  passwordToggle: {
    padding: 4,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    marginTop: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#0D1634',
    backgroundColor: '#0D1634',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  termsTextContainer: {
    flex: 1,
  },
  termsText: {
    fontSize: 13,
    color: '#424242',
    lineHeight: 18,
  },
  termsLink: {
    color: '#42A5F5',
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#0D1634',
    height: 52,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
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
});

