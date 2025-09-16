import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/UserAuth";

export default function UserAuth({ navigation }) {
    const [isLogin, setIsLogin] = useState(true); // true = login, false = signup
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");

    const [users, setUsers] = useState([]);

    // Load users from AsyncStorage on mount
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const storedUsers = await AsyncStorage.getItem("users");
                if (storedUsers) setUsers(JSON.parse(storedUsers));
            } catch (error) {
                console.log("Error loading users:", error);
            }
        };
        loadUsers();
    }, []);

    // Save users to AsyncStorage
    const saveUsers = async (newUsers) => {
        try {
            await AsyncStorage.setItem("users", JSON.stringify(newUsers));
            setUsers(newUsers);
        } catch (error) {
            console.log("Error saving users:", error);
        }
    };

    const handleLogin = async () => {
        const userExists = users.find(u => u.email === email && u.password === password);
        if (userExists) {
            try {
                await AsyncStorage.setItem("currentUser", JSON.stringify(userExists));
            } catch (error) {
                console.log("Error saving current user:", error);
            }

            Alert.alert(
                "Success",
                `Welcome back, ${userExists.name}!`,
                [
                    { text: "OK", onPress: () => navigation.replace("UserDashboard") }
                ],
                { cancelable: false }
            );
        } else {
            Alert.alert("Error", "Invalid email or password");
        }
    };

    const handleSignup = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert("Error", "Please fill all fields");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }
        const userExists = users.find(u => u.email === email);
        if (userExists) {
            Alert.alert("Error", "User already exists with this email");
            return;
        }

        const newUser = { name, email, password };
        const updatedUsers = [...users, newUser];
        await saveUsers(updatedUsers);

        Alert.alert(
            "Success",
            "Account created successfully! Please login.",
            [
                { text: "OK", onPress: () => setIsLogin(true) }
            ],
            { cancelable: false }
        );

        // Clear fields after signup
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Text style={styles.header}>{isLogin ? "User Login" : "Sign Up"}</Text>

            {!isLogin && (
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={setName}
                />
            )}

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {!isLogin && (
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="#999"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            )}

            <TouchableOpacity
                style={styles.buttonPrimary}
                onPress={isLogin ? handleLogin : handleSignup}
            >
                <Text style={styles.buttonText}>{isLogin ? "Login" : "Sign Up"}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <Text style={styles.link}>
                    {isLogin ? "Don’t have an account? Sign Up" : "Already have an account? Login"}
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}
