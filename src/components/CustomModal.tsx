import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { colors } from '../themes';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface CustomModalProps {
    visible: boolean;
    title: string;
    description: string;
    imageSource: any;
    buttonText: string;
    secondButtonText?: string;  
    closeModal?: () => void;
    onButtonPress?: () => void;
    onSecondButtonPress?: () => void;  
}

const CustomModal = (props: CustomModalProps) => {
    const { visible, title, description, imageSource, buttonText, closeModal, onButtonPress, secondButtonText, onSecondButtonPress } = props;

    const handleButtonPress = () => {
        if (onButtonPress) {
            onButtonPress();
        }
        if (closeModal) {
            closeModal();
        }
    };

    const handleSecondButtonPress = () => {
        if (onSecondButtonPress) {
            onSecondButtonPress();
        }
        if (closeModal) {
            closeModal();
        }
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={closeModal}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Image style={styles.modalIcon} source={imageSource} />
                    <Text style={styles.modalTitle}>{title}</Text>
                    <Text style={styles.modalMessage}>{description}</Text>
                    <View style={styles.buttonContainer}>
                    {secondButtonText && (
                            <TouchableOpacity onPress={handleSecondButtonPress} style={styles.okButton1}>
                                <Text style={styles.okButtonText1}>{secondButtonText}</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={handleButtonPress} style={styles.okButton}>
                            <Text style={styles.okButtonText}>{buttonText}</Text>
                        </TouchableOpacity>
                       
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: colors.overlayColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: colors.white,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalIcon: {
        width: 40,
        height: 40,
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 22,
    },
    buttonContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        width: '100%', 
    },
    okButton: {
        backgroundColor: colors.blue,
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 5,
        flex: 1, 
        marginHorizontal: 5, 
    },
    okButton1: {
        backgroundColor: colors.Gray,
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 5,
        flex: 1, 
        marginHorizontal: 5, 
     
    },
    okButtonText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
    },
    okButtonText1: {
        color: colors.black,
        fontSize: 14,
        textAlign: 'center',
    },
});

export default CustomModal;
