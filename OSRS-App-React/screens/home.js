import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity } from 'react-native';


export default class Home extends React.Component {
    
static navigationOptions = {
    title: 'OSRS Tracker',
    headerStyle: {
        backgroundColor: '#302106',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
};  

pressHandler = () => {
    this.props.navigation.navigate('GrandExchange');
}

render () {
    return (
        //Background image
        <ImageBackground source={require('../assets/osrs3.jpg')} resizeMode='cover' style={styles.container}>
        {/* Grand exchange button */}
        <TouchableOpacity style={styles.button} onPress={this.pressHandler}>
            <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Grand Exchange</Text>
            </View>
        </TouchableOpacity >
        </ImageBackground >
    );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 300,
    },
  buttonContainer: {
    backgroundColor: "#197886",
    width: 144,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff"
  }
});
