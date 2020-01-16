import React from 'react'; 
import {Provider} from 'react-redux';
import PlacesNavigation from './navigation/PlacesNavigation';

import store from './store';

export default function App() {
  return  (
    <Provider store={store}>
      <PlacesNavigation />
    </Provider>
  )
  
} 