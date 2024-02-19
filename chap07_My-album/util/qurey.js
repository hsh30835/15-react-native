import * as SQLite from "expo-sqlite";
import { Places } from "../model/place";

// 
const database = SQLite.openDatabase("places.db");


export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tr) => {
            tr.executeSql(`SELECT * FROM places ORDER BY id`,
                [],
                (_, result) =>{
                    const place = [];
                    for(const dp  of result.rows._array){
                        place.push(new Places(dp.title, dp.imageUri, {lat: dp.lat, lng : dp.lng, address:dp.address}, dp.id));
                    }
                    resolve(place);
                },
                (_, error) => {reject(error)}
            );
        });
    });

    return promise;
}

export const fetchPlaceDetails = (id) => {
    const promise = new Promise((resolve,reject) => {
        database.transaction((tr) => {
            tr.executeSql("SELECT * FROM places WHERE id=?",
            [id],
            (_, result) => {
                const dbPlace = result.rows._array[0];
                const place = new Places(dbPlace.title, dbPlace.imageUri, {lat:dbPlace.lat, lng:dbPlace.lng, address:dbPlace.address}, dbPlace.id);
                resolve(place);
            },
            (_, error) => {
                reject(error);
            });
        });
    });

    return promise;
}


export const insertPlace = (place) =>{
    const promise = new Promise((resolve, reject) =>{
        database.transaction((tr) =>{
            tr.executeSql(`
                INSERT INTO places(
                    title,
                    imageUri,
                    address,
                    lat,
                    lng
                )VALUES(
                    ?,
                    ?,
                    ?,
                    ?,
                    ?
                )
            `,
            [place.title, place.imageUri, place.address, place.location.lat, place.location.lng],
            (_, result) => resolve(result),
            (_, error) => reject(error)
            );
        });
    });
    return promise;
}