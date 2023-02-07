import { Alert, Button, View, Image, Text, StyleSheet } from "react-native";
import {
    launchCameraAsync,
    useCameraPermissions,
    PermissionStatus,
} from "expo-image-picker";
import { useState, useCallback } from "react";
import { Colors } from "../../constants/colors";

function ImagePicker() {
    const [pickedImage, setPickedImage] = useState("");
    const [cameraPermissionInformation, requestPermission] =
        useCameraPermissions();

    async function verifyPermissions() {
        console.log(cameraPermissionInformation);
        if (
            cameraPermissionInformation.status === PermissionStatus.UNDETERMINED
        ) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                "Insufficient Permissions!",
                "You need to grant camera permissions to use this app."
            );
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        return true;
    }

    const takeImageHandler = useCallback(async () => {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });

        setPickedImage(image.assets[0].uri);
    }, [setPickedImage, verifyPermissions, launchCameraAsync]);

    let imagePreview = <Text>No image taken yet.</Text>;

    if (pickedImage) {
        imagePreview = (
            <Image style={styles.image} source={{ uri: pickedImage }} />
        );
    }

    return (
        <View>
            <View style={styles.imagePreview}>{imagePreview}</View>
            <Button title="Take Image" onPress={takeImageHandler} />
        </View>
    );
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    image: {
        width: "100%",
        height: "100%",
    },
});

```
const takeImageHandler = useCallback(async () => {
    const image = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
    });

    console.log(image);
}, [launchCameraAsync]);
```;
