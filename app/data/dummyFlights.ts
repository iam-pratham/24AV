export interface Flight {
    id: string;
    airline: string;
    flightNumber: string;
    fromCode: string; // e.g. GTH
    fromCity: string; // e.g. Gotham
    fromAirport: string; // e.g. Gotham International
    toCode: string;   // e.g. KHQ
    toCity: string;   // e.g. Khandaq
    toAirport: string; // e.g. Khandaq International
    departureTime: string; // e.g. "08:00 AM"
    departureDate: string; // e.g. "Dec 15 2025"
    arrivalTime: string;   // e.g. "10:30 AM"
    arrivalDate: string;   // e.g. "Dec 15 2025"
    duration: string;      // e.g. "2h 30m"
    price: number;
    aircraft: string;      // e.g. Citation Excel
    aircraftCategory: string; // e.g. Mid Size
}

export const DUMMY_FLIGHTS: Flight[] = [
    // Gotham (GTH) -> Khandaq (KHQ)
    {
        id: '1',
        airline: 'Wayne Air',
        flightNumber: 'WA101',
        fromCode: 'GTH',
        fromCity: 'Gotham',
        fromAirport: 'Gotham City International',
        toCode: 'KHQ',
        toCity: 'Khandaq',
        toAirport: 'Khandaq Royal Airport',
        departureTime: '11:40 AM',
        departureDate: 'Dec 15 2025',
        arrivalTime: '12:40 PM',
        arrivalDate: 'Dec 15 2025',
        duration: '1h 0m',
        price: 450,
        aircraft: 'Citation Excel',
        aircraftCategory: 'Mid Size',
    },
    {
        id: '2',
        airline: 'Black Adam Airways',
        flightNumber: 'BA777',
        fromCode: 'GTH',
        fromCity: 'Gotham',
        fromAirport: 'Gotham City International',
        toCode: 'KHQ',
        toCity: 'Khandaq',
        toAirport: 'Khandaq Royal Airport',
        departureTime: '02:00 PM',
        departureDate: 'Dec 15 2025',
        arrivalTime: '04:45 PM',
        arrivalDate: 'Dec 15 2025',
        duration: '2h 45m',
        price: 380,
        aircraft: 'Bombardier Global 6000',
        aircraftCategory: 'Heavy Jet',
    },
    {
        id: '3',
        airline: 'JSA Jets',
        flightNumber: 'JS900',
        fromCode: 'GTH',
        fromCity: 'Gotham',
        fromAirport: 'Gotham City International',
        toCode: 'KHQ',
        toCity: 'Khandaq',
        toAirport: 'Khandaq Royal Airport',
        departureTime: '09:00 PM',
        departureDate: 'Dec 15 2025',
        arrivalTime: '11:20 PM',
        arrivalDate: 'Dec 15 2025',
        duration: '2h 20m',
        price: 520,
        aircraft: 'Challenger 350',
        aircraftCategory: 'Super Mid Size',
    },

    // Khandaq (KHQ) -> Gotham (GTH)
    {
        id: '4',
        airline: 'Wayne Air',
        flightNumber: 'WA102',
        fromCode: 'KHQ',
        fromCity: 'Khandaq',
        fromAirport: 'Khandaq Royal Airport',
        toCode: 'GTH',
        toCity: 'Gotham',
        toAirport: 'Gotham City International',
        departureTime: '07:00 AM',
        departureDate: 'Dec 12 2025',
        arrivalTime: '09:30 AM',
        arrivalDate: 'Dec 12 2025',
        duration: '2h 30m',
        price: 440,
        aircraft: 'Citation Excel',
        aircraftCategory: 'Mid Size',
    },

    // Other routes for testing
    {
        id: '5',
        airline: 'Metropolis Air',
        flightNumber: 'MA555',
        fromCode: 'JFK',
        fromCity: 'New York',
        fromAirport: 'John F. Kennedy Intl',
        toCode: 'LHR',
        toCity: 'London',
        toAirport: 'Heathrow Airport',
        departureTime: '06:00 PM',
        departureDate: 'Dec 20 2025',
        arrivalTime: '06:00 AM',
        arrivalDate: 'Dec 21 2025',
        duration: '7h 0m',
        price: 850,
        aircraft: 'Gulfstream G650',
        aircraftCategory: 'Ultra Long Range',
    },
];
