import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, I18nManager, KeyboardAvoidingView , Platform} from "react-native";
import {Container, Content, Button, Form, Item, Label, Input, Toast} from 'native-base'
import Styles from '../../assets/styles'
import i18n from "../../local/i18n";
import {DoubleBounce} from "react-native-loader";
import {connect} from "react-redux";
import { userLogin, profile } from '../actions'
import axios from 'axios';
import CONST from "../consts";

const height = Dimensions.get('window').height;
class ActivateAcc extends Component {
    constructor(props){
        super(props);

        this.state={
            verifyCode: '',
			isSubmitted: false,
			userId: null
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    componentWillMount() {
		const code = this.props.navigation.state.params.code;
		this.setState({ userId: null })
	}

	renderSubmit(){
		if (this.state.verifyCode == '' ){
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
			<Button onPress={() => this.checkCode()} style={Styles.loginBtn}>
				<Text style={Styles.btnTxt}>{ i18n.t('confirm') }</Text>
			</Button>
		);
	}

	checkCode(){
        const code      = this.props.navigation.state.params.code;
        const password  = this.props.navigation.state.params.password;
        const phone     = this.props.navigation.state.params.phone;
        const token     = this.props.navigation.state.params.token;
        const mapRegion = this.props.navigation.state.params.mapRegion;
        const user_id   = this.props.navigation.state.params.userId;

		if (code == this.state.verifyCode){
			this.setState({ isSubmitted: true });
			axios.post(CONST.url + 'user/activeAccount' ,{
				activitionCode: code,
				user_id,
                lang: (this.props.lang).toUpperCase()
			}).then(response => {
				if (response.data.status == 1){
					this.props.userLogin({ phone, password, token, mapRegion }, (this.props.lang).toUpperCase());
				}
			})
		}else{
			Toast.show({
				text: i18n.t('codeNotCorrect'),
				type: "danger",
				duration: 3000
			});
		}
    }

	componentWillReceiveProps(newProps){
        console.log('auth data', newProps);

		if (newProps.auth !== null && newProps.auth.data.status == 1){

			console.log('this is user id...', this.state.userId);

			if (this.state.userId === null){
				this.setState({ userId: newProps.auth.data.data.user_id });
				this.props.profile(newProps.auth.data.data.user_id, (this.props.lang).toUpperCase);
			}

			this.props.navigation.navigate('drawerNavigator');
		}

		if (newProps.auth.data !== null) {
			Toast.show({
				text: newProps.auth.data.message,
				type: newProps.auth.data.status == 1 ? "success" : "danger",
				duration: 3000
			});
		}

		this.setState({ isSubmitted: false });
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
                        <View style={Styles.HeadImg }>
                            <Image source={require('../../assets/images/headBg.png')} style={Styles.HeadImg} resizeMode={'contain'} />

                        </View>

                        <View style={Styles.LoginParentView}>
							<KeyboardAvoidingView behavior={'padding'} style={Styles.keyboardAvoid}>
								<Form style={{width: '100%' , marginTop:30}}>
									<Text style={Styles.title}>{ i18n.t('activateAcc') }</Text>
									<View style={Styles.inputParent}>
										<Item stackedLabel style={Styles.item } bordered>
											<Label style={Styles.labelItem}>{ i18n.t('verifyCode') }</Label>
											<Input value={this.state.verifyCode} onChangeText={(verifyCode) => this.setState({verifyCode})} keyboardType={'number-pad'} style={Styles.itemInput}  />
										</Item>
									</View>
									{ this.renderSubmit() }
								</Form>
							</KeyboardAvoidingView>
                        </View>
                </Content>
            </Container>

        );
    }
}


const mapStateToProps = ({ lang, profile, auth  }) => {
	return {
		lang: lang.lang,
		user: profile.user,
		auth: auth.user,
	};
};

export default connect(mapStateToProps, { userLogin, profile })(ActivateAcc);