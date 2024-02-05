import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('Maidika.db');

//FOR REGISTERING USERS.
//function to create 'users' table for Register screen.
export const createUserTable = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, fName TEXT, email TEXT, phone INTEGER, password TEXT, confirmPassword TEXT);',
                [],
                () => {
                    console.log('users table created or already exists');
                    resolve();
                },
                (error) => {
                    console.error('Error creating users table: ', error);
                    reject(error);
                }
            );
        });
    });
};

//function to insert data in 'users' table for Register screen.
export const insertUser = (name, fname, email, phone, password, confirmPassword) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO users (name, fname, email, phone, password, confirmPassword) VALUES (?, ?, ?, ?, ?, ?);',
                [name, fname, email, phone, password, confirmPassword],
                (_, results) => {
                    const insertedId = results.insertId;
                    tx.executeSql(
                        'SELECT * FROM users WHERE id = ?;',
                        [insertedId],
                        (_, selectResults) => {
                            if (selectResults.rows.length > 0) {
                                const insertedData = selectResults.rows.item(0);
                                resolve({ id: insertedId, data: insertedData });
                            } else {
                                reject('Data not found !');
                            }
                        },
                        (_, error) => {
                            reject(error);
                        }
                    );
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};

//function to update users table.
export const updateUser = (userId, name, fname, password) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE users SET name = ?, fname = ?, password = ? WHERE id = ?;',
                [name, fname, password, userId],
                (_, results) => {
                    if (results.rowsAffected > 0) {
                        resolve('User updated successfully');
                    } else {
                        reject('User not found');
                    }
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};



//FOR LOGIN.
//function to match user credentials for Login Screen.
export const checkUserCredentials = (email, password) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM users WHERE email = ? AND password = ?;',
                [email, password],
                (_, results) => {
                    if (results.rows.length > 0) {
                        const user = results.rows.item(0);
                        resolve(user);
                    } else {
                        reject('Invalid email or password');
                    }
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};





