import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity } from 'react-native';
import Header from './components/header';
import Navigator from "./routes/homeStack";

export default function App() {
  return (
    <Navigator />
  );
}

const styles = StyleSheet.create({

});
