import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity , I18nManager , Switch} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Toast, Picker} from 'native-base'
import FooterSection from './FooterSection';
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import { connect } from 'react-redux';
import { chooseLang } from '../actions';


class Settings extends Component {
    constructor(props){
        super(props);

        this.state={
            SwitchOnValueHolder: false,
            language: this.props.lang
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

	onChooseLang(lang) {
	    if (lang != this.props.lang){
            this.setState({ language: lang });
            this.props.chooseLang(lang);
        }
	};

    stopNotification = (value) =>{
        this.setState({  SwitchOnValueHolder:!this.state.SwitchOnValueHolder})
    }

    render() {
        return (

            <Container style={{}}>
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/menu.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={Styles.headerBody}>{ i18n.t('settings') }</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('notifications')} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/notifications.png')} style={Styles.headerNoti} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>
                </Header>
                <Content >
                    <View style={{padding:15}}>
                    <View style={{flexDirection:'row' , justifyContent:'space-between', alignItems:'center'}}>
                        <Text style={{color:'#00918B',  fontSize:17, fontFamily: 'RegularFont' }}>{ i18n.t('language') }</Text>
                        <Item style={[Styles.catPicker , {width:'40%' , backgroundColor:'transparent' , borderColor:'transparent'}]} regular >
                            <Picker
                                mode="dropdown"
                                style={Styles.pickerLabel}
                                placeholderStyle={{ color: "#acabae" }}
                                placeholderIconColor="#acabae"
                                selectedValue={this.state.language}
                                onValueChange={(value) => this.onChooseLang(value)}
                            >
                                <Picker.Item label={'اللغه العربية'} value={"ar"} />
                                <Picker.Item label={'English'} value={"en"} />
                            </Picker>
                            <Image source={require('../../assets/images/gray-drop.png')}  style={{right:5,width:10 , height:10}} resizeMode={'contain'} />
                        </Item>
                    </View>
                    <View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginVertical:10}}/>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('certify')} style={{flexDirection:'row' , justifyContent:'space-between', alignItems:'center'}}>
                        <Text style={{color:'#00918B',  fontSize:17, fontFamily: 'RegularFont' }}>{ i18n.t('notifications') }</Text>
                        <Switch
                            onValueChange={(value) => this.stopNotification(value)}
                            style={{right:-3 }}
                            value={this.state.SwitchOnValueHolder}
                            onTintColor={'#00918B'}
                            thumbTintColor={'#fff'}
                            tintColor={'#c5c5c5'}
                        />
                    </TouchableOpacity>
                    <View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginVertical:10}}/>
                    <TouchableOpacity style={{flexDirection:'row' , justifyContent:'space-between', alignItems:'center'}}>
                        <Text style={{color:'#00918B',  fontSize:17, fontFamily: 'RegularFont' , top:-3 }}>{ i18n.t('logout') }</Text>
                        <Icon name='angle-left' type={"FontAwesome"} style={{ color: "#878787", fontSize:23 , transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}] }}/>
                    </TouchableOpacity>
                    <View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginVertical:10}}/>
                    </View>
                </Content>
                <FooterSection routeName={'settings'} navigation={this.props.navigation}/>
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

export default connect(mapStateToProps, { chooseLang })(Settings);