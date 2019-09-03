import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity , I18nManager , KeyboardAvoidingView , Dimensions} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Button, Form, Label, Toast} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import {DoubleBounce} from "react-native-loader";
import axios from 'axios';
import CONST from '../consts'
import {connect} from "react-redux";

const height = Dimensions.get('window').height;
class ChangePass extends Component {
    constructor(props){
        super(props);

        this.state={
            password: '',
            newPass: '',
            verifyNewPass: '',
			isSubmitted: false
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    onChangePassword(){
        if (this.state.newPass !== this.state.verifyNewPass){
			return Toast.show({
                        text: i18n.t('passwordNotMatch'),
                        type: "danger",
                        duration: 3000
                    });
        }

        if ((this.state.newPass).length < 6){
			return Toast.show({
				text: i18n.t('passwordLength'),
				type: "danger",
				duration: 3000
			});
        }

		this.setState({ isSubmitted: true });

        axios.post( CONST.url + 'user/editPassword', {
            lang: (this.props.lang).toUpperCase(),
            user_id: this.props.user.user_id,
            oldPassword: this.state.password,
            newPassword: this.state.newPass
        }).then( response => {

			Toast.show({
				text: response.data.message,
				type: response.data.status == 1 ? "success" : "danger",
				duration: 3000
			});

			if (response.data.status == 1){
				this.setState({ password: '', newPass: '', verifyNewPass: '' });
				this.props.navigation.navigate('profile');
			}
			this.setState({ isSubmitted: false });
        })
    }

	renderSubmit(){
		if (this.state.password == '' || this.state.newPass == '' || this.state.verifyNewPass == '' ){
			return(
				<Button disabled style={[Styles.loginBtn , {marginBottom:40, backgroundColor: '#999' }]}>
					<Text style={Styles.btnTxt}>{ i18n.t('confirm') }</Text>
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
			<Button onPress={() => this.onChangePassword() } style={[Styles.loginBtn , {marginBottom:40 , width:'90%'}]}>
				<Text style={Styles.btnTxt}>{ i18n.t('confirm') }</Text>
			</Button>
		);
	}

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
                    { this.renderSubmit() }
                </Content>
            </Container>

        );
    }
}


const mapStateToProps = ({ lang, profile  }) => {
	return {
		lang: lang.lang,
		user: profile.user,
	};
};

export default connect(mapStateToProps, {})(ChangePass);