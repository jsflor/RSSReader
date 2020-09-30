import React, {useEffect} from 'react';
import {Text, Image, SafeAreaView, View, Button, Linking} from 'react-native';
// import {useStateValue} from '../../context/StateContext';

const DetailScreen = (props) => {
  // const [state, dispatch] = useStateValue();
  const {data} = props.route.params;

  useEffect(() => {
    props.navigation.setOptions({
      title: data.title,
    });
  }, []);

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
      <Image
        style={{width: '100%', height: '50%'}}
        source={{uri: data.enclosure.link}}
      />
      <View style={{flexDirection: 'column', padding: 10, flex: 1}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{data.title}</Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: 'normal',
            marginTop: 5,
            marginBottom: 5,
            color: 'grey',
          }}>
          {data.pubDate}
        </Text>
        <Text style={{fontSize: 14, fontWeight: 'normal', marginBottom: 50}}>
          {data.description}
        </Text>
        <Button
          onPress={() => Linking.openURL(data.link)}
          title="Ver en el navegador"
          color="#841584"
        />
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;
