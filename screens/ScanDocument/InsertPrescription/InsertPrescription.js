import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { insertPrescription, createPrescriptionTable } from '../../../database/sqlite-database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';


const InsertPrescription = ({ navigation, route }) => {
    const { user } = route.params;
    const { capturedImage } = route.params;
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [userId, setUserId] = useState(null);

    const convertImageToBase64 = async (uri) => {
        try {
          // Lire l'image en tant que base64
          const base64Image = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          return base64Image;
        } catch (error) {
          console.error('Error converting image to base64:', error);
          throw error;
        }
    };

    useEffect(() => {
        createPrescriptionTable()
            .then(() => console.log('Table des ordonnances créée avec succès'))
            .catch(error => console.error('Erreur lors de la création de la table des ordonnances : ', error));
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser) {
                    setUserId(parsedUser.id);
                } else {
                    console.error('User not found');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, []);

    const handleSave = async () => {
        try {
          if (!title.trim() || !comment.trim()) {
            Alert.alert('Incomplete form', 'Please fill in all fields.');
            return;
          }
      
          if (!userId) {
            console.error('User not found');
            return;
          }
      
          await insertPrescription(capturedImage.uri, title, new Date().toISOString(), comment, userId);
    
          navigation.navigate('DocumentView', { onGoBack: () => refreshData(), user });

          Alert.alert('Success', 'Prescription inserted successfully.');
        } catch (error) {
          console.error('Error inserting prescription:', error);
          Alert.alert('Error', 'Failed to insert prescription. Please try again later.');
        }
      };

    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Insert Prescription</Text>
            <Image source={{ uri: capturedImage.uri }} style={styles.image} />
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Comment"
                multiline
                value={comment}
                onChangeText={setComment}
            />
            <Button title="Save Prescription" onPress={handleSave} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
});

export default InsertPrescription;
