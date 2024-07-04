import { Image, StyleSheet, View } from "react-native";
import profileDefault from '../../assets/images/unnamed.png'

function ProfilePhoto({ user }) {

    return (
        <View>
            <Image style={styles.img} source={user.profileImg ? user.profileImg : profileDefault} alt={user.name} />
        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        width: 45,
        height: 45,
        borderRadius: 50,
    }
})

export default ProfilePhoto
