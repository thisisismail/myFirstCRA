import {combineReducers} from 'redux';
import tokenReducers from './tokenReducers.js';
import selectSongReducers from './selectSongReducers.js';

const allReducers = combineReducers({
  storeToken: tokenReducers,
  storeSongs: selectSongReducers,
})

export default allReducers;