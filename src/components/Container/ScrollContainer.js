import React from 'react';
import {ScrollView} from 'react-native';

const ScrollContainer = ({style, children, onScroll}) => (
  <ScrollView style={style} onScroll={onScroll}>{children}</ScrollView>
);

export default ScrollContainer;
