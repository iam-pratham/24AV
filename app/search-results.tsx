import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const FLIGHTS = [
    {
        id: 1,
        airline: 'Gulfstream G650',
        logo: require('../assets/images/icon.png'), // Placeholder or use correct asset if available
        departureTime: '07:47',
        departureCode: 'CGK',
        departureCity: 'Jakarta',
        duration: '7h 15m',
        arrivalTime: '14:30',
        arrivalCode: 'NRT',
        arrivalCity: 'Tokyo',
        price: '$321',
        color: '#E8F5E9', // Light green background for logo
        iconColor: '#2E7D32',
    },
    {
        id: 2,
        airline: 'Bombardier Global 7500',
        logo: require('../assets/images/icon.png'),
        departureTime: '07:47',
        departureCode: 'CGK',
        departureCity: 'Jakarta',
        duration: '7h 20m',
        arrivalTime: '14:30',
        arrivalCode: 'NRT',
        arrivalCity: 'Tokyo',
        price: '$321',
        color: '#FFEBEE', // Light red
        iconColor: '#C62828',
    },
    {
        id: 3,
        airline: 'Cessna Citation X',
        logo: require('../assets/images/icon.png'),
        departureTime: '07:47',
        departureCode: 'CGK',
        departureCity: 'Jakarta',
        duration: '7h 20m',
        arrivalTime: '14:30',
        arrivalCode: 'NRT',
        arrivalCity: 'Tokyo',
        price: '$321',
        color: '#E3F2FD', // Light blue
        iconColor: '#1565C0',
    },
];

export default function SearchResultsScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const params = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F7FA" />

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={24} color="#0D1634" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerTitle}>Search Results</Text>
                    <Text style={styles.headerSubtitle}>{params.from} to {params.to} • {params.date}</Text>
                </View>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {FLIGHTS.map((flight) => (
                    <View key={flight.id} style={styles.flightCard}>
                        {/* Top Section */}
                        <View style={styles.cardTop}>
                            <View style={styles.airlineRow}>
                                <View style={[styles.airlineIcon, { backgroundColor: flight.color }]}>
                                    {/* Using text specific color dot or icon if image not available, but user wants image */}
                                    <Text style={{ color: flight.iconColor, fontWeight: 'bold' }}>{flight.airline.charAt(0)}</Text>
                                </View>
                                <Text style={styles.airlineName}>{flight.airline}</Text>
                            </View>

                            <View style={styles.routeRow}>
                                <View>
                                    <Text style={styles.time}>{flight.departureTime}</Text>
                                    <View style={styles.codeRow}>
                                        <Text style={styles.code}>{flight.departureCode}</Text>
                                        <Text style={styles.city}>({flight.departureCity})</Text>
                                    </View>
                                </View>

                                <View style={styles.durationContainer}>
                                    <View style={styles.planeIconContainer}>
                                        <Ionicons name="airplane" size={16} color="#2563EB" />
                                    </View>
                                    <Text style={styles.durationText}>{flight.duration}</Text>
                                    <Text style={styles.dottedLine}>- - - - -</Text>
                                </View>

                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={styles.time}>{flight.arrivalTime}</Text>
                                    <View style={styles.codeRow}>
                                        <Text style={styles.code}>{flight.arrivalCode}</Text>
                                        <Text style={styles.city}>({flight.arrivalCity})</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Divider with Cutouts */}
                        <View style={styles.dividerContainer}>
                            <View style={styles.leftCutout} />
                            <View style={styles.dashedLine} />
                            <View style={styles.rightCutout} />
                        </View>

                        {/* Bottom Section */}
                        <View style={styles.cardBottom}>
                            <View>
                                <Text style={styles.price}>{flight.price}</Text>
                                <Text style={styles.perPerson}>/person</Text>
                            </View>

                            <TouchableOpacity
                                style={styles.selectButton}
                                onPress={() => router.push({
                                    pathname: '/booking-summary',
                                    params: {
                                        airline: flight.airline,
                                        price: flight.price,
                                        from: flight.departureCode,
                                        to: flight.arrivalCode,
                                        depTime: flight.departureTime,
                                        arrTime: flight.arrivalTime,
                                        date: params.date
                                    }
                                })}
                            >
                                <Text style={styles.selectButtonText}>Select flight</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
                <View style={{ height: 40 }} />
            </ScrollView>

            {/* Filter Button (Floating) */}
            <TouchableOpacity style={styles.filterButton}>
                <Ionicons name="filter" size={24} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#F5F7FA',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0D1634',
        textAlign: 'center',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#8898AA',
        textAlign: 'center',
        marginTop: 2,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },

    // Flight Card
    flightCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        marginBottom: 20,
        overflow: 'hidden', // Ensure cutouts look right if we used overlay, but we are using absolute views on top of white
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    cardTop: {
        padding: 20,
    },
    airlineRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    airlineIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    airlineName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0D1634',
    },
    routeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    time: {
        fontSize: 14,
        color: '#2563EB',
        fontWeight: '600',
        marginBottom: 4,
    },
    codeRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    code: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0D1634',
        marginRight: 4,
    },
    city: {
        fontSize: 12,
        color: '#9E9E9E',
    },
    durationContainer: {
        alignItems: 'center',
        marginTop: -10, // Adjust alignment
    },
    planeIconContainer: {
        marginBottom: 4,
    },
    durationText: {
        fontSize: 12,
        color: '#0D1634',
        fontWeight: '500',
    },
    dottedLine: {
        color: '#E0E0E0',
        fontSize: 10,
        marginTop: -4,
        letterSpacing: 2,
    },

    // Divider
    dividerContainer: {
        height: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dashedLine: {
        flex: 1,
        height: 1,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
        marginHorizontal: 20,
    },
    leftCutout: {
        position: 'absolute',
        left: -10,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#F5F7FA', // Match screen background
    },
    rightCutout: {
        position: 'absolute',
        right: -10,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#F5F7FA', // Match screen background
    },

    // Bottom Section
    cardBottom: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2563EB',
    },
    perPerson: {
        fontSize: 12,
        color: '#9E9E9E',
    },
    selectButton: {
        backgroundColor: '#000000',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 24,
    },
    selectButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14,
    },

    filterButton: {
        position: 'absolute',
        bottom: 40,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#ADC8FF', // Light blue/periwinkle from screenshot
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    }
});
