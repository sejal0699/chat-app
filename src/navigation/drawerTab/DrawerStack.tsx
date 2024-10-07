
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomStack from '../bottomTab/BottomStack';
import { ScreenNames } from '../screenNames';
import Feed from '../../screens/feed';

const Drawer = createDrawerNavigator();

function DrawerStack() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={ScreenNames.BottomTab} component={BottomStack} options={{ headerShown: false }} />
      <Drawer.Screen name={ScreenNames.Feed} component={Feed} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}


export default DrawerStack