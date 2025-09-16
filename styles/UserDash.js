import { StyleSheet } from "react-native";

const dash = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f6ff",
        padding: 20,
    },

    // Header
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    header: {
        fontSize: 26,
        fontWeight: "700",
        color: "#1565c0",
    },
    subText: {
        fontSize: 16,
        color: "#555",
        marginBottom: 15,
    },

    // Logout button
    logoutButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: "#ff5252",
    },
    logoutButtonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
    },

    // Tabs
    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 15,
    },
    tabButton: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: "#e3f2fd",
        alignItems: "center",
    },
    tabButtonActive: {
        backgroundColor: "#1976d2",
    },
    tabButtonText: {
        fontSize: 14,
        color: "#1976d2",
        fontWeight: "600",
    },
    tabButtonTextActive: {
        color: "#fff",
    },

    // Cards (Trips & History)
    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 14,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardText: {
        fontSize: 16,
        color: "#333",
        marginBottom: 6,
    },

    // Complete button inside cards
    completeButton: {
        backgroundColor: "#28a745",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    completeButtonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
    },

    // Profile
    profileContainer: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 14,
        marginBottom: 20,
        elevation: 3,
    },
    profileText: {
        fontSize: 16,
        color: "#333",
        marginBottom: 10,
    },

    // Buttons
    buttonPrimary: {
        backgroundColor: "#1976d2",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 15,
    },
    buttonOutline: {
        borderWidth: 2,
        borderColor: "#1976d2",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 15,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    buttonTextAlt: {
        color: "rgba(210, 114, 25, 1)",
        fontSize: 16,
        fontWeight: "600",
    },
    // Logout button
logoutButton: {
    backgroundColor: "#ff5252",
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 4,
},
logoutButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
},



    
});

export default dash;
