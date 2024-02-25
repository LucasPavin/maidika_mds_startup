import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { insertPrescription, createPrescriptionTable } from '../../../database/sqlite-database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../../components/Header';
import { Ionicons } from '@expo/vector-icons';
import {styles} from './styles';
import ButtonTreatmenDetails from '../../../components/ButtonTreatmenDetails';


const InsertPrescription = ({ navigation, route }) => {
    const { user } = route.params;
    const { capturedImage } = route.params;
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [userId, setUserId] = useState(null);

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

    const isoDate = new Date().toISOString().split('T')[0];
    const [year, month, day] = isoDate.split('-');
    const date = `${day}/${month}/${year}`;

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
        <>
            <Header/>
            <View style={styles.container}>
                <View style={styles.previewPictureBack}>
                <TouchableOpacity style={styles.previewPictureBackTouchable} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={16} color="black" />
                    <Text>Retour</Text>
                </TouchableOpacity>
                </View>
                <Text style={styles.title}>Ordonnance du {date} </Text>
                <View style={styles.containerImage}>
                    <Image source={{ uri: capturedImage.uri }} style={styles.image} />
                </View>
                <View>
                    <Text style={styles.textForm}>Ajouter un titre</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>
                <View>
                    <Text style={styles.textForm}>Ajouter un commentaire</Text>
                    <TextInput
                        style={[styles.input, { height: 100 }]}
                        placeholder="Comment"
                        multiline
                        value={comment}
                        onChangeText={setComment}
                    />
                </View>
                <ButtonTreatmenDetails type="blue" style={styles.buttonBottom} onPress={handleSave}>Sauvegarder l'ordonnance</ButtonTreatmenDetails>
            </View>
        </>
    );
};

export default InsertPrescription;
