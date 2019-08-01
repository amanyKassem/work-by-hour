import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity , I18nManager , FlatList} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Button, Form} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'

class Certify extends Component {
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
                            <Image source={require('../../assets/images/back.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , left:-15 , textAlign:'center'}]}>{ i18n.t('certify&exp') }</Text>
                    </View>
                </Header>
                <Content style={{padding:15}}>
                    <View style={{flexDirection:'row' , justifyContent:'space-between', alignItems:'center'}}>
                        <Text style={{color:'#00918B',  fontSize:17, fontFamily: 'RegularFont' }}>{ i18n.t('certifies') }</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('addCertify')}>
                            <Icon name='cog' type={"FontAwesome"} style={{ color: "#00918B", fontSize:23 }}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row' , flexWrap:'wrap' , justifyContent:'space-between', alignItems:'center' , marginTop:15}}>
                        <Image source={require('../../assets/images/add_pic.png')} style={{width:100 , height:100}} resizeMode={'contain'} />
                        <Image source={require('../../assets/images/add_pic.png')} style={{width:100 , height:100}} resizeMode={'contain'} />
                        <Image source={require('../../assets/images/add_pic.png')} style={{width:100 , height:100}} resizeMode={'contain'} />
                    </View>
                    <View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginVertical:15}}/>
                    <Text style={{color:'#00918B',  fontSize:17, fontFamily: 'RegularFont' }}>{ i18n.t('expertise') }</Text>
                    <Text style={{color:'#5d5d5d',  fontSize:16, fontFamily: 'RegularFont' , textAlign: I18nManager.isRTL ?'right' : 'left' }}>مصمم جرافيك</Text>
                    <Text style={{color:'#b8b5b5',  fontSize:12, fontFamily: 'RegularFont', lineHeight:14 , textAlign: I18nManager.isRTL ?'right' : 'left'}}>(مؤسسة اوامر الشبكة)</Text>
                </Content>
            </Container>

        );
    }
}

export default Certify;