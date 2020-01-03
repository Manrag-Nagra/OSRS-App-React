import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity } from 'react-native';


export default function Home({ navigation }) {

const pressHandler = () => {
    navigation.navigate('GrandExchange');
}

  return (
    <ImageBackground source={require('../assets/osrs3.jpg')} resizeMode='cover' style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pressHandler}>
          <View style={styles.buttonContainer}>
             <Text style={styles.buttonText}>Grand Exchange</Text>
          </View>
      </TouchableOpacity >
    </ImageBackground >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#197886",
    width: 144,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 300
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff"
  }
});
