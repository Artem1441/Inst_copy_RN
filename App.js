import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { LandingScreen } from "./components/auth/LandingScreen";
import { RegisterScreen } from "./components/auth/RegisterScreen";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDA9B6f2E5ZdYQ9hGdt9W2ZTcsmAcizJEk",
  authDomain: "inst-dev.firebaseapp.com",
  projectId: "inst-dev",
  storageBucket: "inst-dev.appspot.com",
  messagingSenderId: "322533333849",
  appId: "1:322533333849:web:cf791cc9f9095c378d4a48",
  measurementId: "G-2WW435CKJQ",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      // alert(user.email);
      if (!user) {
        // alert("ok");
        setLoaded(true);
        setLoggedIn(false);
      } else {
        // alert("not ok");
        setLoaded(true);
        setLoggedIn(true);
      }
    });
  });

  if (!loaded) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (!loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRoutesName="LandingScreen">
          <Stack.Screen
            name="LandingScreen"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <View style={styles.container}>
      <Text>User is logged in</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
