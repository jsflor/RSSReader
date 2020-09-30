import React from 'react';
import {ScrollView} from 'react-native';

const ScrollContainer = ({style, children}) => (
  <ScrollView style={style}>{children}</ScrollView>
);

export default ScrollContainer;
