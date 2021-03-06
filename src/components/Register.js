			import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    I18nManager,
    KeyboardAvoidingView,
    Platform,
	AsyncStorage
} from "react-native";

import {Container, Content, Button, Icon, Picker, Form, Item,  Label, Input, Toast } from 'native-base'
import Styles from '../../assets/styles'
import i18n from "../../local/i18n";

import {ImagePicker, Permissions, Location} from 'expo';
import axios from "axios";
import CONST from "../consts";
import {connect} from "react-redux";
import {DoubleBounce} from "react-native-loader";

const height = Dimensions.get('window').height;
class Register extends Component {
    constructor(props){
        super(props);

        this.state={
            username: '',
            usernameValidation: '',
            phone: '',
			phoneValidation: '',
            mail: '',
			mailValidation: '',
            password: '',
			passwordValidation: '',
            rePassword: '',
			rePasswordValidation: '',
            image: null,
            base64: null,
            selectedCountry: null,
            selectedKayan: null,
			countries: [],
			isSubmitted: false,
			mapRegion: null
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

	askPermissionsAsync = async () => {
		await Permissions.askAsync(Permissions.CAMERA);
		await Permissions.askAsync(Permissions.CAMERA_ROLL);
	};

    _pickImage = async () => {
		this.askPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64:true
        });

        // check if there is image then set it and make button not disabled
        if (!result.cancelled) {
            this.setState({ image: result.uri ,base64:result.base64});
        }
    };

    async componentWillMount() {
		axios.post( CONST.url + 'country/allCountry', { lang : (this.props.lang).toUpperCase() })
			.then(response => {
				this.setState({ countries: response.data.data, loader: false, selectedCountry: response.data.data[0].country_id });
			});

		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			alert('صلاحيات تحديد موقعك الحالي ملغاه');
		}else {
			const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
			const userLocation = { latitude, longitude };
			this.setState({  mapRegion: userLocation });
		}
	}

	onRegister(){
		const err = this.validate();
		if (!err){
			this.setState({ isSubmitted: true });
			AsyncStorage.getItem('deviceID').then(token => {
				axios.post(CONST.url + 'user/register' ,{
					userName: 	this.state.username,
					phoneNo: 	this.state.phone,
					password: 	this.state.password,
					email: 		this.state.mail,
					lang: 		(this.props.lang).toUpperCase(),
					device_ID: 	token,
					userType: 	this.state.selectedKayan,
					image: 		this.state.base64,
					country_id: this.state.selectedCountry,
					lat:		this.state.mapRegion.latitude,
					lng:		this.state.mapRegion.longitude,
				}).then(response => {
					this.setState({ isSubmitted: false });

					if (response.data.status == 1){
						const {phone, password } = this.state;
						this.props.navigation.navigate('activateAcc', { phone, password, token, code: response.data.data.activitionCode, userId: response.data.data.user_id, mapRegion: this.state.mapRegion })
					}

					Toast.show({
						text: response.data.message,
						type: response.data.status == 1 ? "success" : "danger",
						duration: 3000
					});
				}).catch(e => {
					this.setState({ isSubmitted: false });
					Toast.show({
						text: 'يوجد خطأ ما الرجاء المحاولة مرة اخري',
						type: "danger",
						duration: 3000
					});
				})
			})
		}
	}

	validate = () => {
		let isError = false;
		let msg = '';

		if (this.state.phone.length <= 0) {
			isError = true;
			msg = i18n.t('phoneValidation');
			this.setState({ usernameValidation: '', phoneValidation: msg, mailValidation: '', passwordValidation: '', rePasswordValidation: '' });
		}else if (this.state.password.length <= 0) {
			isError = true;
			msg = i18n.t('passwordRequired');
			this.setState({ usernameValidation: '', phoneValidation: '', mailValidation: '', passwordValidation: msg, rePasswordValidation: '' });
		}else if (this.state.username.length <= 0) {
			isError = true;
			msg = i18n.t('usernameRequired');
			this.setState({ usernameValidation: msg, phoneValidation: '', mailValidation: '', passwordValidation: '', rePasswordValidation: '' });
		}else if (this.state.password != this.state.rePassword) {
			isError = true;
			msg = i18n.t('verifyPassword');
			this.setState({ usernameValidation: '', phoneValidation: '', mailValidation: '', passwordValidation: '', rePasswordValidation: msg });
		}else if (this.state.selectedKayan === null) {
			isError = true;
			msg = i18n.t('selectedKayanValidation');
		}else if (this.state.password.length < 6) {
			isError = true;
			msg = i18n.t('passwordLength');
			this.setState({ usernameValidation: '', phoneValidation: '', mailValidation: '', passwordValidation: msg, rePasswordValidation: '' });
		}else if (this.state.mail.length <= 0 || this.state.mail.indexOf("@") === -1 || this.state.mail.indexOf(".") === -1) {
			isError = true;
			msg = i18n.t('emailNotCorrect');
			this.setState({ usernameValidation: '', phoneValidation: '', mailValidation: msg, passwordValidation: '', rePasswordValidation: '' });
		}else {
			this.setState({ usernameValidation: '', phoneValidation: '', mailValidation: '', passwordValidation: '', rePasswordValidation: '' });
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
		if (this.state.username == '' || this.state.phone == '' || this.state.mail == '' || this.state.password == '' || this.state.rePassword == '' || this.state.base64 == null ){
			return(
				<Button disabled style={[Styles.loginBtn , {marginBottom:40, backgroundColor: '#999' }]}>
					<Text style={Styles.btnTxt}>{ i18n.t('registerButton') }</Text>
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
			<Button onPress={() => this.onRegister()} style={Styles.loginBtn}>
				<Text style={Styles.btnTxt}>{ i18n.t('registerButton') }</Text>
			</Button>
		);
	}

	render() {
        let image = this.state.image;
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
                            <KeyboardAvoidingView behavior={'absolute'} style={Styles.keyboardAvoid}>
                                <Form style={{width: '100%' , marginTop:30}}>
                                    <Text style={Styles.title}>{ i18n.t('newReg') }</Text>
                                    <View style={Styles.formImgView}>
                                        {image != null?
                                            <TouchableOpacity  style={{width:100 , height:100  }} onPress={()=> this._pickImage()} >
                                                <Image
                                                    onPress={()=> this._pickImage()}
                                                    resizeMode={'cover'}
                                                    style={{width:'100%' , height:'100%' , borderRadius:25}}
                                                    source={{ uri: image }}
                                                />
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity  onPress={()=> this._pickImage()} >
                                                <Image source={require('../../assets/images/img.png')} style={{width:100 , height:100}} resizeMode={'contain'} />
                                            </TouchableOpacity>
                                        }
                                    </View>

                                    <View style={[Styles.inputParent, { borderColor: this.state.usernameValidation != '' ? '#f00' : '#035F5B' }]}>
                                        <Item stackedLabel style={[Styles.item ]} bordered>
                                            <Label style={Styles.labelItem}>{ i18n.t('username') }</Label>
                                            <Input value={this.state.username} onChangeText={(username) => this.setState({username})} autoCapitalize='none' style={Styles.itemInput}  />
											<Text style={{ color: '#f00', top: -12 }}>{ this.state.usernameValidation }</Text>
                                        </Item>
                                    </View>

									<View style={[Styles.inputParent, { borderColor: this.state.phoneValidation != '' ? '#f00' : '#035F5B' }]}>
                                        <Item stackedLabel style={Styles.item } bordered>
                                            <Label style={Styles.labelItem}>{ i18n.t('phoneNumber') }</Label>
                                            <Input value={this.state.phone} onChangeText={(phone) => this.setState({phone})} keyboardType={'number-pad'} style={Styles.itemInput}  />
											<Text style={{ color: '#f00', top: -12 }}>{ this.state.phoneValidation }</Text>
                                        </Item>
                                    </View>
									<View style={[Styles.inputParent, { borderColor: this.state.mailValidation != '' ? '#f00' : '#035F5B' }]}>
                                        <Item stackedLabel style={Styles.item } bordered>
                                            <Label style={Styles.labelItem}>{ i18n.t('email') }</Label>
                                            <Input autoCapitalize='none' value={this.state.mail} onChangeText={(mail) => this.setState({mail})} keyboardType={'email-address'}  style={Styles.itemInput}  />
											<Text style={{ color: '#f00', top: -12 }}>{ this.state.mailValidation }</Text>
                                        </Item>
                                    </View>
                                    <View>
                                        <Item style={Styles.itemPicker} regular >
                                            <Label style={[Styles.labelItem , {top:-20 , left:15 , position:'absolute'}]}>{ i18n.t('country') }</Label>
                                            <Picker
                                                mode="dropdown"
                                                style={Styles.picker}
                                                placeholderStyle={{ color: "#acabae" }}
                                                placeholderIconColor="#acabae"
                                                selectedValue={this.state.selectedCountry}
                                                onValueChange={(value) => this.setState({ selectedCountry: value })}
                                            >
                                                {
                                                    this.state.countries.map((country, i) => (
                                                        <Picker.Item label={country.countryName + ' - (' + country.CountryCode + ')'} value={country.country_id} key={i} />
                                                    ))
                                                }
                                            </Picker>
                                            <Image source={require('../../assets/images/dropdown.png')} style={Styles.pickerImg} resizeMode={'contain'} />
                                        </Item>
                                    </View>
                                    <View>
                                        <Item style={Styles.itemPicker} regular >
                                            <Label style={[Styles.labelItem , {top:-20 , left:15 , position:'absolute'}]}>{ i18n.t('entityType') }</Label>
                                            <Picker
                                                mode="dropdown"
                                                style={Styles.picker}
                                                placeholderStyle={{ color: "#acabae" }}
                                                placeholderIconColor="#acabae"
                                                selectedValue={this.state.selectedKayan}
                                                onValueChange={(value) => this.setState({ selectedKayan: value })}
                                            >
                                                <Picker.Item label={i18n.t('entityType')} value={null} />
                                                <Picker.Item label={i18n.t('individual')} value='individual' />
                                                <Picker.Item label={i18n.t('company')} value='company' />
                                                <Picker.Item label={i18n.t('establishment')} value='establishment' />
                                                <Picker.Item label={i18n.t('other')} value='other' />
                                            </Picker>
                                            <Image source={require('../../assets/images/dropdown.png')} style={Styles.pickerImg} resizeMode={'contain'} />
                                        </Item>
                                    </View>
									<View style={[Styles.inputParent, { borderColor: this.state.passwordValidation != '' ? '#f00' : '#035F5B' }]}>
                                        <Item stackedLabel style={Styles.item } bordered>
                                            <Label style={Styles.labelItem}>{ i18n.t('password') }</Label>
                                            <Input autoCapitalize='none' value={this.state.password} onChangeText={(password) => this.setState({password})} secureTextEntry  style={Styles.itemInput}  />
											<Text style={{ color: '#f00', top: -12 }}>{ this.state.passwordValidation }</Text>
                                        </Item>
                                    </View>

									<View style={[Styles.inputParent, { borderColor: this.state.rePasswordValidation != '' ? '#f00' : '#035F5B' }]}>
                                        <Item stackedLabel style={Styles.item } bordered>
                                            <Label style={Styles.labelItem}>{ i18n.t('verifyNewPass') }</Label>
                                            <Input autoCapitalize='none' value={this.state.rePassword} onChangeText={(rePassword) => this.setState({rePassword})} secureTextEntry  style={Styles.itemInput}  />
											<Text style={{ color: '#f00', top: -12 }}>{ this.state.rePasswordValidation }</Text>
                                        </Item>
                                    </View>

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('policy')} routeName={'register'} style={{flexDirection:'row' , justifyContent: 'center' , flexWrap: 'wrap'}}>
                                        <Text style={{color: '#035F5B',fontSize: 15, marginTop:20}}>{ i18n.t('agreement') } </Text>
                                        <Text style={[Styles.forgetPass , {color:'#00918B'}]}>{ i18n.t('terms') }</Text>
                                    </TouchableOpacity>

                                    { this.renderSubmit() }
                                </Form>
                            </KeyboardAvoidingView>
                        </View>
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

export default connect(mapStateToProps, {})(Register);
