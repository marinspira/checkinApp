import React, { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AuthView from '@/components/containers/AuthView.jsx';
import GuestProfileContext from "@/contexts/GuestProfileContext";
import AuthContext from "@/contexts/AuthContext/AuthContext";
import Checkin from "@/components/checkin";
import WidgetWhite from "../../components/widget";
import biking from '@/assets/images/biking.png'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import luggage from '@/assets/images/luggage.png'
import { Colors } from "@/constants/Colors.ts";
import ImageInput from '@/components/input/ImageInput.jsx'

export default function Account() {
    const [view, setView] = useState('home');

    const { logout } = useContext(AuthContext)
    const { guestDetails } = useContext(GuestProfileContext)

    if (view === 'home') {
        return (
            <AuthView
                // profileImg={{
                //     onProfileChange: () => { },
                //     profileImg: guestDetails?.profileImg,
                //     width: 150,
                //     height: 150
                // }}
                alternativeStyle={styles.container}
                backgroundColor={Colors.gray}
            >
                <ImageInput
                    profileImg={guestDetails?.profileImg}
                    width={150}
                    height={150}
                />
                <View style={styles.guestNameContent}>
                    <Text style={styles.guestNameText}>{guestDetails?.firstName} Maria</Text>
                    {/* <View style={styles.xpContainer}>
                        <View style={styles.xp}>
                            <Text style={styles.xpText}>4,9</Text>
                            <Fontisto name="star" size={16} color="black" />
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.xp}>
                            <Text style={styles.xpText}>5</Text>
                            <MaterialIcons name="backpack" size={18} color="black" />
                        </View>
                    </View> */}
                </View>
                <WidgetWhite
                    link=""
                    onPress={() => setView('checkin')}
                    title="Edit checkin details"
                    subtitle="I am a guest"
                    image={{
                        src: luggage,
                        style: {
                            width: 120,
                            height: 120,
                        },
                    }}
                />
                <WidgetWhite
                    link=""
                    onPress={() => setView('checkin')}
                    title="Edit staff details"
                    subtitle="I am a staff"
                    image={{
                        src: biking,
                        style: {
                            width: 120,
                            height: 120,
                        }
                    }}
                />
                <Pressable onPress={logout} style={styles.loggoutBtn}>
                    <Text style={styles.loggoutBtnText}>Log out</Text>
                    <AntDesign name="logout" size={16} color="black" />
                </Pressable>
            </AuthView >
        );
    } else if (view === 'checkin') {
        return <Checkin closeWindow={() => setView('home')} />;
    }

}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        height: '100%',
        top: 25
    },
    loggoutBtn: {
        marginVertical: 25,
        borderRadius: 20,
        paddingHorizontal: 30,
        flexDirection: 'row',
        gap: 10
    },
    loggoutBtnText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'black',
        fontWeight: '600'
    },
    guestNameContent: {
        width: '100%',
        paddingVertical: 20,
        marginBottom: 30,
    },
    guestNameText: {
        fontSize: 35,
        fontWeight: '600',
        paddingHorizontal: 25,
        color: 'black',
        textAlign: 'center'
    },
    xpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    xp: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        justifyContent: 'center'
    },
    xpText: {
        fontSize: 18,
        fontWeight: '600'
    },
    divider: {
        width: 2,
        height: '100%',
        backgroundColor: 'black',
        marginHorizontal: 15,
    },
});
