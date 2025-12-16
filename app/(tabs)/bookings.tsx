import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, StatusBar, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function BookingsScreen() {
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

    const renderContent = () => {
        if (activeTab === 'upcoming') {
            return (
                <View style={styles.emptyState}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Book a Flight</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
                {/* Placeholder for Past Trips */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.routeContainer}>
                            <Text style={styles.cityCode}>LHR</Text>
                            <Ionicons name="airplane" size={16} color="#9E9E9E" style={styles.flightIcon} />
                            <Text style={styles.cityCode}>JFK</Text>
                        </View>
                        <Text style={styles.date}>Dec 12, 2024</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.cardFooter}>
                        <Text style={styles.statusCompleted}>Completed</Text>
                        <Text style={styles.price}>$450.00</Text>
                    </View>
                </View>
            </ScrollView>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
            <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
                <Text style={styles.headerTitle}>Bookings</Text>
            </View>

            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
                    onPress={() => setActiveTab('upcoming')}
                >
                    <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>Upcoming</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'past' && styles.activeTab]}
                    onPress={() => setActiveTab('past')}
                >
                    <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>Past Trips</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {renderContent()}
            </View>
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
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#0D1634',
        letterSpacing: -0.5,
    },
    tabContainer: {
        flexDirection: 'row',
        marginHorizontal: 24,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        padding: 4,
        marginBottom: 24,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 21,
    },
    activeTab: {
        backgroundColor: '#000000',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#8898AA',
    },
    activeTabText: {
        color: '#FFFFFF',
    },
    content: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 24,
        paddingBottom: 20,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingBottom: 100, // Shift up to visually center on screen
    },

    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0D1634',
        marginBottom: 24,
        textAlign: 'center',
    },
    emptySubtitle: {
        fontSize: 15,
        color: '#8898AA',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 22,
    },
    button: {
        backgroundColor: '#000000',
        height: 56,
        width: '70%',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    routeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cityCode: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0D1634',
    },
    flightIcon: {
        marginHorizontal: 12,
    },
    date: {
        fontSize: 14,
        color: '#8898AA',
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F3F5',
        marginBottom: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statusCompleted: {
        fontSize: 13,
        fontWeight: '600',
        color: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0D1634',
    },
});
