import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import ContainerPaddingHorizontal from "@/components/containers/paddingHorinzontal";
import defaultImg from '@/assets/images/unnamed.png'
import Chat from "@/components/chat";
import { Colors } from "@/constants/Colors";

export default function Notifications() {

    const notifications = [
        {
            img: defaultImg,
            title: 'Daniel curtiu você!',
            description: 'Clique para iniciar conversa'
        }
    ]

    return (
        <ScrollView style={styles.container}>
            <ContainerPaddingHorizontal>
                <Chat data={notifications} />
            </ContainerPaddingHorizontal>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.gray,
        paddingVertical: 20
    }
})