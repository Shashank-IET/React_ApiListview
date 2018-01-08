import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default class Error extends Component {

    constructor() {
        super();
    }

    render() {
        if (this.props.required) {
            return (
                <View style={styles.noData}>
                    <Image source={require('../assets/nodata.png')}/>
                    <Text style={styles.noDataText}>No Data Available !</Text>
                </View>
            );
        } else {
            return (<View style={styles.noRender}/>);
        }
    }
}
const styles = StyleSheet.create({
    noData: {flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'},
    noDataText: {fontSize: 30, color: '#F44336', fontFamily:'sans-serif'},
    noRender:{height:0, width:0}
});
