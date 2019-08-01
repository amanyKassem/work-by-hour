import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, KeyboardAvoidingView, Dimensions} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Button, Form, Label} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
const height = Dimensions.get('window').height;

class Socials extends Component {
    constructor(props){
        super(props);

        this.state={
            whatsApp: '',
            facebook: '',
            twitter: '',
            instagram: '',
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
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , left:-15 , textAlign:'center'}]}>{ i18n.t('socialAcc') }</Text>
                    </View>
                </Header>
                <Content style={{padding:15}} >
                    <KeyboardAvoidingView behavior={'padding'} style={Styles.keyboardAvoid}>
                        <Form style={{width: '100%'  , height : height-200}}>
                            <View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
                                <Item stackedLabel style={Styles.item } bordered>
                                    <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('whatsApp') }</Label>
                                    <Input autoCapitalize='none' value={this.state.whatsApp} onChangeText={(whatsApp) => this.setState({whatsApp})}  style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
                                </Item>
                            </View>
                            <View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
                                <Item stackedLabel style={Styles.item } bordered>
                                    <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('facebook') }</Label>
                                    <Input autoCapitalize='none' value={this.state.facebook} onChangeText={(facebook) => this.setState({facebook})}  style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
                                </Item>
                            </View>
                            <View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
                                <Item stackedLabel style={Styles.item } bordered>
                                    <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('twitter') }</Label>
                                    <Input autoCapitalize='none' value={this.state.twitter} onChangeText={(twitter) => this.setState({twitter})}  style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
                                </Item>
                            </View>
                            <View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
                                <Item stackedLabel style={Styles.item } bordered>
                                    <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('instagram') }</Label>
                                    <Input autoCapitalize='none' value={this.state.instagram} onChangeText={(instagram) => this.setState({instagram})}  style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
                                </Item>
                            </View>
                        </Form>
                    </KeyboardAvoidingView>
                    <Button onPress={() => this.props.navigation.navigate('editProfile')} style={[Styles.loginBtn , {marginBottom:40}]}>
                        <Text style={Styles.btnTxt}>{ i18n.t('confirm') }</Text>
                    </Button>
                </Content>
            </Container>

        );
    }
}

export default Socials;