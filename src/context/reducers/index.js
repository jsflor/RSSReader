import {newsReducer} from './newsReducer';

const mainReducer = ({news}, action) => ({
  news: newsReducer(news, action),
});

export default mainReducer;
