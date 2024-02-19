import { useState } from "react"
import { useCameraPermissions, PermissionStatus, launchCameraAsync } from "expo-image-picker";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../model/Colors";
import OutlineButton from "../UI/OutlineButton";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";

const ImagePicker = ({onTakeImage}) => {
    const [pickedImage, setPickedImage] = useState("");

    const [cameraPermissionInfomation, requestPermission] = useCameraPermissions();
    

    const verifyPermissions = async () => { //권한부여
        if(cameraPermissionInfomation.status === PermissionStatus.UNDETERMINED){
            const permissionsResponse = await requestPermission();
            return permissionsResponse.granted
        }

        if(cameraPermissionInfomation.status === PermissionStatus.DENIED){
            Alert.alert("주의", "위 앱은 카메라 권한이 있어야 합니다");
            return false;
        }
        
        return true;
    }

    const takeImageHandler = async () => { // 사진을 찍을떄 마다 권한을 허용했는지 확인
        const hasPermission = await verifyPermissions();

        if(!hasPermission) return;

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect:[16,9],
            quality:0.5
        });

        setPickedImage(image.assets[0].uri);
        onTakeImage(image.assets[0].uri);
    }

    let imagePreview = <Text>촬영한 이미지가 없습니다.</Text>

    if(pickedImage){
        imagePreview = <Image style={styles.image} source={{uri:pickedImage}}/>
    }

    return(
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlineButton icon="camera" onPress={takeImageHandler}>촬영하기</OutlineButton>
        </View>
    )
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview:{
        width:'100%',
        height:200,
        marginVertical:8,
        justifyContent:"center",
        alignItems:'center',
        backgroundColor:Colors.primary100,
        borderRadius:4,
        overflow:'hidden'
    },
    image:{
        width:'100%',
        height:'100%'
    }
});