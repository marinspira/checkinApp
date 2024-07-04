import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FontSizes } from '../../constants/FontSizes';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import defaultImg from '../../assets/images/ilus.jpg';
import ProfilesGroup from '../profilesGroup';

function WidgetJoinList({ data }) {

    return (
        <View>
            {data.map((item, index) => (
                <View style={styles.container} key={index}>
                    <Image
                        source={item.img ? item.img : defaultImg}
                        style={styles.img}
                    />
                    <View style={styles.content}>
                        <Text style={FontSizes.body}>{item.date ? item.date : item.local}</Text>
                        <Text style={FontSizes.subtitle}>{item.name}</Text>
                        <View style={styles.content2}>
                            <ProfilesGroup people={item.people} />
                            <View style={styles.btn}>
                                <Text style={styles.btnText}>Join</Text>
                                <AntDesign name="arrowright" size={24} color="white" />
                            </View>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        marginTop: 25,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    img: {
        width: 300,
        height: 150,
        objectFit: 'cover',
        borderRadius: 5,
        marginBottom: 20
    },
    btn: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: "row",
        gap: 5,
        alignItems: 'center',
        backgroundColor: "#000",
        borderRadius: 34,
    },
    btnText: {
        color: "#fff",
        fontSize: 16
    },
    content: {
        flexDirection: "column",
        alignItems: 'flex-start'
    },
    content2: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 0
    }
});

export default WidgetJoinList;
