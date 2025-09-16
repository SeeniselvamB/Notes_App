import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "../styles/Home";

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>TripsChain App</Text>
            </View>

            {/* Welcome text */}
            <Text style={styles.title}>Welcome! Choose your role:</Text>

            {/* Admin Button */}
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.replace("Admin")}
            >
                <Icon name="settings-outline" size={40} color="#2196F3" />
                <Text style={styles.cardText}>Admin</Text>
            </TouchableOpacity>

            {/* User Button */}
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.replace("User")}
            >
                <Icon name="person-outline" size={40} color="#4CAF50" />
                <Text style={styles.cardText}>User</Text>
            </TouchableOpacity>
        </View>
    );
}
