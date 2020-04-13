import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity , I18nManager , Dimensions} from "react-native";
import {Container, Content, Icon, Header, Item, Picker, Toast} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import Modal from "react-native-modal";
import axios from "axios";
import CONST from "../consts";
import {DoubleBounce} from "react-native-loader";
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import StarRating from 'react-native-star-rating';

const height = Dimensions.get('window').height;
class Category extends Component {
    constructor(props){
        super(props);

        this.state={
            selectedCountry: null,
            selectedCity: null,
            selectedHours: null,
            selectedFee: null,
            isModalVisible: false,
            ads: [],
            hours: [],
            prices: [],
            countries: [],
            loader: false,
			percentItem: null,
			userBalance: 0,
			selectedAd: null
        }
    }

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });
    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    onConfirm() {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        this.props.navigation.navigate('addDet', { id: this.state.selectedAd, type: 1 });
    };

	noBalance() {
		this.setState({ isModalVisible: false });
		this.props.navigation.navigate('charge');
	};

	componentWillMount() {
		this.setState({ loader: true });
		axios.post( CONST.url + 'advertise/departmentAdvertise', { user_id: this.props.user.user_id, lang : (this.props.lang).toUpperCase(), subDepartmentId: this.props.navigation.state.params.id})
			.then(response => {
				this.setState({ ads: response.data.data, loader: false });
		});

		axios.post( CONST.url + 'advertise/getHourAdvertise', { lang : (this.props.lang).toUpperCase() })
			.then(response => {
				this.setState({ hours: response.data.data, loader: false });
		});

		axios.post( CONST.url + 'country/allCountry', { lang : (this.props.lang).toUpperCase() })
			.then(response => {
				this.setState({ countries: response.data.data, loader: false });
		});

		axios.post( CONST.url + 'advertise/getFinalPriceAndHourPriceAdvertise', { lang : (this.props.lang).toUpperCase() })
			.then(response => {
				this.setState({ prices: response.data.data, loader: false });
		});

		axios.post( CONST.url + 'user/percent', { lang : (this.props.lang).toUpperCase(), user_id: this.props.user.user_id })
			.then(response => {
				this.setState({ percentItem: response.data.data.percentItem, loader: false });
			});

		axios.post( CONST.url + 'user/getUserBalance', { lang : (this.props.lang).toUpperCase(), user_id: this.props.user.user_id})
			.then(response => {
				this.setState({ userBalance: response.data.data.price });
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

	openAd(id){
		if (this.state.userBalance >= 1){
			this.setState({ selectedAd: id });
			this._toggleModal()
		}else{
			this.noBalance()
		}
	}

	onChangePicker(value, type){
		if (type == 'country'){
			console.log('picker_val', value, type);
			this.setState({ selectedCountry: value })
		}else if (type == 'price')
			this.setState({ selectedFee: value });
		else if (type == 'hour')
			this.setState({ selectedHours: value });

		setTimeout(() => this.filter() , 0);
    }

	filter(){
		// if (this.state.selectedHours != null || this.state.selectedFee != null || this.state.selectedCountry != null){
			// this.setState({ loader: true });

			const { id, departmentId } = this.props.navigation.state.params;

			axios.post( CONST.url + 'advertise/searchAdvertise', {
				lang 			: (this.props.lang).toUpperCase(),
				NumberOfHour	: this.state.selectedHours,
				price			: this.state.selectedFee,
				country_id		: this.state.selectedCountry,
				user_id			: this.props.user.user_id,
				department_id	: departmentId,
				subDepartmentId : id,
			})
				.then(response => {
					this.setState({ ads: response.data.data, loader: false });
				})
		// }
	}

	onFocus(payload){
		console.log('this is onWillFocus', payload);
		this.setState({ loader: null, selectedCountry: null, selectedCity: null, selectedHours: null, selectedFee: null });

		this.componentWillMount()
	}

    render() {
        return (
            <Container style={{}}>
				<NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/back.png')} style={[Styles.headerMenu , Styles.transform, { paddingHorizontal: 20 }]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , textAlign:'center'}]}>{ this.props.navigation.state.params.name }</Text>
                    </View>
                </Header>
                <Content style={{padding:15}}>
					{ this.renderLoader() }
                    <View style={Styles.pickersParent}>
                        <Item style={Styles.catPicker} regular >
                            <Picker
                                mode="dropdown"
                                style={Styles.pickerLabel}
                                placeholderStyle={{ color: "#acabae" }}
								placeholder={ i18n.t('country') }
                                placeholderIconColor="#acabae"
                                selectedValue={this.state.selectedCountry}
                                onValueChange={(value) => this.onChangePicker(value, 'country')}
                            >
                                <Picker.Item label={ i18n.t('country') } value={null} />
                                {
                                    this.state.countries.map((country, i) => (
										<Picker.Item label={country.countryName} value={country.country_id} key={i} />
                                    ))
                                }
                            </Picker>
                            <Image source={require('../../assets/images/gray-drop.png')}  style={{right:5,width:10 , height:10}} resizeMode={'contain'} />
                        </Item>
                        <Item style={[Styles.catPicker , {width:'33%'}]} regular >
                            <Picker
                                mode="dropdown"
                                style={Styles.pickerLabel}
                                placeholderStyle={{ color: "#acabae" }}
                                placeholderIconColor="#acabae"
                                selectedValue={this.state.selectedHours}
                                onValueChange={(value) => this.onChangePicker(value, 'hour')}
                            >
                                <Picker.Item label={ i18n.t('hoursNo') } value={null} />
                                {
                                    this.state.hours.map((hour, i) => (
										<Picker.Item label={hour} value={hour} key={i} />
                                    ))
                                }

                            </Picker>
                            <Image source={require('../../assets/images/gray-drop.png')}  style={{right:5,width:10 , height:10}} resizeMode={'contain'} />
                        </Item>
                        <Item style={Styles.catPicker} regular >
                            <Picker
                                mode="dropdown"
                                style={Styles.pickerLabel}
                                placeholderStyle={{ color: "#acabae" }}
                                placeholderIconColor="#acabae"
                                selectedValue={this.state.selectedFee}
                                onValueChange={(value) => this.onChangePicker(value, 'price')}
                            >
                                <Picker.Item label={ i18n.t('fare') } value={null} />
								{
									this.state.prices.map((price, i) => (
										<Picker.Item label={price} value={price} key={i} />
									))
								}
                            </Picker>
                            <Image source={require('../../assets/images/gray-drop.png')} style={{right:5,width:10 , height:10}} resizeMode={'contain'} />
                        </Item>
                    </View>
                    {
                        this.state.ads.map((ad, i) => (
							<TouchableOpacity key={i} onPress={() => this.openAd(ad._id)} style={Styles.jobBlock}>
								<Text style={[Styles.tegisterText , {marginTop:0}]}>{ ad.workName }</Text>
								<View style={{ alignItems: 'center', alignSelf: 'center', width: 155, marginTop: 5 }}>
									<StarRating
										disabled={true}
										maxStars={5}
										rating={ ad.rating }
										fullStarColor={'#ffcd00'}
										starSize={14}
										starStyle={{color: '#ffcd00', marginHorizontal: 1}}
									/>
								</View>
								<View style={{flexDirection:'row' , justifyContent:'space-between'}}>

									<Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('adNumber') }: <Text style={{color:'#444444'}}>{ ad.advertisingNumber }</Text></Text>
									<Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('activityName') }: <Text style={{color:'#444444'}}>{ ad.workStyle }</Text></Text>
								</View>
								<View style={{flexDirection:'row' , justifyContent:'space-between'}}>
									{
										ad.timeOFWork != '' ?
											<Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('time') }: <Text style={{color:'#444444'}}>{ ad.timeOFWork }</Text></Text> : null

									}
									{
										ad.time_Started != '' ?
											<Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('date') }: <Text style={{color:'#444444'}}>{ ad.time_Started }</Text></Text> : null
									}

								</View>
								{
									ad.typeWork == 'with' ? (
										<View>
											<View style={{flexDirection:'row' , justifyContent:'space-between'}}>
												<Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('hoursNo') }: <Text style={{color:'#444444'}}>{ ad.NumberOfHour }</Text></Text>
												<Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('pricePerHour') }: <Text style={{color:'#444444'}}>{ ad.PriceOfHour } $</Text></Text>
											</View>
											<View style={{flexDirection:'row' , justifyContent:'space-between'}}>
												<Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('distance') }: <Text style={{color:'#444444'}}>{ ad.distance }  { i18n.t('km') }</Text></Text>
												<Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('gender') }: <Text style={{color:'#444444'}}>{ ad.typeUser } </Text></Text>
											</View>
										</View>
									) : (
										<View>
											<View style={{flexDirection:'row' , justifyContent:'space-between'}}>
												<Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('finalFee') }: <Text style={{color:'#444444'}}>{ ad.finalPrice } $</Text></Text>
												<Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13,}]}>{ i18n.t('distance') }: <Text style={{color:'#444444', }}>{ ad.distance } { i18n.t('km') }</Text></Text>
											</View>
											<View style={{flexDirection:'row' , justifyContent:'space-between'}}>
												<Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('gender') }: <Text style={{color:'#444444'}}>{ ad.typeUser } </Text></Text>
												<Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13,}]}>{ i18n.t('time') }: <Text style={{color:'#444444', }}>{ ad.timeOFWork }</Text></Text>
											</View>
										</View>
									)
								}
							</TouchableOpacity>
                        ))
                    }

                    <Modal onBackdropPress={()=> this.setState({ isModalVisible : false })} isVisible={this.state.isModalVisible}>
                        <View style={Styles.modalStyle}>
                            <Image source={require('../../assets/images/alarm.png')}  style={{width:70 , height:70 , transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}]}} resizeMode={'contain'} />
                            <Text style={[Styles.tegisterText , { fontSize:13 , color:'#fff' , top:20 , textAlign:'center', position:'absolute'}]}>{ i18n.t('attention') }</Text>
                            <Text style={[Styles.tegisterText , {marginTop:5 , marginBottom:15 , fontSize:13 , color:'#444444' , textAlign:'center'}]}>{ i18n.t('noteAdd') } <Text style={{color:'#035F5B'}}>{ this.state.percentItem }</Text> { i18n.t('ofUrWallet') } </Text>
                            <View style={{flexDirection:'row' , justifyContent:'center'}}>
                                <TouchableOpacity onPress={() => this.onConfirm()} style={[Styles.touchModal , {backgroundColor:'#035F5B'}]}>
                                    <Text style={[Styles.headerBody , {fontSize:14}]}>{ i18n.t('confirm') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this._toggleModal} style={Styles.touchModal}>
                                    <Text style={[Styles.headerBody , {fontSize:14}]}>{ i18n.t('cancel') }</Text>
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
export default connect(mapStateToProps, {})(Category);
