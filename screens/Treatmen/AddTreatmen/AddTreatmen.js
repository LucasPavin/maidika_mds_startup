import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, FlatList, ScrollView} from 'react-native'
import React, { useState, useEffect } from 'react';
import { styles } from './styles';
import Button from '../../../components/Button';
import ButtonBoarding from '../../../components/ButtonBoarding';
import * as Contacts from 'expo-contacts';
import Modal from 'react-native-modal';
import Colors from '../../../constants/Colors';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBoxMultiDay from '../../../components/CheckBoxMultiDay';
import { createMedicationsTable, insertMedication } from '../../../database/sqlite-database';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddTreatmen = ({navigation}) => {

  // Selection d'image 
  const [selectedImage, setSelectedImage] = useState(null);
  const images = [
    { id: 1, source: require('../../../assets/treatmen/gellule.png') },
    { id: 2, source: require('../../../assets/treatmen/comprimes.png') },
    { id: 3, source: require('../../../assets/treatmen/liquide.png') },
    { id: 4, source: require('../../../assets/treatmen/creme.png') },
  ];

  const [medicationName, setMedicationName] = useState('');
  const [medicationType, setMedicationType] = useState('');
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);  
  const [isModalVisible, setModalVisible] = useState(false);
  const [dosage, setDosage] = useState('');
  const [commentDrug, setCommentDrug] = useState('');
  const [dateToStart, setDateToStart] = useState(new Date());
  const [formattedDateToStart, setFormattedDateToStart] = useState("");
  const [timeToStart, setTimeToStart] = useState(new Date());
  const [formattedTime, setFormattedTime] = useState('');
  const [dateToEnd, setDateToEnd] = useState(new Date());
  const [formattedDateToEnd, setFormattedDateToEnd] = useState("");
  const [isMultiDay, setIsMultiDay] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');  
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  
  // Demande de permission pour accéder aux contacts dans le useEffect
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  let sortedContacts = [...contacts].sort((a, b) => {
    if (a.name && b.name) {
      return a.name.localeCompare(b.name);
    } else if (a.name) {
      return -1;
    } else if (b.name) {
      return 1;
    } else {
      return 0;
    }
  });

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}${match[2]}${match[3]}`;
    }
    return phoneNumber;
  };

  const handleSelectContact = (item) => {
    const formattedPhoneNumber = item.phoneNumbers ? formatPhoneNumber(item.phoneNumbers[0].number) : '';
    setSelectedContact({ ...item, formattedPhoneNumber: formattedPhoneNumber });
    toggleModal();
  };

  const renderContact = ({ item }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => {
        toggleModal();
        handleSelectContact(item)
      }}
    >
      <View>
        <Text style={{ color: item.id === selectedContact?.id ? Colors.teal : Colors.black , fontWeight: "bold"}}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const handlePress = (id) => {
    setSelectedImage(id);
    switch (id) {
      case 1:
        setMedicationType('Géllule');
        console.log(formattedTime);
        break;
      case 2:
        setMedicationType('Comprimé');
        break;
      case 3:
        setMedicationType('Liquide');
        break;
      case 4:
        setMedicationType('Crème');
        break;
      default:
        setMedicationType('');
    }
  };

  const options = [
    'Avant le repas',
    'Pendant le repas',
    'Après le repas',
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setOptionModalVisible(false);
  };

  useEffect(() => {
    createMedicationsTable()
      .then(() => console.log('Table de médicaments créée avec succès'))
      .catch(error => console.error('Erreur lors de la création de la table de médicaments : ', error));
  }, []);

  useEffect(() => {
      const fetchUser = async () => {
        const storedUser = await AsyncStorage.getItem('user');
        setUser(JSON.parse(storedUser));
      };
      fetchUser();
  }, []);

  const handleSubmit = async () => {

    if (!user) {
      console.error('User not found');
      return;
    }
    const userId = user.id;
  
    insertMedication(
      userId,
      selectedOption,
      medicationName,
      dosage,
      medicationType,
      formattedTime,
      formattedDateToStart,
      formattedDateToEnd,
      selectedContact.formattedPhoneNumber,
      commentDrug
    )
    .then(result => {
      console.log('Insertion réussie : ', result);
      navigation.navigate('ValidAddTreatmen');
    })
    .catch(error => console.error('Erreur d\'insertion : ', error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerBack}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../../assets/goBack.png')}
              style={styles.image}
            />
          </TouchableOpacity>
      </View>
      <ScrollView style={styles.containerForm}>
          <Text>Selectionné une image selon le type de médicament</Text>
        <View style={styles.imageSelectContainer}>
          {images.map((image) => (
            <TouchableOpacity 
              key={image.id} 
              onPress={() => handlePress(image.id)}
              value={image.id}
              style={[styles.ButtonImage, image.id === selectedImage ? styles.selectedImage : styles.image]}
            >
              <Image source={image.source} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.containerInput}>
          <View style={styles.firstInput}>
            <Text style={styles.textInput}>Nom du médicament</Text>
            <TextInput
              style={styles.input}
              placeholder="Doliprane.."
              value={medicationName}
              onChangeText={setMedicationName}
            />
          </View>

          <View style={styles.secondInput}>
            <View style={styles.secondInputLeft}>
              <Text style={styles.textInput}>Dose(s)</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre de comprimés"
                keyboardType="numeric"
                value={dosage}
                onChangeText={setDosage}
              />
            </View>
            <View style={styles.secondInputRight}>
              <Text style={styles.textInput}>Type de médicament</Text>
              <View style={styles.containerInput}>
              <TextInput
                style={styles.input}
                editable={false}
                value={medicationType}
                placeholder="Sélectionnez un type"
              />
              </View>
            </View>
          </View>
          <View style={styles.containerSelector}>
            <TouchableOpacity 
              style={styles.selector} 
              onPress={() => setOptionModalVisible(true)}
            >
            <Image 
                source={require('../../../assets/treatmen/restaurant.png')} 
                resizeMode="contain"
                style={{
                    width: 20,
                    height: 20,
                }}
            />
              <Text style={styles.text}>{selectedOption || "Choisir un moment"}</Text>
            </TouchableOpacity>

            <Modal
              animationType="fade"
              transparent={true}
              visible={optionModalVisible}
              onRequestClose={() => {
                setOptionModalVisible(!optionModalVisible);
              }}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalView}>
                  {options.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.optionItem}
                      onPress={() => handleOptionSelect(option)}
                    >
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </Modal>
          </View>

          <View style={styles.containerDateToStart}>
            <View style={styles.containerDayStart}>
              <Text style={styles.textInput}>Date de début</Text>
              <View style={styles.fullWidth}>
                <DateTimePicker
                  value={dateToStart}
                  mode="date"
                  display="default"
                  style={styles.chooseStartDay}
                  onChange={(event, selectedDate) => {
                    if (selectedDate) {
                      setDateToStart(selectedDate);
                      const formatted = selectedDate.toISOString().split('T')[0];
                      setFormattedDateToStart(formatted);
                    }
                  }}
                />
              </View>
            </View>
            <View style={styles.containerTimeStart}>
              <Text style={styles.textInput}>Heure de rappel</Text>
              <DateTimePicker
                value={timeToStart}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => {
                  if (selectedTime) {
                    setTimeToStart(selectedTime);
                    const formattedTime = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                    setFormattedTime(formattedTime);
                  }
                }}
              />
            </View>
          </View>
          {isMultiDay && (
            <View style={styles.containerInput}>
              <Text style={styles.textInput}>Date de fin</Text>
              <DateTimePicker
                value={dateToEnd}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  if (date <= dateToStart) {
                    alert('La date de fin doit être après la date de début');
                    return;
                  } else if (date > dateToStart) {
                      setDateToEnd(date);
                      const formatted = date.toISOString().split('T')[0];
                      setFormattedDateToEnd(formatted);
                  }
                }}
              />
            </View>
          )}
          <View>
            <CheckBoxMultiDay isChecked={isMultiDay} onPress={() => setIsMultiDay(!isMultiDay)} />
          </View>
          <View style={styles.containerContact}> 
            <Text style={styles.textInput}>Personne à contacter en cas d'oubli (facultatif)</Text>
            <View style={styles.containerInput}>
              { selectedContact ? (
                  <>
                  <View style={styles.contactSelected}>
                    <View style={styles.contactSelectedName}>
                      <Text style={{ padding: 10 }}>
                        {selectedContact.name}
                      </Text>
                    </View>
                    <Button type='blue' onPress={() => setSelectedContact(null)}>Supprimer</Button>
                  </View>
                  </>
              ) : (
                <ButtonBoarding type='blue' onPress={toggleModal}>Définir un contact</ButtonBoarding>
              )}
            </View>
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
              <View style={styles.modalContact}>
                <View style={styles.containerDescribe}>
                  <Text style={styles.chooseConfiance}>Choisissez une personne de confiance</Text>
                  <Text style={styles.chooseConfianceDescribe}>(Appuyer sur le contact désiré)</Text>
                </View>
                <FlatList
                  data={sortedContacts}
                  keyExtractor={(item) => item.id}
                  renderItem={renderContact}
                  style={styles.flatListContact}
                />
                <Button onPress={toggleModal}>Fermer</Button>
              </View>
            </Modal>
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.textInput}>Commentaire</Text>
            <TextInput
              style={styles.input}
              placeholder="Commentaire"
              value={commentDrug}
              onChangeText={setCommentDrug}
            />
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <Button type='blue' onPress={handleSubmit}>Ajouter</Button>
        </View>
      </ScrollView>
      
    </View>
  )
}

export default AddTreatmen
