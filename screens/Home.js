import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../config";
import Button from "../components/Button";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate("Gallery")}>
        <Text style={styles.h1}>Camera App</Text>
      </Button>
      <Text style={styles.txt}>
        show gallery pictures take picture from camera save photo to device
        delete photo from device share photo
      </Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  h1: {
    textAlign: 'center',
    fontSize: 72,
    color: "white",
    fontFamily: "Nunito_bold",
    marginVertical: 20,
    letterSpacing: 2,
  },
  txt: {
    fontFamily: "Nunito",
    color: "white",
    maxWidth: 500,
    fontSize: 24,
    padding: 20,
    textAlign: "center",
  },
});
