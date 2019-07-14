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
                            <Image source={require('../../assets/images/menu.png')} style={Styles.headerMenu} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={Styles.headerBody}>طلباتي واعلاناتي</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('notifications')} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/notifications.png')} style={Styles.headerNoti} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>
                </Header>
                <Content style={{padding:15}}>
                    <View style={Styles.orerBtns}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('orders')} style={[Styles.touchModal , {backgroundColor:'#F6F6F6', width:120 , marginRight:-30, borderColor:'#eee' , borderWidth:1 }]}>
                            <Text style={[Styles.headerBody , {fontSize:14, color :'#035F5B'}]}>طلباتي</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={[Styles.touchModal , {backgroundColor:'#035F5B', width:120 }]}>
                            <Text style={[Styles.headerBody , {fontSize:14 }]}>اعلاناتي</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginBottom:20}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('addDet')} style={Styles.jobBlock}>
                            <Text style={[Styles.tegisterText , {marginTop:0}]}>اسم الوظيفة</Text>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>رقم الإعلان: <Text style={{color:'#444444'}}>22</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>اسم النشاط: <Text style={{color:'#444444'}}>رياضي</Text></Text>
                            </View>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>عدد الساعات: <Text style={{color:'#444444'}}>8 ساعات</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>التاريخ: <Text style={{color:'#444444'}}>2019/6/11</Text></Text>
                            </View>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>سعر الساعه: <Text style={{color:'#444444'}}>100 ريال سعودي</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>الوقت: <Text style={{color:'#444444'}}>3:00م</Text></Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('addDet')} style={Styles.jobBlock}>
                            <Text style={[Styles.tegisterText , {marginTop:0}]}>اسم الوظيفة</Text>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>رقم الإعلان: <Text style={{color:'#444444'}}>22</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>اسم النشاط: <Text style={{color:'#444444'}}>رياضي</Text></Text>
                            </View>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>عدد الساعات: <Text style={{color:'#444444'}}>8 ساعات</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>التاريخ: <Text style={{color:'#444444'}}>2019/6/11</Text></Text>
                            </View>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>سعر الساعه: <Text style={{color:'#444444'}}>100 ريال سعودي</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>الوقت: <Text style={{color:'#444444'}}>3:00م</Text></Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('addDet')} style={Styles.jobBlock}>
                            <Text style={[Styles.tegisterText , {marginTop:0}]}>اسم الوظيفة</Text>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>رقم الإعلان: <Text style={{color:'#444444'}}>22</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>اسم النشاط: <Text style={{color:'#444444'}}>رياضي</Text></Text>
                            </View>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>عدد الساعات: <Text style={{color:'#444444'}}>8 ساعات</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>التاريخ: <Text style={{color:'#444444'}}>2019/6/11</Text></Text>
                            </View>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>سعر الساعه: <Text style={{color:'#444444'}}>100 ريال سعودي</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>الوقت: <Text style={{color:'#444444'}}>3:00م</Text></Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('addDet')} style={Styles.jobBlock}>
                            <Text style={[Styles.tegisterText , {marginTop:0}]}>اسم الوظيفة</Text>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>رقم الإعلان: <Text style={{color:'#444444'}}>22</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>اسم النشاط: <Text style={{color:'#444444'}}>رياضي</Text></Text>
                            </View>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>عدد الساعات: <Text style={{color:'#444444'}}>8 ساعات</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>التاريخ: <Text style={{color:'#444444'}}>2019/6/11</Text></Text>
                            </View>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>سعر الساعه: <Text style={{color:'#444444'}}>100 ريال سعودي</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>الوقت: <Text style={{color:'#444444'}}>3:00م</Text></Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('addDet')} style={Styles.jobBlock}>
                            <Text style={[Styles.tegisterText , {marginTop:0}]}>اسم الوظيفة</Text>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>رقم الإعلان: <Text style={{color:'#444444'}}>22</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>اسم النشاط: <Text style={{color:'#444444'}}>رياضي</Text></Text>
                            </View>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>عدد الساعات: <Text style={{color:'#444444'}}>8 ساعات</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>التاريخ: <Text style={{color:'#444444'}}>2019/6/11</Text></Text>
                            </View>
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>سعر الساعه: <Text style={{color:'#444444'}}>100 ريال سعودي</Text></Text>
                                <Text style={[Styles.tegisterText , {marginTop:0 , fontSize:13}]}>الوقت: <Text style={{color:'#444444'}}>3:00م</Text></Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Content>
                <FooterSection routeName={'orders'} navigation={this.props.navigation}/>
            </Container>

        );
    }
}

export default MyAdds;