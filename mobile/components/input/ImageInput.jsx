import React, { useState } from 'react';
import { View, Image, StyleSheet, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import defaultImg from '@/assets/images/unnamed.png';
import { FontAwesome5 } from '@expo/vector-icons';

const ImageInput = ({ onProfileChange, style, label }) => {
  const [imageInfo, setImageInfo] = useState({ uri: null, name: null });

  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera access permissions to work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageName = result.assets[0].fileName || result.assets[0].uri.split('/').pop();
      setImageInfo({ uri: result.assets[0].uri, name: imageName });
      onProfileChange(result);
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera access permissions to work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageName = result.assets[0].fileName || result.assets[0].uri.split('/').pop();
      setImageInfo({ uri: result.assets[0].uri, name: imageName });
      onProfileChange(result);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {label ? (
        <View style={{ width: '100%' }}>
          <Text style={styles.btnSimpleLabel}>{label}</Text>
          <Pressable style={styles.btnSimple} onPress={handleChoosePhoto}>
            <FontAwesome5 name="file-image" size={24} color="black" />
            <Text>{imageInfo.name || "Click here to upload"}</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable style={styles.btn} onPress={handleChoosePhoto}>
          <Image source={imageInfo.uri ? { uri: imageInfo.uri } : defaultImg} style={styles.image} />
        </Pressable>
      )}
      {/* 
      <Button title="Tirar Foto" onPress={handleTakePhoto} />
      Uncomment above if you want to enable camera capture
      */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderColor: "#fff",
    borderWidth: 5
  },
  btn: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSimple: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 30,
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
  },
  btnSimpleLabel: {
    textAlign: 'left',
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 5,
  }
});

export default ImageInput;