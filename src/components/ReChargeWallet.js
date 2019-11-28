import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, KeyboardAvoidingView, Dimensions} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Label, Picker, Button, Form} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import { ImagePicker } from 'expo';
import axios from "axios";
import CONST from "../consts";
import {connect} from "react-redux";
import {DoubleBounce} from "react-native-loader";

const height = Dimensions.get('window').height;
class ReChargeWallet extends Component {
    constructor(props){
        super(props);

        this.state={
            bankName:'',
            username:'',
            accNum:'',
            money:'',
            image: null,
			base64: null,
            accounts: []
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


	componentWillMount() {
		this.setState({ loader: true });
		axios.post( CONST.url + 'user/getAllBank', { lang : (this.props.lang).toUpperCase() })
			.then(response => {
				this.setState({ accounts: response.data.data, loader: false });
			});
	}

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64:true
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri ,base64:result.base64});
        }
    };

    renderLoader(){
        if (this.state.loader){
            return(
                <View style={{ alignItems: 'center', justifyContent: 'center', height, alignSelf:'center' , backgroundColor:'#fff' , width:'100%'  , position:'absolute' , zIndex:1 }}>
                    <DoubleBounce size={20} color="#00918B" />
                </View>
            );
        }
    }

	addTransfer(){
		this.setState({ isSubmitted: true });
		axios.post(CONST.url + 'user/bankSend', {
			accountName: this.state.username,
			bankName: this.state.bankName,
			accountNumber: this.state.accNum,
			user_id: this.props.user.user_id,
			imageTransfer: this.state.base64,
			lang: (this.props.lang).toUpperCase(),
			amountTransferred: this.state.money
		}).then(response => {

		}).catch(e => console.warn(e));

		this.props.navigation.navigate('congrats');
	}

	renderSubmit(){
		if (this.state.bankName == '' || this.state.username == '' || this.state.accNum == '' || this.state.money == ''  || this.state.base64 == null ){
			return(
				<Button disabled style={[Styles.loginBtn , {marginBottom:40, backgroundColor: '#999'}]}>
					<Text style={Styles.btnTxt}>{ i18n.t('confirm') }</Text>
				</Button>
			)
		}

		return (
			<Button onPress={() => this.addTransfer()} style={[Styles.loginBtn , {marginBottom:40}]}>
				<Text style={Styles.btnTxt}>{ i18n.t('confirm') }</Text>
			</Button>
		);
	}


    render() {
        let image = this.state.image;
        return (

            <Container style={{}}>
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/back.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , textAlign:'center'}]}>{i18n.t('wallet')}</Text>
                    </View>
                </Header>
                <Content>
					<View style={{padding:15}}>
						{ this.renderLoader() }
						<KeyboardAvoidingView behavior={'padding'} style={Styles.keyboardAvoid}>
							{
								this.state.accounts.map((account, i) => (
									<View style={Styles.bankImg} key={i}>
										<Image source={{ uri: 'https://' + account.image }} style={{width:100 , height:100}} resizeMode={'contain'} />
										<View style={{flexDirection:'column' ,marginLeft:5 }}>
											<Text  style={[ Styles.bankName ]}>{ account.bankName }</Text>
											<Text style={[ Styles.bankName ,{color:'#8B8E8D'}]}>{ account.accountName }</Text>
											<Text style={[ Styles.bankName ,{color:'#8B8E8D'}]}>{ account.accountNumber }</Text>
										</View>
									</View>
								))
							}

							<View style={Styles.line}/>
							<Text style={[ Styles.bankName ,{color:'#444444' , textAlign:'center'}]}>{i18n.t('bankInfo')}</Text>
							<Form style={{width: '100%' , marginTop:15}}>
								<View style={[Styles.inputParent ,{ borderColor:  '#707070' , borderRadius:25 , height:40 , marginBottom:10}]}>
									<Item stackedLabel style={Styles.item } bordered>
										<Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{i18n.t('transBank')}</Label>
										<Input value={this.state.bankName} onChangeText={(bankName) => this.setState({bankName})} autoCapitalize='none' style={[Styles.itemInput , {top:-20}]}  />
									</Item>
								</View>
								<View style={[Styles.inputParent ,{ borderColor:  '#707070' , borderRadius:25 , height:40, marginBottom:10}]}>
									<Item stackedLabel style={Styles.item } bordered>
										<Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{i18n.t('accUser')}</Label>
										<Input value={this.state.username} onChangeText={(username) => this.setState({username})} autoCapitalize='none' style={[Styles.itemInput , {top:-20}]}  />
									</Item>
								</View>
								<View style={[Styles.inputParent ,{ borderColor:  '#707070' , borderRadius:25 , height:40, marginBottom:10}]}>
									<Item stackedLabel style={Styles.item } bordered>
										<Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{i18n.t('accNum')}</Label>
										<Input value={this.state.accNum} onChangeText={(accNum) => this.setState({accNum})}keyboardType={'number-pad'} style={[Styles.itemInput , {top:-20}]}  />
									</Item>
								</View>
								<View style={[Styles.inputParent ,{ borderColor:  '#707070' , borderRadius:25 , height:40, marginBottom:10}]}>
									<Item stackedLabel style={Styles.item } bordered>
										<Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{i18n.t('chargedCredit')}</Label>
										<Input value={this.state.money} onChangeText={(money) => this.setState({money})}keyboardType={'number-pad'} style={[Styles.itemInput , {top:-20}]}  />
									</Item>
								</View>
								<Label style={[Styles.labelItem , {top:0 , left:0 , marginBottom:10 , backgroundColor:'transparent'}]}>{i18n.t('transferReceipt')}</Label>

								<View style={{marginVertical:5}}>

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
											<Image source={require('../../assets/images/addImg.png')} style={{width:100 , height:100}} resizeMode={'contain'} />
										</TouchableOpacity>
									}

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

const mapStateToProps = ({ lang, profile  }) => {
	return {
		lang: lang.lang,
		user: profile.user,
	};
};

export default connect(mapStateToProps, {})(ReChargeWallet);