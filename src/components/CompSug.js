import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, FlatList, KeyboardAvoidingView} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Button, Form, Label, Textarea, Toast} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import axios from "axios";
import CONST from "../consts";
import {DoubleBounce} from "react-native-loader";
import {connect} from "react-redux";

class CompSug extends Component {
    constructor(props){
        super(props);

        this.state={
            address:'',
            msg:'',
			isSubmitted: false
        }
    }

    static navigationOptions = () => ({
        drawerLabel: i18n.t('CompSug') ,
        drawerIcon: (<Image source={require('../../assets/images/pros-and-cons.png')} style={{ height: 20, width: 20 , top:3 }} resizeMode={'contain'} /> )
    });

	onContactUs(){
		this.setState({ isSubmitted: true });

		axios.post( CONST.url + 'user/comunicatedWithUs', {
			lang: (this.props.lang).toUpperCase(),
			user_id: this.props.user.user_id,
			title: this.state.address,
			message: this.state.msg,
			type:  0,
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
		if (this.state.address == '' || this.state.msg == '' ){
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
			<Button onPress={() => this.onContactUs()} style={[Styles.loginBtn , {width:'90%' , marginBottom:40 }]}>
				<Text style={Styles.btnTxt}>{ i18n.t('sendButton') }</Text>
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
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , left:-15 , textAlign:'center'}]}>{ i18n.t('CompSug') }</Text>
                    </View>
                </Header>
                <Content >
					<View style={{padding:15}}>
						<KeyboardAvoidingView behavior={'padding'} style={Styles.keyboardAvoid}>
							<Form style={{width: '100%' }}>
								<View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
									<Item stackedLabel style={Styles.item } bordered>
										<Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('address') }</Label>
										<Input value={this.state.address} onChangeText={(address) => this.setState({address})} autoCapitalize='none' style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
									</Item>
								</View>
								<View >
									<Item stackedLabel style={Styles.item } bordered>
										<Label style={[Styles.labelItem , {top:5 , left:-10 , backgroundColor:'transparent'}]}>{ i18n.t('msgContent') }</Label>
									</Item>
									<Textarea value={this.state.msg} onChangeText={(msg) => this.setState({msg})} autoCapitalize='none' style={[Styles.inputParent ,{ color: '#035F5B',borderColor:  '#eee', textAlign: I18nManager.isRTL ?'right' : 'left' , paddingVertical:10 , paddingHorizontal: 35 , backgroundColor:'#F6F6F6' , borderRadius:25 , height:350 , marginBottom:20}]}  />
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

export default connect(mapStateToProps, {})(CompSug);