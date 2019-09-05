import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, KeyboardAvoidingView, Dimensions} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Button, Form, Label, Picker} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import {ImagePicker, Permissions } from 'expo';
import axios from 'axios';
import {connect} from "react-redux";
import CONST from "../consts";
import {DoubleBounce} from "react-native-loader";
import { updateProfile } from '../actions/ProfileAction'


const height = Dimensions.get('window').height;
class EditProfile extends Component {
	constructor(props){
		super(props);

		this.state={
			username: this.props.user.userName,
			phone: this.props.user.phoneNo,
			mail: this.props.user.email,
			selectedCountry: this.props.user.country_id._id,
			selectedKayan: this.props.user.userType,
			userImage: 'https://' + this.props.user.imageProfile,
			base64: null,
			countries: [],
			isSubmitted: false
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
		//	mediaTypes: ImagePicker.MediaTypeOptions.All
		});

		if (!result.cancelled) {
			this.setState({ userImage: result.uri ,base64:result.base64});
		}
	};

	onUpdateProfile(){
		const data = {
			id: this.props.user.user_id,
			name: this.state.username,
			phone: this.state.phone,
			image: this.state.base64,
			email: this.state.mail,
			countryId: this.state.selectedCountry,
			type: this.state.selectedKayan,
			lang: (this.props.lang).toUpperCase(),
		};

		this.setState({ isSubmitted: true });
		this.props.updateProfile(data);
	}

	componentWillMount() {
		this.setState({ loader: true });
		axios.post( CONST.url + 'country/allCountry', { lang : (this.props.lang).toUpperCase() })
			.then(response => {
				this.setState({ countries: response.data.data, loader: false });
			});
	}

	componentWillReceiveProps(newProps){
		this.setState({ isSubmitted: false });
		this.props.navigation.navigate('profile')
	}

	renderLoader(){
		if (this.state.loader){
			return(
				<View style={{ alignItems: 'center', justifyContent: 'center', height, alignSelf:'center' , backgroundColor:'#fff' , width:'100%'  , position:'absolute' , zIndex:1 }}>
					<DoubleBounce size={20} color="#00918B" />
				</View>
			);
		}
	}

	renderSubmit(){
		if (this.state.username == '' || this.state.phone == '' || this.state.selectedCountry == null ){
			return(
				<Button disabled style={[Styles.loginBtn , {marginBottom:40, backgroundColor: '#999' }]}>
					<Text style={Styles.btnTxt}>{ i18n.t('add') }</Text>
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
			<Button onPress={() => this.onUpdateProfile()} style={[Styles.loginBtn , {marginBottom:40 }]}>
				<Text style={Styles.btnTxt}>{ i18n.t('confirm') }</Text>
			</Button>
		);
	}


	render() {
		let image = this.state.userImage;

		return (
			<Container style={{}}>
				<Header style={Styles.header} noShadow>
					<View style={Styles.headerView}>
						<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={Styles.headerTouch}>
							<Image source={require('../../assets/images/back.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
						</TouchableOpacity>
						<Text style={[Styles.headerBody , { flex:1, top:-3 , left:-15 , textAlign:'center'}]}>{ i18n.t('profile') }</Text>
					</View>
				</Header>
				<Content style={{padding:15}}>
					{ this.renderLoader() }
					<KeyboardAvoidingView behavior={'padding'} style={Styles.keyboardAvoid}>

                        <TouchableOpacity onPress={this._pickImage}>
                            {image != null?
                                <Image
                                    style={{ width: 90, height: 90 , borderRadius:50 , alignSelf:'center'}} resizeMode={'cover'}
                                    source={{ uri: image }}
                                />
                                :
                                <Image source={require('../../assets/images/profile_pic.png')} resizeMode={'cover'} style={{ width: 90, height: 90 , borderRadius:50 , alignSelf:'center'}}/>
                            }
                        </TouchableOpacity>


                        <Form style={{width: '100%' , marginTop:30}}>
							<View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
								<Item stackedLabel style={Styles.item } bordered>
									<Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('username') }</Label>
									<Input value={this.state.username} onChangeText={(username) => this.setState({username})} autoCapitalize='none' style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
								</Item>
							</View>
							<View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
								<Item stackedLabel style={Styles.item } bordered>
									<Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('phoneNumber') }</Label>
									<Input value={this.state.phone} onChangeText={(phone) => this.setState({phone})} keyboardType={'number-pad'} style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
								</Item>
							</View>
							<View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
								<Item stackedLabel style={Styles.item } bordered>
									<Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('email') }</Label>
									<Input autoCapitalize='none' value={this.state.mail} onChangeText={(mail) => this.setState({mail})} keyboardType={'email-address'} style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
								</Item>
							</View>
							<View>
								<Item style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]} regular >
									<Label style={[Styles.labelItem , {top:-35 , left:0 , position:'absolute'}]}>{ i18n.t('country') }</Label>
									<Picker
										mode="dropdown"
										iosIcon={<Icon name="arrow-down" />}
										style={Styles.picker}
										placeholderStyle={{ color: "#acabae" }}
										placeholderIconColor="#acabae"
										selectedValue={this.state.selectedCountry}
										onValueChange={(value) => this.setState({ selectedCountry: value })}
									>
										<Picker.Item label={ i18n.t('country') } value={null} />
										{
											this.state.countries.map((country, i) => (
												<Picker.Item label={country.countryName} value={country.country_id} key={i} />
											))
										}
									</Picker>
									<Icon name='angle-down' type={"FontAwesome"} style={Styles.pickerImg} style={{ color: "#878787", fontSize:23 , right: 10}}/>
								</Item>
							</View>
							<View>
								<Item style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:10}]} regular >
									<Label style={[Styles.labelItem , {top:-35 , left:0 , position:'absolute'}]}>{ i18n.t('entityType') }</Label>
									<Picker
										mode="dropdown"
										iosIcon={<Icon name="arrow-down" />}
										style={Styles.picker}
										placeholderStyle={{ color: "#acabae" }}
										placeholderIconColor="#acabae"
										selectedValue={this.state.selectedKayan}
										onValueChange={(value) => this.setState({ selectedKayan: value })}
									>
										<Picker.Item label={i18n.t('individual')} value={i18n.t('individual')} />
										<Picker.Item label={i18n.t('company')} value={i18n.t('company')} />
										<Picker.Item label={i18n.t('establishment')} value={i18n.t('establishment')} />
										<Picker.Item label={i18n.t('other')} value={i18n.t('other')} />

									</Picker>
									<Icon name='angle-down' type={"FontAwesome"} style={Styles.pickerImg} style={{ color: "#878787", fontSize:23 , right: 10}}/>
								</Item>
							</View>
							<View style={{flexDirection: 'row' , justifyContent: 'space-between' , alignItems:'center'}}>
								<TouchableOpacity onPress={() => this.props.navigation.navigate('changePass')}>
									<Text style={[Styles.forgetPass ]}>{ i18n.t('ChangePass') }</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => this.props.navigation.navigate('socials')}>
									<Text style={[Styles.forgetPass ]}>{ i18n.t('socialAcc') }</Text>
								</TouchableOpacity>
							</View>
						</Form>
						{ this.renderSubmit() }
					</KeyboardAvoidingView>
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

export default connect(mapStateToProps, { updateProfile })(EditProfile);