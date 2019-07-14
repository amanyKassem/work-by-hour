import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity , I18nManager , FlatList} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Label, Picker, Button} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import Modal from "react-native-modal";

class ReCharge extends Component {
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
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/back.png')} style={Styles.headerMenu} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , left:-15 , textAlign:'center'}]}>المحفظة</Text>
                    </View>
                </Header>
                <Content style={{padding:15}}>
                    <Text style={[Styles.confirmText , {color:'#444444'}]}>رصيدك الحالي</Text>
                    <Text style={[Styles.confirmText , {fontSize:80 , lineHeight:100}]}>500</Text>
                    <Text style={[Styles.confirmText , {marginBottom:50}]}>ريال سعودي</Text>
                    <Button onPress={() => this.props.navigation.navigate('reChargeWallet')} style={Styles.loginBtn}>
                        <Text style={Styles.btnTxt}>إعادة شحن المحفظة</Text>
                    </Button>
                </Content>
            </Container>

        );
    }
}

export default ReCharge;