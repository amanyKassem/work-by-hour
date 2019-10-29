import React, { Component } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	I18nManager,
	FlatList,
	KeyboardAvoidingView,
	Linking,
	Dimensions
} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Button, Form, Label, Textarea, Toast} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import {DoubleBounce} from "react-native-loader";
import axios from "axios";
import CONST from "../consts";
import {connect} from "react-redux";

const height = Dimensions.get('window').height;
class ContactUs extends Component {
    constructor(props){
        super(props);

        this.state={
            email:'',
            subTitle:'',
            msg:'',
            socials: [],
			isSubmitted: false,
			loader: false
        }
    }

    static navigationOptions = () => ({
        drawerLabel: i18n.t('contactUs') ,
        drawerIcon: (<Image source={require('../../assets/images/call.png')} style={{ height: 20, width: 20 , top:3 }} resizeMode={'contain'} /> )
    })

    _linkPressed (url){
        Linking.openURL(url);
    }

	componentWillMount() {
		this.setState({ loader: true });
		axios.post( CONST.url + 'user/siteInfoDetails', { lang : (this.props.lang).toUpperCase() })
			.then(response => {
				this.setState({ socials: response.data.data, loader: false });
			});
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

	onContactUs(){
		this.setState({ isSubmitted: true });

		axios.post( CONST.url + 'user/comunicatedWithUs', {
			lang: (this.props.lang).toUpperCase(),
			user_id: this.props.user.user_id,
			title: this.state.subTitle,
			message: this.state.msg,
			type:  1,
			email: this.state.email,
		}).then( response => {

			Toast.show({
				text: response.data.message,
				type: response.data.status == 1 ? "success" : "danger",
				duration: 3000
			});

			this.setState({ isSubmitted: false });
		})
	}

	renderSubmit(){
		if (this.state.email == '' || this.state.subTitle == '' || this.state.msg == '' ){
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
			<Button onPress={() => this.onContactUs()} style={[Styles.loginBtn , {marginBottom:40 }]}>
				<Text style={Styles.btnTxt}>{ i18n.t('sendButton') }</Text>
			</Button>
		);
	}

	onFocus(){
		this.componentWillMount()
	}

    render() {
        return (
            <Container style={{}}>
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/back.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , textAlign:'center'}]}>{ i18n.t('contactUs') }</Text>
                    </View>
                </Header>
                <Content >
					<View style={{padding:15}}>
						<KeyboardAvoidingView behavior={'padding'} style={Styles.keyboardAvoid}>
							<Form style={{width: '100%' }}>
								<View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
									<Item stackedLabel style={Styles.item } bordered>
										<Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('email') }</Label>
										<Input value={this.state.email} onChangeText={(email) => this.setState({email})} autoCapitalize='none' keyboardType={'email-address'} style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
									</Item>
								</View>
								<View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
									<Item stackedLabel style={Styles.item } bordered>
										<Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('subTitle') }</Label>
										<Input value={this.state.subTitle} onChangeText={(subTitle) => this.setState({subTitle})} autoCapitalize='none' style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
									</Item>
								</View>
								<View >
									<Item stackedLabel style={Styles.item } bordered>
										<Label style={[Styles.labelItem , {top:5 , left:-10 , backgroundColor:'transparent'}]}>{ i18n.t('subCont') }</Label>
									</Item>
									<Textarea value={this.state.msg} onChangeText={(msg) => this.setState({msg})} autoCapitalize='none' style={[Styles.inputParent ,{color: '#035F5B', borderColor:  '#eee', textAlign: I18nManager.isRTL ?'right' : 'left' , paddingVertical:10 , paddingHorizontal: 35 , backgroundColor:'#F6F6F6' , borderRadius:25 , height:250 , marginBottom:20}]}  />
								</View>
								<View style={{flexDirection:'row'  , alignItems:'center' , justifyContent:'center' , marginBottom:5 , marginTop:5}}>
									{
										this.state.socials.map(( social, i ) => (
											<TouchableOpacity key={i} onPress={()=> this._linkPressed(social.linkUrl)} style={{ margin: 2 }}>
												<Image source={{ uri: 'https://' + social.linkImage }} style={{width:35 , height:35}} resizeMode={'contain'} />
											</TouchableOpacity>
										))
									}
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

export default connect(mapStateToProps, {})(ContactUs);