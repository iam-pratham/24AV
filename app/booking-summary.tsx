import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Switch, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';

const PAYMENT_METHODS = [
    { id: 'card', label: 'Credit Card', icon: 'credit-card' },
    { id: 'razorpay', label: 'Razorpay', icon: 'bank' },
    { id: 'paypal', label: 'PayPal', icon: 'paypal' },
];

export default function BookingSummaryScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const params = useLocalSearchParams();

    // Parsing potentially non-existent details for preview, or use params
    const flightDetails = {
        airline: params.airline || 'Gulfstream G650',
        from: params.from || 'CGK',
        to: params.to || 'NRT',
        date: params.date || 'Tue, 2 Apr',
        departureTime: params.depTime || '07:47',
        arrivalTime: params.arrTime || '14:30',
        basePrice: Number(params.price?.toString().replace('$', '')) || 321,
    };

    const [passengers, setPassengers] = useState(1);
    const [selectedPayment, setSelectedPayment] = useState('card');
    const [agreeCharter, setAgreeCharter] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);

    const totalPrice = flightDetails.basePrice * passengers;

    const handlePassengerCount = (increment: boolean) => {
        setPassengers((prev) => {
            if (!increment && prev <= 1) return 1;
            return increment ? prev + 1 : prev - 1;
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={24} color="#0D1634" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Booking Summary</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Flight Summary Card */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Flight Details</Text>
                    <View style={styles.card}>
                        <View style={styles.airlineRow}>
                            <Text style={styles.airlineName}>{flightDetails.airline}</Text>
                            <Text style={styles.dateText}>{flightDetails.date}</Text>
                        </View>

                        <View style={styles.routeRow}>
                            <View>
                                <Text style={styles.cityCode}>{flightDetails.from}</Text>
                                <Text style={styles.timeText}>{flightDetails.departureTime}</Text>
                            </View>
                            <Ionicons name="airplane" size={20} color="#2563EB" />
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={styles.cityCode}>{flightDetails.to}</Text>
                                <Text style={styles.timeText}>{flightDetails.arrivalTime}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Pricing / Passengers */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Passengers & Price</Text>
                    <View style={styles.card}>
                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>Price per person</Text>
                            <Text style={styles.priceValue}>${flightDetails.basePrice}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.counterRow}>
                            <Text style={styles.counterLabel}>Passengers</Text>
                            <View style={styles.counterControls}>
                                <TouchableOpacity
                                    style={styles.counterBtn}
                                    onPress={() => handlePassengerCount(false)}
                                >
                                    <MaterialIcons name="remove" size={20} color="#0D1634" />
                                </TouchableOpacity>
                                <Text style={styles.passengerCount}>{passengers}</Text>
                                <TouchableOpacity
                                    style={styles.counterBtn}
                                    onPress={() => handlePassengerCount(true)}
                                >
                                    <MaterialIcons name="add" size={20} color="#0D1634" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Payment Methods */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.paymentList}>
                        {PAYMENT_METHODS.map((method) => (
                            <TouchableOpacity
                                key={method.id}
                                style={[
                                    styles.paymentCard,
                                    selectedPayment === method.id && styles.paymentCardSelected
                                ]}
                                onPress={() => setSelectedPayment(method.id)}
                            >
                                <FontAwesome
                                    name={method.icon as any}
                                    size={24}
                                    color={selectedPayment === method.id ? '#FFFFFF' : '#0D1634'}
                                    style={{ marginBottom: 8 }}
                                />
                                <Text style={[
                                    styles.paymentLabel,
                                    selectedPayment === method.id && styles.paymentLabelSelected
                                ]}>
                                    {method.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Terms Toggles */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Terms & Conditions</Text>

                    <View style={styles.toggleRow}>
                        <Text style={styles.toggleText}>I accept the Charter Flight Terms and Conditions</Text>
                        <Switch
                            trackColor={{ false: "#E0E0E0", true: "#2563EB" }}
                            thumbColor={"#FFFFFF"}
                            onValueChange={setAgreeCharter}
                            value={agreeCharter}
                        />
                    </View>

                    <View style={styles.toggleRow}>
                        <Text style={styles.toggleText}>I accept Terms of Service including the cancellation policy</Text>
                        <Switch
                            trackColor={{ false: "#E0E0E0", true: "#2563EB" }}
                            thumbColor={"#FFFFFF"}
                            onValueChange={setAgreeTerms}
                            value={agreeTerms}
                        />
                    </View>
                </View>

                <View style={{ height: 100 }} />

            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.totalRow}>
                    <View>
                        <Text style={styles.totalLabel}>Total Price</Text>
                        <TouchableOpacity>
                            <Text style={styles.breakdownLink}>View Breakdown</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.totalPrice}>${totalPrice}</Text>
                </View>

                <TouchableOpacity style={styles.payButton}>
                    <Text style={styles.payButtonText}>Pay Now</Text>
                </TouchableOpacity>
            </View>
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
        fontSize: 20,
        fontWeight: '700',
        color: '#0D1634',
    },
    scrollContent: {
        padding: 20,
    },
    sectionContainer: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0D1634',
        marginBottom: 12,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    airlineRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    airlineName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0D1634',
    },
    dateText: {
        color: '#8898AA',
        fontSize: 14,
    },
    routeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cityCode: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2563EB',
    },
    timeText: {
        fontSize: 14,
        color: '#0D1634',
        marginTop: 4,
    },
    // Pricing
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    priceLabel: {
        fontSize: 14,
        color: '#8898AA',
    },
    priceValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0D1634',
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F3F5',
        marginBottom: 16,
    },
    counterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    counterLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0D1634',
    },
    counterControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        backgroundColor: '#F5F7FA',
        borderRadius: 24,
        padding: 4,
    },
    counterBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    passengerCount: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0D1634',
        minWidth: 20,
        textAlign: 'center',
    },
    // Payment
    paymentList: {
        paddingRight: 10,
        gap: 12,
    },
    paymentCard: {
        width: 120,
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paymentCardSelected: {
        backgroundColor: '#0D1634',
        borderColor: '#0D1634',
    },
    paymentLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0D1634',
    },
    paymentLabelSelected: {
        color: '#FFFFFF',
    },
    // Toggles
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
    },
    toggleText: {
        flex: 1,
        fontSize: 13,
        color: '#525F7F',
        marginRight: 16,
        lineHeight: 18,
    },
    // Footer
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        padding: 24,
        paddingTop: 16,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 10,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    totalLabel: {
        fontSize: 14,
        color: '#8898AA',
    },
    breakdownLink: {
        fontSize: 12,
        color: '#2563EB',
        fontWeight: '600',
        marginTop: 2,
    },
    totalPrice: {
        fontSize: 28,
        fontWeight: '800',
        color: '#0D1634',
    },
    payButton: {
        backgroundColor: '#000000',
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    payButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});
