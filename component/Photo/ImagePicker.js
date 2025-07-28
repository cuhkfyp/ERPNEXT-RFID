import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { photoActions } from "../../store/photostate-slice";
import { Button, color } from "@rneui/base";
import { Colors } from "../../constants/colors";

export default function ImagePicker({ onClose }) {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();

  const qrcode = useSelector((state) => state.photo.qrcode);

  const cameraRef = useRef(null);

  const dispatch = useDispatch();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  function handlePermissionDenied() {
    // Call onClose to go back to main content
    if (onClose) {
      onClose();
    }
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <View style={styles.buttonRow}>
          <Button onPress={requestPermission} title="Grant Permission" />
          <Button
            onPress={handlePermissionDenied}
            title="Cancel"
            color="red"
            style={{ marginTop: 10 }}
          />
        </View>
      </View>
    );
  }

  function takeImageHandler() {
    // Logic to take a picture
    console.log("takeImageHandler");

    if (cameraRef.current) {
      cameraRef.current
        .takePictureAsync({
          quality: 1,
          skipProcessing: false,
        })
        .then((image) => {
          console.log("Image taken:", image);
          console.log("Image URI:", image.uri);
          console.log("Image URI type:", typeof image.uri);

          //dispatch(photoActions.setPhotoUri(image.uri));
          dispatch(
            photoActions.setPhotoUri({
              uri: image.uri,
              width: image.width,
              height: image.height,
            })
          );
          console.log("Redux action dispatched with URI:", image.uri);
          onClose();
        })
        .catch((error) => {
          console.error("Error taking picture:", error);
        });
    }
  }

  function handleBarcodeScanned(scanningResult) {
    console.log("=== BARCODE SCANNED ===");
    console.log("Full result:", scanningResult);
    console.log("Barcode data:", scanningResult.data);
    console.log("Barcode type:", scanningResult.type);
    console.log("========================");

    // Dispatch the scanned data to Redux
    dispatch(photoActions.setQRCode(scanningResult.data));

    // You can also dispatch to Redux if needed
    // dispatch(photoActions.setQRCode(scanningResult.data));
  }

  console.log("Camera permission granted:", permission?.granted);
  console.log("Camera ref:", cameraRef.current);

  return (
    <View style={styles.container}>
      <CameraView
        barcodeScannerSettings={{
          barCodeTypes: ["qr", "code128", "ean13", "ean8", "upc_a", "upc_e"],
          interval: 50000, // Scan every 50000ms
        }}
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={(scanningResult) =>
          handleBarcodeScanned(scanningResult)
        }
      >
        <View style={styles.absoluteButton}>
          <Button
            title={qrcode}
            type="outline"
            disabledTitleStyle={styles.absoluteButtonDisabled}
            disabled
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            /* onPress={() => onClose && onClose()} */
            onPress={takeImageHandler}
          >
            <Text style={styles.text}>Take photo</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  buttonRow: {
    gap: 10,
    paddingHorizontal: 20,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.transparent,

    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  absoluteButton: {
    position: "absolute",
    top: 60, // Changed from bottom to top for better visibility
    left: 35, // Changed from left to right
    zIndex: 1000, // Added high z-index
    backgroundColor: Colors.transparent,
  },
  absoluteButtonDisabled: {
    color: Colors.gray700,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    borderColor: Colors.gray500,
    borderWidth: 1.5,
    padding: 10,
    borderRadius: 5,
  },
});
