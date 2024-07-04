import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import ProfilePhoto from "../../components/profileImg/profile";
import GuestsProfileImgSlide from "../../components/profileImgSlide";
import WidgetJoinList from "../../components/joinWidgetList";
import ContainerPaddingHorizontal from "../../components/containers/paddingHorinzontal";
import { FontSizes } from '../../constants/FontSizes.ts'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import profileDefault from '../../assets/images/unnamed.png'
import defaultImg from '../../assets/images/ilus.jpg';

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
                {avatar: profileDefault},
                {avatar: profileDefault},
                {avatar: profileDefault},
                {avatar: profileDefault},
            ],
            date: 'HOJE'
        }
    ]

    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="dark-content" />
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
                        <Entypo name="notification" size={24} color="white" />
                    </View>
                    <Text style={[FontSizes.title, {color:"#fff"}]}>Hello, {user.name}!</Text>
                    <Text style={[FontSizes.normalText, {color:"#fff"}]}>Sinta-se conectado com a sua estadia! ☀️</Text>
                </ContainerPaddingHorizontal>
            </View>
            <ContainerPaddingHorizontal>
                <View style={styles.guests}>
                    <View>
                        <Text style={FontSizes.subtitle}>Staying with you</Text>
                        {/* <Text style={FontSizes.body}>Clique duas vezes para deixar seu like</Text> */}
                    </View>
                    <GuestsProfileImgSlide />
                </View>
            </ContainerPaddingHorizontal>
            <ContainerPaddingHorizontal>
                <Text style={FontSizes.subtitle}>Events</Text>
                <View style={styles.newEventBtn}>
                    <Text style={FontSizes.body}>
                        Sugerir um evento
                    </Text>
                    <AntDesign name="arrowright" size={18} color="black" />
                </View>
                <WidgetJoinList data={events} />
            </ContainerPaddingHorizontal>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.gray,
        flex: 1
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
        marginTop: 5
    }
})