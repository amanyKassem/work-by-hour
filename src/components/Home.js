import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, FlatList, Dimensions} from "react-native";
import { Container, Content, Icon, Header  ,Item , Input } from 'native-base'
import FooterSection from './FooterSection';
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import axios from 'axios'
import CONST from '../consts';
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import { Permissions, Notifications } from 'expo'


const height = Dimensions.get('window').height;
class Home extends Component {
    constructor(props){
        super(props);

        this.state={
            categories: [],
            search:'',
			loader: false,
			token: '',
        }
    }

    async componentWillMount() {
		this.setState({ loader: true });
		axios.post( CONST.url + 'department/allDepartment', { lang : (this.props.lang).toUpperCase()})
			.then(response => {
                this.setState({ categories: response.data.data, loader: false });
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
		// console.log('device_id_', token);
	}

	static navigationOptions = () => ({
        drawerLabel: i18n.t('home') ,
        drawerIcon: (<Image source={require('../../assets/images/home.png')} style={{ height: 20, width: 20 , top:3 }} resizeMode={'contain'} /> )
    });


    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('category', { id: item.departement_id, name: item.departmentName })} style={Styles.categoryList}>
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
				<View style={{ alignItems: 'center', justifyContent: 'center', height : height - 200, alignSelf:'center' , backgroundColor:'#fff' , width:'100%'  , position:'absolute' , zIndex:1 }}>
					<DoubleBounce size={20} color="#00918B" />
				</View>
			);
		}
	}

	search(){
		this.props.navigation.navigate('searchResult', { search : this.state.search } );
	}

    render() {
        return (
            <Container style={{}}>
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/menu.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={Styles.headerBody}>{ i18n.t('home') }</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('notifications')} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/notifications.png')} style={Styles.headerNoti} resizeMode={'contain'} />
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
                <FooterSection routeName={'home'} navigation={this.props.navigation}/>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang }) => {
	return {
		lang: lang.lang,
	};
};
export default connect(mapStateToProps, {})(Home);