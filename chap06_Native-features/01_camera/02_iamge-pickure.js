import { useState } from "react";
import { Alert, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import {launchCameraAsync, useCameraPermissions, PermissionStatus} from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const ImagePicker = () => {
    const [PickedImage,setPickedImage] = useState();

    const [cameraPermission, requestPermission] = useCameraPermissions();

    const verifyPermissions = async() => {
        if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if(cameraPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert("주의", "앱을 사용하기 위해서는 권한이 필요합니다.");
            return false;
        }

        return true;
    }

    const takeImageHandler = async() => {
        const hasPermission = await verifyPermissions();

        if(!hasPermission){
            return;
        }

        const image = await launchCameraAsync(
            {
                allowsEditing : true, // 편집 여부
                aspect:[16,9], // 비율
                quality:0.5 // 카메라 화질
            }
        );

        if(!image.canceled){
            try{
                if(Platform.OS === "ios"){
                    await MediaLibrary.saveToLibraryAsync(image.uri);
                }else{
                    const {status} = await MediaLibrary.requestPermissionsAsync();
                    if(status === "granted"){
                        await MediaLibrary.saveToLibraryAsync(image.uri);
                    }
                }

                setPickedImage(image.uri);
                Alert.alert("성공","갤러리에 이미지가 저장되었습니다.")
            }catch(error){
                console.error("사진 저장중 오류 발생", error)
                Alert.alert("실패","사진을 저장하는 과정에서 오류가 발생했씁니다.");
            }
        }
    };

    let imagePreview = <Text>이미지가 없습니다.</Text>

    if(PickedImage) {
        imagePreview = <Image source = {{uri:PickedImage}} style={styles.image}/>
    }

    return(
        <View>
            <View style = {styles.imagePreview}>
                {imagePreview}
            </View>
            <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]} onPress={takeImageHandler}>
                <Ionicons style={styles.icon} name ="camera" size={18} color="black" />
                <Text style={styles.Text}>사진 촬영</Text>
            </Pressable>
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
        borderRadius:4,
        overflow:'hidden'
    },
    image:{
        width:'100%',
        height:'100%'
    },
    button:{
        paddingHorizontal:12,
        paddingVertical:6,
        margin:4,
        flexDirection: 'row',
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
    },
    pressed:{
        opacity:0.7
    },
    icon:{
        marginRight:6
    },
});