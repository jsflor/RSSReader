import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../view/Home/HomeScreen';
import DetailScreen from '../view/Home/DetailScreen';

const HomeController = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name={'Home'} component={HomeScreen} />
        <Stack.Screen name={'Detail'} component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeController;
