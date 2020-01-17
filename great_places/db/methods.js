import {db} from './index';

export const insertPlace =  (title, imageUri, address, lat, lng) => {
  const promise = new Promise((resolve, reject)=> {

    db.transaction((tx)=> {

      tx.executeSql(
        `INSERT INTO 
        places(title, imageUri, address, lat, lng)
        VALUES(?, ?, ?, ?, ?)
        `, 
        [title, imageUri, address, lat, lng], 
        (_, result)=> {resolve(result)},
        (_,error)=> {reject(error)}
      )
    }) 

  });
 
  return promise;
}
