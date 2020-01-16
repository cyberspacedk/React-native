import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import places from './reducers/place';

const rootReducer = combineReducers({
  places
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
