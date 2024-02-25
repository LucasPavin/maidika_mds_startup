import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Image, Alert, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const ScanDocument = ({navigation, route}) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [showCrop, setShowCrop] = useState(false);
  const cropRef = useRef(null);

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

    const photo = await cameraRef.takePictureAsync();
    setCapturedImage(photo);
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
        ref={ref => {
          cameraRef = ref;
        }}
      >
        <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
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
          <Image source={{ uri: capturedImage.uri }} style={{ flex: 1 }} resizeMode="contain" />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cropButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Sauvegarder</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        renderCamera()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  captureButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 15,
    marginBottom: 20,
  },
  retakeButton: {
    backgroundColor: Colors.teal,
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  cropButton: {
    backgroundColor: Colors.blue,
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionDeniedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionDeniedText: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default ScanDocument;
