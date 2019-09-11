import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity , I18nManager } from "react-native";
import {Button, Container, Content,} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'

class Charge extends Component {
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
                <Content>
                    <View style={[Styles.confirm ,  {padding:15}]}>
                        <Image source={require('../../assets/images/sad.png')}  style={{width:220 , height:220}} resizeMode={'contain'} />
                        <Text style={Styles.confirmText}>{ i18n.t('noCredit') }</Text>
                        <Button onPress={() => this.props.navigation.navigate('reCharge')} style={Styles.loginBtn}>
                            <Text style={Styles.btnTxt}>{ i18n.t('recharge') }</Text>
                        </Button>
                    </View>
                </Content>
            </Container>

        );
    }
}

export default Charge;