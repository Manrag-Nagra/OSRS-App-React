import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, FlatList, Image } from 'react-native';
import {  Snackbar, DataTable  } from 'react-native-paper';

export default class GrandExchangeMoreInfo extends React.Component {

    //Change navigation bar title and colour
    static navigationOptions = {
        title: 'More Info',
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
            itemID: props.navigation.state.params.itemID,
            isLoading: false,
            dataSource: null,
            visible: false,
            message: "",
            members: ""
        }
    }

    componentDidMount(){
        return fetch('http://192.168.2.11:3002/itemsDetail/' + this.state.itemID)
            .then( (response) => response.json() )
            .then ( (responseJson) => {
                if(responseJson.status != "failure") {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.item
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



    render () {

        //Show spinner until data is retrived
        if (!this.state.dataSource) {
            return <ActivityIndicator size="large" style={styles.activityContainer}/>
          }
        
        if (this.state.dataSource.members){
            this.state.members = "true"
        } else {
            this.state.members = "false"
        }
        
        
        return(
            <View style={styles.content}>
                    {/* Image */}
                    <Image 
                        style={styles.image}
                        source={{uri: this.state.dataSource.icon_large}}
                    />
                    {/* Item Name */}
                    <Text style={styles.itemTitle}>{this.state.dataSource.name}</Text>
                    {/*  Item Description */}
                    <Text style={styles.itemDescription}>{this.state.dataSource.description}</Text>
                    {/*  First Table */}
                    <DataTable style={styles.dataTable}>
                        {/* Header */}
                        <DataTable.Header style={styles.dataTableHeader}>
                            <DataTable.Title>Current</DataTable.Title>
                            <DataTable.Title>Members</DataTable.Title>
                            <DataTable.Title style={{marginLeft: 20}}>Today</DataTable.Title>
                        </DataTable.Header>
                        {/* Row */}
                        <DataTable.Row  style={{marginLeft: 80,  marginRight: 70}}>
                            <DataTable.Cell>{this.state.dataSource.current.currentTrend}</DataTable.Cell>
                            <DataTable.Cell>{this.state.members}</DataTable.Cell>
                            <DataTable.Cell>{this.state.dataSource.today. todayTrend}</DataTable.Cell>
                        </DataTable.Row>
                        {/* Row */}
                        <DataTable.Row style={{marginLeft: 80,  marginRight: 70}}>
                            <DataTable.Cell>{this.state.dataSource.current.currentPrice}</DataTable.Cell>
                            <DataTable.Cell></DataTable.Cell>
                            <DataTable.Cell>{this.state.dataSource.today. todayPrice}</DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                    {/*  Second Table */}
                    <DataTable style={{marginTop: 60}}>
                        {/* Header */}
                        <DataTable.Header style={{marginLeft: 50,  marginRight: 30}} >
                            <DataTable.Title style={{textAlign: 'center'}}>Last 30 Days</DataTable.Title>
                            <DataTable.Title>Last 90 Days</DataTable.Title>
                            <DataTable.Title>Last 180 Days</DataTable.Title>
                        </DataTable.Header>
                        {/* Row */}
                        <DataTable.Row style={{marginLeft: 50,  marginRight: 30}}>
                            <DataTable.Cell>{this.state.dataSource.last30Days.day30Trend}</DataTable.Cell>
                            <DataTable.Cell>{this.state.dataSource.last90Days.day90Trend}</DataTable.Cell>
                            <DataTable.Cell>{this.state.dataSource.last180Days.day180Trend}</DataTable.Cell>
                        </DataTable.Row>
                        {/* Row */}
                        <DataTable.Row style={{marginLeft: 50,  marginRight: 30}}>
                            <DataTable.Cell>{this.state.dataSource.last30Days.day30Change}</DataTable.Cell>
                            <DataTable.Cell>{this.state.dataSource.last90Days.day90Change}</DataTable.Cell>
                            <DataTable.Cell>{this.state.dataSource.last180Days.day180Change}</DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
            </View>

        )
    

    }



}

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    image: {
        width: 140, 
        height: 140,  
        marginLeft: 140, 
        marginTop: 10,
    },
    itemTitle: {
        textAlign: 'center', 
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
      
    },
    itemDescription: {
        marginLeft: 10,
        textAlign: 'center', 
        fontSize: 16,
        fontStyle: 'italic',
        marginTop: 10,
    },
    dataTable: {
        marginTop: 20,
    },
    dataTableHeader:{
        marginLeft: 80,
        marginRight: 70
    },
    activityContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }, 
});
