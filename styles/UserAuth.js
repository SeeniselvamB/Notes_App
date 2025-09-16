import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eaf4fc",
        padding: 20,
    },
    header: {
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 25,
        color: "#1565c0",
    },
    input: {
        width: "90%",
        padding: 14,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    buttonPrimary: {
        backgroundColor: "#1976d2",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 15,
        width: "90%",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
    link: {
        color: "rgba(210, 114, 25, 1)",
        fontSize: 16,
        fontWeight: "600",
        marginTop: 10,
    },
});

export default styles;
