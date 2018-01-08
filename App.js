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
import {
    Image,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    ListView,
    ProgressBarAndroid
} from 'react-native';

import Realm from 'realm';

/**
 * Read About Action bar here:
 *      https://github.com/Osedea/react-native-action-bar
 **/
import ActionBar from "react-native-action-bar";
import Row from './src/Components/Row';
import Error from './src/Components/Error';

const CarModel = {
    name: 'CarModel',
    properties: {
        make_id: 'string',
        model: 'string',
        model_id: 'string',
        makename: 'string',
        makeModel: 'string',
        parent_model_id: 'string',
        body_type: 'string'
    }
};
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
        App.getBaseFormData = App.getBaseFormData.bind(this);
        App.getCarModelDetailForm = App.getCarModelDetailForm.bind(this);
        this.updateModelsListFromDB = this.updateModelsListFromDB.bind(this);
        this.fillDB = this.fillDB.bind(this);
        this.clearDB = this.clearDB.bind(this);
        this._renderLoading = this._renderLoading.bind(this);
    }

    componentWillMount() {
        Realm.open({
            schema: [CarModel]
        }).then(realm => {
            this.setState({realm});
            if (realm.objects(CarModel.name).length === 0) {
                this.setState({onGoing: 'Connecting to Server...'});
                this.fetchData();
            } else {
                this.setState({onGoing: 'Reading Database...'});
                this.updateModelsListFromDB();
                this.populate();
            }
        });
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
        this.setState({
            loading: true,
            onGoing: 'Connecting to Server...'
        });
        this.clearDB();
        fetch('http://beta.usedcarsin.in/gcloud/service.php', {
            method: 'POST',
            headers: {},
            body: App.getCarModelDetailForm()
        })
            .then((response) => response.json())
            .then((jsonResp) => {

                console.log("Received response!! ");

                if (jsonResp) {
                    if (jsonResp.msg)
                        console.log(jsonResp.msg);

                    if (jsonResp.model) {
                        this.fillDB(jsonResp.model)
                    }
                }
                this.setState({onGoing: 'Reading Database...'});
                this.updateModelsListFromDB();
                this.populate();
            })
            .catch((error) => {
                    this.setState({loading: false});
                    console.error(error);
                }
            );
    }

    fillDB(models) {
        this.setState({onGoing: 'Saving Data...'});
        for (let i = 0; i < models.length; i++) {
            let model = models[i];
            if (model.hasOwnProperty("make_id")) {
                this.state.realm.write(() => {
                    this.state.realm.create(CarModel.name, model);
                });
            }
        }
    }

    updateModelsListFromDB() {
        let models = this.state.realm.objects(CarModel.name).sorted('makename', false);
        let noData = models.length === 0;
        this.setState({
            models: ds.cloneWithRows(models),
            title: "Car Models(" + models.length + ")",
            noData: noData
        });
    }

    clearDB() {
        this.state.realm.write(() => {
            this.state.realm.deleteAll();
        });
        this.updateModelsListFromDB();
    }

    populate() {
        this.setState({loading: false});
    }

    static getCarModelDetailForm() {
        const form = App.getBaseFormData();
        form.append("method", 'all_model');
        return form;
    }

    static getBaseFormData() {
        let formData = new FormData();
        formData.append("password", '****');
        formData.append("source", 'ANDROID_APP');
        formData.append("packageName", '************');
        formData.append("userType", 3);
        formData.append("apikey", '************');
        formData.append("ANDROID_ID", '****************');
        formData.append("normal_password", '****');
        formData.append("SERVICE_EXECUTIVE_LOGIN", false);
        formData.append("normal_password", '****');
        formData.append("cloud_owner", '****');
        formData.append("UC_DEALER_USERNAME", '********@****.com');
        formData.append("output", 'json');
        formData.append("username", '********@****.com');
        formData.append("ucdid", 1217);
        formData.append("APP_VERSION", 56);
        formData.append("user_email", '****@****.com');
        formData.append("user_id", 3);
        formData.append("ipAddress", '****************');
        return formData;
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
