import React, {useEffect} from 'react';
import {Card} from '../../components';
import {Button, Linking} from 'react-native';
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
    <Card data={data}>
      <Button
        onPress={() => Linking.openURL(data.link)}
        title="Ver en el navegador"
        color="#841584"
      />
    </Card>
  );
};

export default DetailScreen;
