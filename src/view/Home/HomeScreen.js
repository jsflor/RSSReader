import React from 'react';
import {View, Text, Button} from 'react-native';

const HomeScreen = ({navigation}) => {
  const onPress = () => navigation.navigate('Detail');
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home screen!</Text>
      <Button onPress={onPress} title="go to detail" color="#841584" />
    </View>
  );
};

export default HomeScreen;
