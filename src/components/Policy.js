import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity , I18nManager , FlatList} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Button, Form} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'

class Policy extends Component {
    constructor(props){
        super(props);

        this.state={
        }
    }


    static navigationOptions = () => ({
        drawerLabel: i18n.t('terms') ,
        drawerIcon: (<Image source={require('../../assets/images/policy.png')} style={{ height: 20, width: 20 , top:3 }} resizeMode={'contain'} /> )
    })

    render() {
        return (

            <Container style={{}}>
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/back.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , left:-15 , textAlign:'center'}]}>{ i18n.t('terms') }</Text>
                    </View>
                </Header>
                <Content style={{padding:15}}>
                    <Text style={[Styles.notiText , {textAlign:'center'}]}> هناك طلب جديد على وظيفتك هناك طلب جديد على وظيفتك هناك طلب جديد على وظيفتك هناك طلب جديد على وظيفتك هناك طلب جديد على وظيفتك هناك طلب جديد على وظيفتك هناك طلب جديد على وظيفتك</Text>
                </Content>
            </Container>

        );
    }
}

export default Policy;