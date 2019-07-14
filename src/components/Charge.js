import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity , I18nManager } from "react-native";
import {Container, Content, } from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'

class Congrats extends Component {
    constructor(props){
        super(props);

        this.state={
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    render() {
        return (

            <Container style={{}}>
                <Content style={{padding:15}}>
                    <View style={{justifyContent:'center' , alignItems:'center' , flexDirection:'column'}}>
                        <Image source={require('../../assets/images/congrats.png')}  style={{width:70 , height:70}} resizeMode={'contain'} />
                    </View>
                </Content>
            </Container>

        );
    }
}

export default Congrats;