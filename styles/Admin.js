import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff5f5",
        padding: 20,
    },
    header: {
        fontSize: 26,
        fontWeight: "700",
        color: "#d32f2f",
        marginBottom: 30,
    },
    input: {
        width: "100%",
        padding: 14,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: "#fff",
        fontSize: 16,
        elevation: 2,
    },
    buttonPrimary: {
        backgroundColor: "#d32f2f",
        paddingVertical: 14,
        borderRadius: 10,
        width: "100%",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,
        elevation: 3,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 8,
},

});

export default styles;
