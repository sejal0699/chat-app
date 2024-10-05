import React from 'react';
import { View, Text, Modal, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icons, Images } from '../assets';
import { colors } from '../themes';

interface SecureAccountModalProps {
    visible: boolean;
    closeModal: () => void;
    onEmojiPress: (emoji: string) => void;
    onDeletePress: () => void; 
}

const ReactionModal = ({ visible, closeModal,onEmojiPress,onDeletePress }: SecureAccountModalProps) => {
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
                    <View style={styles.emoji}>
                            <TouchableOpacity onPress={() => onEmojiPress('👍')}>
                                <Image source={Icons.likeIcon} style={styles.emojiIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onEmojiPress('❤️')}>
                                <Image source={Icons.heartIcon} style={styles.emojiIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onEmojiPress('😂')}>
                                <Image source={Icons.laughIcon} style={styles.emojiIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onEmojiPress('🎉')}>
                                <Image source={Icons.confettyIcon} style={styles.emojiIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onEmojiPress('👎')}>
                                <Image source={Icons.dislikeIcon} style={styles.emojiIcon} />
                            </TouchableOpacity>
                        </View>
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

                        <TouchableOpacity onPress={onDeletePress}>
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
    emoji:{
        flexDirection:'row',
        padding: 26,
        backgroundColor: colors.white,
        borderRadius:20,
        width: '100%',
        alignItems: 'center',
       justifyContent:'space-between',
       margin:10
    
    },
    emojiIcon:{
       
            width: 35,
            height: 35,
            marginRight: 10,
        
    }
});

export default ReactionModal;
