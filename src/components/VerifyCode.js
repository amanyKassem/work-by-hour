import React, { Component } from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, I18nManager, KeyboardAvoidingView , Platform} from "react-native";
import {Container, Content, Button, Icon, Left, Form, Item, Label, Input, Toast,} from 'native-base'
import Styles from '../../assets/styles'
import i18n from "../../local/i18n";
import axios from "axios";
import CONST from "../consts";
import {DoubleBounce} from "react-native-loader";
import connect from "react-redux/es/connect/connect";


const height = Dimensions.get('window').height;
class VerifyCode extends Component {
    constructor(props){
        super(props);

        this.state={
            verifyCode: '',
            password: '',
            verifyPass: '',
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

	onCheckPhone(){
	    if (this.state.password == this.state.verifyPass ){
			this.setState({ isSubmitted: true });
			axios.post(CONST.url + '/user/confirmPassword' ,{
				user_id: this.props.user.user_id,
				verificationCode: this.props.user.user_id,
				newPassword: this.props.user.user_id,
				lang: (this.props.lang).toUpperCase(),
			}).then(response => {
				Toast.show({
					text: response.data.message,
					type: response.data.status == 1 ? "success" : "danger",
					duration: 3000
				});
				this.setState({ isSubmitted: false , phone:'' });
				this.props.navigation.navigate("verifyCode" , { id:response.data.data.user_id , code: response.data.data.activitionCode });
			})
        }else {
			Toast.show({
				text: i18n.t('passwordNotMatch'),
				type: "danger",
				duration: 3000
			});
        }
	}

	renderSubmit(){
		if (this.state.verifyCode == '' || this.state.password == '' || this.state.verifyPass == '' ){
			return(
				<Button disabled style={[Styles.loginBtn , {marginBottom:40, backgroundColor: '#999' }]}>
					<Text style={Styles.btnTxt}>{ i18n.t('sendButton') }</Text>
				</Button>
			)
		}

		if (this.state.isSubmitted){
			return (
				<View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
					<DoubleBounce size={20} color="#00918B" />
				</View>
			);
		}

		return (
			<Button onPress={() => this.onCheckPhone()} style={Styles.loginBtn}>
				<Text style={Styles.btnTxt}>{ i18n.t('sendButton') }</Text>
			</Button>
		);
	}


	render() {
        return (

            <Container style={{backgroundColor:'#fff'}}>
                <View style={{ marginTop: Platform.OS === 'ios' ? 40 : 10, height:Platform.OS === 'ios' ?70:60 , top:Platform.OS === 'ios' ? 10 : 40 , backgroundColor: 'transparent', position: 'absolute', width: '100%' }} noShadow>
                    <View style={ {flexDirection:'row' , paddingHorizontal:10 , top:-5}}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/back.png')} style={{ transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}] , width:25 , height:25 } } resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Content style={Styles.homecontent}>
                    <KeyboardAvoidingView behavior={'padding'} style={Styles.keyboardAvoid}>
                        <View style={Styles.HeadImg }>
                            <Image source={require('../../assets/images/headBg.png')} style={Styles.HeadImg} resizeMode={'contain'} />
                        </View>

                        <View style={Styles.LoginParentView}>
                            <Form style={{width: '100%' , marginTop:30}}>
                                <Text style={Styles.title}>{ i18n.t('passRecovery') }</Text>
                                <View style={Styles.inputParent}>
                                    <Item stackedLabel style={Styles.item } bordered>
                                        <Label style={Styles.labelItem}>{ i18n.t('verifyCode') }</Label>
                                        <Input value={this.state.verifyCode} onChangeText={(verifyCode) => this.setState({verifyCode})} keyboardType={'number-pad'} style={Styles.itemInput}  />
                                    </Item>
                                </View>

                                <View style={Styles.inputParent}>
                                    <Item stackedLabel style={Styles.item } bordered>
                                        <Label style={Styles.labelItem }>{ i18n.t('password') }</Label>
                                        <Input autoCapitalize='none' value={this.state.password} onChangeText={(password) => this.setState({password})} secureTextEntry style={Styles.itemInput }  />
                                    </Item>
                                </View>

                                <View style={Styles.inputParent}>
                                    <Item stackedLabel style={Styles.item } bordered>
                                        <Label style={Styles.labelItem }>{ i18n.t('verifyPass') }</Label>
                                        <Input autoCapitalize='none' value={this.state.verifyPass} onChangeText={(verifyPass) => this.setState({verifyPass})} secureTextEntry style={Styles.itemInput }  />
                                    </Item>
                                </View>
                                <Button onPress={() => this.props.navigation.navigate('login')} style={Styles.loginBtn}>
                                    <Text style={Styles.btnTxt}>{ i18n.t('confirm') }</Text>
                                </Button>

                            </Form>
                        </View>
                    </KeyboardAvoidingView>
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang }) => {
	return {
		lang: lang.lang,
	};
};

export default connect(mapStateToProps, {})(VerifyCode);