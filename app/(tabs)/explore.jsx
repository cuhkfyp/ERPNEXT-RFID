import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Explore() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
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
        })
        .catch((error) => {
          console.error("Error taking picture:", error);
        });
    }
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        barcodeScannerSettings={{
          barCodeTypes: ["qr", "code128", "ean13", "ean8", "upc_a", "upc_e"],
        }}
        onBarcodeScanned={(scanningResult) => {
          console.log("Scanned barcode:", scanningResult.data);
          alert(`Scanned: ${scanningResult.data}`);
        }}
        style={styles.camera}
        facing={facing}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
        <Button title="Take picture" onPress={takeImageHandler}></Button>
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
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
