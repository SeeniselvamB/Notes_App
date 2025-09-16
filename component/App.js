import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home";
import UserAuth from "./components/UserAuth";
import Admin from "./components/Admin";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="User" component={UserAuth} />
                <Stack.Screen name="Admin" component={Admin} />
                <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
                <Stack.Screen name="UserDashboard" component={UserDashboard} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}