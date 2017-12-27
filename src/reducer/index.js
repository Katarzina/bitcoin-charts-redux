import { combineReducers } from 'redux'
import bitcoin from './bitcoin'
import { loading } from './loading';

const rootReducer = combineReducers({
  loading,
  bitcoin
});

export default rootReducer;
