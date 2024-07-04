import React, { useState } from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import defaultImg from '../../assets/images/unnamed.png';

const ImageInput = ({ onImageChange }) => {
  const [imageUri, setImageUri] = useState(null);

  const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setImageUri(uri);
        onImageChange(response.assets[0]);
      }
    });
  };

  const handleTakePhoto = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setImageUri(uri);
        onImageChange(response.assets[0]);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.btn} onPress={handleChoosePhoto}>
        <Image source={imageUri ? { uri: imageUri } : defaultImg} style={styles.image} />
      </Pressable>
      {/* <Button title="Tirar Foto" onPress={handleTakePhoto} /> */}
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
    padding: 20,
    borderRadius: 100,
    zIndex: 2,
  },
  btn: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'red',
  },
});

export default ImageInput;
