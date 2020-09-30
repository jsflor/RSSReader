import React from 'react';
import Cell from '../Cell/Cell';

const CellList = (props) =>
  props.feed.map((article) => (
    <Cell key={article.guid} article={article} onPress={props.onPress} />
  ));

export default CellList;
