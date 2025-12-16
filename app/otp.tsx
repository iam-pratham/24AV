import { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function OTPScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const emailOrPhone = params.emailOrPhone as string || 'XXX720';
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) {
      // Handle paste
      const pastedOtp = value.slice(0, 6).split('');
      const newOtp = [...otp];
      pastedOtp.forEach((char, i) => {
        if (index + i < 6 && /^\d$/.test(char)) {
          newOtp[index + i] = char;
        }
      });
      setOtp(newOtp);
      // Focus on the last filled input or next empty
      const nextIndex = Math.min(index + pastedOtp.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    if (/^\d$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleNumberPress = (number: string) => {
    const emptyIndex = otp.findIndex((digit) => digit === '');
    if (emptyIndex !== -1) {
      const newOtp = [...otp];
      newOtp[emptyIndex] = number;
      setOtp(newOtp);
      if (emptyIndex < 5) {
        inputRefs.current[emptyIndex + 1]?.focus();
      }
    }
  };

  const handleBackspace = () => {
    // Find the last filled index
    let lastFilledIndex = -1;
    for (let i = otp.length - 1; i >= 0; i--) {
      if (otp[i] !== '') {
        lastFilledIndex = i;
        break;
      }
    }
    if (lastFilledIndex !== -1) {
      const newOtp = [...otp];
      newOtp[lastFilledIndex] = '';
      setOtp(newOtp);
      inputRefs.current[lastFilledIndex]?.focus();
    }
  };

  const handleEnter = () => {
    const otpString = otp.join('');
    if (otpString.length === 6) {
      // TODO: Verify OTP
      console.log('OTP entered:', otpString);
      // Navigate to account setup page after successful verification
      router.push({
        pathname: '/account-setup',
        params: { emailOrPhone },
      });
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== '');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
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
            <Text style={styles.title}>OTP</Text>
            <Text style={styles.subtitle}>OTP has been sent to {emailOrPhone}</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.changeNumber}>Change Number</Text>
            </TouchableOpacity>
          </View>

          {/* OTP Input Fields */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <View key={index} style={styles.otpInputWrapper}>
                <TextInput
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={styles.otpInput}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  textAlign="center"
                  fontSize={24}
                  fontWeight="600"
                  placeholder="-"
                  placeholderTextColor="#BDBDBD"
                />
              </View>
            ))}
          </View>

          {/* Enter Button */}
          <TouchableOpacity 
            style={[styles.enterButton, !isOtpComplete && styles.enterButtonDisabled]}
            onPress={handleEnter}
            disabled={!isOtpComplete}
          >
            <Text style={styles.enterButtonText}>Enter</Text>
            <View style={styles.arrowCircle}>
              <MaterialIcons name="chevron-right" size={16} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          {/* OTP Suggestion from Messages */}
          <View style={styles.otpSuggestion}>
            <Text style={styles.suggestionLabel}>From Messages</Text>
            <TouchableOpacity onPress={() => {
              const suggestedOtp = '241356'.split('');
              setOtp(suggestedOtp);
              suggestedOtp.forEach((_, i) => {
                if (i < 6) inputRefs.current[i]?.setNativeProps({ text: suggestedOtp[i] });
              });
            }}>
              <Text style={styles.suggestionOtp}>241356</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Numeric Keypad */}
        <View style={styles.keypadContainer}>
          <View style={styles.keypad}>
            {/* Row 1 */}
            <View style={styles.keypadRow}>
              <TouchableOpacity style={styles.keypadButton} onPress={() => handleNumberPress('1')}>
                <Text style={styles.keypadNumber}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.keypadButton} onPress={() => handleNumberPress('2')}>
                <Text style={styles.keypadNumber}>2</Text>
                <Text style={styles.keypadLetters}>abc</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.keypadButton} onPress={() => handleNumberPress('3')}>
                <Text style={styles.keypadNumber}>3</Text>
                <Text style={styles.keypadLetters}>def</Text>
              </TouchableOpacity>
            </View>

            {/* Row 2 */}
            <View style={styles.keypadRow}>
              <TouchableOpacity style={styles.keypadButton} onPress={() => handleNumberPress('4')}>
                <Text style={styles.keypadNumber}>4</Text>
                <Text style={styles.keypadLetters}>ghi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.keypadButton} onPress={() => handleNumberPress('5')}>
                <Text style={styles.keypadNumber}>5</Text>
                <Text style={styles.keypadLetters}>jkl</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.keypadButton} onPress={() => handleNumberPress('6')}>
                <Text style={styles.keypadNumber}>6</Text>
                <Text style={styles.keypadLetters}>mno</Text>
              </TouchableOpacity>
            </View>

            {/* Row 3 */}
            <View style={styles.keypadRow}>
              <TouchableOpacity style={styles.keypadButton} onPress={() => handleNumberPress('7')}>
                <Text style={styles.keypadNumber}>7</Text>
                <Text style={styles.keypadLetters}>pqrs</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.keypadButton} onPress={() => handleNumberPress('8')}>
                <Text style={styles.keypadNumber}>8</Text>
                <Text style={styles.keypadLetters}>tuv</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.keypadButton} onPress={() => handleNumberPress('9')}>
                <Text style={styles.keypadNumber}>9</Text>
                <Text style={styles.keypadLetters}>wxyz</Text>
              </TouchableOpacity>
            </View>

            {/* Row 4 */}
            <View style={styles.keypadRow}>
              <TouchableOpacity style={[styles.keypadButton, styles.zeroButton]} onPress={() => handleNumberPress('0')}>
                <Text style={styles.keypadNumber}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.keypadButton} onPress={handleBackspace}>
                <MaterialIcons name="backspace" size={24} color="#424242" />
              </TouchableOpacity>
            </View>
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
  scrollContent: {
    flexGrow: 1,
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
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0D1634',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#9E9E9E',
    marginBottom: 8,
  },
  changeNumber: {
    fontSize: 14,
    color: '#42A5F5',
    fontWeight: '500',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 12,
  },
  otpInputWrapper: {
    flex: 1,
    height: 56,
    borderBottomWidth: 2,
    borderBottomColor: '#42A5F5',
    justifyContent: 'center',
  },
  otpInput: {
    flex: 1,
    color: '#0D1634',
  },
  enterButton: {
    backgroundColor: '#0D1634',
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  enterButtonDisabled: {
    opacity: 0.5,
  },
  enterButtonText: {
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
  otpSuggestion: {
    alignItems: 'center',
    marginBottom: 20,
  },
  suggestionLabel: {
    fontSize: 12,
    color: '#9E9E9E',
    marginBottom: 4,
  },
  suggestionOtp: {
    fontSize: 18,
    color: '#42A5F5',
    fontWeight: '600',
  },
  keypadContainer: {
    backgroundColor: '#F5F5F5',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  keypad: {
    gap: 12,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  keypadButton: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zeroButton: {
    flex: 2,
  },
  keypadNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: '#424242',
  },
  keypadLetters: {
    fontSize: 10,
    color: '#9E9E9E',
    marginTop: 2,
  },
});

