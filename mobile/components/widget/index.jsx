import { Link } from 'expo-router'
import React from 'react'
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'

export default function WidgetWhite({ link, onPress, title, subtitle, icon, image, backgroundImage }) {
    return (
        <Link href={link ? link : ''}>
            <Pressable onPress={onPress} style={[styles.btn]}>
                <ImageBackground source={backgroundImage?.src} style={backgroundImage?.style}>
                    <View style={styles.content}>
                        <Text style={styles.btnText}>{subtitle}</Text>
                        <Text style={styles.btnTextBold}>{title}</Text>
                    {icon}
                    </View>
                </ImageBackground>
                <Image source={image?.src} style={image?.style} alt={title} resizeMode={image.resizeMode} />
            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    btn: {
        borderColor: "#000",
        marginBottom: 5,
        width: 250,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        justifyContent: "space-between",
    },
    content: {
        paddingLeft: 20,
        paddingVertical: 20,
        zIndex: 3
    },
    btnText: {
        fontFamily: "SpaceMono",
        textTransform: "lowercase",
        color: "#000",
        fontSize: 17,
    },
    btnTextBold: {
        fontSize: 20,
        fontWeight: "600",
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
});