import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

const HomeScreen = ({navigation}) => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    getNews();
  }, []);
  const getNews = () => {
    const RSS_TO_JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url=';
    const url = 'http://www.nasa.gov/rss/dyn/breaking_news.rss';
    fetch(RSS_TO_JSON_API + encodeURI(url))
      .then((res) => res.json())
      .then((res) => {
        setNews(res.items);
        navigation.setOptions({
          title: res.feed.title,
        });
      })
      .catch((err) => console.log(err));
  };
  const onPress = (data) => navigation.navigate('Detail', {data});
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <SafeAreaView>
        {news &&
          news.map((n, i) => (
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
