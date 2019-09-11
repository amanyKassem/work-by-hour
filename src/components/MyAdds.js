import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity , I18nManager , FlatList} from "react-native";
import { Container, Content, Icon, Header  ,Item , Input } from 'native-base'
import FooterSection from './FooterSection';
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'



class MyAdds extends Component {
    constructor(props){
        super(props);

        this.state={

        }
    }



    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    render() {
        return (

            <Container style={{}}>
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/menu.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={Styles.headerBody}>{ i18n.t('req&ann') }</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('notifications')} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/notifications.png')} style={Styles.headerNoti} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>
                </Header>
                <Content >
                    <View style={{padding:15}}>
                    <View style={Styles.orerBtns}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('orders')} style={[Styles.touchModal , {width:140,backgroundColor:'#F6F6F6', marginRight:-30, borderColor:'#eee' , borderWidth:1 }]}>
                            <Text style={[Styles.headerBody , {fontSize:14, color :'#035F5B' , textAlign:'center'}]}>{ i18n.t('req') }</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={[Styles.touchModal , {backgroundColor:'#035F5B',width:140, }]}>
                            <Text style={[Styles.headerBody , {fontSize:14 , textAlign:'center'}]}>{ i18n.t('ann') }</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginBottom:20}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('addDet')} style={Styles.jobBlock}>
                            <Text style={[Styles.tegisterText , {marginTop:0}]}>اسم الوظيفة</Text>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('adNumber') }: <Text style={{color:'#444444'}}>22</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('activityName') }: <Text style={{color:'#444444'}}>رياضي</Text></Text>
                            </View>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('hoursNo') }: <Text style={{color:'#444444'}}>8 ساعات</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('date') }: <Text style={{color:'#444444'}}>2019/6/11</Text></Text>
                            </View>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('pricePerHour') }: <Text style={{color:'#444444'}}>100 ريال سعودي</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('time') }: <Text style={{color:'#444444'}}>3:00م</Text></Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('addDet')} style={Styles.jobBlock}>
                            <Text style={[Styles.tegisterText , {marginTop:0}]}>اسم الوظيفة</Text>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('adNumber') }: <Text style={{color:'#444444'}}>22</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('activityName') }: <Text style={{color:'#444444'}}>رياضي</Text></Text>
                            </View>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('hoursNo') }: <Text style={{color:'#444444'}}>8 ساعات</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('date') }: <Text style={{color:'#444444'}}>2019/6/11</Text></Text>
                            </View>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('pricePerHour') }: <Text style={{color:'#444444'}}>100 ريال سعودي</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('time') }: <Text style={{color:'#444444'}}>3:00م</Text></Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('addDet')} style={Styles.jobBlock}>
                            <Text style={[Styles.tegisterText , {marginTop:0}]}>اسم الوظيفة</Text>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('adNumber') }: <Text style={{color:'#444444'}}>22</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('activityName') }: <Text style={{color:'#444444'}}>رياضي</Text></Text>
                            </View>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('hoursNo') }: <Text style={{color:'#444444'}}>8 ساعات</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('date') }: <Text style={{color:'#444444'}}>2019/6/11</Text></Text>
                            </View>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('pricePerHour') }: <Text style={{color:'#444444'}}>100 ريال سعودي</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('time') }: <Text style={{color:'#444444'}}>3:00م</Text></Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('addDet')} style={Styles.jobBlock}>
                            <Text style={[Styles.tegisterText , {marginTop:0}]}>اسم الوظيفة</Text>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('adNumber') }: <Text style={{color:'#444444'}}>22</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('activityName') }: <Text style={{color:'#444444'}}>رياضي</Text></Text>
                            </View>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('hoursNo') }: <Text style={{color:'#444444'}}>8 ساعات</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('date') }: <Text style={{color:'#444444'}}>2019/6/11</Text></Text>
                            </View>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('pricePerHour') }: <Text style={{color:'#444444'}}>100 ريال سعودي</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>{ i18n.t('time') }: <Text style={{color:'#444444'}}>3:00م</Text></Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Content>
                <FooterSection routeName={'orders'} navigation={this.props.navigation}/>
            </Container>

        );
    }
}

export default MyAdds;