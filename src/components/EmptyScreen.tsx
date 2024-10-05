import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Images } from "../assets";
import { colors } from "../themes";
import SecureAccountModal from "./ChatModel";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../navigation/screenNames";

const EmptyScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const openModal = () => {
        setModalVisible(true);
        
      };

      const closeModal = () => {
        setModalVisible(false);
       
      };

  return (
    <View style={styles.container}>
      <View>
        <Image source={Images.emptyIamge} style={styles.image}/>
        <Text style={styles.text}>No Chats, yet!</Text>
        <View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={  styles.loginButton} onPress={openModal}>
            <Text style={styles.buttonText}>Start Chat</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
      <SecureAccountModal
          visible={modalVisible}
          closeModal={closeModal}
        />

    </View>
  );
};

export default EmptyScreen;

const styles = StyleSheet.create({
  buttonText: {
    color:colors.white
  },
  image:{
    
  },
  container:{
    transform: [{ translateY: 170 }],
  },
  text:{
fontWeight:'bold',
alignSelf:'center'
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    marginTop:20
  },
  loginButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
 backgroundColor: colors.strongBlue,
  },

});
