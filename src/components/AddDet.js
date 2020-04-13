import React, { Component } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	I18nManager,
	Linking,
	Platform,
	Dimensions
} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Button, Form, Toast} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import StarRating from 'react-native-star-rating';
import { MapView } from 'expo';
import Communications from 'react-native-communications';
import Modal from "react-native-modal";
import {connect} from "react-redux";
import axios from "axios";
import CONST from "../consts";
import {DoubleBounce} from "react-native-loader";
import {NavigationEvents} from "react-navigation";

const height = Dimensions.get('window').height;
class AddDet extends Component {
    constructor(props){
        super(props);

        this.state={
            isModalVisible: false,
			dataAdvertise: [],
			userData: [],
			socialMediaData: [],
			loader: false,
			roomId: null,
			starCount: 0,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

    onConfirm() {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        this.props.navigation.navigate('myAdds');
    };

    componentWillMount() {
		this.setState({ loader: true });
		axios.post( CONST.url + 'advertise/detailsAdvertise', { lang: (this.props.lang).toUpperCase(), _id: this.props.navigation.state.params.id , user_id: this.props.user.user_id, type: this.props.navigation.state.params.type })
			.then(response => {
				this.setState({ dataAdvertise: response.data.dataAdvertise, userData: response.data.userData, socialMediaData: response.data.socialMediaData, roomId: response.data.room_id, loader: false });
			});
	}

	onDeleteAd(){
		axios.post( CONST.url + 'advertise/deleteAdvertise', { _id: this.props.navigation.state.params.id, })
			.then(response => {
				this.setState({ isModalVisible : false });
                this.props.navigation.navigate('orders');
			});
    }

	_linkPressed (url){
        Linking.openURL(url);
    }

	onStarRatingPress(rating) {
		this.setState({ starCount: rating });

		axios.post( CONST.url + 'user/Rating', {
			lang: (this.props.lang).toUpperCase(),
			rating,
			user_id : this.state.userData.user_id,
		}).then( response => {
			Toast.show({
				text: response.data.message,
				type: response.data.status == 1 ? "success" : "danger",
				duration: 3000
			});

			// this.setState({ starCount: response.data.data.rating, isSubmitted: false });
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

	linkingToGoogleMap(lat, lng){
		const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
		const latLng = `${lat},${lng}`;
		const label = 'Custom Label';
		const url = Platform.select({
			ios : `${scheme}${label}@${latLng}`,
			android: `${scheme}${latLng}(${label})`,
		});

		Linking.openURL(url);
	}

	onFocus(){
		this.componentWillMount()
	}

    render() {
        const { dataAdvertise, userData, socialMediaData } = this.state;

        return (
            <Container style={{}}>
				<NavigationEvents onWillFocus={() => this.onFocus()} />
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('orders')} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/back.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , textAlign:'center'}]}>{ this.state.dataAdvertise.workName }</Text>
                    </View>
                </Header>
                <Content >
                    { this.renderLoader() }
                    <View style={{padding:15}}>
                    <View style={{flexDirection:'row' , alignItems:'center'}}>
                        <Image source={{ uri: 'https://' + this.state.userData.imageProfile }} resizeMode={'cover'} style={{ width: 60, height: 60 , borderRadius:Platform.OS === 'ios' ?35 :50 , marginRight:10}}/>
                        <View>
                            <Text style={{color:'#00918B',  fontSize:17, fontFamily: 'RegularFont' }}>{ this.state.userData.userName }</Text>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={ this.state.userData.rating }
                                fullStarColor={'#ffcd00'}
                                starSize={14}
                                starStyle={{color: '#ffcd00', marginHorizontal: 1}}
                            />
                        </View>
                    </View>
                    <View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginVertical:10}}/>

                    <Text style={{color:'#00918B',  fontSize:15, fontFamily: 'RegularFont' ,  alignSelf: 'flex-start' , writingDirection: I18nManager.isRTL ?'rtl' : 'ltr'}}>{ i18n.t('jobDet') }</Text>
                    <Text style={{color:'#878787',  fontSize:13, fontFamily: 'RegularFont' ,  alignSelf: 'flex-start'}}>{ this.state.dataAdvertise.details }</Text>
						{
							this.state.userData.user_id != this.props.user.user_id ?
								<View>
									<View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginVertical:10}}/>

									<Text style={{color:'#00918B',  fontSize:15, fontFamily: 'RegularFont' ,  alignSelf: 'flex-start' , writingDirection: I18nManager.isRTL ?'rtl' : 'ltr'}}>{ i18n.t('rate') }</Text>
									<View style={{width:'40%' , alignSelf:'center' , marginTop:20}}>
										<StarRating
											disabled={false}
											maxStars={5}
											rating={this.state.starCount}
											fullStarColor={'#ffcd00'}
											selectedStar={(rating) => this.onStarRatingPress(rating)}
											starSize={20}
											starStyle={{color: '#ffcd00', marginHorizontal: 1}}
										/>
									</View>
								</View> : null
						}

                    <View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginVertical:10}}/>

                    <View style={[Styles.jobBlock , {borderTopRightRadius: 0,borderBottomLeftRadius: 0}]}>
						{
							this.state.dataAdvertise.typeWork == 'with' ? (
								<View style={{flexDirection:'row' , justifyContent:'space-between'}}>
									<Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('hoursNo') }: <Text style={{color:'#444444'}}>{ this.state.dataAdvertise.NumberOfHour }</Text></Text>
									<Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('pricePerHour') }: <Text style={{color:'#444444'}}>{ this.state.dataAdvertise.PriceOfHour } $</Text></Text>
								</View>
							) : (
								<View style={{flexDirection:'row' , justifyContent:'space-between'}}>
									<Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('finalFee') }: <Text style={{color:'#444444'}}>{ this.state.dataAdvertise.finalPrice } $</Text></Text>
								</View>
							)
						}
                    </View>

                    <View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginBottom:5}}/>

                    <Text style={{fontFamily: 'RegularFont', fontSize:13 , color:'#444444', marginBottom:5 ,  alignSelf: 'flex-start'}}>{ i18n.t('ownerLocation') }</Text>
                    {
                        this.state.dataAdvertise.lat && this.state.dataAdvertise.long ? (
							<TouchableOpacity onPress={() => this.linkingToGoogleMap(this.state.dataAdvertise.lat, this.state.dataAdvertise.long)} style={{ width: '100%', height: 160 }}>
								<View  style={{ width: '100%', height: 160, backgroundColor: 'transparent' , zIndex: 1, position: 'absolute' }} />
								<MapView
									style={{ flex: 1 , width:'100%' , height:150 }}
									initialRegion={{
										latitude: this.state.dataAdvertise.lat,
										longitude:  this.state.dataAdvertise.long,
										latitudeDelta: 0.0922,
										longitudeDelta: 0.0421,
									}}>
									<MapView.Marker
										coordinate={{latitude: this.state.dataAdvertise.lat, longitude: this.state.dataAdvertise.long}}
									>
										<Image source={require('../../assets/images/location_map.png')} resizeMode={'cover'} style={{ width: 35, height: 35 }}/>
									</MapView.Marker>
								</MapView>
							</TouchableOpacity>
                        ) : ( <View/> )
                    }

                    {
                        (this.state.dataAdvertise.Attachments != undefined && this.state.dataAdvertise.Attachments).length > 0 ? (
                            <View>
								<View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginTop:15 , marginBottom:5}}/>

								<Text style={{color:'#00918B',  fontSize:15, fontFamily: 'RegularFont',  alignSelf: 'flex-start' }}>{ i18n.t('attachments') }</Text>

								<View style={{flexDirection:'row' , flexWrap:'wrap' , alignItems:'center' }}>
									{
										this.state.dataAdvertise.Attachments.map(( img, i ) => (
											<Image source={{ uri: 'https://' + img.value }} key={i} style={{width:100 , height:100}} resizeMode={'contain'} />
										))
									}
								</View>
                            </View>
                        ) : ( <View />)
                    }

                    <View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginVertical:5}}/>

                    <Text style={{color:'#00918B',  fontSize:15, fontFamily: 'RegularFont' ,  alignSelf: 'flex-start'}}>{ i18n.t('connectWithAd') }</Text>

                    <View style={{flexDirection:'row'  , alignItems:'center' , justifyContent:'center' , marginBottom:5 , marginTop:10}}>
                        {
                            this.state.socialMediaData.whatsApp ? (
								<TouchableOpacity onPress={()=> this._linkPressed('https://api.whatsapp.com/send?phone=' + this.state.socialMediaData.whatsApp )}>
									<Image source={require('../../assets/images/whatsaap.png')} style={{width:35 , height:35}} resizeMode={'contain'} />
								</TouchableOpacity>
                            ) : ( <View /> )
                        }

						{
							this.state.socialMediaData.instagram ? (
								<TouchableOpacity onPress={()=> this._linkPressed(this.state.socialMediaData.instagram)}>
									<Image source={require('../../assets/images/instagram.png')} style={{width:35 , height:35}} resizeMode={'contain'} />
								</TouchableOpacity>
							) : ( <View /> )
						}

                        <TouchableOpacity onPress={() => Communications.phonecall(this.state.socialMediaData.phoneNo, true)}>
                            <Image source={require('../../assets/images/calling.png')} style={{width:35 , height:35}} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('chat', { roomId: this.state.roomId, name: this.state.userData.userName, reciver_id: this.state.userData.user_id })}>
                            <Image source={require('../../assets/images/snapchat.png')} style={{width:35 , height:35}} resizeMode={'contain'} />
                        </TouchableOpacity>

						{
							this.state.socialMediaData.twitter ? (
								<TouchableOpacity onPress={()=> this._linkPressed(this.state.socialMediaData.twitter)}>
									<Image source={require('../../assets/images/twitter.png')} style={{width:35 , height:35}} resizeMode={'contain'} />
								</TouchableOpacity>
							) : ( <View /> )
						}

						{
							this.state.socialMediaData.faceBook ? (
								<TouchableOpacity onPress={()=> this._linkPressed(this.state.socialMediaData.faceBook)}>
									<Image source={require('../../assets/images/facebook.png')} style={{width:35 , height:35}} resizeMode={'contain'} />
								</TouchableOpacity>
							) : ( <View /> )
						}
                    </View>

                    <View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginVertical:5}}/>
                    {
                        this.state.userData.user_id == this.props.user.user_id ? (
							<View style={{flexDirection:'row'  , alignItems:'center' , justifyContent:'space-between' , marginBottom:10 }}>
								<Button onPress={() => this.props.navigation.navigate('adEdit', { ad: { dataAdvertise, userData, socialMediaData } })} style={[Styles.loginBtn , {marginBottom:40 , width:'47%' }]}>
									<Text style={Styles.btnTxt}>{ i18n.t('edit') }</Text>
								</Button>
								<Button onPress={this._toggleModal}  style={[Styles.loginBtn , {marginBottom:40 , width:'47%' , backgroundColor:'#fa6441' }]}>
									<Text style={Styles.btnTxt}>{ i18n.t('delete') }</Text>
								</Button>
							</View>
                        ) : ( <View/> )
                    }

                    </View>
                    <Modal onBackdropPress={()=> this.setState({ isModalVisible : false })} isVisible={this.state.isModalVisible}>
                        <View style={Styles.modalStyle}>
                            <Image source={require('../../assets/images/alarm.png')}  style={{width:70 , height:70 , transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}]}} resizeMode={'contain'} />
                            <Text style={[Styles.tegisterText , { fontSize:13 , color:'#fff' , top:20 , textAlign:'center', position:'absolute'}]}>{ i18n.t('attention') }</Text>
                            <Text style={[Styles.tegisterText , {marginTop:5 , marginBottom:15 , fontSize:13 , color:'#444444' , textAlign:'center'}]}>{ i18n.t('deleteAd') }</Text>
                            <View style={{flexDirection:'row' , justifyContent:'center'}}>
                                <TouchableOpacity onPress={() => this.onDeleteAd()} style={[Styles.touchModal , {backgroundColor:'#fa6441'}]}>
                                    <Text style={[Styles.headerBody , {fontSize:14}]}>{ i18n.t('yes') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this._toggleModal} style={[Styles.touchModal , {backgroundColor:'#035F5B'}]}>
                                    <Text style={[Styles.headerBody , {fontSize:14}]}>{ i18n.t('no') }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

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

export default connect(mapStateToProps, {})(AddDet);
