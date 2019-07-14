import React, { Component } from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, I18nManager, KeyboardAvoidingView} from "react-native";
import {Container, Content, Button, Icon, Left, Form, Item,  Label, Input, } from 'native-base'
import Styles from '../../assets/styles'
import i18n from "../../local/i18n";


const height = Dimensions.get('window').height;
class Login extends Component {
    constructor(props){
        super(props);

        this.state={
            password: '',
            phone: '',
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    render() {
        return (

            <Container style={{backgroundColor:'#fff'}}>

                <Content style={Styles.homecontent}>
                    <KeyboardAvoidingView behavior={'padding'} style={Styles.keyboardAvoid}>
                        <View style={Styles.HeadImg }>
                            <Image source={require('../../assets/images/headBg.png')} style={Styles.HeadImg} resizeMode={'contain'} />

                        </View>

                        <View style={Styles.LoginParentView}>
                            <Form style={{width: '100%' , marginTop:30}}>
                                <Text style={Styles.title}>تسجيل الدخول</Text>
                                <View style={Styles.inputParent}>
                                    <Item stackedLabel style={Styles.item } bordered>
                                        <Label style={Styles.labelItem}>{ i18n.t('phoneNumber') }</Label>
                                        <Input value={this.state.phone} onChangeText={(phone) => this.setState({phone})} keyboardType={'number-pad'} style={Styles.itemInput}  />
                                    </Item>
                                </View>
                                <View style={Styles.inputParent}>
                                    <Item stackedLabel style={Styles.item } bordered>
                                        <Label style={Styles.labelItem}>{ i18n.t('password') }</Label>
                                        <Input autoCapitalize='none' value={this.state.password} onChangeText={(password) => this.setState({password})} secureTextEntry  style={Styles.itemInput}  />
                                    </Item>
                                </View>
                                <TouchableOpacity>
                                    <Text style={Styles.forgetPass}>هل نسيت كلمة المرور</Text>
                                </TouchableOpacity>

                                <Button onPress={() => this.props.navigation.navigate('drawerNavigator')} style={Styles.loginBtn}>
                                    <Text style={Styles.btnTxt}>{ i18n.t('loginButton') }</Text>
                                </Button>

                                <TouchableOpacity>
                                    <Text style={Styles.tegisterText}>لا تمتلك حساب ؟ تسجيل جديد</Text>
                                </TouchableOpacity>

                            </Form>
                        </View>
                    </KeyboardAvoidingView>
                </Content>
            </Container>

        );
    }
}

export default Login;