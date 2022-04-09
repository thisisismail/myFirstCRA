import {combineReducers} from 'redux';
import tokenReducers from './tokenReducers.js';

const allReducers = combineReducers({
  storeToken: tokenReducers,
})

export default allReducers;