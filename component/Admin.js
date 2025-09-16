// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
// import styles from "../styles/Admin";

// export default function Admin({ navigation }) {   
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");

//     const handleAdminLogin = () => {
//         if (username === "admin" && password === "admin123") {
//             Alert.alert("Success", "Welcome Admin!", [
//                 { text: "Go to Dashboard", onPress: () => navigation.replace("AdminDashboard") }
//             ]);
//         } else {
//             Alert.alert("Error", "Invalid admin credentials");
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.header}>🔑 Admin Login</Text>

//             <TextInput
//                 style={styles.input}
//                 placeholder="Username"
//                 placeholderTextColor="#999"
//                 value={username}
//                 onChangeText={setUsername}
//             />

//             <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 placeholderTextColor="#999"
//                 secureTextEntry
//                 value={password}
//                 onChangeText={setPassword}
//             />

//             <TouchableOpacity style={styles.buttonPrimary} onPress={handleAdminLogin}>
//                 <Text style={styles.buttonText}>Login</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//                 style={[styles.buttonPrimary, { backgroundColor: "#555" }]}
//                 onPress={() => navigation.replace("Home")}
//             >
//                 <Text style={styles.buttonText}>Back to Home</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "../styles/Admin";

export default function Admin({ navigation }) {   
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleAdminLogin = () => {
        if (username === "admin" && password === "admin123") {
            // Directly navigate to Admin Dashboard
            navigation.replace("AdminDashboard");
        } else {
            Alert.alert("Error", "Invalid admin credentials");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>🔑 Admin Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#999"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.buttonPrimary} onPress={handleAdminLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.buttonPrimary, { backgroundColor: "#555" }]}
                onPress={() => navigation.replace("Home")}
            >
                <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
}
