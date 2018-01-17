/*
TASK ===========
    1. Call an API to get car models from server (use test url of getModel() API from Gcloud app)
    2. Save the model details in a local database
    3. Create a list view to show the models from local database
    4. Add an action bar on top with left icon, title (including count of models)
    5. Add right menu icon to clear the database and refresh the list, another icon to call API and save model data in the database
    6. Screen should show a text "No model data" when there are no items in database
    7. Everytime on app entry, inflate the list with models from the database. Call the API if there are no models in the database
================
*/

import React, {Component} from 'react';
import {ActivityIndicator, Image, ListView, ProgressBarAndroid, StyleSheet, Text, View} from 'react-native';
/**
 * Read About Action bar here:
 *      https://github.com/Osedea/react-native-action-bar
 **/
import ActionBar from "react-native-action-bar";

import Row from './src/Components/Row';
import Error from './src/Components/Error';

import * as DataSource from './src/db/DataSource';
import * as Request from './src/Api/Request';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class App extends Component<{}> {
    onGoing: string;

    constructor() {
        super();
        this.state = {
            title: "Car Models",
            loading: true,
            realm: null,
            onGoing: '...',
            models: ds
        };
        this.fetchData = this.fetchData.bind(this);
        this.updateModelsListFromDB = this.updateModelsListFromDB.bind(this);
        this.clearDB = this.clearDB.bind(this);
        this._renderLoading = this._renderLoading.bind(this);
    }

    componentWillMount() {
        // Realm.open({
        //     schema: [CarModel]
        // }).then(realm => {
        //     this.setState({realm});
        //     if (realm.objects(CarModel.name).length === 0) {
        //         this.setState({onGoing: 'Connecting to Server...'});
        //         this.fetchData();
        //     } else {
        //         this.setState({onGoing: 'Reading Database...'});
        //         this.updateModelsListFromDB();
        //         this.populate();
        //     }
        // });


        let dataList = DataSource.all();
        if (dataList.length === 0) {
            this.setState({
                loading: true,
                onGoing: 'Connecting to Server...'
            });
            this.fetchData();
        } else {
            this.setState({onGoing: 'Reading Database...'});
            this.updateModelsListFromDB();
            this.populate();
        }
    }

    render() {
        return <View style={styles.container}>
            <ActionBar
                containerStyle={styles.bar}
                title={this.state.title}
                titleContainerStyle={styles.title}
                titleStyle={{fontSize: 20}}
                leftIconImage={require('./src/assets/car_e.png')}
                leftIconImageStyle={{height: 30, width: 30}}
                iconContainerStyle={styles.i_container}
                iconImageStyle={styles.icon}
                rightIcons={[
                    {
                        image: require('./src/assets/reload.png'),
                        onPress: () => this.fetchData()
                    },
                    {
                        image: require('./src/assets/delete.png'),
                        style: {padding: 10},
                        onPress: () => this.clearDB()
                    }
                ]}
            />
            {this._renderLoading()}
            <Error required={this.state.noData && !this.state.loading}/>
            <ListView
                style={styles.container}
                dataSource={this.state.models}
                enableEmptySections={true}
                renderRow={(data) => <Row {...data} />}
            />
        </View>;
    }

    _renderLoading() {
        if (this.state.loading) {
            return (
                <View style={styles.loadingScreen}>
                    <ProgressBarAndroid styleAttr='Inverse'/>
                    <Text>{this.state.onGoing}</Text>
                </View>
            );
        } else {
            return null;
        }
    }

    fetchData() {
        let callback = {
            success: function (response) {
                if (response.model) {
                    this.setState({onGoing: 'Saving Data...'});
                    DataSource.write(response.model);
                }
                this.setState({onGoing: 'Reading Database...'});
                this.updateModelsListFromDB();
                this.populate();
            },
            failure: function (error) {
                this.setState({loading: false});
                console.error(error);
            }
        };
        Request.getModels(callback);
    }

    updateModelsListFromDB() {
        let models = DataSource.all();
        let noData = models.length === 0;
        this.setState({
            models: ds.cloneWithRows(models),
            title: "Car Models(" + models.length + ")",
            noData: noData
        });
    }

    clearDB() {
        DataSource.clear();
        this.updateModelsListFromDB();
    }

    populate() {
        this.setState({loading: false});
    }
}

const styles = StyleSheet.create({
    bar: {height: 56, justifyContent: 'center', alignItems: "center"},
    title: {
        alignItems: 'flex-start', /*backgroundColor:'red',*/
        height: 40,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    container: {flex: 1, backgroundColor: '#F5F5F5',},
    fullScreen: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#aaffffff'
    },
    instructions: {textAlign: 'center', color: '#333333', marginBottom: 5,},
    icon: {resizeMode: 'contain', tintColor: '#FFFFFF',},
    i_container: {width: 40, height: 40, justifyContent: 'center', alignItems: 'center',},
    imageStyle: {width: 40, height: 40, justifyContent: 'center', alignItems: 'center',},
    loadingScreen: {flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'},
    noData: {flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'},
    noDataText: {fontWeight: 'bold', fontSize: 30, color: '#F44336'}
});
