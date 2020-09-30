import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Cell = (props) => {
  const {article} = props;
  const onPress = (data) => {
    props.onPress && props.onPress(data);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(article)}>
      <Image
        style={styles.img}
        source={{
          uri: article.enclosure.link,
        }}
      />
      <View style={styles.main}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.description}>
          {article.description.slice(0, 60) + '...'}
        </Text>
        <Text style={styles.date}>{article.pubDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  img: {width: 50, height: 50, borderRadius: 50},
  date: {
    fontSize: 12,
    fontWeight: 'normal',
    marginTop: 5,
    color: 'grey',
  },
  description: {fontSize: 14, fontWeight: 'normal'},
  title: {fontSize: 16, fontWeight: 'bold'},
  main: {flexDirection: 'column', padding: 10, flex: 1},
});

export default Cell;
