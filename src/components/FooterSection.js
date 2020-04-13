import React, { Component } from 'react';
import i18n from "../../local/i18n";
import {Footer, FooterTab, Button, Icon, Toast,} from 'native-base';
import Styles from '../../assets/styles'
import axios from "axios";
import CONST from "../consts";
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import { Permissions, Notifications } from 'expo'

class FooterSection extends Component {
    constructor(props){
        super(props);
        console.log('route name', this.props.routeName);

        this.state={
            routeName:this.props.routeName,
            userBalance: 0,
			hasDollar: false
        }
    }

	componentWillMount() {
		axios.post( CONST.url + 'user/getUserBalance', { lang : (this.props.lang).toUpperCase(), user_id: this.props.user_id})
			.then(response => {
				this.setState({ userBalance: response.data.data.price, hasDollar: response.data.data.hasDollar });
			});

	}

    componentDidMount(){
        Notifications.addListener(this.handleNotification);
    }

    handleNotification = (notification) => {
        this.componentWillMount();
    }

	navigateToAddAd(){
        if (this.state.hasDollar)
			return this.props.navigation.navigate("addAd");

		Toast.show({
			text: i18n.t('noBalanceAdd'),
			type: "danger",
			duration: 3000
		});
    }


    onFocus(){
        this.componentWillMount()
    }

	render() {
        return (
            <Footer style={Styles.footer}>
                <NavigationEvents onWillFocus={() => this.onFocus()} />
                <FooterTab style={Styles.footerTab} >
                    <Button  onPress={()=> this.props.navigation.navigate("home")} style={{}} >
                        <Icon name='home' type={"Entypo"} style={{ color:  this.state.routeName === 'home' ? "#FFCC00" : "#fff" , fontSize:23 , marginBottom:0}}/>
                    </Button>
                    <Button onPress={()=> this.props.navigation.navigate("orders")} style={{right:20}} >
                        <Icon name='ios-list-box' type={"Ionicons"} style={{ color:  this.state.routeName === 'orders' ? "#FFCC00" : "#fff" , fontSize:23, marginBottom:0}}/>
                    </Button>
                    <Button onPress={()=> this.navigateToAddAd()} style={{  borderWidth:2 , borderColor:this.state.routeName === 'addAd' ? "#FFCC00" : "transparent" , backgroundColor: this.state.routeName === 'addAd' ? "#FFCC00" : "#fff" , borderRadius: 50, bottom: 1, width: 50, height: 50 , position:'absolute', alignItems: 'center', justifyContent: 'center', right: '42.9%'}}>
                        <Icon type={'FontAwesome'} name={'plus'} style={{ fontSize: 20, color:this.state.routeName === 'addAd'  ? "#FFCC00" : "#00918B" , marginLeft:0 , marginRight:0 }} />
                    </Button>
                    <Button onPress={()=> this.props.navigation.navigate("profile")} style={{left:20}}>
                        <Icon name='user' type={"FontAwesome"} style={{ color:  this.state.routeName === 'profile' ? "#FFCC00" : "#fff" , fontSize:23 , marginBottom:0}}/>
                    </Button>
                    <Button onPress={()=> this.props.navigation.navigate("settings")}>
                        <Icon name='cog' type={"FontAwesome"} style={{ color:  this.state.routeName === 'settings'  ? "#FFCC00" : "#fff" , fontSize:23 , marginBottom:0}}/>
                    </Button>
                </FooterTab>

            </Footer>
        );
    }
}


const mapStateToProps = ({ lang, profile  }) => {
	return {
		lang: lang.lang,
		user: profile.user,
	};
};

export default connect(mapStateToProps, {})(FooterSection);
