import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/UserProfile";

export default function UserProfile({ navigation }) {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    // Load current user
    useEffect(() => {
        const loadUser = async () => {
            const storedUser = await AsyncStorage.getItem("currentUser");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setName(parsedUser.name);
                setEmail(parsedUser.email);
                setPhone(parsedUser.phone || "");
            }
        };
        loadUser();
    }, []);

    const handleSave = async () => {
        if (!name || !email) {
            Alert.alert("Error", "Name and Email cannot be empty.");
            return;
        }

        const updatedUser = { ...user, name, email, phone };
        setUser(updatedUser);

        try {
            // Update currentUser in AsyncStorage
            await AsyncStorage.setItem("currentUser", JSON.stringify(updatedUser));

            // Also update in users array
            const users = JSON.parse(await AsyncStorage.getItem("users")) || [];
            const updatedUsers = users.map(u => (u.userId === user.userId ? updatedUser : u));
            await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));

            Alert.alert("Success", "Profile updated successfully!");
            setIsEditing(false);
        } catch (error) {
            console.log("Error updating user:", error);
        }
    };

    const handleSignOut = () => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            // Remove from users array
                            const users = JSON.parse(await AsyncStorage.getItem("users")) || [];
                            const updatedUsers = users.filter(u => u.userId !== user.userId);
                            await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));

                            // Remove currentUser
                            await AsyncStorage.removeItem("currentUser");

                            Alert.alert("Deleted", "Your account has been deleted.");
                            navigation.replace("UserAuth");
                        } catch (error) {
                            console.log("Error deleting account:", error);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    if (!user) {
        return (
            <View style={styles.profileContainer}>
                <Text style={styles.profileText}>No user information available.</Text>
            </View>
        );
    }

    return (
        <View style={styles.profileContainer}>
            {isEditing ? (
                <>
                    <Text style={styles.profileText}>User ID: {user.userId}</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Name"
                    />
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                    />
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Phone"
                    />

                    <TouchableOpacity style={styles.buttonPrimary} onPress={handleSave}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonOutline}
                        onPress={() => setIsEditing(false)}
                    >
                        <Text style={styles.buttonTextAlt}>Cancel</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Text style={styles.profileText}>User ID: {user.userId}</Text>
                    <Text style={styles.profileText}>Name: {user.name}</Text>
                    <Text style={styles.profileText}>Email: {user.email}</Text>
                    <Text style={styles.profileText}>Phone: {user.phone || "Not provided"}</Text>

                    <TouchableOpacity
                        style={styles.buttonPrimary}
                        onPress={() => setIsEditing(true)}
                    >
                        <Text style={styles.buttonText}>Edit Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonOutline} onPress={handleSignOut}>
                        <Text style={styles.buttonTextAlt}>Delete Account</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}
