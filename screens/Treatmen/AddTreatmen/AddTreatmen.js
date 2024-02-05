import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, FlatList, ScrollView} from 'react-native'
import React, { useState, useEffect } from 'react';
import { styles } from './styles';
import Button from '../../../components/Button';
import ButtonBoarding from '../../../components/ButtonBoarding';
import * as Contacts from 'expo-contacts';
import Modal from 'react-native-modal';
import Colors from '../../../constants/Colors';




const AddTreatmen = ({navigation}) => {

  // Selection d'image 
  const [selectedImage, setSelectedImage] = useState(null);
  const images = [
    { id: 1, source: require('../../../assets/treatmen/gellule.png') },
    { id: 2, source: require('../../../assets/treatmen/gellule.png') },
    { id: 3, source: require('../../../assets/treatmen/gellule.png') },
    { id: 4, source: require('../../../assets/treatmen/gellule.png') },
  ];

  // const getContacts = async () => {
  //   const { status } = await Contacts.requestPermissionsAsync();
  //   if (status === 'granted') {
  //     const { data } = await Contacts.getContactsAsync({
  //       fields: [Contacts.Fields.PhoneNumbers],
  //     });

  //     if (data.length > 0) {
  //       console.log(data);
  //     }
  //   }
  // }
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);  
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data);
          console.log(data);
        }
      }
    })();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderContact = ({ item }) => (
    <TouchableOpacity
      style={{ padding: 10 }}
      onPress={() => {
        setSelectedContact(item);
        toggleModal();
      }}
    >
      <View>
        <Text style={{ color: item.id === selectedContact?.id ? 'blue' : 'black', fontWeight: "bold"}}>
          {item.name} : {item.phoneNumbers ? `${item.phoneNumbers[0].number}` : ''}
        </Text>
        <View>
          <Text style={{ color: item.id === selectedContact?.id ? 'blue' : 'black' }}>
            
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handlePress = (id) => {
    setSelectedImage(id);
    // onImageSelect(id);
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
        <View style={styles.imageSelectContainer}>
          {images.map((image) => (
            <TouchableOpacity 
              key={image.id} 
              onPress={() => handlePress(image.id)}
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
              {/* <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
                {/* ... ajoutez d'autres éléments ici ... */}
              {/* </Picker> */}
            </View>
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.textInput}>Nombre de fois par jour</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre de fois par jour"
            />
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.textInput}>Date de début</Text>
            <TextInput
              style={styles.input}
              placeholder="Date de début"
            />
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.textInput}>Date de fin</Text>
            <TextInput
              style={styles.input}
              placeholder="Date de fin"
            />
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.textInput}>Heure de rappel</Text>
            <TextInput
              style={styles.input}
              placeholder="Heure de rappel"
            />
          </View>
          <View style={styles.containerContact}> 
            <Text style={styles.textInput}>Personne à contacter en cas d'oubli (facultatif)</Text>
            <View style={styles.containerInput}>
              <ButtonBoarding type='blue' onPress={toggleModal}>Définir un contact</ButtonBoarding>
              {selectedContact && (
                <Text style={{ padding: 10 }}>
                  {selectedContact.name} - {selectedContact.phoneNumbers[0].number}
                </Text>
              )}
            </View>
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
              <View style={styles.modalContact}>
                <FlatList
                  data={contacts}
                  keyExtractor={(item) => item.id}
                  renderItem={renderContact}
                  style={{ marginBottom: 0 }}
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
          <Button type='blue' onPress={() => navigation.navigate('Treatment')}>Ajouter</Button>
        </View>
      </ScrollView>
      
    </View>
  )
}

export default AddTreatmen
