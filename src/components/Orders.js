import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, FlatList, Dimensions} from "react-native";
import { Container, Content, Icon, Header  ,Item , Input } from 'native-base'
import FooterSection from './FooterSection';
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import axios from "axios";
import CONST from "../consts";
import {DoubleBounce} from "react-native-loader";
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";


const height = Dimensions.get('window').height;
class Orders extends Component {
    constructor(props){
        super(props);

        this.state={
            ads: [],
            type: '0'
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

	componentWillMount() {
		this.setState({ loader: true });
		axios.post( CONST.url + 'advertise/getAdvertise', { user_id: this.props.user.user_id, type: this.state.type })
			.then(response => {
				this.setState({ ads: response.data.data, loader: false });
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

	changeType(type){
	    this.setState({ type });
		setTimeout(() => this.componentWillMount(), 0);
    }

	onFocus(){
	    this.setState({ type: '0' })
		this.componentWillMount()
	}

	render() {
        return (
            <Container style={{}}>
				<NavigationEvents onWillFocus={() => this.onFocus()} />
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/menu.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={Styles.headerBody}>{ i18n.t('req&ann') }</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('notifications')} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/notifications.png')} style={Styles.headerNoti} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>
                </Header>
                <Content style={{padding:15}}>
                    { this.renderLoader() }
                    <View style={Styles.orerBtns}>
                        <TouchableOpacity onPress={() => this.changeType('1')} style={[Styles.touchModal , {width:140,backgroundColor: this.state.type === '1' ? '#035F5B' : '#f6f6f6', marginRight:-30, borderColor:'#eee' , borderWidth:1 }]}>
                            <Text style={[Styles.headerBody , {fontSize:14, color : this.state.type === '1' ? '#fff' : '#035F5B' , textAlign:'center'}]}>{ i18n.t('req') }</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.changeType('0')} style={[Styles.touchModal , {backgroundColor: this.state.type  === '0' ? '#035F5B' : '#f6f6f6',width:140, }]}>
                            <Text style={[Styles.headerBody , {fontSize:14 , textAlign:'center', color : this.state.type === '0' ? '#fff' : '#035F5B' }]}>{ i18n.t('ann') }</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginBottom:20}}>
                        {
                            this.state.ads.map((ad, i ) => (
								<TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('addDet', { id: ad._id } )} style={Styles.jobBlock}>
									<Text style={[Styles.tegisterText , {marginTop:0}]}>{ ad.workName }</Text>
									<View style={{flexDirection:'row' , justifyContent:'space-between'}}>
										<Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('adNumber') }: <Text style={{color:'#444444'}}>{ ad.advertisingNumber }</Text></Text>
										<Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('activityName') }: <Text style={{color:'#444444'}}>{ ad.workStyle }</Text></Text>
									</View>
									<View style={{flexDirection:'row' , justifyContent:'space-between'}}>
										<Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('time') }: <Text style={{color:'#444444'}}>{ ad.timeOFWork }</Text></Text>
										<Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('date') }: <Text style={{color:'#444444'}}>{ ad.time_Started }</Text></Text>
									</View>
									{
										ad.typeWork == 'with' ? (
											<View style={{flexDirection:'row' , justifyContent:'space-between'}}>
												<Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('hoursNo') }: <Text style={{color:'#444444'}}>{ ad.NumberOfHour }</Text></Text>
												<Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('pricePerHour') }: <Text style={{color:'#444444'}}>{ ad.PriceOfHour } $</Text></Text>
											</View>
										) : (
											<View style={{flexDirection:'row' , justifyContent:'space-between'}}>
												<Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('finalFee') }: <Text style={{color:'#444444'}}>{ ad.finalPrice } $</Text></Text>
											</View>
										)
									}
								</TouchableOpacity>
                            ))
                        }
                    </View>
                </Content>
                <FooterSection routeName={'orders'} navigation={this.props.navigation}/>
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

export default connect(mapStateToProps, {})(Orders);