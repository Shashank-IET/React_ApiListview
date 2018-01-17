import React, {Component} from 'react';
import {AsyncStorage, Image, ScrollView, StyleSheet, Text, View} from 'react-native';

export default class DynamicList extends Component {

    static defaultProps = {
        data: [
            {
                type: 'text',
                val: "Shashank"
            },
            {
                type: 'text',
                val: "Vinay"
            },
            {
                type: 'img',
                val: "http://images.all-free-download.com/images/graphicthumb/beautiful_the_outskirts_scenery_picture_2_165896.jpg"
            },
            {
                type: 'text',
                val: "Ajay"
            }
        ]
    };

    constructor() {
        super();
    }

    render() {
        return (
            <ScrollView style={{flex: 1, margin: 20, backgroundColor: '#efefef', padding: 20}}>
                {
                    this.props.data.map((item, index) => {
                        switch (item.type) {
                            case 'text':
                                return this._text(item);
                            case 'img':
                                return this._img(item);
                        }
                    })
                }
            </ScrollView>
        );
    }

    _text(item) {
        return (
            <View>
                <Text>{item.val}</Text>
            </View>
        );
    }

    _img(item) {
        return (
            <View>
                <Image source={{uri: item.val}}
                       style={{width: 200, height: 150}}
                />
            </View>
        );
    }
}