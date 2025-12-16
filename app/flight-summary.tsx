import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, StatusBar, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { DUMMY_FLIGHTS } from './data/dummyFlights';

export default function FlightSummaryScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const params = useLocalSearchParams();
    const flightId = params.flightId as string;
    const [passengerCount, setPassengerCount] = useState(1);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [serviceTermsAccepted, setServiceTermsAccepted] = useState(false);

    const flight = DUMMY_FLIGHTS.find(f => f.id === flightId);

    if (!flight) {
        return (
            <View style={styles.container}>
                <Text>Flight not found</Text>
            </View>
        );
    }

    const totalPrice = flight.price * passengerCount;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#0D1634" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Flight summary</Text>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="share-outline" size={24} color="#0D1634" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* --- FLIGHT DETAILS SECTION --- */}

                {/* Tag */}
                <View style={styles.tagContainer}>
                    <MaterialIcons name="arrow-forward" size={14} color="#9C27B0" />
                    <Text style={styles.tagText}>EMPTY LEG</Text>
                </View>

                {/* Aircraft Info */}
                <Text style={styles.aircraftName}>{flight.aircraft}</Text>
                <Text style={styles.aircraftCategory}>{flight.aircraftCategory}</Text>

                {/* Timeline */}
                <View style={styles.timelineRow}>
                    <View>
                        <Text style={styles.timelineDate}>{flight.departureDate}</Text>
                        <Text style={styles.timelineTime}>{flight.departureTime}</Text>
                    </View>
                    <Text style={styles.durationText}>{flight.duration}</Text>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.timelineDate}>{flight.arrivalDate}</Text>
                        <Text style={styles.timelineTime}>{flight.arrivalTime}</Text>
                    </View>
                </View>

                {/* Route Visual */}
                <View style={styles.routeRow}>
                    <Text style={styles.bigAirportCode}>{flight.fromCode}</Text>
                    <View style={styles.planeIconContainer}>
                        <View style={styles.line} />
                        <Ionicons name="airplane" size={20} color="#0D1634" />
                        <View style={styles.line} />
                    </View>
                    <Text style={styles.bigAirportCode}>{flight.toCode}</Text>
                </View>

                {/* Airport Details */}
                <View style={styles.airportDetailsRow}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.airportName}>{flight.fromAirport}</Text>
                        <Text style={styles.cityState}>{flight.fromCity}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text style={styles.airportName}>{flight.toAirport}</Text>
                        <Text style={styles.cityState}>{flight.toCity}</Text>
                    </View>
                </View>

                {/* Passenger Control */}
                <View style={styles.passengerControl}>
                    <Text style={styles.passengerCountText}>{passengerCount} Passenger{passengerCount > 1 ? 's' : ''}</Text>
                    <View style={{ flexDirection: 'row', gap: 16 }}>
                        <TouchableOpacity onPress={() => setPassengerCount(Math.max(1, passengerCount - 1))}>
                            <MaterialIcons name="remove" size={24} color="#0D1634" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setPassengerCount(passengerCount + 1)}>
                            <MaterialIcons name="add" size={24} color="#0D1634" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* --- PAYMENT & TERMS SECTION --- */}

                {/* Add Card Section */}
                <TouchableOpacity style={styles.addCardButton}>
                    <MaterialIcons name="add" size={20} color="#42A5F5" />
                    <Text style={styles.addCardText}>Add new card</Text>
                </TouchableOpacity>

                <Text style={styles.creditsText}>No credits applied</Text>

                <View style={styles.divider} />

                {/* Pricing */}
                <View style={styles.pricingRow}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.totalPrice}>${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
                        <TouchableOpacity>
                            <Text style={styles.priceBreakdown}>Price breakdown</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Terms Toggles */}
                <View style={styles.toggleRow}>
                    <View style={{ flex: 1, paddingRight: 10 }}>
                        <Text style={styles.toggleLabel}>
                            I accept <Text style={styles.linkText}>Charter Flight Terms and Conditions</Text>
                        </Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#767577", true: "#42A5F5" }}
                        thumbColor={"#f4f3f4"}
                        onValueChange={setTermsAccepted}
                        value={termsAccepted}
                    />
                </View>

                <View style={styles.toggleRow}>
                    <View style={{ flex: 1, paddingRight: 10 }}>
                        <Text style={styles.toggleLabel}>
                            I accept the Terms of service including the Cancellation Policy below
                        </Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#767577", true: "#42A5F5" }}
                        thumbColor={"#f4f3f4"}
                        onValueChange={setServiceTermsAccepted}
                        value={serviceTermsAccepted}
                    />
                </View>

                {/* Scrollable Legal Text */}
                <View style={styles.legalScrollContainer}>
                    <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={true}>
                        <Text style={styles.legalText}>
                            This flight is offered as an empty-leg repositioning service and remains subject to operational availability. You acknowledge and agree that (i) because empty-leg schedules are highly flexible and dependent on prior charter activity, the flight may be modified or cancelled at any time before departure without liability to the operator, except that in such case the full charter fee will be refunded to you, and (ii) this purchase is strictly NON-REFUNDABLE and NON-TRANSFERABLE, except where required by applicable law. All sales are final. If you elect to cancel for any reason, fail to appear for the scheduled departure, or are otherwise unable to travel, no refund or credit will be issued. The operator reserves the right to substitute the aircraft with another model of equal or higher category to fulfill your itinerary.
                        </Text>
                    </ScrollView>
                </View>

            </ScrollView >

            {/* Footer Book Button */}
            < View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]} >
                <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>Book</Text>
                </TouchableOpacity>
            </View >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        paddingHorizontal: 24,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    iconButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0D1634',
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 100,
    },

    // Tag
    tagContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: '#E1BEE7',
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginBottom: 16,
        gap: 6
    },
    tagText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#9C27B0',
        letterSpacing: 0.5,
    },
    aircraftName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0D1634',
        marginBottom: 4,
    },
    aircraftCategory: {
        fontSize: 16,
        color: '#757575',
        marginBottom: 24,
    },
    timelineRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    timelineDate: {
        fontSize: 12,
        fontWeight: '600',
        color: '#757575',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    timelineTime: {
        fontSize: 18,
        fontWeight: '400',
        color: '#0D1634',
    },
    durationText: {
        fontSize: 14,
        color: '#757575',
    },
    routeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    bigAirportCode: {
        fontSize: 24,
        fontWeight: '800',
        color: '#0D1634',
    },
    planeIconContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#E0E0E0',
    },
    airportDetailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    airportName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#424242',
        marginBottom: 2,
    },
    cityState: {
        fontSize: 14,
        color: '#757575',
    },
    passengerControl: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        padding: 16,
        marginBottom: 32,
    },
    passengerCountText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0D1634',
    },

    // Payment & Terms
    addCardButton: {
        backgroundColor: '#F5F8FA',
        paddingVertical: 16,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    addCardText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#42A5F5', // App Blue
    },
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 16,
    },
    creditsText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0D1634',
    },
    pricingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    totalLabel: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0D1634',
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0D1634',
        marginBottom: 4,
    },
    priceBreakdown: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0D1634',
        textDecorationLine: 'underline',
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    toggleLabel: {
        fontSize: 14,
        color: '#000',
        fontWeight: '500',
        lineHeight: 20,
    },
    linkText: {
        textDecorationLine: 'underline',
        color: '#0D1634',
    },
    legalScrollContainer: {
        height: 140,
        marginTop: 12,
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    legalText: {
        fontSize: 13,
        color: '#666',
        lineHeight: 20,
    },
    // Footer
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        paddingHorizontal: 24,
        paddingTop: 16,
    },
    bookButton: {
        backgroundColor: '#0D1634', // Navy
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
    },
    bookButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    }
});
