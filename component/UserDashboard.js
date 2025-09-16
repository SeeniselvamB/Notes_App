import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TripForm from "./TripForm";
import UserProfile from "./UserProfile";
import styles from "../styles/UserDash";

export default function UserDashboard({ navigation }) {
    const [activeTab, setActiveTab] = useState("trips"); // Default: My Trips
    const [myTrips, setMyTrips] = useState([]);
    const [tripHistory, setTripHistory] = useState([]);
    const [user, setUser] = useState(null);

    // Load logged-in user
    useEffect(() => {
        const loadUser = async () => {
            const storedUser = await AsyncStorage.getItem("currentUser");
            if (storedUser) setUser(JSON.parse(storedUser));
        };
        loadUser();
    }, []);

    const handleAddTrip = (trip) => {
        const newTrip = { id: `T${myTrips.length + 1}`, ...trip };
        setMyTrips([...myTrips, newTrip]);
    };

    const completeTrip = (tripId) => {
        const trip = myTrips.find((t) => t.id === tripId);
        if (trip) {
            setTripHistory([...tripHistory, { ...trip, time: `${trip.startTime} - ${trip.endTime}` }]);
            setMyTrips(myTrips.filter((t) => t.id !== tripId));
        }
    };

    const renderTripItem = ({ item }, isHistory = false) => (
        <View style={styles.card}>
            <Text style={styles.cardText}>Trip ID: {item.id}</Text>
            <Text style={styles.cardText}>From: {item.origin}</Text>
            <Text style={styles.cardText}>To: {item.destination}</Text>
            <Text style={styles.cardText}>Time: {item.time || `${item.startTime} - ${item.endTime}`}</Text>
            {!isHistory && (
                <TouchableOpacity style={styles.completeButton} onPress={() => completeTrip(item.id)}>
                    <Text style={styles.completeButtonText}>Mark as Completed</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            {/* Navbar */}
            <View style={{ backgroundColor: "#fff", paddingVertical: 15, paddingHorizontal: 20, elevation: 3 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={styles.header}>Welcome to TripsChain</Text>
                    
                    {/* Styled Logout Button */}
                    <TouchableOpacity
                        style={[styles.logoutButton, { marginLeft: 10 }]}
                        onPress={() => navigation.replace("Home")}
                    >
                        <Text style={styles.logoutButtonText}>Logout</Text>
                    </TouchableOpacity>
                </View>

                {/* Toggle Buttons */}
                <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "space-around" }}>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === "trips" && styles.tabButtonActive]}
                        onPress={() => setActiveTab("trips")}
                    >
                        <Text style={[styles.tabButtonText, activeTab === "trips" && styles.tabButtonTextActive]}>
                            My Trips
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === "profile" && styles.tabButtonActive]}
                        onPress={() => setActiveTab("profile")}
                    >
                        <Text style={[styles.tabButtonText, activeTab === "profile" && styles.tabButtonTextActive]}>
                            Profile
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === "history" && styles.tabButtonActive]}
                        onPress={() => setActiveTab("history")}
                    >
                        <Text style={[styles.tabButtonText, activeTab === "history" && styles.tabButtonTextActive]}>
                            Trip History
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Tab Content */}
            <View style={{ flex: 1, paddingHorizontal: 10, marginTop: 10 }}>
                {activeTab === "trips" && (
                    <>
                        <TripForm onSubmit={handleAddTrip} />
                        <FlatList
                            data={myTrips}
                            keyExtractor={(item) => item.id}
                            renderItem={(item) => renderTripItem(item)}
                            ListEmptyComponent={() => (
                                <Text style={{ textAlign: "center", marginTop: 20 }}>No trips added yet.</Text>
                            )}
                        />
                    </>
                )}

                {activeTab === "profile" && user && <UserProfile user={user} />}

                {activeTab === "history" && (
                    <FlatList
                        data={tripHistory}
                        keyExtractor={(item) => item.id}
                        renderItem={(item) => renderTripItem(item, true)}
                        ListEmptyComponent={() => (
                            <Text style={{ textAlign: "center", marginTop: 20 }}>No history yet.</Text>
                        )}
                    />
                )}
            </View>
        </View>
    );
}
