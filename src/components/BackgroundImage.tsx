import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, ScrollView } from 'react-native';
import { Icons, Images } from '../assets';

const BackgroundImage = (props: any) => {

  return (
    <ImageBackground
      source={Images.background}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.cont}>
          <Image
            source={Images.logoImage}
            style={styles.image}
          />
          <View style={styles.texts}>
            <Text style={styles.text4}>QUIVIO</Text>
            <Text style={styles.text2}>
              Your Personal CarWash Assistant</Text>
          </View>

        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.box}>
            <View style={styles.item}>
              <Image
                source={Icons.chartIcon}
                style={styles.image}
              />
              <Text style={styles.text}>Aesthetical{'\n'}Graphics</Text>
            </View>
            <View style={styles.item}>
              <Image
                source={Icons.lockIcon}
                style={styles.image}
              />
              <Text style={styles.text}>Real time{'\n'}statistics</Text>
            </View>
            <View style={styles.item}>
              <Image
                source={Icons.flaskIcon}
                style={styles.image}
              />
              <Text style={styles.text}>Track equipment{'\n'}usage</Text>
            </View>
          </View>
        </ScrollView>


      </View>

      {props.children}

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,


  },
  scrollViewContent: {
    paddingHorizontal: 15,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  box: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 5,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  image1: {

    width: 12,
    height: 12,
    marginTop: 5

  },
  item: {
    alignItems: 'center',
    marginHorizontal: 25,
    flexDirection: 'row'
  },
  texts: {
    marginTop: 20
  },
  image: {

    marginTop: 10,
    marginRight: 10,
  },
  cont: {
    marginRight: 100,
    marginTop: 100,

  },
  text: {
    color: 'white',
    fontSize: 14,


  },
  text1: {
    color: 'white',
    fontSize: 12,
    marginRight: 25
  },
  text2: {
    color: 'white',
    fontSize: 16,
    marginRight: 25,
    marginTop: 10
  },
  text4: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  }
});

export default BackgroundImage;
