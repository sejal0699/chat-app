import React from 'react';
import { View, Text, Modal, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icons, Images } from '../assets';
import { colors } from '../themes';

interface SecureAccountModalProps {
    visible: boolean;
    closeModal: () => void;
}

const MoreItemsModal = ({ visible, closeModal }: SecureAccountModalProps) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={closeModal}
        >
            <TouchableOpacity style={styles.modalBackground} activeOpacity={1} onPress={closeModal}>
                <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
                    <View style={styles.modalView}>
                        <TouchableOpacity>
                            <View style={styles.optionContainer}>
                                <Image source={Icons.eyeIcon} style={styles.optionIcon} />
                                <Text style={styles.modalOptionText}>View details</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View style={styles.optionContainer}>
                                <Image source={Icons.unpinIcon} style={styles.optionIcon} />
                                <Text style={styles.modalOptionText}>Unpin Chat</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View style={styles.optionContainer}>
                                <Image source={Icons.search} style={styles.optionIcon} />
                                <Text style={styles.modalOptionText}>Search Chat</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={closeModal}>
                            <View style={styles.optionContainer}>
                                <Image source={Icons.deleteIcon} style={styles.optionIcon} />
                                <Text style={styles.modalOptionText1}>Delete</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    optionContainer: {
        padding: 20,
        backgroundColor: colors.white,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
    
    },
    modalContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        alignItems: 'center',
    },
    modalView: {
        width: '100%',
    },
    modalOptionText: {
        fontSize: 16,
        color: colors.black,
        paddingVertical: 10,
        textAlign: 'center',
        marginLeft: 20,
    },
    modalOptionText1: {
        fontSize: 16,
        color: colors.red,
        paddingVertical: 10,
        textAlign: 'center',
        marginLeft: 20,
    },
    
    optionIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
});

export default MoreItemsModal;
