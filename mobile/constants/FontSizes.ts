// styles.js
import { StyleSheet } from 'react-native';

const baseFontSize = 16; 

export const FontSizes = StyleSheet.create({

    smallText: {
        fontSize: baseFontSize * 0.75,
    },
    normalText: {
        fontSize: baseFontSize, // 16
    },
    largeText: {
        fontSize: baseFontSize * 1.25,
    },
    extraLargeText: {
        fontSize: baseFontSize * 1.4,
        fontWeight: '600',
        marginBottom: 5
    },
    title: {
        fontSize: baseFontSize * 2,
        fontWeight: 'bold',
        marginBottom: 6
    },
    subtitle: {
        fontSize: baseFontSize * 1.7, 
        fontWeight: '600',
        marginBottom: 6
    },
    body: {
        fontSize: baseFontSize,
        fontWeight: '400',
        marginBottom: 4
    },
});
