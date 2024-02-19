import * as SQLite from "expo-sqlite";


const database = SQLite.openDatabase("places.db");

// 모바일 단말기에 데이터베이스를 생성함
export const Connection = () =>{

    const promise = new Promise((resolve, reject) =>{
        database.transaction((tr) =>{
            tr.executeSql(`
                CREATE TABLE IF NOT EXISTS places(
                    id INTEGER PRIMARY KEY NOT NULL,
                    title TEXT NOT NULL,
                    imageUri TEXT NOT NULL,
                    address TEXT NOT NULL,
                    lat REAL NOT NULL,
                    lng REAL NOT NULL
                )`,
                [],
                () =>{
                    resolve();
                },
                (_, error) =>{
                    reject(error);
                }
            );
        });
    });

    return promise;
}