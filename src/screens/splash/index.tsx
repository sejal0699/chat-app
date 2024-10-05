import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import styles from './styles';
import { ScreenNames } from '../../navigation/screenNames';
import { Images } from '../../assets';

interface Props {
  navigation: any,
  isFirstLaunch: boolean
}
const SplashScreen = ({ navigation, isFirstLaunch }: Props) => {
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      // Navigate directly to the Drawer screen
      navigation.replace(ScreenNames.Drawer);
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={Images.splash}
        style={styles.logo}
      />
    </View>
  );
};



export default SplashScreen;
