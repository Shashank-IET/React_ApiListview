import React, {Component} from 'react';
import {
    Text, View, StyleSheet
} from 'react-native';

export default class Row extends Component {
    constructor() {
        super();
    }

    render() {
        return <View style={styles.outer}>
            <Text style={styles.title}>{this.props.makename}</Text>
            <View style={styles.content}>
                <Text style={styles.subtitle}>{this.props.makeModel}</Text>
                <Text style={styles.extras}>{this.props.body_type}</Text>
            </View>
        </View>
    }
}


const styles = StyleSheet.create({

    outer: {
        flexDirection: 'column',
        paddingHorizontal:25,
        marginVertical: 0.5,
        marginHorizontal: 4,
        paddingVertical: 15,
        backgroundColor: "#FAFAFA",
        borderRadius: 5,
        borderWidth: 2,
        borderColor:'#F5F5F5',
        borderBottomColor: '#E0E0E0'
    },
    title: {fontWeight: 'bold', fontSize: 18, color: '#424242', padding:0},
    content: {flexDirection:'row', justifyContent:'flex-start'},
    subtitle: {color:'#757575', fontSize: 15, padding:0, flex:1},
    extra:{color: '#E0E0E0', alignSelf:'flex-end', padding:0}
});