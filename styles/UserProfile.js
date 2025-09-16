import { StyleSheet } from "react-native";

const profileStyles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        backgroundColor: "#f0f6ff",
        padding: 20,
        borderRadius: 12,
        margin: 10,
        elevation: 3,
    },

    profileText: {
        fontSize: 16,
        color: "#333",
        marginBottom: 12,
    },

    input: {
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#cfd8dc",
        fontSize: 16,
        color: "#000",
    },

    buttonPrimary: {
        backgroundColor: "#1976d2",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 10,
    },

    buttonOutline: {
        borderWidth: 2,
        borderColor: "#1976d2",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 10,
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },

    buttonTextAlt: {
        color: "#1976d2",
        fontSize: 16,
        fontWeight: "600",
    },
});

export default profileStyles;
