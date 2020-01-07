import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, FlatList, Image } from 'react-native';
import {  Snackbar } from 'react-native-paper';

export default class GrandExchange extends React.Component {

    //Change navigation bar title and colour
    static navigationOptions = {
        title: 'Grand Exchange',
        headerStyle: {
            backgroundColor: '#302106',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };  
    

    //State constructor
    constructor(props) {
        super(props);
        this.state = {
            itemName: "",
            pageNum: 1,
            isLoading: false,
            dataSource: null,
            isMoreDataLoading: false,
            hasMoreData: true,
            visible: false,
            message: ""
        }
    }

    //When user clicks on push button
    onSearchHandle = () => {
        //Check to see if they enter an item or not
        if(this.state.itemName != "") {
            this.setState({
                dataSource: null,
                isLoading: true,
                pageNum: 1
            }, 
            () => {
                //Call api to fetch data
                this.fetchData()
            })
        } else {
            this.setState({
                visible: true,
                message: "Please enter an item"
            })
        }
        
    }

    //When user scroll to bottom, load more data 
    handleMoreData = () => {
        //Check to see if there already data loading and if there could be more data
        if(!this.state.isMoreDataLoading && this.state.dataSource.length > 11) {
            this.setState({
                isMoreDataLoading: true,
                pageNum: this.state.pageNum + 1
            },
            () => {
                this.fetchMoreData()
            })
        }
    }

    //initial fetch to api
    fetchData () {
        return fetch('http://192.168.2.11:3002/items/' + this.state.itemName.toLowerCase() + '/' + this.state.pageNum)
            .then( (response) => response.json() )
            .then ( (responseJson) => {
                if(responseJson.status != "failure") {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.items
                })
                } else {
                    this.setState({
                        isLoading: false,
                        visible: true,
                        message: "Can't find item"
                    })
                }
            })

        .catch((error)=> {
            console.log(error);
        });


    }

    //Load more data when user scroll to the bottom of the list
    fetchMoreData () {
        setTimeout(() =>  { 
            return fetch('http://192.168.2.11:3002/items/' + this.state.itemName.toLowerCase() + '/' + this.state.pageNum)
                .then( (response) => response.json() )
                .then ( (responseJson) => {
                    if(responseJson.status != "failure") {
                        this.setState({
                            isMoreDataLoading: false,
                            dataSource: [...this.state.dataSource, ...responseJson.items]
                        })
                    } else {
                        this.setState({
                            isMoreDataLoading: false,
                            visible: true,
                            message: "No more item"
                        })
                    }
                })

            .catch((error)=> {
                console.log(error);
            });
        }, 1500)
        
    }

    onItemTapped = (item) => {
        this.props.navigation.navigate('GrandExchangeMoreInfo', {
            itemID: item.id
        });
    }

    render () {

        return (
        <View style={styles.container}>
            {/*Text Input Field*/}
            <View style={styles.TextInputView}>
                <TextInput placeholder="Enter item here" style={styles.TextInput} selectionColor={"#302106"} underlineColorAndroid={"#302106"}
                value={this.state.itemName}
                onChangeText={(itemName) => this.setState({itemName})}
                />
                     {/*Search Button*/}
                    <TouchableOpacity style={styles.ButtonContainer} onPress={this.onSearchHandle}>
                        <View style={styles.ButtonView}>
                            <Text style={styles.ButtonStyless}>Search</Text>
                        </View>
                    </TouchableOpacity >
            </View> 
            <View style={styles.content}>
                {/*Flat List Container*/}
                <FlatList
                    style={styles.flatListContainer} 
                    keyExtractor={(item) => item.id.toString()}
                    data={this.state.dataSource}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => this.onItemTapped(item)}>
                            <View style={styles.itemContainer}>
                                {/*Icon Image*/}
                                <Image
                                    style={{width: 50, height: 50,  marginTop: 30, marginLeft: 5, position: "absolute"}}
                                    source={{uri: item.icon_large}}
                                />
                                {/*Item name*/}
                                <Text style={styles.item}>
                                    {item.name}{"\n"}
                                </Text>
                                {/*Item Description*/}
                                <Text style={styles.itemDesc}>
                                    {item.description}
                                </Text>
                                {/*Item Current and Today Price*/}
                                <View style={{flex:1, flexDirection: "row"}}>
                                    <Text style={styles.itemCurrent}>
                                        Current: {item.current.currentPrice}
                                    </Text>
                                    <Text style={styles.itemToday}>
                                            Today: {item.today.todayPrice}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                    }
                    onEndReached={this.handleMoreData}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={()=> <ActivityIndicator size="large" animating={this.state.isMoreDataLoading}/>}
                />
            </View>
            <View style={styles.activityContainer}>
            {/*Activity Indicator*/}
            <ActivityIndicator size="large" animating={this.state.isLoading} />
             {/*Snackbar*/}
            <Snackbar
                visible={this.state.visible}
                onDismiss={() => this.setState({ visible: false })}
                duration={3000}
                >
                {this.state.message}
            </Snackbar>
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