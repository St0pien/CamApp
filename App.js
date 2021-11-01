import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Nunito from "./assets/fonts/NunitoSans-Regular.ttf";
import Nunito_bold from "./assets/fonts/NunitoSans-Bold.ttf";
import { colors } from "./config";
import Home from "./screens/Home";
import Gallery from "./screens/Gallery";
import Camera from "./screens/Camera";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito,
    Nunito_bold,
  });

  return fontsLoaded ? (
    <NavigationContainer>
      <StatusBar></StatusBar>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            fontFamily: 'Nunito_bold'
          }
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen name="Gallery" component={Gallery}></Stack.Screen>
        <Stack.Screen name="Camera" component={Camera}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  ) : null;
}
