import { StyleSheet, View } from "react-native";
import React, { useState } from "react";

import ImagePicker from "../../component/Photo/ImagePicker";
import { Text, Card, Button, Icon } from "@rneui/themed";
import { useSelector, useDispatch } from "react-redux";
import ImageModal from "react-native-image-modal";
export default function Index() {
  const [showCamera, setShowCamera] = useState(false);

  //const imageuri = useSelector((state) => state.photo.photouri);
  const imageuri = useSelector((state) => state.photo.photouri.uri);

  const qrcode = useSelector((state) => state.photo.qrcode);

  function OpenCamera() {
    // Show the ImagePicker component
    if (!imageuri) {
      setShowCamera(true);
    }
  }

  function CloseCamera() {
    // Hide the ImagePicker component and show main content
    setShowCamera(false);
  }

  // If showCamera is true, render the ImagePicker
  if (showCamera) {
    return <ImagePicker onClose={CloseCamera} />;
  }

  // Otherwise, render the main content
  return (
    <View style={styles.container}>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title>HELLO WORLD</Card.Title>
        <Card.Divider />
        <View style={styles.imageContainer}>
          <ImageModal
            resizeMode="cover"
            style={styles.imageModal}
            source={
              imageuri && imageuri.trim() !== ""
                ? { uri: imageuri }
                : { uri: "https://via.placeholder.com/250x250?text=No+Image" }
            }
            onOpen={() => console.log("Image modal opened")}
            modalImageResizeMode="contain"
          />
        </View>
        <Text style={{ marginBottom: 10 }}>
          The idea with React Native Elements is more about component structure
          than actual design.
        </Text>
        {qrcode.length > 3 && (
          <Text style={{ marginBottom: 10 }}>Scanned QR Code: {qrcode}</Text>
        )}
        <Button
          icon={
            <Icon
              name="add-a-photo"
              color="#ffffff"
              iconStyle={{ marginRight: 10 }}
            />
          }
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="Take Photo"
          onPress={OpenCamera}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  cardContainer: {
    borderRadius: 10,
    margin: 20,
    padding: 15,
  },
  imageContainer: {
    width: "100%",
    height: 250,
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  imageModal: {
    width: 350,
    height: 250,
    borderRadius: 10,
  },
});
