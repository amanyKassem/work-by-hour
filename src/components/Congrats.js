import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity , I18nManager } from "react-native";
import {Button, Container, Content,} from 'native-base'
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
                    <View style={Styles.confirm}>
                        <Image source={require('../../assets/images/congrats.png')}  style={{width:220 , height:220}} resizeMode={'contain'} />
                        <Text style={Styles.confirmText}>تهانينا تم اضافة رصيدك بنجاح</Text>
                        <Button onPress={() => this.props.navigation.navigate('drawerNavigator')} style={Styles.loginBtn}>
                            <Text style={Styles.btnTxt}>{ i18n.t('home') }</Text>
                        </Button>
                    </View>
                </Content>
            </Container>

        );
    }
}

export default Congrats;