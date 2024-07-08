import React, { useState } from 'react';
import { View, Image, StyleSheet, Pressable, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import defaultImg from '@/assets/images/unnamed.png';

const ImageInput = ({ onImageChange, style }) => {
  const [imageUri, setImageUri] = useState(null);

  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos de permissões de acesso à câmera para funcionar!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
      onImageChange(result);
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos de permissões de acesso à câmera para funcionar!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri);
      onImageChange(result);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Pressable style={styles.btn} onPress={handleChoosePhoto}>
        <Image source={imageUri ? { uri: imageUri } : defaultImg} style={styles.image} />
      </Pressable>
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
});

export default ImageInput;
