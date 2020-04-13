import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, FlatList, Dimensions, BackHandler, Platform} from "react-native";
import { Container, Content, Icon, Header  ,Item , Input } from 'native-base'
import FooterSection from './FooterSection';
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import axios from 'axios'
import CONST from '../consts';
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import { Permissions, Notifications } from 'expo'
import {NavigationEvents} from "react-navigation";

const height = Dimensions.get('window').height;
class Home extends Component {
    constructor(props){
        super(props);

        this.state={
            categories: [],
            search:'',
			loader: false,
			token: '',
            notifyCounter: 0,
			routeName: this.props.navigation.state.routeName
        }
    }

    async componentWillMount() {
		Notifications.setBadgeNumberAsync(0);
		this.setState({ loader: true });
		axios.post( CONST.url + 'department/allDepartment', { lang : (this.props.lang).toUpperCase(), user_id: this.props.auth != null ? this.props.auth.data.data.user_id : null})
			.then(response => {
                this.setState({ categories: response.data.data, loader: false, notifyCounter: response.data.counterNotification });
        });

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

		let token = await Notifications.getExpoPushTokenAsync();
		this.setState({ token });

		// alert(token);
		//
		console.log('device_id_', token);
	}


	static navigationOptions = () => ({
        drawerLabel: i18n.t('home') ,
        drawerIcon: (<Image source={require('../../assets/images/home.png')} style={{ height: 20, width: 20 , top:3 }} resizeMode={'contain'} /> )
    });


    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
			<TouchableOpacity onPress={() => this.props.navigation.navigate('subCategories', { id: item.departement_id, name: item.departmentName, subCategories: item.subDepartment })} style={Styles.categoryList}>
                <View style={Styles.homeViewContainer}>
                    <View style={Styles.homeTextCont}>
                        <Text style={Styles.homeText}>{item.departmentName}</Text>
                    </View>
                    <Image source={{ uri: 'https://' + item.departmentImage }} resizeMode={'cover'} style={Styles.flatImage}/>
                </View>
            </TouchableOpacity>
        );
    }

    renderLoader(){
        if (this.state.loader){
            return(
                <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%', alignSelf:'center' , backgroundColor:'#fff' , width:'100%'  , position:'absolute' , zIndex:1 }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height, marginTop: 250 }}>
						<DoubleBounce size={20} color="#00918B" />
					</View>
                </View>
            );
        }
    }

	search(){
		this.props.navigation.navigate('searchResult', { search : this.state.search } );
	}


 	componentDidMount() {
		if (Platform.OS === 'android') {
			Notifications.createChannelAndroidAsync('notify', {
				name: 'Chat messages',
				sound: true,
			});
		}

		Notifications.addListener(this.handleNotification);


		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
	}

	handleNotification = (notification) => {
    	console.log('notification__', notification);
    	if (notification.data && notification.data.rateUser_id){
    		this.props.navigation.navigate('rate', { id: notification.data.rateUser_id, adId: notification.data._id })
		}
	};


	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
	}

	handleBackPress = () => {
		if (this.state.routeName === 'home'){
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
            <Container style={{}}>
				<NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/menu.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={Styles.headerBody}>{ i18n.t('home') }</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('notifications')} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/notifications.png')} style={Styles.headerNoti} resizeMode={'contain'} />
                            {
                                this.state.notifyCounter > 0 ? (
                                    <View style={{ backgroundColor: 'red', borderRadius: 30, width: 20, height: 20, alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 25, top: 5 }}>
                                        <Text style={{ color: '#fff' }}>{ this.state.notifyCounter }</Text>
                                    </View>
                                ) : ( <View /> )
                            }
                        </TouchableOpacity>
                    </View>
                </Header>
                <Content style={{}}>
					{ this.renderLoader() }
                    <View style={Styles.inputView}>
                        <Item  style={Styles.inputItem} bordered>
                            <Input onSubmitEditing={() => this.search() } onChangeText={(search) => this.setState({ search })} placeholder={ i18n.t('searchPlaceholder') } placeholderTextColor={'#acabae'} style={Styles.modalInput}   />
                        </Item>
                        <Image source={require('../../assets/images/search.png')} style={[Styles.searchImg , Styles.transform]} resizeMode={'contain'}/>
                    </View>
                    <View style={Styles.flatContainer}>
                        <FlatList
                            data={this.state.categories}
                            renderItem={({item}) => this.renderItems(item)}
                            numColumns={2}
                            keyExtractor={this._keyExtractor}
                        />
                    </View>
                </Content>
                <FooterSection user_id={ this.props.auth != null ? this.props.auth.data.data.user_id : null} routeName={'home'} navigation={this.props.navigation}/>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang, profile, auth }) => {
	return {
		lang: lang.lang,
		user: profile.user,
		auth: auth.user,
	};
};
export default connect(mapStateToProps, {})(Home);
