import { StyleSheet, View } from "react-native"

export default function ContainerPaddingHorizontal ({ children }) {
    return (
        <View style={styles.container}>{children}</View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    }
})
