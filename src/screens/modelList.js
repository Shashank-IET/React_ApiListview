import React, {Component} from 'react';
import {FlatList, Text, View} from 'react-native';

export default class ModelList extends Component {

    static defaultProps = {
        title: "No Title"
    };

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{flexDirection: 'column', flex: 1}}>
                <Text>{this.props.title}</Text>
                <FlatList
                    style={{flex: 1}}
                    data={this.props.data}
                    renderItem={({item}) => <Text>{item.makename}</Text>}
                />

            </View>
        );
    }
}

const ABC = {
    msg: "Hola there!"
};

export {ABC}