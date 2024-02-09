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
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const AddTreatmen = ({navigation}) => {

  // Selection d'image 
  const [selectedImage, setSelectedImage] = useState(null);
  const images = [
    { id: 1, source: require('../../../assets/treatmen/gellule.png') },
    { id: 2, source: require('../../../assets/treatmen/gellule.png') },
    { id: 3, source: require('../../../assets/treatmen/gellule.png') },
    { id: 4, source: require('../../../assets/treatmen/gellule.png') },
  ];

  // Selection de contact
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);  
  const [isModalVisible, setModalVisible] = useState(false);
  
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
          // console.log(data);
        }
      }
    })();
  }, []);
  // Activate or desactivate the modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  // Render contact
  let sortedContacts = [...contacts].sort((a, b) => {
    if (a.name && b.name) {
      return a.name.localeCompare(b.name);
    } else if (a.name) {
      return -1; // a vient avant b
    } else if (b.name) {
      return 1; // b vient avant a
    } else {
      return 0; // a et b sont égaux
    }
  });

  const renderContact = ({ item }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => {
        setSelectedContact(item);
        toggleModal();
      }}
    >
      <View>
        <Text style={{ color: item.id === selectedContact?.id ? Colors.teal : Colors.black , fontWeight: "bold"}}>
          {item.name}
          {/* 
          * For displaying phone number
          * {item.phoneNumbers ? `${item.phoneNumbers[0].number}` : ''} 
          */}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // Picker
  const [selectedValue, setSelectedValue] = useState('option1');

  const handlePress = (id) => {
    setSelectedImage(id);
  };

  // Create date
  const [dateToStart, setDateToStart] = useState(new Date());
  const [timeToStart, setTimeToStart] = useState(new Date());
  const [dateToEnd, setDateToEnd] = useState(new Date());
  const [isMultiDay, setIsMultiDay] = useState(false);

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
            />
          </View>

          <View style={styles.secondInput}>
            <View style={styles.secondInputLeft}>
              <Text style={styles.textInput}>Dose(s)</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre de comprimés"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.secondInputRight}>
              <Text style={styles.textInput}>Type de médicament</Text>
              <View style={styles.containerInput}>
                {/* <Picker
                  selectedValue={selectedValue}
                  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                style={{...styles.input, zIndex: 1}}
                >
                  <Picker.Item label="Option 1" value="option1" />
                  <Picker.Item label="Option 2" value="option2" />
                  <Picker.Item label="Option 1" value="option1" />
                  <Picker.Item label="Option 2" value="option2" />
                  <Picker.Item label="Option 1" value="option1" />
                  <Picker.Item label="Option 2" value="option2" />
                  {/* Ajoutez d'autres options ici */}
                {/* </Picker> */}
              </View>
            </View>
          </View>
          <View style={styles.containerDateToStart}>
            <View style={styles.containerDayStart}>
              <Text style={styles.textInput}>Date de début</Text>
              <DateTimePicker
                value={dateToStart}
                mode="date"
                display="default"
                style={styles.chooseStartDay}
                onChange={(event, date) => {setDateToStart(date)}}
              />
            </View>
            <View style={styles.containerTimeStart}>
              <Text style={styles.textInput}>Heure de rappel</Text>
              <DateTimePicker
                value={dateToStart}
                mode="time"
                display="default"
                onChange={(event, date) => {setDateToStart(date)}}
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
                  setDateToEnd(date);
                  let dateInFrench = format(date, 'dd MMMM yyyy', { locale: fr });
                  console.log(dateInFrench);
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
            />
          </View>
        </View>
        <View style={styles.containerBtn}>
          <Button type='blue' onPress={() => navigation.navigate('ValidAddTreatmen')}>Ajouter</Button>
        </View>
      </ScrollView>
      
    </View>
  )
}

export default AddTreatmen
