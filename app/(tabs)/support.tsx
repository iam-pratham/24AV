import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, StatusBar, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const FAQ_DATA = [
  {
    id: 1,
    question: 'How do I change my flight?',
    answer: 'You can change your flight by going to "My Bookings", selecting the trip you want to modify, and clicking on "Change Flight". Note that change fees may apply depending on your fare class.',
  },
  {
    id: 2,
    question: 'What is the baggage allowance?',
    answer: 'Standard Economy allowance is 1 checked bag (23kg) and 1 carry-on (7kg). Premium and Business classes offer increased allowances. Check your ticket details for specific information.',
  },
  {
    id: 3,
    question: 'How do I request a refund?',
    answer: 'Refunds can be requested via the "My Bookings" section for refundable tickets. For non-refundable tickets, you may be eligible for a travel credit. Process times vary from 5-10 business days.',
  },
  {
    id: 4,
    question: 'Where can I find my boarding pass?',
    answer: 'Your boarding pass will be available in the app 24 hours before departure. You can access it from the Home screen or "My Bookings".',
  },
];

const CATEGORIES = [
  { id: 'flights', label: 'Flights', icon: 'airplane' },
  { id: 'baggage', label: 'Baggage', icon: 'bag-handle' },
  { id: 'account', label: 'Account', icon: 'person' },
  { id: 'payments', label: 'Payments', icon: 'card' },
];

export default function SupportScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.headerTitle}>Support</Text>
        <Text style={styles.headerSubtitle}>How can we help you today?</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9E9E9E" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for help articles..."
            placeholderTextColor="#9E9E9E"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Categories */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Browse by Topic</Text>
          <View style={styles.categoriesGrid}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity key={cat.id} style={styles.categoryCard}>
                <View style={styles.categoryIcon}>
                  <Ionicons name={cat.icon as any} size={24} color="#2563EB" />
                </View>
                <Text style={styles.categoryLabel}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQs */}
        <View style={[styles.sectionContainer, { marginBottom: 0 }]}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <View style={styles.faqList}>
            {FAQ_DATA.map((item) => (
              <View key={item.id} style={styles.faqItem}>
                <TouchableOpacity
                  style={styles.faqHeader}
                  onPress={() => toggleExpand(item.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.faqQuestion}>{item.question}</Text>
                  <MaterialIcons
                    name={expandedId === item.id ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                    size={24}
                    color="#9E9E9E"
                  />
                </TouchableOpacity>
                {expandedId === item.id && (
                  <View style={styles.faqBody}>
                    <Text style={styles.faqAnswer}>{item.answer}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>



      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0D1634',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#8898AA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#0D1634',
    height: '100%',
  },
  sectionContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0D1634',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '48%', // Approx half with gap consideration needs manual calc or flex
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3F2FD', // Keep or tint? Using generic light blue consistent with previous
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0D1634',
  },
  faqList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0D1634',
    flex: 1,
    marginRight: 16,
  },
  faqBody: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#8898AA',
    lineHeight: 22,
  },
  contactContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D1634',
    marginBottom: 2,
  },
  contactSubtitle: {
    fontSize: 13,
    color: '#8898AA',
  },
  contactDivider: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginLeft: 72, // Align with text
  },
});
