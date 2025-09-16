import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        padding: 20,
        alignItems: "center",
    },
    header: {
        width: "100%",
        padding: 15,
        backgroundColor: "#6200ee",
        borderRadius: 10,
        marginBottom: 30,
        alignItems: "center",
    },
    headerText: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 20,
        textAlign: "center",
        color: "#333",
    },
    card: {
        width: "80%",
        padding: 20,
        backgroundColor: "#fff",
        marginVertical: 10,
        borderRadius: 12,
        alignItems: "center",
        elevation: 4, // shadow on Android
        shadowColor: "#000", // shadow on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    cardText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: "500",
        color: "#333",
    },
});

export default styles;
