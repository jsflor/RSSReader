import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {setNews as setNewsContext} from '../../context/actions/index';
import {useStateValue} from '../../context/StateContext';
import {getData, saveData} from '../../helpers/storage/asyncStorage';

const HomeScreen = ({navigation}) => {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    getNews();
  }, []);

  const getNews = () => {
    const RSS_TO_JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url=';
    const url = 'http://www.nasa.gov/rss/dyn/breaking_news.rss';
    fetch(RSS_TO_JSON_API + encodeURI(url))
      .then((res) => res.json())
      .then((res) => {
        if (res && res.items) {
          saveData('news', res);
          dispatch(setNewsContext(res));
          navigation.setOptions({
            title: res.feed.title,
          });
        } else {
          throw new Error('error');
        }
      })
      .catch((err) => {
        console.log(err);
        getSavedNews();
      });
  };
  const getSavedNews = () => {
    getData('news')
      .then((news) => {
        if (news) {
          dispatch(setNewsContext(news));
          console.log('hay news');
        } else {
          console.log('no hay news');
        }
      })
      .catch((err) => console.log(err));
  };

  const onPress = (data) => navigation.navigate('Detail', {data});
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <SafeAreaView>
        {state && state.news &&
          state.news.items.map((n, i) => (
            <TouchableOpacity
              style={{
                flex: 1,
                margin: 15,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 5,
              }}
              key={i}
              onPress={() => onPress(n)}>
              <Image
                style={{width: 50, height: 50, borderRadius: 50}}
                source={{
                  uri: n.enclosure.link,
                }}
              />
              <View style={{flexDirection: 'column', padding: 10, flex: 1}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  {n.title}
                </Text>
                <Text style={{fontSize: 14, fontWeight: 'normal'}}>
                  {n.description.slice(0, 60) + '...'}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'normal',
                    marginTop: 5,
                    color: 'grey',
                  }}>
                  {n.pubDate}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;
