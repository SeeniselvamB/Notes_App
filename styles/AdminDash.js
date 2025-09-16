import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f2f2f2",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    tripCard: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        elevation: 2,
    },
    tripText: {
        fontSize: 16,
        marginBottom: 5,
    },
    button: {
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
