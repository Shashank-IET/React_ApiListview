import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, View} from 'react-native';

import ModelList, {ABC} from './modelList';

export default class ModelListContainer extends Component {

    constructor() {
        super();
        console.log(ABC.msg);
        this.state = {
            models: []
        }
    }

    static async getOEM() {
        const val = await AsyncStorage.getItem("OEM");
        console.log(val);
        return val;
    }

    static getCarModelDetailForm() {
        const form = ModelListContainer.getBaseFormData();
        form.append("method", 'all_model');
        return form;
    }

    static getBaseFormData() {
        let formData = new FormData();
        formData.append("password", 'apple');
        formData.append("source", 'ANDROID_APP');
        formData.append("packageName", 'com.gcloud.gaadi.stg');
        formData.append("userType", 3);
        formData.append("apikey", 'U3KqyrewdMuCotTS');
        formData.append("ANDROID_ID", 'ab697e1669f5b118');
        formData.append("normal_password", 'apple');
        formData.append("SERVICE_EXECUTIVE_LOGIN", false);
        formData.append("normal_password", 'apple');
        formData.append("cloud_owner", 'GAADI');
        formData.append("UC_DEALER_USERNAME", 'saroj.sahoo@gaadi.com');
        formData.append("output", 'json');
        formData.append("username", 'android@gaadi.com');
        formData.append("ucdid", 1217);
        formData.append("APP_VERSION", 56);
        formData.append("user_email", 'android@gaadi.com');
        formData.append("user_id", 3);
        formData.append("ipAddress", '192.168.83.85');
        return formData;
    }

    static async setOEM() {
        await AsyncStorage.setItem("OEM", "hello");
    }

    componentWillMount() {
        fetch('http://beta.usedcarsin.in/gcloud/service.php', {
                method: 'POST',
                headers: {},
                body: ModelListContainer.getCarModelDetailForm()
            }
        )
            .then((response) => response.json())
            .then((jsonResp) => {
                console.log(jsonResp.count);
                jsonResp.model.map((item, index) => {
                    item.makename = item.makename.toUpperCase();
                });
                this.setState({models: jsonResp.model})
            });

        if (ModelListContainer.getOEM()) {
            ModelListContainer.setOEM();
        } else {
            console.log("found");
        }
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', padding: 10}}>
                <ModelList title="Data List"
                           data={this.state.models}/>
            </View>
        );
    }
}


