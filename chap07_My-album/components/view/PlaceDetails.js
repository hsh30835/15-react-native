import { useEffect, useState } from "react"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlineButton from "../UI/OutlineButton";
import { Colors } from "../../model/Colors";
import { fetchPlaceDetails } from "../../util/qurey";

const PlaceDetails = ({route, navigation}) => {
    const [fetchPlaces, setFecthPalces] = useState();

    const showOnMapHandler = () => {
        navigation.navigate("Map", {
            latitude : fetchPlaces.location.lat,
            longitude : fetchPlaces.location.lng
        });
    }

    const selectedPlaceId = route.params.placeId;

    useEffect(()=>{
        const loadPlaceData = async () => {
            const result = await fetchPlaceDetails(selectedPlaceId);

            setFecthPalces(result);
            navigation.setOptions({title: result.title});
        }

        loadPlaceData();
    },[selectedPlaceId]);

    if(!fetchPlaces){
        return(
            <View style={styles.fallback}>
                <Text>로딩중 입니다.</Text>
            </View>
        )
    }

    return(
        <ScrollView>
            <Image style = {styles.image} source={{uri:fetchPlaces.imageUri}}/>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{fetchPlaces.address}</Text>
                </View>
                <OutlineButton icon="Map" onPress={showOnMapHandler}>
                    지도 보기
                </OutlineButton>
            </View>
        </ScrollView>
    )
}


export default PlaceDetails;


const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screen: {
        alignItems: 'center'
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    }
});
