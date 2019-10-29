import React, { Component } from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, BackHandler, KeyboardAvoidingView, AsyncStorage} from "react-native";
import {Container, Content, Button, Icon, Left, Form, Item, Label, Input, Toast} from 'native-base'
import Styles from '../../assets/styles'
import i18n from "../../local/i18n";
import { connect } from 'react-redux';
import { userLogin, profile } from '../actions'
import { Permissions, Notifications, Location } from 'expo'
import {DoubleBounce} from "react-native-loader";
import {NavigationEvents} from "react-navigation";

const height = Dimensions.get('window').height;
class Login extends Component {
    constructor(props){
        super(props);

        this.state={
            password: '',
            phone: '',
			token: '',
			userId: null,
			isLoaded: false,
			routeName: this.props.navigation.state.routeName,
			mapRegion: null
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

	validate = () => {
		let isError = false;
		let msg = '';

		if (this.state.phone.length <= 0) {
			isError = true;
			msg = i18n.t('phoneValidation');
		}else if ( this.state.phone.length < 10 || this.state.phone.length > 11) {
			isError = true;
			msg = i18n.t('passwordRequired');
		}else if (this.state.password.length <= 0) {
			isError = true;
			msg = i18n.t('passwordRequired');
		}
		if (msg != ''){
			Toast.show({
				text: msg,
				type: "danger",
				duration: 3000
			});
		}
		return isError;
	};

	renderSubmit(){
		if (this.state.isLoaded){
			return(
			    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <DoubleBounce size={20} color="#00918B" />
				</View>
			)
		}

		return (
			<Button onPress={() => this.onLoginPressed()} style={Styles.loginBtn}>
			    <Text style={Styles.btnTxt}>{ i18n.t('loginButton') }</Text>
	        </Button>
		);
	}

	onLoginPressed() {
		const err = this.validate();
		if (!err){
			this.setState({ isLoaded: true });
			const {phone, password, token, mapRegion} = this.state;
			this.props.userLogin({ phone, password, token, mapRegion }, (this.props.lang).toUpperCase());
		}
	}

	async componentWillMount() {
		const { status: existingStatus } = await Permissions.getAsync(
			Permissions.NOTIFICATIONS
		);

		let finalStatus = existingStatus;

		if (existingStatus !== 'granted') {
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
		}

		if (finalStatus !== 'granted') {
			return;
		}

		token = await Notifications.getExpoPushTokenAsync();
		this.setState({ token, userId: null });
		AsyncStorage.setItem('deviceID', token);

		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			alert('صلاحيات تحديد موقعك الحالي ملغاه');
		}else {
			const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
			const userLocation = { latitude, longitude };
			this.setState({  mapRegion: userLocation });
		}

	}

	componentWillReceiveProps(newProps){
		console.log('newProps__13', newProps.auth);

		if (newProps.auth == null){
			this.props.navigation.navigate('language');
			return false;
		}

		if (newProps.auth !== null &&  newProps.auth.data != null && newProps.auth.data.status == 1){

			console.log('this is user id...', this.state.userId);

			if (this.state.userId === null){
				this.setState({ userId: newProps.auth.data.data.user_id });
				this.props.profile(newProps.auth.data.data.user_id, (this.props.lang).toUpperCase());
			}

			this.props.navigation.navigate('drawerNavigator');
		}

		if (newProps.auth.data != null) {
			Toast.show({
				text: newProps.auth.data.message,
				type: newProps.auth.data.status == 1 ? "success" : "danger",
				duration: 3000
			});
		}

		this.setState({ isLoaded: false });
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
	}


	handleBackPress = () => {
		if (this.state.routeName === 'login'){
			BackHandler.exitApp();
			return true
		}else
			this.goBack();
	};

	goBack(){
		this.props.navigation.goBack();
	}

	onFocus(){
		this.componentWillMount()
	}

    render() {
        return (
            <Container style={{backgroundColor:'#fff'}}>
				<NavigationEvents onWillFocus={() => this.onFocus()} />
				<Content style={Styles.homecontent}>
					<View style={Styles.HeadImg }>
						<Image source={require('../../assets/images/headBg.png')} style={Styles.HeadImg} resizeMode={'contain'} />

					</View>
					<View style={Styles.LoginParentView}>
						<KeyboardAvoidingView behavior={'padding'} style={Styles.keyboardAvoid}>
							<Form style={{width: '100%' , marginTop:30}}>
								<Text style={Styles.title}>{ i18n.t('login') }</Text>
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
								<TouchableOpacity onPress={() => this.props.navigation.navigate('forgetPass')}>
									<Text style={Styles.forgetPass}>{ i18n.t('forgetPass') }</Text>
								</TouchableOpacity>

								{ this.renderSubmit() }

								<TouchableOpacity  onPress={() => this.props.navigation.navigate('register')}>
									<Text style={Styles.tegisterText}>{ i18n.t('noAcc') }</Text>
								</TouchableOpacity>

							</Form>
						</KeyboardAvoidingView>
					</View>
				</Content>
            </Container>
        );
    }
}


const mapStateToProps = ({ auth, profile, lang }) => {
	return {
		loading: auth.loading,
		auth: auth.user,
		user: profile.user,
		lang: lang.lang
	};
};
export default connect(mapStateToProps, { userLogin, profile })(Login);