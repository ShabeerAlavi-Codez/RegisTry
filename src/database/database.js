import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'myapp.db',
    location: 'default',
  },
  () => {},
  error => {
    console.log('Error opening database: ', error);
  }
);

const Database = {
  init: () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL)',
        [],
        () => {},
        (_, error) => {
          console.log('Error creating table: ', error);
        }
      );
    });
  }, 

  insertUser: (username, password) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO users (username, password) VALUES (?, ?)',
          [username, password],
          (_, result) => {
            resolve(result);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },

  // Implement other CRUD operations
};

export default Database;
