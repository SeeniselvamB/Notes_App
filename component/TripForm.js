import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "../styles/TripFormStyles";

export default function TripForm({ onSubmit }) {
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleSubmit = () => {
        if (!origin || !destination || !startTime || !endTime) {
            Alert.alert("Error", "Please fill all fields");
            return;
        }

        onSubmit({ origin, destination, startTime, endTime });
        setOrigin("");
        setDestination("");
        setStartTime("");
        setEndTime("");
        Alert.alert("Success", "Trip added successfully!");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add a New Trip</Text>
            <TextInput style={styles.input} placeholder="Origin" value={origin} onChangeText={setOrigin} />
            <TextInput style={styles.input} placeholder="Destination" value={destination} onChangeText={setDestination} />
            <TextInput style={styles.input} placeholder="Start Time (e.g., 08:00 AM)" value={startTime} onChangeText={setStartTime} />
            <TextInput style={styles.input} placeholder="End Time (e.g., 09:00 AM)" value={endTime} onChangeText={setEndTime} />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Add Trip</Text>
            </TouchableOpacity>
        </View>
    );
}
