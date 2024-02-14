import { Image, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './styles';
import LottieView from 'lottie-react-native';
import ButtonTreatmenDetails from '../../../components/ButtonTreatmenDetails';

const TreatmenDetails = ({ navigation, route }) => {
    const { medication } = route.params; 

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
                    <ButtonTreatmenDetails onPress={() => {}}>Prise effectuée</ButtonTreatmenDetails>
                </View>
                <View>
                    <ButtonTreatmenDetails  type='red' onPress={() => {}}>Supprimer ce rappel</ButtonTreatmenDetails>
                </View>
            </View>
        </View>
        <View>
        </View>
    </>
  )
}

export default TreatmenDetails