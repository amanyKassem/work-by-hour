import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, FlatList, KeyboardAvoidingView, Linking} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Button, Form, Label, Textarea} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'

class ContactUs extends Component {
    constructor(props){
        super(props);

        this.state={
            email:'',
            subTitle:'',
            msg:'',
        }
    }


    static navigationOptions = () => ({
        drawerLabel: i18n.t('contactUs') ,
        drawerIcon: (<Image source={require('../../assets/images/call.png')} style={{ height: 20, width: 20 , top:3 }} resizeMode={'contain'} /> )
    })

    _linkPressed (url){
        Linking.openURL(url);
    }

    render() {
        return (

            <Container style={{}}>
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/back.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , left:-15 , textAlign:'center'}]}>{ i18n.t('contactUs') }</Text>
                    </View>
                </Header>
                <Content style={{padding:15}}>
                    <KeyboardAvoidingView behavior={'padding'} style={Styles.keyboardAvoid}>
                        <Form style={{width: '100%' }}>
                            <View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
                                <Item stackedLabel style={Styles.item } bordered>
                                    <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('email') }</Label>
                                    <Input value={this.state.email} onChangeText={(email) => this.setState({email})} autoCapitalize='none' keyboardType={'email-address'} style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
                                </Item>
                            </View>
                            <View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
                                <Item stackedLabel style={Styles.item } bordered>
                                    <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('subTitle') }</Label>
                                    <Input value={this.state.subTitle} onChangeText={(subTitle) => this.setState({subTitle})} autoCapitalize='none' style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
                                </Item>
                            </View>
                            <View >
                                <Item stackedLabel style={Styles.item } bordered>
                                    <Label style={[Styles.labelItem , {top:5 , left:-10 , backgroundColor:'transparent'}]}>{ i18n.t('subCont') }</Label>
                                </Item>
                                <Textarea value={this.state.msg} onChangeText={(msg) => this.setState({msg})} autoCapitalize='none' style={[Styles.inputParent ,{color: '#035F5B', borderColor:  '#eee', textAlign: I18nManager.isRTL ?'right' : 'left' , paddingVertical:10 , paddingHorizontal: 35 , backgroundColor:'#F6F6F6' , borderRadius:25 , height:250 , marginBottom:20}]}  />
                            </View>
                            <View style={{flexDirection:'row'  , alignItems:'center' , justifyContent:'center' , marginBottom:10 , marginTop:10}}>
                                <TouchableOpacity onPress={()=> this._linkPressed('https://web.whatsapp.com/')}>
                                    <Image source={require('../../assets/images/whatsaap.png')} style={{width:35 , height:35}} resizeMode={'contain'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> this._linkPressed('https://www.instagram.com/')}>
                                    <Image source={require('../../assets/images/instagram.png')} style={{width:35 , height:35}} resizeMode={'contain'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> this._linkPressed('https://twitter.com/')}>
                                    <Image source={require('../../assets/images/twitter.png')} style={{width:35 , height:35}} resizeMode={'contain'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> this._linkPressed('https://www.facebook.com/')}>
                                    <Image source={require('../../assets/images/facebook.png')} style={{width:35 , height:35}} resizeMode={'contain'} />
                                </TouchableOpacity>
                            </View>
                        </Form>
                    </KeyboardAvoidingView>
                    <Button onPress={() => this.props.navigation.navigate('home')} style={[Styles.loginBtn , {marginBottom:40 }]}>
                        <Text style={Styles.btnTxt}>{ i18n.t('sendButton') }</Text>
                    </Button>
                </Content>
            </Container>

        );
    }
}

export default ContactUs;