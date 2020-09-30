import React, {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import {setNews as setNewsContext} from '../../context/actions/index';
import {useStateValue} from '../../context/StateContext';
import {getData, saveData} from '../../helpers/storage/asyncStorage';
import {CellList, ScrollContainer, Container} from '../../components';
import {RSS_TO_JSON_API, URL} from '../../helpers/constants/http';

const HomeScreen = ({navigation}) => {
  const [state, dispatch] = useStateValue();
  const [feed, setFeed] = useState([]);
  const [searchParam, setSearchParam] = useState(undefined);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = () => {
    fetch(RSS_TO_JSON_API + URL)
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
    <ScrollContainer style={styles.scrollContainer}>
      <Container>
        <View
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: 'lightblue',
            margin: 5,
            height: 41,
          }}>
          <TextInput
            placeholder={'Type...'}
            style={{fontSize: 15, height: 40}}
            onChangeText={(t) => setSearchParam(t)}
          />
        </View>
        {state && state.news && state.news.items && (
          <CellList feed={state.news.items} onPress={onPress} />
        )}
      </Container>
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {backgroundColor: 'white'},
});

export default HomeScreen;
