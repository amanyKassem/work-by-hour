import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Platform, KeyboardAvoidingView, Dimensions} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Button, Form, Label, Toast} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import axios from "axios";
import CONST from "../consts";
import {DoubleBounce} from "react-native-loader";
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
const height = Dimensions.get('window').height;

class Socials extends Component {
    constructor(props){
        super(props);

        this.state={
            whatsApp: '',
            facebook: '',
            twitter: '',
            instagram: '',
			loader: false
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

	componentWillMount() {
		this.setState({ loader: true });
		axios.post( CONST.url + 'user/getSocial', { lang : (this.props.lang).toUpperCase(), user_id: this.props.user.user_id })
			.then(response => {
				this.setState({
                    whatsApp: response.data.data.whatsApp,
					facebook: response.data.data.faceBook,
					twitter: response.data.data.twitter,
					instagram: response.data.data.instagram,
                    loader: false
				});
			});
	}

	isUrl(url) {
		var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
		return regexp.test(url);
	}

	onUpdateSocial(){
		this.setState({ isSubmitted: true });

		axios.post( CONST.url + 'user/saveSocial', {
			lang: (this.props.lang).toUpperCase(),
			user_id: this.props.user.user_id,
			whatsApp: this.state.whatsApp,
			faceBook: this.isUrl(this.state.facebook) ? this.state.facebook : '' ,
			twitter:  this.isUrl(this.state.twitter) ? this.state.twitter : '' ,
			instagram: this.isUrl(this.state.instagram) ? this.state.instagram : '',
		}).then( response => {

			Toast.show({
				text: response.data.message,
				type: response.data.status == 1 ? "success" : "danger",
				duration: 3000
			});

			this.setState({ isSubmitted: false });
		})
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
		if (this.state.isSubmitted){
			return (
				<View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
					<DoubleBounce size={20} color="#00918B" />
				</View>
			);
		}

		return (
			<Button onPress={() => this.onUpdateSocial() } style={[Styles.loginBtn , {marginBottom:40 , width:'90%'}]}>
				<Text style={Styles.btnTxt}>{ i18n.t('confirm') }</Text>
			</Button>
		);
	}

	onFocus(){
		this.componentWillMount()
	}

    render() {
        return (
            <Container style={{}}>
				<NavigationEvents onWillFocus={() => this.onFocus()} />
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/back.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , textAlign:'center'}]}>{ i18n.t('socialAcc') }</Text>
                    </View>
                </Header>
                <Content  >
					{ this.renderLoader() }
					<View style={{padding:15}}>
						<KeyboardAvoidingView behavior={'padding'} style={Styles.keyboardAvoid}>
							<Form style={{width: '100%'  , height : height-200}}>
								<View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
									<Item stackedLabel style={Styles.item } bordered>
										<Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('whatsApp') }</Label>
										<Input autoCapitalize='none' value={this.state.whatsApp} onChangeText={(whatsApp) => this.setState({whatsApp})}  style={[Styles.itemInput , {top:Platform.OS === 'ios' ? -15 : -20 , paddingRight:15}]}  />
									</Item>
								</View>
								<View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
									<Item stackedLabel style={Styles.item } bordered>
										<Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('facebook') }</Label>
										<Input autoCapitalize='none' value={this.state.facebook} onChangeText={(facebook) => this.setState({facebook})}  style={[Styles.itemInput , {top:Platform.OS === 'ios' ? -15 : -20 , paddingRight:15}]}  />
									</Item>
								</View>
								<View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
									<Item stackedLabel style={Styles.item } bordered>
										<Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('twitter') }</Label>
										<Input autoCapitalize='none' value={this.state.twitter} onChangeText={(twitter) => this.setState({twitter})}  style={[Styles.itemInput , {top:Platform.OS === 'ios' ? -15 : -20 , paddingRight:15}]}  />
									</Item>
								</View>
								<View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
									<Item stackedLabel style={Styles.item } bordered>
										<Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('instagram') }</Label>
										<Input autoCapitalize='none' value={this.state.instagram} onChangeText={(instagram) => this.setState({instagram})}  style={[Styles.itemInput , {top:Platform.OS === 'ios' ? -15 : -20 , paddingRight:15}]}  />
									</Item>
								</View>
							</Form>
						</KeyboardAvoidingView>
						{ this.renderSubmit() }
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

export default connect(mapStateToProps, {})(Socials);