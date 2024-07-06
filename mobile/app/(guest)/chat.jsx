import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import defaultImg from '@/assets/images/unnamed.png'
import { Colors } from "@/constants/Colors";
import CustomInput from "@/components/input/Input";
import { Ionicons } from '@expo/vector-icons';
import GuestsProfileImgSlide from "@/components/profileImgSlide";
import ContainerPaddingHorizontal from "@/components/containers/paddingHorinzontal";
import ChatComponent from "@/components/chat";

export default function Chat() {

    const chats = [
        {
            img: defaultImg,
            title: 'Maria',
            description: 'Are you sure?'
        },
        {
            img: defaultImg,
            title: 'Maria',
            description: 'Are you sure?'
        }
    ]

    if (chats.length > 0) {
        return (
            <ScrollView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <ContainerPaddingHorizontal>
                    <View style={styles.container2}>
                        <CustomInput icon={<Ionicons name="search-outline" size={24} color="black" />} placeholder="Search someone" />
                        <GuestsProfileImgSlide />
                        <ChatComponent data={chats} />
                    </View>
                </ContainerPaddingHorizontal>
            </ScrollView>
        )
    } else {
        return (
            <ScrollView>

            </ScrollView>
        )
    }
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