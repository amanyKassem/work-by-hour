import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Share, I18nManager, Platform} from "react-native";
import {Container, Content, Icon} from 'native-base';
import {DrawerItems} from 'react-navigation';
import i18n from "../../local/i18n";
import { logout, tempAuth } from '../actions'
import {connect} from "react-redux";
import CONST from "../consts";

class DrawerCustomization extends Component {
    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            })

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

	logout(){
		this.props.logout({ user_id: this.props.user.user_id });
		this.props.tempAuth();

		this.props.navigation.navigate('language');
	}

    render() {
		let { user } = this.props;
		if (user === null)
			user = {
				imageProfile:  'https://' + CONST.url + 'images/defaultUser.jpg',
				userName: i18n.t('guest')
			}

        return (
            <Container>
                <Content style={{backgroundColor:'#fff'}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate("profile")} style={{flex:1 , alignItems: 'center' , marginBottom:5, paddingTop:40}}>
                        <Image source={{ uri: 'https://' + user.imageProfile }} resizeMode={'cover'} style={{ width: 90, height: 90 , borderRadius:Platform.OS === 'ios' ?45 :50 }}/>
                        <Text style={{color:'#00918B',  fontSize:17, fontFamily: 'RegularFont'}}>{ user.userName }</Text>
                    </TouchableOpacity>
                    <View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginTop:5}}/>
                    <DrawerItems {...this.props}
                                 onItemPress={
                                     (route, focused) => {
                                         if (route.route.key === 'logout') {
                                             // this.logout()
                                         }else {
                                             route.route.key === 'shareApp' ? this.onShare(): this.props.navigation.navigate(route.route.key)
                                         }
                                     }
                                 }
                                 activeBackgroundColor='transparent' inactiveBackgroundColor='transparent' activeLabelStyle={{color:'#00918B'}}
                                 labelStyle={{color: '#00918B' , fontSize:17 , marginLeft: 0 , marginRight: 0 , marginBottom:10 , marginTop:10 , fontFamily: 'RegularFont' ,  fontWeight: 'normal' }} iconContainerStyle ={{  marginRight: 12}}
                                 itemStyle  = {{marginBottom:0 , paddingBottom:0 , marginTop:0 , paddingTop:0 , fontFamily: 'RegularFont'}} itemsContainerStyle ={{fontFamily: 'RegularFont'}} />

                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={{flexDirection: 'row' }} onPress={() => this.logout()}>
                            <Image source={require('../../assets/images/logout.png')} style={{ height: 18, width: 18 , marginRight:15, top:10 , marginLeft:20  , transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}]}} resizeMode={'contain'} />
                            <Text style={{color:'#00918B',  fontSize:17, fontFamily: 'RegularFont'}}>{ i18n.t('logout') }</Text>
                        </TouchableOpacity>
                    </View>
                </Content>

            </Container>
        );
    }
}


const mapStateToProps = ({ auth, profile }) => {
	return {
		auth: auth.user,
		user: profile.user
	};
};

export default connect(mapStateToProps, { logout, tempAuth })(DrawerCustomization);
