import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, Linking, KeyboardAvoidingView} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Button, Form} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import StarRating from 'react-native-star-rating';
import { MapView } from 'expo';
import Communications from 'react-native-communications';
import Modal from "react-native-modal";

class AddDet extends Component {
    constructor(props){
        super(props);

        this.state={
            starCount:3,
            isModalVisible: false,
        }
    }


    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

    onConfirm() {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        this.props.navigation.navigate('myAdds');
    };


    _linkPressed (url){
        Linking.openURL(url);
    }
    render() {
        return (

            <Container style={{}}>
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/back.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , left:-15 , textAlign:'center'}]}>{ i18n.t('addDet') }</Text>
                    </View>
                </Header>
                <Content style={{padding:15}}>
                    <View style={{flexDirection:'row' , alignItems:'center'}}>
                        <Image source={require('../../assets/images/profile_pic.png')} resizeMode={'cover'} style={{ width: 60, height: 60 , borderRadius:50 , marginRight:10}}/>
                        <View>
                            <Text style={{color:'#00918B',  fontSize:17, fontFamily: 'RegularFont' }}>اماني قاسم</Text>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={this.state.starCount}
                                fullStarColor={'#ffcd00'}
                                starSize={14}
                                starStyle={{color: '#ffcd00', marginHorizontal: 1}}
                            />
                        </View>
                    </View>
                    <View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginVertical:10}}/>

                    <Text style={{color:'#00918B',  fontSize:15, fontFamily: 'RegularFont' }}>{ i18n.t('jobDet') }</Text>
                    <Text style={{color:'#878787',  fontSize:13, fontFamily: 'RegularFont' ,  textAlign: I18nManager.isRTL ?'right' : 'left',}}>نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص </Text>

                    <View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginVertical:10}}/>

                    <View style={[Styles.jobBlock , {borderTopRightRadius: 0,borderBottomLeftRadius: 0}]}>
                        <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                            <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('hoursNo') }: <Text style={{color:'#444444'}}>8 ساعات</Text></Text>
                            <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('date') }: <Text style={{color:'#444444'}}>2019/6/11</Text></Text>
                        </View>
                        <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                            <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('fare') }: <Text style={{color:'#444444'}}>100 ريال سعودي</Text></Text>
                            <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('time') }: <Text style={{color:'#444444'}}>3:00م</Text></Text>
                        </View>
                    </View>
                    
                    <View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginBottom:5}}/>

                    <Text style={{fontFamily: 'RegularFont', fontSize:13 , color:'#444444', marginBottom:5}}>{ i18n.t('ownerLocation') }</Text>

                    <MapView
                        style={{ flex: 1 , width:'100%' , height:150 }}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}>
                        <MapView.Marker
                            coordinate={{latitude: 37.78825, longitude: -122.4324}}
                        >
                            <Image source={require('../../assets/images/location_map.png')} resizeMode={'cover'} style={{ width: 35, height: 35 }}/>
                        </MapView.Marker>
                    </MapView>

                    <View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginTop:15 , marginBottom:5}}/>

                    <Text style={{color:'#00918B',  fontSize:15, fontFamily: 'RegularFont' }}>{ i18n.t('attachments') }</Text>

                    <View style={{flexDirection:'row' , flexWrap:'wrap' , alignItems:'center' }}>
                        <Image source={require('../../assets/images/add_pic.png')} style={{width:100 , height:100}} resizeMode={'contain'} />
                        <Image source={require('../../assets/images/add_pic.png')} style={{width:100 , height:100}} resizeMode={'contain'} />
                        <Image source={require('../../assets/images/add_pic.png')} style={{width:100 , height:100}} resizeMode={'contain'} />
                    </View>

                    <View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginVertical:5}}/>

                    <Text style={{color:'#00918B',  fontSize:15, fontFamily: 'RegularFont' }}>{ i18n.t('connectWithAd') }</Text>

                    <View style={{flexDirection:'row'  , alignItems:'center' , justifyContent:'center' , marginBottom:5 , marginTop:10}}>
                        <TouchableOpacity onPress={()=> this._linkPressed('https://web.whatsapp.com/')}>
                            <Image source={require('../../assets/images/whatsaap.png')} style={{width:35 , height:35}} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this._linkPressed('https://www.instagram.com/')}>
                            <Image source={require('../../assets/images/instagram.png')} style={{width:35 , height:35}} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Communications.phonecall('0123456789', true)}>
                            <Image source={require('../../assets/images/calling.png')} style={{width:35 , height:35}} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('chat')}>
                            <Image source={require('../../assets/images/snapchat.png')} style={{width:35 , height:35}} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this._linkPressed('https://twitter.com/')}>
                            <Image source={require('../../assets/images/twitter.png')} style={{width:35 , height:35}} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this._linkPressed('https://www.facebook.com/')}>
                            <Image source={require('../../assets/images/facebook.png')} style={{width:35 , height:35}} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>

                    <View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginVertical:5}}/>

                    <View style={{flexDirection:'row'  , alignItems:'center' , justifyContent:'space-between' , marginBottom:10 }}>
                        <Button onPress={() => this.props.navigation.navigate('addAd')} style={[Styles.loginBtn , {marginBottom:40 , width:'47%' }]}>
                            <Text style={Styles.btnTxt}>{ i18n.t('edit') }</Text>
                        </Button>
                        <Button onPress={this._toggleModal}  style={[Styles.loginBtn , {marginBottom:40 , width:'47%' , backgroundColor:'#fa6441' }]}>
                            <Text style={Styles.btnTxt}>{ i18n.t('delete') }</Text>
                        </Button>
                    </View>

                    <Modal onBackdropPress={()=> this.setState({ isModalVisible : false })} isVisible={this.state.isModalVisible}>
                        <View style={Styles.modalStyle}>
                            <Image source={require('../../assets/images/alarm.png')}  style={{width:70 , height:70 , transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}]}} resizeMode={'contain'} />
                            <Text style={[Styles.tegisterText , { fontSize:13 , color:'#fff' , top:20 , textAlign:'center', position:'absolute'}]}>{ i18n.t('attention') }</Text>
                            <Text style={[Styles.tegisterText , {marginTop:5 , marginBottom:15 , fontSize:13 , color:'#444444' , textAlign:'center'}]}>{ i18n.t('deleteAd') }</Text>
                            <View style={{flexDirection:'row' , justifyContent:'center'}}>
                                <TouchableOpacity onPress={() => this.onConfirm()} style={[Styles.touchModal , {backgroundColor:'#fa6441'}]}>
                                    <Text style={[Styles.headerBody , {fontSize:14}]}>{ i18n.t('yes') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this._toggleModal} style={[Styles.touchModal , {backgroundColor:'#035F5B'}]}>
                                    <Text style={[Styles.headerBody , {fontSize:14}]}>{ i18n.t('no') }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                </Content>
            </Container>

        );
    }
}

export default AddDet;