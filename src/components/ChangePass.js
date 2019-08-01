import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity , I18nManager , KeyboardAvoidingView , Dimensions} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Button, Form, Label} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'

const height = Dimensions.get('window').height;
class ChangePass extends Component {
    constructor(props){
        super(props);

        this.state={
            password: '',
            newPass: '',
            verifyNewPass: '',
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
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , left:-15 , textAlign:'center'}]}>{ i18n.t('ChangePass') }</Text>
                    </View>
                </Header>
                <Content style={{padding:15}}>
                    <KeyboardAvoidingView behavior={'padding'} style={Styles.keyboardAvoid}>
                        <Form style={{width: '100%'  , height : height-200}}>
                            <View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
                                <Item stackedLabel style={Styles.item } bordered>
                                    <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('password') }</Label>
                                    <Input autoCapitalize='none' value={this.state.password} onChangeText={(password) => this.setState({password})} secureTextEntry style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
                                </Item>
                            </View>
                            <View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
                                <Item stackedLabel style={Styles.item } bordered>
                                    <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('newPass') }</Label>
                                    <Input autoCapitalize='none' value={this.state.newPass} onChangeText={(newPass) => this.setState({newPass})} secureTextEntry style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
                                </Item>
                            </View>
                            <View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
                                <Item stackedLabel style={Styles.item } bordered>
                                    <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('verifyNewPass') }</Label>
                                    <Input autoCapitalize='none' value={this.state.verifyNewPass} onChangeText={(verifyNewPass) => this.setState({verifyNewPass})} secureTextEntry style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
                                </Item>
                            </View>
                        </Form>
                    </KeyboardAvoidingView>
                    <Button onPress={() => this.props.navigation.navigate('editProfile')} style={[Styles.loginBtn , {marginBottom:40 , width:'90%'}]}>
                        <Text style={Styles.btnTxt}>{ i18n.t('confirm') }</Text>
                    </Button>
                </Content>
            </Container>

        );
    }
}

export default ChangePass;