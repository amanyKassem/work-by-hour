import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity , I18nManager , FlatList} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Button, Form} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'

class Messages extends Component {
    constructor(props){
        super(props);

        this.state={
        }
    }


    static navigationOptions = () => ({
        drawerLabel: i18n.t('messages') ,
        drawerIcon: (<Image source={require('../../assets/images/msg.png')} style={{ height: 20, width: 20 , top:3 }} resizeMode={'contain'} /> )
    })

    render() {
        return (

            <Container style={{}}>
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/back.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , left:-15 , textAlign:'center'}]}>{ i18n.t('messages') }</Text>
                    </View>
                </Header>
                <Content style={{padding:15}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('chat')} style={{flexDirection:'row' , alignItems:'center'}}>
                        <Image source={require('../../assets/images/profile_pic.png')} resizeMode={'cover'} style={{ width: 60, height: 60 , borderRadius:50 , marginRight:10}}/>
                        <View style={{flex:1}}>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={{color:'#00918B',  fontSize:17, fontFamily: 'RegularFont' }}>اماني قاسم</Text>
                                <Text style={{color:'#00918B',  fontSize:12, fontFamily: 'RegularFont' }}>منذ ٣ دقائق</Text>
                            </View>
                            <Text style={{color:'#878787',  fontSize:13, fontFamily: 'RegularFont',textAlign: I18nManager.isRTL ?'right' : 'left'}}>هناك طلب جديد على وظيفتك هناك طلب جديد على وظيفتك هناك طلب جديد على وظيفتك</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginVertical:15}}/>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('chat')} style={{flexDirection:'row' , alignItems:'center'}}>
                        <Image source={require('../../assets/images/profile_pic.png')} resizeMode={'cover'} style={{ width: 60, height: 60 , borderRadius:50 , marginRight:10}}/>
                        <View style={{flex:1}}>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={{color:'#00918B',  fontSize:17, fontFamily: 'RegularFont' }}>اماني قاسم</Text>
                                <Text style={{color:'#00918B',  fontSize:12, fontFamily: 'RegularFont' }}>منذ ٣ دقائق</Text>
                            </View>
                            <Text style={{color:'#878787',  fontSize:13, fontFamily: 'RegularFont',textAlign: I18nManager.isRTL ?'right' : 'left'}}>هناك طلب جديد على وظيفتك هناك طلب جديد على وظيفتك هناك طلب جديد على وظيفتك</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginVertical:15}}/>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('chat')} style={{flexDirection:'row' , alignItems:'center'}}>
                        <Image source={require('../../assets/images/profile_pic.png')} resizeMode={'cover'} style={{ width: 60, height: 60 , borderRadius:50 , marginRight:10}}/>
                        <View style={{flex:1}}>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={{color:'#00918B',  fontSize:17, fontFamily: 'RegularFont' }}>اماني قاسم</Text>
                                <Text style={{color:'#00918B',  fontSize:12, fontFamily: 'RegularFont' }}>منذ ٣ دقائق</Text>
                            </View>
                            <Text style={{color:'#878787',  fontSize:13, fontFamily: 'RegularFont',textAlign: I18nManager.isRTL ?'right' : 'left'}}>هناك طلب جديد على وظيفتك هناك طلب جديد على وظيفتك هناك طلب جديد على وظيفتك</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginVertical:15}}/>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('chat')} style={{flexDirection:'row' , alignItems:'center'}}>
                        <Image source={require('../../assets/images/profile_pic.png')} resizeMode={'cover'} style={{ width: 60, height: 60 , borderRadius:50 , marginRight:10}}/>
                        <View style={{flex:1}}>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={{color:'#00918B',  fontSize:17, fontFamily: 'RegularFont' }}>اماني قاسم</Text>
                                <Text style={{color:'#00918B',  fontSize:12, fontFamily: 'RegularFont' }}>منذ ٣ دقائق</Text>
                            </View>
                            <Text style={{color:'#878787',  fontSize:13, fontFamily: 'RegularFont',textAlign: I18nManager.isRTL ?'right' : 'left'}}>هناك طلب جديد على وظيفتك هناك طلب جديد على وظيفتك هناك طلب جديد على وظيفتك</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginVertical:15}}/>
                </Content>
            </Container>

        );
    }
}

export default Messages;