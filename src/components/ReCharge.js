import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity , I18nManager , FlatList} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Label, Picker, Button} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import Modal from "react-native-modal";
import axios from "axios";
import CONST from "../consts";
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";


class ReCharge extends Component {
    constructor(props){
        super(props);

        this.state={
			userBalance: 0,
			currency: ''
        }
    }

    static navigationOptions = () => ({
        drawerLabel: i18n.t('wallet') ,
        drawerIcon: (<Image source={require('../../assets/images/wallet.png')} style={{ height: 20, width: 20 , top:3 }} resizeMode={'contain'} /> )
    })


	componentWillMount() {
		axios.post( CONST.url + 'user/getUserBalance', { lang : (this.props.lang).toUpperCase(), user_id: this.props.user.user_id})
			.then(response => {
				this.setState({ userBalance: response.data.data.price, currency: response.data.data.currency });
			});
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
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , textAlign:'center'}]}>{i18n.t('wallet')}</Text>
                    </View>
                </Header>
                <Content style={{padding:15}}>
                    <Text style={[Styles.confirmText , {color:'#444444'}]}>{i18n.t('currentBalance')}</Text>
                    <Text style={[Styles.confirmText , {fontSize:80 , lineHeight:100}]}>{this.state.userBalance}</Text>
                    <Text style={[Styles.confirmText , {marginBottom:20}]}>{this.state.currency}</Text>
                    <View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginTop:5}}/>
                    <Button onPress={() => this.props.navigation.navigate('reChargeWallet')} style={Styles.loginBtn}>
                        <Text style={Styles.btnTxt}>{i18n.t('reChargeWallet')}</Text>
                    </Button>
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

export default connect(mapStateToProps, {})(ReCharge);