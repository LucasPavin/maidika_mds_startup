import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Modal, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import { styles } from './styles';
import ButtonTreatmenDetails from '../../components/ButtonTreatmenDetails';

const drugsData = require('./drugs.json');

const DrugView = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredDrugs = drugsData.drugs.filter(drug =>
    drug.name_generic.toLowerCase().includes(search.toLowerCase()) ||
    drug.brand.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = (drug) => {
    setSelectedDrug(drug);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedDrug(null);
    setModalVisible(false);
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
            <TextInput 
                style={styles.inputSearchDrug}
                value={search}
                onChangeText={setSearch}
                placeholder="Rechercher un médicament"
            />
            <FlatList
                data={filteredDrugs}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.listDrugs}>
                        <TouchableOpacity  onPress={() => openModal(item)}>
                            <Text style={styles.titleDrug}>{item.name_generic} ({item.brand})</Text>
                            <Text>Description : {item.description.split(' ').slice(0, 25).join(' ')}...</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                {selectedDrug && (
                    <View style={styles.bgModalPicture}>
                        <View style={styles.bgModalPictureContent}>
                            <ScrollView style={styles.bgModalPictureContentTop}>
                                <Text style={styles.containerNameGeneric}>
                                    <Text style={styles.nameGeneric}>Nom générique :</Text>
                                    <Text> {selectedDrug.name_generic}</Text>
                                </Text>
                                <Text style={styles.containerNameGeneric}>
                                    <Text style={styles.nameGeneric}>Marque :</Text>
                                    <Text> {selectedDrug.brand}</Text>
                                </Text>
                                <View style={styles.containerDescription}>
                                    <Text style={styles.nameGeneric}>Description :</Text>
                                    <Text style={styles.textDescription}>{selectedDrug.description}</Text>
                                </View>
                                <View style={styles.containerDescription}>
                                    <Text style={styles.nameGeneric}>Risques :</Text>
                                    {selectedDrug.risks.map((risk, index) => (
                                        <Text key={index} style={styles.textDescription}>• {risk}</Text>
                                    ))}
                                </View>
                                <View style={styles.containerDescription}>
                                    <Text style={styles.nameGeneric}>Doses :</Text>
                                    {selectedDrug.doses.map((doses, index) => (
                                        <Text key={index} style={styles.textDescription}>• {doses}</Text>
                                    ))}
                                </View>
                            </ScrollView>
                            <ButtonTreatmenDetails type="blue" onPress={closeModal}>Fermer</ButtonTreatmenDetails> 
                        </View>
                    </View>
                )}
            </Modal>
        </View>
    </>
  );
};

export default DrugView;