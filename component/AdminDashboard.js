import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "../styles/AdminDash"; // Import separate style file

export default function AdminDashboard({ navigation }) {
    const [trips, setTrips] = useState([]);

    // Simulate fetching trips from backend
    useEffect(() => {
        const mockTrips = [
            { id: "T001", user: "U123", origin: "Thiruvananthapuram", destination: "Kazhakoottam", startTime: "08:15 AM", endTime: "09:00 AM" },
            { id: "T002", user: "U456", origin: "Kochi", destination: "Alleppey", startTime: "10:00 AM", endTime: "12:00 PM" },
            { id: "T003", user: "U789", origin: "Bangalore", destination: "Mysore", startTime: "07:30 AM", endTime: "10:30 AM" },
        ];
        setTrips(mockTrips);
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.tripCard}>
            <Text style={styles.tripText}>Trip ID: {item.id}</Text>
            <Text style={styles.tripText}>User ID: {item.user}</Text>
            <Text style={styles.tripText}>From: {item.origin}</Text>
            <Text style={styles.tripText}>To: {item.destination}</Text>
            <Text style={styles.tripText}>Start: {item.startTime} | End: {item.endTime}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>🛫 Admin Dashboard</Text>

            <FlatList
                data={trips}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

            <TouchableOpacity
                style={[styles.button, { backgroundColor: "#555" }]}
                onPress={() => navigation.replace("Admin")}
            >
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}
