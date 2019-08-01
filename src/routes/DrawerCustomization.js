import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Share, I18nManager} from "react-native";
import {Container, Content, Icon} from 'native-base';
import {DrawerItems} from 'react-navigation';
import i18n from "../../local/i18n";


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
    render() {
        return (
            <Container>
                <Content style={{backgroundColor:'#fff'}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate("profile")} style={{flex:1 , alignItems: 'center' , marginBottom:5, paddingTop:40}}>
                        <Image source={require('../../assets/images/profile_pic.png')} resizeMode={'cover'} style={{ width: 90, height: 90 , borderRadius:50 }}/>
                        <Text style={{color:'#00918B',  fontSize:17, fontFamily: 'RegularFont'}}>اماني قاسم</Text>
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
                        <TouchableOpacity style={{flexDirection: 'row' }}>
                            <Image source={require('../../assets/images/logout.png')} style={{ height: 18, width: 18 , marginRight:15, top:10 , marginLeft:20  , transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}]}} resizeMode={'contain'} />
                            <Text style={{color:'#00918B',  fontSize:17, fontFamily: 'RegularFont'}}>{ i18n.t('logout') }</Text>
                        </TouchableOpacity>
                    </View>
                </Content>

            </Container>
        );
    }
}


export default DrawerCustomization;