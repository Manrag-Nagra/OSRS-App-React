import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, FlatList, Image } from 'react-native';

export default class GrandExchange extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            itemName: "",
            isLoading: true,
            dataSource: null,
        }
    }

    onSearchHandle = () => {
        this.setState({
            isLoading: true
        })
        this.componentDidMount()
    }

    componentDidMount () {

        return fetch('http://192.168.2.11:3002/items/' + this.state.itemName + '/1')
            .then( (response) => response.json() )
            .then ( (responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.items
                })
            })

        .catch((error)=> {
            console.log(error);
        });


    }

    render () {

        return (
        <View style={styles.container}>
        
            <View style={styles.TextInputView}>
                <TextInput placeholder="Enter item here" style={styles.TextInput} selectionColor={"#428AF8"} underlineColorAndroid={"#428AF8"}
                value={this.state.itemName}
                onChangeText={(itemName) => this.setState({itemName})}
                />
                    <TouchableOpacity style={styles.ButtonContainer} onPress={this.onSearchHandle}>
                        <View style={styles.ButtonView}>
                            <Text style={styles.ButtonStyless}>Search</Text>
                        </View>
                    </TouchableOpacity >
            </View> 
            <View style={styles.content}>
                <FlatList
                    style={styles.flatListContainer} 
                    keyExtractor={(item) => item.id}
                    data={this.state.dataSource}
                    renderItem={({item}) => (
                        <View style={styles.itemContainer}>
                            <Image
                        style={{width: 50, height: 50,  marginTop: 30, marginLeft: 5, position: "absolute"}}
                        source={{uri: item.icon_large}}
                        />
                        <Text style={styles.item}>
                            {item.name}{"\n"}
                        </Text>
                        <Text style={styles.itemDesc}>
                            {item.description}
                        </Text>
                        <View style={{flex:1, flexDirection: "row"}}>
                            <Text style={styles.itemCurrent}>
                                Current: {item.current.currentPrice}
                            </Text>
                            <Text style={styles.itemToday}>
                                    Today: {item.today.todayPrice}
                            </Text>
                        </View>
                        </View>
                    )}
                />
            </View>
            <View style={styles.activityContainer}>
        <ActivityIndicator size="large" animating={this.state.isLoading} />
        </View>
        </View>
        
        );
    }   
}

const styles = StyleSheet.create({
    activityContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    container: {
        flex: 1
    },
    TextInputView: {
        flexDirection: "row",
        marginLeft: 5
    },
    TextInput: {
        width: 310,
        height: 60
    },
    ButtonContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    ButtonView: {
        backgroundColor: "#302106",
        justifyContent: "center",
        alignItems: "center",
        width: 95,
        height: 45,
        marginRight: 5
    },
    ButtonStyless: {
        color: "white"
    },
    content: {
        flex: 1
    },
    flatListContainer: {
        flex: 1,
    },
    itemContainer: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        padding: 10,
    },
    item: {
        marginLeft: 50
    },
    itemDesc: {
        marginLeft: 50
    },
    itemCurrent:{
        flex: 1,
        marginTop: 10,
        marginLeft: 50
    },
    itemToday:{
        flex: 1,
        marginTop: 10,
        textAlign: "right"
    }
  });