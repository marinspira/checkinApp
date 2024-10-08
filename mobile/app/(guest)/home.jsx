import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors.ts";
import ProfilePhoto from "@/components/profileImg/profile.jsx";
import GuestsProfileImgSlide from "@/components/profileImgSlide/index.jsx";
import WidgetJoinList from "@/components/joinWidgetList/index.jsx";
import ContainerPaddingHorizontal from "@/components/containers/paddingHorinzontal.jsx";
import { FontSizes } from '@/constants/FontSizes.ts'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import profileDefault from '@/assets/images/unnamed.png'
import defaultImg from '@/assets/images/ilus.jpg';

export default function Home() {

    const user = {
        name: "Maria",
        profileImg: profileDefault
    }

    const events = [
        {
            img: defaultImg,
            name: 'Aula de surf',
            people: [
                { avatar: profileDefault },
                { avatar: profileDefault },
                { avatar: profileDefault },
                { avatar: profileDefault },
            ],
            imgs: [defaultImg, defaultImg],
            date: 'HOJE'
        }
    ]

    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <ContainerPaddingHorizontal>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 25
                        }}>
                        <ProfilePhoto user={user} />
                    </View>
                    <Text style={[FontSizes.title, { color: "#fff" }]}>Hello, {user.name}!</Text>
                    <Text style={[FontSizes.normalText, { color: "#fff" }]}>Feel connected to your stay! ☀️</Text>
                </ContainerPaddingHorizontal>
            </View>
            <ContainerPaddingHorizontal>
                <View style={styles.guests}>
                    <View>
                        <Text style={FontSizes.subtitle}>Staying with you</Text>
                    </View>
                    <GuestsProfileImgSlide />
                </View>
            </ContainerPaddingHorizontal>
            <ContainerPaddingHorizontal>
                <Text style={FontSizes.subtitle}>Events</Text>
                <View style={styles.newEventBtn}>
                    <View style={styles.btnEvent}>
                        <Text style={[FontSizes.body, { color: 'white', marginTop: 3 }]}>
                            Suggest an event
                        </Text>
                        <AntDesign name="arrowright" size={16} color="white" />
                    </View>
                </View>
                <WidgetJoinList data={events} btnText="Join" />
            </ContainerPaddingHorizontal>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.gray,
        flex: 1,
    },
    header: {
        backgroundColor: Colors.lilac,
        paddingTop: 100,
        paddingBottom: 30,
        marginBottom: 20
    },
    guests: {
        gap: 10,
        marginBottom: 40,
        marginTop: 20
    },
    intro: {
        fontSize: 35,
        fontWeight: "600",
        paddingBottom: 10,
        paddingTop: 20
    },
    newEventBtn: {
        gap: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'start',
        marginTop: 5,
    },
    btnEvent: {
        backgroundColor: Colors.lilac,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center'
    }
})