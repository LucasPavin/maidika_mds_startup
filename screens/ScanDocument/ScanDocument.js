import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Image, Alert, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import Header from '../../components/Header';
import ButtonTreatmenDetails from '../../components/ButtonTreatmenDetails';

const ScanDocument = ({navigation, route}) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const { user } = route.params;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (!hasCameraPermission) {
      Alert.alert('Permission not granted', 'Please allow access to the camera.');
      return;
    }

    setTimeout(async () => {
      const photo = await cameraRef.takePictureAsync();
      setCapturedImage(photo);
    }, 500);
  };

  const handleRetake = () => {
    setCapturedImage(null); 
  };

  const handleSave = () => {
    if (capturedImage) {
      navigation.navigate('InsertPrescription', { capturedImage, user }); // Navigate to next page and pass the captured image as parameter
    } else {
      Alert.alert('No captured image', 'Please capture an image first.');
    }
  };

  const renderCamera = () => {
    return (
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        autoFocus={Camera.Constants.AutoFocus.on}
        ref={ref => {
          cameraRef = ref;
        }}
      >
        <View style={styles.backButton}>
          <TouchableOpacity style={styles.backButtonTouchable} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={16} color="black" />
            <Text>Retour</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerCamera}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <Ionicons name="camera" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {hasCameraPermission === null ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : hasCameraPermission === false ? (
        <View style={styles.permissionDeniedContainer}>
          <Text style={styles.permissionDeniedText}>Permission to access camera was denied</Text>
        </View>
      ) : capturedImage ? (
        <View style={{ flex: 1 }}>
          <View style={styles.containerPreview}>
            <Header/>
            <View style={styles.previewPictureBack}>
              <TouchableOpacity style={styles.previewPictureBackTouchable} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={16} color="black" />
                <Text>Retour</Text>
              </TouchableOpacity>
            </View>
            <Image source={{ uri: capturedImage.uri }} style={styles.previewPicture} resizeMode="cover" />
            <View style={styles.buttonContainer}>
              <ButtonTreatmenDetails type="teal" style={styles.buttonContainerRetake} onPress={handleRetake}>Reprendre une photo</ButtonTreatmenDetails>
              <ButtonTreatmenDetails type="blue" style={styles.buttonContainerSave} onPress={handleSave}>Sauvegarder la photo&</ButtonTreatmenDetails>
            </View>
          </View>
        </View>
      ) : (
        renderCamera()
      )}
    </View>
  );
};

export default ScanDocument;
