import * as SQLite from 'expo-sqlite';
import jwt from 'react-native-pure-jwt';
import * as SecureStore from 'expo-secure-store';

const db = SQLite.openDatabase('Maidika.db');

const generateToken = async (userId) => {
    const token = await jwt.sign(
        { id: userId },
        'your-secret-key',
        {
            alg: 'HS256',
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
        }
    );

    await SecureStore.setItemAsync('userToken', token);
};

//function to create 'users' table for Register screen.
export const createUserTable = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, fName TEXT, email TEXT NOT NULL UNIQUE, phone INTEGER, password TEXT, profileImage BLOB);',
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
export const insertUser = (name, fname, email, phone, password, profileImage) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO users (name, fname, email, phone, password, profileImage) VALUES (?, ?, ?, ?, ?, ?);',
                [name, fname, email, phone, password, profileImage],
                               async (_, results) => {
                    const insertedId = results.insertId;
                    tx.executeSql(
                        'SELECT * FROM users WHERE id = ?;',
                        [insertedId],
                        async (_, selectResults) => {
                            if (selectResults.rows.length > 0) {
                                const insertedData = selectResults.rows.item(0);
                                // Générer un token pour le nouvel utilisateur
                                await generateToken(insertedId);
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
export const updateUser = (userId, name, fname, password, profileImage, phoneNumber) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE users SET name = ?, fname = ?, password = ?, profileImage = ?, phoneNumber = ? WHERE id = ?;',
                [name, fname, password, profileImage, phoneNumber, userId],
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



// FOR LOGIN.
// function to get user by email for Login Screen.
export const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM users WHERE email = ?;',
                [email],
                (_, results) => {
                    if (results.rows.length > 0) {
                        const user = results.rows.item(0);
                        resolve(user);
                    } else {
                        reject('Invalid email');
                    }
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};

// function to create 'medications' table for AddTreatment screen.
export const createMedicationsTable = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS medications (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    userId INTEGER,
                    whenTake INTEGER,
                    medicationName TEXT,
                    dosage TEXT,
                    medicationType TEXT,
                    timeToTake TEXT,
                    startDate TEXT,
                    endDate TEXT,
                    phoneNumber TEXT,
                    comment TEXT,
                    FOREIGN KEY (userId) REFERENCES users(id)
                );`,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};

// Function to insert data into 'medications' table
export const insertMedication = (userId, whenTake, medicationName, dosage, medicationType, timeToTake, startDate, endDate, phoneNumber, comment) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO medications (userId, whenTake, medicationName, dosage, medicationType, timeToTake, startDate, endDate, phoneNumber, comment) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [userId, whenTake, medicationName, dosage, medicationType, timeToTake, startDate, endDate, phoneNumber, comment],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};

export const fetchMedications = (userId) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM medications WHERE userId = ?',
                [userId],
                (tx, results) => {
                    // console.log('success fetching medications:', results.rows.length);
                    var medications = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        medications.push(results.rows.item(i));
                        console.log('medications:', medications);
                    }
                    resolve(medications);
                },
                (tx, error) => {
                    console.log('Fetch error:', error);
                    reject(error);
                }
            );
        });
    });
};

export const removeMedication = (medicationId) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM medications WHERE id = ?',
                [medicationId],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        console.log('Medication deleted successfully');
                        resolve(true);
                    } else {
                        console.log('Deletion failed');
                        resolve(false);
                    }
                },
                (tx, error) => {
                    console.log('Delete error:', error);
                    reject(error);
                }
            );
        });
    });
};

export const createMedicationTakesTable = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS MedicationTakes (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    medicationId INTEGER,
                    dateTaken TEXT,
                    isTaken BOOLEAN DEFAULT 0,
                    FOREIGN KEY (medicationId) REFERENCES medications(id)
                );`,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};

export const recordMedicationTake = (id, isTaken, dateTaken) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO MedicationTakes (medicationId, dateTaken, isTaken) VALUES (?, ?, ?)`,
                [id, dateTaken, isTaken],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};

export const checkIfMedicationTaken = (medicationId, dateTaken) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM MedicationTakes WHERE medicationId = ? AND dateTaken = ?`,
                [medicationId, dateTaken],
                (_, result) => {
                    if (result.rows.length > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};


// Ordonnance
// Function to create 'images' table
export const createPrescriptionTable = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS prescription (id INTEGER PRIMARY KEY AUTOINCREMENT, photo BLOB, title TEXT, date DATE, comment TEXT, userId INTEGER, FOREIGN KEY(userId) REFERENCES users(id));',
                [],
                () => {
                    console.log('images table created or already exists');
                    resolve();
                },
                (error) => {
                    console.error('Error creating images table: ', error);
                    reject(error);
                }
            );
        });
    });
};

// Function to insert data into 'images' table
export const insertPrescription = (photo, title, date, comment, userId) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO prescription (photo, title, date, comment, userId) VALUES (?, ?, ?, ?, ?);',
                [photo, title, date, comment, userId],
                (_, results) => {
                    const insertedId = results.insertId;
                    tx.executeSql(
                        'SELECT * FROM prescription WHERE id = ?;',
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

export const fetchPrescriptionsByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM prescription WHERE userId = ?;',
                [userId],
                (_, results) => {
                    let prescriptions = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        prescriptions.push(results.rows.item(i));
                    }
                    resolve(prescriptions);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};

// Delete prescription
export const deletePrescriptionById = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM prescription WHERE id = ?;',
                [id],
                (_, results) => {
                    resolve(results);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};