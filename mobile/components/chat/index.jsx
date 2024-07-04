import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { FontSizes } from "../../constants/FontSizes";

export default function Chat({ data }) {
    return (
        <>
            {data.map((chat, index) => (
                <View key={index} style={styles.chat}>
                    <Image style={styles.img} source={chat.img} alt={chat.title} />
                    <View>
                        <Text style={FontSizes.extraLargeText}>{chat.title}</Text>
                        <Text style={FontSizes.normalText}>{chat.description}</Text>
                    </View>
                </View>
            ))}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.gray
    },
    container2: {
        gap: 20,
        paddingVertical: 30
    },
    chat: {
        display: 'flex',
        flexDirection: "row",
        padding: 20,
        alignItems: 'center',
        gap: 20,
        borderBottomWidth: 1,
        borderColor: Colors.gray,
        backgroundColor: "#fff",
        borderRadius: 10,
        // marginVertical: 5
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 100
    }
})