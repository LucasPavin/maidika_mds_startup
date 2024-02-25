import { Modal, Image, Text, View, TouchableOpacity, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { styles } from './styles';
import LottieView from 'lottie-react-native';
import ButtonTreatmenDetails from '../../../components/ButtonTreatmenDetails';
import { removeMedication, recordMedicationTake, createMedicationTakesTable, checkIfMedicationTaken } from '../../../database/sqlite-database';

const TreatmenDetails = ({ navigation, route }) => {
    const { medication, selectedDate } = route.params; 

    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [modalTakenVisible, setModalTakenVisible] = useState(false);

    const medicationImages = {
        'Comprimé': require('../../../assets/treatmen/comprimes.png'),
        'Géllule': require('../../../assets/treatmen/gellule.png'),
        'Liquide': require('../../../assets/treatmen/liquide.png'),
        'Crème': require('../../../assets/treatmen/creme.png'),
    };


    const formatDate = (dateString) => {
        let date = new Date(dateString);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        if(day < 10) day = '0' + day;
        if(month < 10) month = '0' + month;
        return `${day}-${month}-${year}`;
    }

    useEffect(() => {
        createMedicationTakesTable()
            .then(() => console.log('Table créée avec succès'))
            .catch(error => console.error('Erreur lors de la création de la table : ', error));
    }, []);
  
    const handleDelete = () => {
      removeMedication(medication.id)
        .then(() => {
            setModalDeleteVisible(false);
            navigation.navigate('Traitement');
        })
        .catch((error) => {
            Alert.alert('Une erreur est survenue, merci de réessayer ultérieurement.');
        });
    };

    const handleTaken = () => {
        recordMedicationTake(medication.id, true, selectedDate)
        .then(() => {
            setModalTakenVisible(false);
            navigation.navigate('Traitement');
        })
        .catch((error) => {
            console.error('Failed to delete medication:', error);
        });
    };

  return (
    <>
        <View style={styles.container}>
            <View style={styles.containerAnimate}>
                <LottieView
                    source={require('../../../assets/animations/bear.json')}
                    autoPlay={true}
                    loop={true}
                    speed={1} 
                    style={styles.containerAnimateLottie}
                />
            </View>
            <View style={styles.containerContent}>
                <View style={styles.containerContentBack}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View style={styles.containerContentBackText}>
                            <Image
                            source={require('../../../assets/goBack.png')}
                            style={styles.image}
                            />
                            <Text style={{fontSize: 14}}>Retour</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerContentFirst}>
                    <View style={styles.containerContentFirstText}>
                        <Text style={styles.containerContentFirstTextName}>{medication.medicationName}</Text>
                        <View style={styles.containerContentFirstTextDosage}>
                            <Text style={styles.containerContentFirstTextDosageUnderline}>Quantité:</Text> 
                            <Text style={styles.containerContentFirstTextDosage}>{medication.dosage} {medication.medicationType}(s)</Text>
                        </View>
                    </View>
                    <View style={styles.containerContentFirstImage}>
                        <Image style={styles.containerContentFirstImageLogo} source={medicationImages[medication.medicationType]} />
                    </View>
                </View>
                <View style={styles.containerContentSecond}>
                    { medication.timeToTake && (
                        <View style={styles.containerContentSecondItem}>
                        <Text style={styles.containerContentFirstTextDosageUnderline}>Heure de prise:</Text>
                            <Text style={styles.containerContentFirstTextDosage}>{medication.timeToTake.replace(':', 'h')}</Text>
                        </View>
                        )
                    }
                    { medication.whenTake && (
                        <View style={styles.containerContentSecondItem}>
                            <Text style={styles.containerContentFirstTextDosageUnderline}>Quand prendre:</Text>
                            <Text style={styles.containerContentFirstTextDosage}>{medication.whenTake}</Text>
                        </View>
                        )
                    }
                    {medication.startDate && (
                        <View style={styles.containerContentSecondItem}>
                            <Text style={styles.containerContentFirstTextDosageUnderline}>{medication.startDate && medication.endDate ? ("Date de début:") : ("À prendre le :") }</Text>
                            <Text style={styles.containerContentFirstTextDosage}>{formatDate(medication.startDate)}</Text>
                        </View>
                    )}
                    {medication.endDate && (
                        <View style={styles.containerContentSecondItem}>
                            <Text style={styles.containerContentFirstTextDosageUnderline}>Date de fin:</Text>
                            <Text style={styles.containerContentFirstTextDosage}>{formatDate(medication.endDate)}</Text>
                        </View>
                    )}
                    {medication.comment && (
                        <View style={styles.containerContentSecondComment}>
                            <Text style={styles.containerContentFirstTextDosageUnderlineComment}>Commentaire:</Text>
                            <Text style={styles.containerContentFirstTextDosage}>{medication.comment}</Text>
                        </View>
                    )}
                </View>
            </View>
            <View style={styles.containerButtons}>
                <View>
                    <ButtonTreatmenDetails onPress={() => setModalTakenVisible(true)}>J'ai pris mon médicament</ButtonTreatmenDetails>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalTakenVisible}
                    >
                    <View style={styles.bgModalDelete}>
                        <View style={styles.bgModalDeleteContent}>
                            <Text style={styles.bgModalDeleteContentSubject}>Êtes-vous sûr de vouloir confirmer ?</Text>
                            {/* <Text>Medicament : {medication.medicationName} {medication.dosage} {medication.medicationType}(s)</Text> */}
                            <View style={styles.bgModalDeleteButtons}>
                                <ButtonTreatmenDetails onPress={() => setModalTakenVisible(false)}>Annuler</ButtonTreatmenDetails>
                                <ButtonTreatmenDetails type='red' onPress={handleTaken}>Confirmer</ButtonTreatmenDetails>
                            </View>
                        </View>
                        </View>
                    </Modal>
                </View>
                <View>
                    <ButtonTreatmenDetails type='red' onPress={() => setModalDeleteVisible(true)}>Supprimer ce rappel</ButtonTreatmenDetails>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalDeleteVisible}
                    >
                    <View style={styles.bgModalDelete}>
                        <View style={styles.bgModalDeleteContent}>
                            <Text style={styles.bgModalDeleteContentSubject}>Êtes-vous sûr de vouloir supprimer ce rappel ?</Text>
                            {/* <Text>Medicament : {medication.medicationName} {medication.dosage} {medication.medicationType}(s)</Text> */}
                            <View style={styles.bgModalDeleteButtons}>
                                <ButtonTreatmenDetails onPress={() => setModalDeleteVisible(false)}>Annuler</ButtonTreatmenDetails>
                                <ButtonTreatmenDetails type='red' onPress={handleDelete}>Supprimer</ButtonTreatmenDetails>
                            </View>
                        </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </View>
        <View>
        </View>
    </>
  )
}

export default TreatmenDetails