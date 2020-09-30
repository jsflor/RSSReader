import React, {useEffect, useState, useRef} from 'react';
import {View, TextInput, StyleSheet, Text, Keyboard} from 'react-native';

import {setNews as setNewsContext} from '../../context/actions/index';
import {useStateValue} from '../../context/StateContext';
import {getData, saveData} from '../../helpers/storage/asyncStorage';
import {CellList, ScrollContainer, Container} from '../../components';
import {RSS_TO_JSON_API, URL} from '../../helpers/constants/http';

const HomeScreen = ({navigation}) => {
  const [state, dispatch] = useStateValue();
  const [feed, setFeed] = useState([]);
  const [searchParam, setSearchParam] = useState('');

  let _textInput = useRef(null);

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    if (searchParam) {
      setTimeout(() => {
        let text;
        if (
          _textInput &&
          _textInput._internalFiberInstanceHandleDEV.memoizedProps.value
        ) {
          text = _textInput._internalFiberInstanceHandleDEV.memoizedProps.value;
        }
        if (searchParam === text && state && state.news) {
          let query = searchParam.toUpperCase();
          let feedCopy = [...state.news.items];
          let feedFilter = feedCopy.filter((f) => {
            let up = f.title.toUpperCase();
            return up.includes(query);
          });
          setFeed(feedFilter);
        }
      }, 500);
    } else {
      if (state.news) {
        let feedCopy = [...state.news.items];
        setFeed(feedCopy);
      }
    }
  }, [searchParam]);

  const getNews = () => {
    fetch(RSS_TO_JSON_API + URL)
      .then((res) => res.json())
      .then((res) => {
        if (res && res.items) {
          saveData('news', res);
          setFeed(res.items);
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
          setFeed(news.items);
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
    <ScrollContainer style={styles.scrollContainer} onScroll={Keyboard.dismiss}>
      <Container>
        <View style={styles.search}>
          <TextInput
            placeholder={'Type...'}
            value={searchParam}
            ref={(component) => (_textInput = component)}
            style={styles.input}
            onChangeText={(t) => setSearchParam(t)}
          />
        </View>
        {feed && feed.length ? (
          <CellList feed={feed} onPress={onPress} />
        ) : (
          <Text style={styles.normal}>Not results!</Text>
        )}
      </Container>
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {backgroundColor: 'white'},
  normal: {
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'center',
    marginTop: 20,
  },
  search: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'lightblue',
    margin: 5,
    height: 41,
  },
  input: {fontSize: 15, height: 40},
});

export default HomeScreen;
