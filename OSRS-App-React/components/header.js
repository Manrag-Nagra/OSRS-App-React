import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
    return (
      <View style={styles.header}>
          <Text style={styles.title}>OSRS Tracker</Text> 
      </View>
    );
}

const styles = StyleSheet.create({
    header: {
      height: 102,
      paddingTop: 60,
      backgroundColor: '#302106'
    },
    title: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: "bold"
    }
  });