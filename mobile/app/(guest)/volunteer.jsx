import { ScrollView, StyleSheet, Text } from "react-native";
import CustomInput from "@/components/input/Input";
import { Ionicons } from "@expo/vector-icons";
import ContainerPaddingHorizontal from "@/components/containers/paddingHorinzontal";
import { Colors } from "@/constants/Colors";
import WidgetJoinList from "@/components/joinWidgetList";
import defaultImg from '@/assets/images/ilus.jpg';
import profileDefault from '@/assets/images/unnamed.png'

export default function Volunteer() {

    const positions = [
        {
            img: defaultImg,
            name: 'Reception in Zagreb',
            people: [
                { avatar: profileDefault },
                { avatar: profileDefault },
                { avatar: profileDefault },
                { avatar: profileDefault },
            ],
            local: 'Zagreb, Croatia'
        }
    ]

    return (
        <ScrollView style={styles.container}>
            <ContainerPaddingHorizontal>
                <CustomInput icon={<Ionicons name="search-outline" size={24} color="black" />} placeholder="Where do you want to go?" />
                <WidgetJoinList data={positions} btnText="Ver mais"/>
            </ContainerPaddingHorizontal>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.lilac,
        paddingVertical: 15
    }
})