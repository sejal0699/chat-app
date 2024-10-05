import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import styles from './styles';
import { Images } from '../../assets';
import { ScreenNames } from '../../navigation/screenNames';

const { width } = Dimensions.get('window');

const TutorialScreen = ({ navigation}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleScroll = (event:NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentSlide = Math.round(scrollPosition / width);
    setActiveSlide(currentSlide);
  };

  const handleContinue = () => {
    navigation.navigate(ScreenNames.Chat);
  };

  

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >

        <View style={styles.screen}>
          <Image source={Images.onboardingImage} style={styles.image} />
          <Text style={styles.title}>Welcome to the Tutorial</Text>
          <Text style={styles.description}>
            Learn how to use our app with this brief tutorial. We'll guide you through the main features and help you get started.
          </Text>
        </View>

        <View style={styles.screen}>
          <Image source={Images.tutorialImage} style={styles.image} />
          <Text style={styles.title}>Discover New Features</Text>
          <Text style={styles.description}>
            Explore more advanced features and get the most out of our app. Get Started!
          </Text>
        </View>
      </ScrollView>

      <View style={styles.pagination}>
        <View style={[styles.dot, activeSlide === 0 ? styles.activeDot : null]} />
        <View style={[styles.dot, activeSlide === 1 ? styles.activeDot : null]} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>
          {activeSlide === 1 ? 'Get Started' : 'Swipe'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TutorialScreen;
