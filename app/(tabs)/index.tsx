import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, Image, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [tripType, setTripType] = useState('one-way'); // one-way, round-trip, multi-city

  // Mock State for inputs
  const [from, setFrom] = useState('SYD');
  const [fromCity, setFromCity] = useState('Sydney Kingsford Smith Airport');
  const [to, setTo] = useState('NRT');
  const [toCity, setToCity] = useState('Narita International Airport');
  const [departureDate, setDepartureDate] = useState('Wed, 1 Mar 2025');
  const [travellers, setTravellers] = useState('2 Passenger(s)');
  const [seatClass, setSeatClass] = useState('Business');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background Gradient */}
      <LinearGradient
        colors={['#2563EB', '#4c82f5', '#F5F7FA']}
        locations={[0, 0.6, 1]}
        style={styles.gradient}
      />

      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20 }]} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingSub}>Hello,</Text>
            <Text style={styles.greetingName}>Eugene Mandueke!</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Trip Type Selector */}
        <View style={styles.tripTypeContainer}>
          <TouchableOpacity
            style={[styles.tripTypeButton, tripType === 'one-way' && styles.tripTypeActive]}
            onPress={() => setTripType('one-way')}
          >
            <Text style={[styles.tripTypeText, tripType === 'one-way' && styles.tripTypeTextActive]}>One Way</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tripTypeButton, tripType === 'round-trip' && styles.tripTypeActive]}
            onPress={() => setTripType('round-trip')}
          >
            <Text style={[styles.tripTypeText, tripType === 'round-trip' && styles.tripTypeTextActive]}>Round Trip</Text>
          </TouchableOpacity>

        </View>

        {/* Search Card */}
        <View style={styles.searchCard}>

          {/* From */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>From</Text>
            <View style={styles.inputRow}>
              <Ionicons name="airplane-outline" size={20} color="#0D1634" style={{ transform: [{ rotate: '-45deg' }], marginRight: 10 }} />
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                  <Text style={styles.code}>{from}</Text>
                  <Text style={styles.country}> Australia</Text>
                </View>
                <Text style={styles.airport} numberOfLines={1}>{fromCity}</Text>
              </View>
            </View>
          </View>

          <View style={styles.dividerRow}>
            <View style={styles.line} />
            <TouchableOpacity style={styles.swapButton}>
              <Ionicons name="swap-vertical" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* To */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>To</Text>
            <View style={styles.inputRow}>
              <Ionicons name="airplane-outline" size={20} color="#0D1634" style={{ transform: [{ rotate: '45deg' }], marginRight: 10 }} />
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                  <Text style={styles.code}>{to}</Text>
                  <Text style={styles.country}> Tokyo</Text>
                </View>
                <Text style={styles.airport} numberOfLines={1}>{toCity}</Text>
              </View>
            </View>
          </View>

          <View style={[styles.line, { marginVertical: 16 }]} />

          {/* Departure */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Departure</Text>
            <View style={styles.inputRow}>
              <Ionicons name="calendar-outline" size={20} color="#0D1634" style={{ marginRight: 10 }} />
              <Text style={styles.inputValue}>{departureDate}</Text>
            </View>
          </View>



          <TouchableOpacity
            style={[styles.searchButton, { marginTop: 16 }]}
            onPress={() => router.push({
              pathname: '/search-results',
              params: { from, to, date: 'Mar 1', airline: 'Gulfstream G650' } // Passing default mockup params
            })}
          >
            <Text style={styles.searchButtonText}>Search Flight</Text>
          </TouchableOpacity>

        </View>

        {/* Today's Deals */}
        <View style={styles.dealsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Flight Coupons</Text>
            <TouchableOpacity><Text style={styles.seeMore}>See more</Text></TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dealsScroll}>
            <View style={[styles.dealCard, { backgroundColor: '#FFFFFF' }]}>
              <View style={styles.dealContent}>
                <View style={styles.dealIconCircle}>
                  <Text style={styles.dealPercent}>%</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.dealTitle}>Discount up to $300</Text>
                  <Text style={styles.dealSubtitle}>PayLater Payment</Text>
                </View>
                <Ionicons name="information-circle-outline" size={16} color="#8898AA" />
              </View>
              <View style={styles.dealDivider}>
                <View style={[styles.dealCutout, { left: -6 }]} />
                <View style={[styles.dealDashed]} />
                <View style={[styles.dealCutout, { right: -6 }]} />
              </View>
              <View style={styles.dealFooter}>
                <Text style={styles.couponCode}>#FIRSTFLIGHT</Text>
              </View>
            </View>

            <View style={[styles.dealCard, { backgroundColor: '#FFFFFF', marginLeft: 16 }]}>
              <View style={styles.dealContent}>
                <View style={styles.dealIconCircle}>
                  <Text style={styles.dealPercent}>%</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.dealTitle}>Cashback 50%</Text>
                  <Text style={styles.dealSubtitle}>Credit Card</Text>
                </View>
                <Ionicons name="information-circle-outline" size={16} color="#8898AA" />
              </View>
              <View style={styles.dealDivider}>
                <View style={[styles.dealCutout, { left: -6 }]} />
                <View style={[styles.dealDashed]} />
                <View style={[styles.dealCutout, { right: -6 }]} />
              </View>
              <View style={styles.dealFooter}>
                <Text style={styles.couponCode}>#CA50HBAC</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Today's Deals (New) */}
        <View style={styles.dealsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Deals</Text>
            <TouchableOpacity><Text style={styles.seeMore}>See more</Text></TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dealsScroll}>
            {/* Card 1 */}
            <View style={styles.flightDealCard}>
              <View style={styles.flightDealTop}>
                <View>
                  <Text style={styles.dealTime}>07:47</Text>
                  <Text style={styles.dealAirport}>DXB</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Ionicons name="airplane" size={16} color="#2563EB" />
                  <Text style={styles.dealDuration}>7h 15m</Text>
                </View>
                <View>
                  <Text style={styles.dealTime}>14:30</Text>
                  <Text style={styles.dealAirport}>KIX</Text>
                </View>
              </View>

              {/* Divider with Cutouts */}
              <View style={styles.dealDivider}>
                <View style={[styles.dealCutout, { left: -6 }]} />
                <View style={styles.dealDashed} />
                <View style={[styles.dealCutout, { right: -6 }]} />
              </View>

              <View style={styles.flightDealBottom}>
                <View>
                  <Text style={styles.dealLabel}>DATE</Text>
                  <Text style={styles.dealValue}>Feb 14, 2025</Text>
                </View>
                <View>
                  <Text style={styles.dealLabel}>PRICE</Text>
                  <Text style={styles.dealPrice}>$680</Text>
                </View>
              </View>
            </View>

            {/* Card 2 */}
            <View style={[styles.flightDealCard, { marginLeft: 16 }]}>
              <View style={styles.flightDealTop}>
                <View>
                  <Text style={styles.dealTime}>09:00</Text>
                  <Text style={styles.dealAirport}>LHR</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Ionicons name="airplane" size={16} color="#2563EB" />
                  <Text style={styles.dealDuration}>8h 30m</Text>
                </View>
                <View>
                  <Text style={styles.dealTime}>17:30</Text>
                  <Text style={styles.dealAirport}>JFK</Text>
                </View>
              </View>

              {/* Divider with Cutouts */}
              <View style={styles.dealDivider}>
                <View style={[styles.dealCutout, { left: -6 }]} />
                <View style={styles.dealDashed} />
                <View style={[styles.dealCutout, { right: -6 }]} />
              </View>

              <View style={styles.flightDealBottom}>
                <View>
                  <Text style={styles.dealLabel}>DATE</Text>
                  <Text style={styles.dealValue}>Mar 10, 2025</Text>
                </View>
                <View>
                  <Text style={styles.dealLabel}>PRICE</Text>
                  <Text style={styles.dealPrice}>$950</Text>
                </View>
              </View>
            </View>

            {/* Card 3 (New) */}
            <View style={[styles.flightDealCard, { marginLeft: 16 }]}>
              <View style={styles.flightDealTop}>
                <View>
                  <Text style={styles.dealTime}>10:15</Text>
                  <Text style={styles.dealAirport}>CDG</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Ionicons name="airplane" size={16} color="#2563EB" />
                  <Text style={styles.dealDuration}>2h 10m</Text>
                </View>
                <View>
                  <Text style={styles.dealTime}>12:25</Text>
                  <Text style={styles.dealAirport}>FCO</Text>
                </View>
              </View>

              <View style={styles.dealDivider}>
                <View style={[styles.dealCutout, { left: -6 }]} />
                <View style={styles.dealDashed} />
                <View style={[styles.dealCutout, { right: -6 }]} />
              </View>

              <View style={styles.flightDealBottom}>
                <View>
                  <Text style={styles.dealLabel}>DATE</Text>
                  <Text style={styles.dealValue}>Apr 05, 2025</Text>
                </View>
                <View>
                  <Text style={styles.dealLabel}>PRICE</Text>
                  <Text style={styles.dealPrice}>$220</Text>
                </View>
              </View>
            </View>

            {/* Card 4 (New) */}
            <View style={[styles.flightDealCard, { marginLeft: 16 }]}>
              <View style={styles.flightDealTop}>
                <View>
                  <Text style={styles.dealTime}>23:50</Text>
                  <Text style={styles.dealAirport}>SIN</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Ionicons name="airplane" size={16} color="#2563EB" />
                  <Text style={styles.dealDuration}>6h 45m</Text>
                </View>
                <View>
                  <Text style={styles.dealTime}>07:35</Text>
                  <Text style={styles.dealAirport}>HND</Text>
                </View>
              </View>

              <View style={styles.dealDivider}>
                <View style={[styles.dealCutout, { left: -6 }]} />
                <View style={styles.dealDashed} />
                <View style={[styles.dealCutout, { right: -6 }]} />
              </View>

              <View style={styles.flightDealBottom}>
                <View>
                  <Text style={styles.dealLabel}>DATE</Text>
                  <Text style={styles.dealValue}>May 20, 2025</Text>
                </View>
                <View>
                  <Text style={styles.dealLabel}>PRICE</Text>
                  <Text style={styles.dealPrice}>$540</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>


      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 350, // Extended height to cover the top area
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greetingSub: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  greetingName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5252',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
  },

  // Trip Type
  tripTypeContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 4,
    marginBottom: 24,
  },
  tripTypeButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 21,
  },
  tripTypeActive: {
    backgroundColor: '#000000',
  },
  tripTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8898AA',
  },
  tripTypeTextActive: {
    color: '#FFFFFF',
  },

  // Search Card
  searchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 32,
  },
  inputSection: {
    paddingVertical: 4,
  },
  label: {
    fontSize: 13,
    color: '#8898AA',
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  code: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0D1634',
  },
  country: {
    fontSize: 13,
    color: '#8898AA',
  },
  airport: {
    fontSize: 13,
    color: '#8898AA',
    marginTop: 2,
    maxWidth: 240,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#F1F3F5',
  },
  swapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: -20, // Position relative to the line
    zIndex: 10,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  inputValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D1634',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  inputValueSM: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0D1634',
  },
  searchButton: {
    backgroundColor: '#000000',
    borderRadius: 28, // Fully rounded
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  // Deals
  dealsSection: {
    marginTop: 0,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0D1634',
  },
  seeMore: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },
  dealsScroll: {
    paddingRight: 20,
  },
  dealCard: {
    width: 280,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  dealContent: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dealIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dealPercent: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2563EB',
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0D1634',
    marginBottom: 2,
  },
  dealSubtitle: {
    fontSize: 12,
    color: '#8898AA',
  },
  dealDivider: {
    height: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 12,
  },
  dealDashed: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  dealCutout: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#F5F7FA', // Match background
    position: 'absolute',
  },
  dealFooter: {
    alignItems: 'center',
  },
  couponCode: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8898AA',
    letterSpacing: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  flightDealCard: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  flightDealTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dealTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
    marginBottom: 4,
  },
  dealAirport: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0D1634',
  },
  dealDuration: {
    fontSize: 12,
    color: '#8898AA',
    marginTop: 4,
  },
  flightDealBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dealLabel: {
    fontSize: 10,
    color: '#8898AA',
    letterSpacing: 1,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  dealValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0D1634',
  },
  dealPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0D1634',
  },
});
