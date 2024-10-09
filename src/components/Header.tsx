import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { Icons } from '../assets';
import { colors } from '../themes';
import { ScreenNames } from '../navigation/screenNames';

const Header = () => {
  const navigation = useContext(NavigationContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <View style={styles.text}>
              <Text style={styles.location}>Messages</Text>
              <Text style={styles.name}>45 Contacts</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.Contacts)}>
        
          <View style={styles.cartIcon}>
            <Image source={Icons.plusIcon} style={styles.iconImage} />
          </View>
       
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.strongBlue,
  },
 
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    height: 110,

   
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  headerText: {
    flexDirection: 'row',
    marginLeft: 10,
    top:6
  },
  text: {
    flexDirection: 'column',
  },
  location: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:15,
    marginLeft:10
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
    marginTop: 4,
    marginLeft:10
  },
  cartIcon: {
    flexDirection: 'row',
   top:30,
    marginRight: 16,
    backgroundColor:'#FFFFFF1A',
    padding:8,
    borderRadius:8
  },
  iconImage: {
    width: 20,
    height: 22,
  
  },
});

export default Header;
