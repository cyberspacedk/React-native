import React from 'react'; 
import {Provider} from 'react-redux';
import PlacesNavigation from './navigation/PlacesNavigation';

import initDatabase from './db'
import store from './store';

// initialise database
initDatabase()
.then(()=>  console.log('INIT'))
.catch(error=> console.log(error))

export default function App() {
  return  (
    <Provider store={store}>
      <PlacesNavigation />
    </Provider>
  )
  
} 