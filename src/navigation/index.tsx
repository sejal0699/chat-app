
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TutorialScreen from '../screens/tutorial/index';
import { ScreenNames } from './screenNames';
import SplashScreen from '../screens/splash/index';
import DrawerStack from './drawerTab/DrawerStack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import Contact from '../screens/contacts';
import ChatScreen from '../screens/personalChats';
import Header from '../components/Header';


const RootNavigator = () => {
  const Stack = createNativeStackNavigator();
  const navigationRef: any = useNavigationContainerRef();
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const alreadyLaunched = await AsyncStorage.getItem('alreadyLaunched');
        console.log(alreadyLaunched);
        if (alreadyLaunched === null) {
          await AsyncStorage.setItem('alreadyLaunched', 'true');
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error('Error checking first launch status:', error);
      }
    };
    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return null;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={ScreenNames.Splash}>
        <Stack.Screen
          name={ScreenNames.Splash}
          options={{ headerShown: false }}>
          {props => <SplashScreen {...props} isFirstLaunch={isFirstLaunch} />}
        </Stack.Screen>
      
        <Stack.Screen name={ScreenNames.Drawer} component={DrawerStack} options={{ headerShown: false }} />
        <Stack.Screen name={ScreenNames.Tutorial} component={TutorialScreen} options={{ headerShown: false }} />
        <Stack.Screen name={ScreenNames.Contacts} component={Contact} options={{ headerShown: false }} />
        <Stack.Screen name={ScreenNames.ChatScreen} component={ChatScreen} options={{ headerShown: false }} />
        <Stack.Screen name={ScreenNames.Header} component={Header} options={{ headerShown: false }} />

      
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator