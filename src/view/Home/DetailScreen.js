import React from 'react';
import {View, Text, Button} from 'react-native';

const DetailScreen = ({navigation}) => {
  const onPress = () => navigation.navigate('Home');
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Detail screen!</Text>
      <Button onPress={onPress} title="return home" color="#841584" />
    </View>
  );
};

export default DetailScreen;
