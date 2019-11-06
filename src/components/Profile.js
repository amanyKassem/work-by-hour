import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity , I18nManager , Platform} from "react-native";
import { Container, Content, Icon, Header  ,Item , Input } from 'native-base'
import FooterSection from './FooterSection';
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import {connect} from "react-redux";
import { profile } from '../actions'

class Profile extends Component {
    constructor(props){
        super(props);

        this.state={
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    componentWillMount() {
        this.props.profile(this.props.user.user_id, (this.props.lang).toUpperCase())
	}


	render() {
        return (
            <Container style={{}}>
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/menu.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={Styles.headerBody}>{ i18n.t('profile') }</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('notifications')} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/notifications.png')} style={Styles.headerNoti} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>
                </Header>
                <Content >
                    <View style={{padding:15}}>
                    <View style={{flexDirection:'row' , justifyContent:'space-between', alignItems:'center'}}>
                        <View style={{flexDirection:'row' , alignItems:'center'}}>
                            <Image source={{ uri: 'https://' + this.props.user.imageProfile }} resizeMode={'cover'} style={{ width: 60, height: 60 , borderRadius:Platform.OS === 'ios' ?35 :50 , marginRight:10}}/>
                            <View>
                                <Text style={{color:'#00918B',  fontSize:17, fontFamily: 'RegularFont' , lineHeight:14}}>{ this.props.user.userName }</Text>
                                <Text style={{color:'#878787',  fontSize:15, fontFamily: 'RegularFont', textAlign: I18nManager.isRTL ?'right' : 'left'}}>{ this.props.user.userType }</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('editProfile')}>
                            <Icon name='cog' type={"FontAwesome"} style={{ color: "#00918B", fontSize:23 }}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginVertical:10}}/>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('certify')} style={{flexDirection:'row' , justifyContent:'space-between', alignItems:'center'}}>
                        <Text style={{color:'#00918B',  fontSize:17, fontFamily: 'RegularFont' }}>{ i18n.t('certify&exp') }</Text>
                        <Icon name='angle-left' type={"FontAwesome"} style={{ color: "#878787", fontSize:23 , transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}]}}/>
                    </TouchableOpacity>
                    <View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginVertical:10}}/>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('interests')}style={{flexDirection:'row' , justifyContent:'space-between', alignItems:'center'}}>
                        <Text style={{color:'#00918B',  fontSize:17, fontFamily: 'RegularFont' }}>{ i18n.t('interests') }</Text>
                        <Icon name='angle-left' type={"FontAwesome"} style={{ color: "#878787", fontSize:23 , transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}] }}/>
                    </TouchableOpacity>
                    <View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginVertical:10}}/>
                    </View>
                </Content>
                <FooterSection user_id={ this.props.auth != null ? this.props.auth.data.data.user_id : null} routeName={'profile'} navigation={this.props.navigation}/>
            </Container>

        );
    }
}


const mapStateToProps = ({ lang, profile, auth  }) => {
	return {
		lang: lang.lang,
		user: profile.user,
		auth: auth.user,
	};
};

export default connect(mapStateToProps, { profile })(Profile);