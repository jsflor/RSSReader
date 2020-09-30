import React from 'react';
import {Button, Image, Linking, StyleSheet, Text, View} from 'react-native';
import {Container} from '../index';

const Card = (props) => {
  const {data, children} = props;

  return (
    <Container style={styles.container}>
      <Image style={styles.img} source={{uri: data.enclosure.link}} />
      <View style={styles.main}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.date}>{data.pubDate}</Text>
        <Text style={styles.description}>{data.description}</Text>
        {children}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'flex-start'},
  img: {width: '100%', height: '50%'},
  main: {flexDirection: 'column', padding: 10, flex: 1},
  title: {fontSize: 16, fontWeight: 'bold'},
  date: {
    fontSize: 12,
    fontWeight: 'normal',
    marginTop: 5,
    marginBottom: 5,
    color: 'grey',
  },
  description: {fontSize: 14, fontWeight: 'normal', marginBottom: 50},
});

export default Card;
