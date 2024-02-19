import { insertPlace } from "../../util/qurey";
import PlaceForm from "../places/PlaceForm";

const AddPlace = ({navigation}) => {
    const createPlaceHandler = async (place) => {
        await insertPlace(place);
        navigation.navigate("AllPlaces");
    }

    return <PlaceForm onCreatePlace = {createPlaceHandler}/>
}

export default AddPlace;