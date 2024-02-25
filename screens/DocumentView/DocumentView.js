import { FlatList, Text, View, TouchableOpacity, Image, Modal } from 'react-native'
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { styles } from './styles';
import Button from '../../components/Button';
import { fetchPrescriptionsByUserId, deletePrescriptionById } from '../../database/sqlite-database';
import ButtonTreatmenDetails from '../../components/ButtonTreatmenDetails';
import * as MailComposer from 'expo-mail-composer';
import LottieView from 'lottie-react-native';
import { Ionicons } from '@expo/vector-icons';


const DocumentView = ({ navigation, route, userId }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);

  const { user } = route.params;
  console.log(user);

  const fetchPrescriptions = async (item) => {
    const fetchedPrescriptions = await fetchPrescriptionsByUserId(user.id);
    setPrescriptions(fetchedPrescriptions);
  };

  const deletePrescription = async (item) => {
    deletePrescriptionById(item.id)
      .then(() => {
        console.log('Ordonnance supprimée avec succès');
        setModalDeleteVisible(false);
        fetchPrescriptions();
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression de l\'ordonnance', error);
      });
  }

  useEffect(() => {
    fetchPrescriptions();
  }, [user]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchPrescriptions);
    return unsubscribe;
  }, [navigation]);

  function PrescriptionItem({ item, deletePrescription }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isImageModalVisible, setImageModalVisible] = useState(false);
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    
    const date = new Date(item.date);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
  
    return (
      <View style={styles.containerContentItem}>
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
          <View style={isExpanded ? styles.contentItemTopOpen : styles.contentItemTopClose}>
              <Text style={isExpanded ? styles.contentItemTopOpenDate : styles.contentItemTopCloseDate}>{formattedDate}</Text>
              <Text style={isExpanded ? styles.contentItemTopOpenTitle : styles.contentItemTopCloseTitle}>{item.title}</Text>
              <Text style={isExpanded ? styles.contentItemTopOpenComment : styles.contentItemTopCloseComment}>{item.comment}</Text>
              <Text style={isExpanded ? styles.contentItemTopOpenDesc : styles.contentItemTopCloseDesc}>(Appuyer pour afficher l'ordonnance)</Text>
          </View>
        </TouchableOpacity>
        {isExpanded && (
          <View style={styles.containerContentItemBottom}>
            <View style={styles.containerContentItemBottomImage}>
              {/* <TouchableOpacity onPress={() => setImageModalVisible(true)}> */}
                <Image source={{ uri: item.photo }} style={{ width: "100%", height: 190 }} />
              {/* </TouchableOpacity>  */}
            </View> 
            <View style={styles.containerContentItemBottomButtons}>
              <ButtonTreatmenDetails type="teal" onPress={() => setImageModalVisible(true)}>Ouvrir l'ordonnance</ButtonTreatmenDetails>
              <ButtonTreatmenDetails type="blue" onPress={async () => {
                const isAvailable = await MailComposer.isAvailableAsync();
                if(isAvailable) {
                  MailComposer.composeAsync({
                    subject: 'Ordonnance de ' + [user.fName] + ' ' + [user.name],
                    body: 'Voici l\'ordonnance.',
                    attachments: [item.photo],
                  });
                }
              }}>Envoyer par mail</ButtonTreatmenDetails>            
              <ButtonTreatmenDetails type='red' onPress={() => setModalDeleteVisible(true)}>Supprimer</ButtonTreatmenDetails>
            </View>           
            
  
            <Modal
              animationType="slide"
              transparent={true}
              visible={isImageModalVisible}
            >
              <View style={styles.bgModalPicture}>
                <View style={styles.bgModalPictureContent}>
                  <Image source={{ uri: item.photo }} style={{ width: '100%', height: '80%' }} resizeMode="cover" />
                  <TouchableOpacity onPress={() => setImageModalVisible(false)} style={styles.containerCloseView}>
                    <Text style={styles.containerCloseViewText}>Fermer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalDeleteVisible}
            >
              <View style={styles.bgModalDelete}>
                <View style={styles.bgModalDeleteContent}>
                  <Text style={styles.bgModalDeleteContentSubject}>Êtes-vous sûr de vouloir supprimer cette ordonnance ?</Text>
                  <View style={styles.bgModalDeleteButtons}>
                    <ButtonTreatmenDetails onPress={() => setModalDeleteVisible(false)}>Annuler</ButtonTreatmenDetails>
                    <ButtonTreatmenDetails type='red' onPress={() => deletePrescription(item)}>Supprimer</ButtonTreatmenDetails>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        )}
      </View>
    );
  }
  

  return (
    <View style={styles.background}> 
      <Header />
      <View style={styles.container}>
          <View style={styles.containerContentBack}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <View style={styles.containerContentBackText}>
                      <Image
                      source={require('./../../assets/goBack.png')}
                      style={styles.image}
                      />
                      <Text style={{fontSize: 14}}>Retour</Text>
                  </View>
              </TouchableOpacity>
          </View>
        <View>
          <TouchableOpacity>
            <Button type='blue' onPress={() => navigation.navigate('ScanDocument', {user})}>Scanner votre ordonnance</Button>
          </TouchableOpacity>
        </View>
        <View>
          <View  style={{ height: 600}}>
            <Text style={styles.containerTitle}>Vos ordonnances {user.fName} :</Text>
            <View>
              {
                  prescriptions.length === 0 ? 
                  <View style={styles.nonePrescription}>
                    <LottieView
                      source={require('../../assets/animations/none.json')}
                      autoPlay={true}
                      loop={true}
                      speed={1} 
                      style={styles.containerAnimateLottie}
                    />
                    <Text style={styles.containerContentFirstTextDosageUnderlineComment}>Aucune ordonnance</Text> 
                  </View>
                  :
                  <FlatList
                    data={prescriptions.sort((a, b) => new Date(b.date) - new Date(a.date))}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <PrescriptionItem item={item} deletePrescription={deletePrescription} setModalDeleteVisible={setModalDeleteVisible} modalDeleteVisible={modalDeleteVisible} />}
                  />
              }
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default DocumentView