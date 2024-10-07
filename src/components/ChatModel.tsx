import React from 'react';
import { View, Text, Modal, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icons, Images } from '../assets';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../navigation/screenNames';

interface SecureAccountModalProps {
  visible: boolean,
  closeModal: () => void
}


const SecureAccountModal = ({ visible, closeModal }: SecureAccountModalProps) => {
  const navigation:any = useNavigation();
  const handleButtonPress=()=>{
    closeModal();
    navigation.navigate(ScreenNames.Contacts)
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.stepsContainer}>
            <TouchableOpacity  onPress={handleButtonPress}>
            <View style={styles.step}>
              <Image
                source={Icons.messIcon}
                style={styles.stepIcon}
              />
            
              <Text style={styles.stepText}>New Chat</Text>
            </View>
            </TouchableOpacity>
          
       
          </View>
         
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    padding: 50,
    backgroundColor: '#E6EDF3',
    borderRadius: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  description: {
    color: '#777',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  stepsContainer: {
    width: '100%',
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  stepText: {
    color: '#000',
    fontSize:18
    
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 100,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SecureAccountModal;