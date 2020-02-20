import * as SQLite from 'expo-sqlite';

// create a database
export const db = SQLite.openDatabase('places.db');

// SQLite works with tables 

// executeSql run commands and takes params

// 1 param in () I create fields - id , text, and others and describe type of this fiels
// 2 param - dependencies array
// 3 param callback executes when success
// 4 param callback executes when error

const initDatabase = ()=> {
  const promise = new Promise((resolve, reject)=> {

    db.transaction((tx)=> {

      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS places( id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL )', 
        [], 
        ()=> {resolve()},
        (_,error)=> {reject(error)}
      )
    }) 

  });
 
  return promise;
};
    
export default initDatabase;