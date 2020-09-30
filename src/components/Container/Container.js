import React from 'react';
import {SafeAreaView} from 'react-native';

const Container = ({style, children}) => (
  <SafeAreaView style={style}>{children}</SafeAreaView>
);

export default Container;
