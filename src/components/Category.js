import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity , I18nManager , FlatList} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Label, Picker} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import Modal from "react-native-modal";

class Category extends Component {
    constructor(props){
        super(props);

        this.state={
            selectedCountry: null,
            selectedCity: null,
            selectedHours: null,
            selectedFee: null,
            isModalVisible: false,
        }
    }

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });
    static navigationOptions = () => ({
        drawerLabel: () => null
    });
    onConfirm() {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        this.props.navigation.navigate('charge');
    };
    render() {
        return (

            <Container style={{}}>
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/back.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , left:-15 , textAlign:'center'}]}>اسم القسم</Text>
                    </View>
                </Header>
                <Content style={{padding:15}}>
                    <View style={Styles.pickersParent}>
                        <Item style={Styles.catPicker} regular >
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={Styles.pickerLabel}
                                placeholderStyle={{ color: "#acabae" }}
                                placeholderIconColor="#acabae"
                                selectedValue={this.state.selectedCountry}
                                onValueChange={(value) => this.setState({ selectedCountry: value })}
                            >
                                <Picker.Item label={ i18n.t('country') } value={null} />
                                <Picker.Item label={'الرياض'} value={"1"} />
                                <Picker.Item label={'الامارات'} value={"2"} />
                                <Picker.Item label={'مصر'} value={"3"} />
                            </Picker>
                            <Image source={require('../../assets/images/gray-drop.png')}  style={{right:5,width:10 , height:10}} resizeMode={'contain'} />
                        </Item>
                        <Item style={Styles.catPicker} regular >
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={Styles.pickerLabel}
                                placeholderStyle={{ color: "#acabae" }}
                                placeholderIconColor="#acabae"
                                selectedValue={this.state.selectedCity}
                                onValueChange={(value) => this.setState({ selectedCity: value })}
                            >
                                <Picker.Item label={ i18n.t('city') } value={null} />
                                <Picker.Item label={'القاهرة'} value={"1"} />
                                <Picker.Item label={'المنصوره'} value={"2"} />
                                <Picker.Item label={'الاسكندرية'} value={"3"} />
                            </Picker>
                            <Image source={require('../../assets/images/gray-drop.png')}  style={{right:5,width:10 , height:10}} resizeMode={'contain'} />
                        </Item>
                        <Item style={[Styles.catPicker , {width:'33%'}]} regular >
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={Styles.pickerLabel}
                                placeholderStyle={{ color: "#acabae" }}
                                placeholderIconColor="#acabae"
                                selectedValue={this.state.selectedHours}
                                onValueChange={(value) => this.setState({ selectedHours: value })}
                            >
                                <Picker.Item label={ i18n.t('hoursNo') } value={null} />
                                <Picker.Item label={'ساعه'} value={"1"} />
                                <Picker.Item label={'ساعتان'} value={"2"} />
                                <Picker.Item label={'ثلاث ساعات'} value={"3"} />
                            </Picker>
                            <Image source={require('../../assets/images/gray-drop.png')}  style={{right:5,width:10 , height:10}} resizeMode={'contain'} />
                        </Item>
                        <Item style={Styles.catPicker} regular >
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={Styles.pickerLabel}
                                placeholderStyle={{ color: "#acabae" }}
                                placeholderIconColor="#acabae"
                                selectedValue={this.state.selectedFee}
                                onValueChange={(value) => this.setState({ selectedFee: value })}
                            >
                                <Picker.Item label={ i18n.t('fare') } value={null} />
                                <Picker.Item label={'1'} value={"1"} />
                                <Picker.Item label={'2'} value={"2"} />
                                <Picker.Item label={'3'} value={"3"} />
                            </Picker>
                            <Image source={require('../../assets/images/gray-drop.png')} style={{right:5,width:10 , height:10}} resizeMode={'contain'} />
                        </Item>
                    </View>
                    <TouchableOpacity onPress={this._toggleModal} style={Styles.jobBlock}>
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
                    <TouchableOpacity onPress={this._toggleModal} style={Styles.jobBlock}>
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
                    <TouchableOpacity onPress={this._toggleModal} style={Styles.jobBlock}>
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
                    <TouchableOpacity onPress={this._toggleModal} style={Styles.jobBlock}>
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
                    <Modal onBackdropPress={()=> this.setState({ isModalVisible : false })} isVisible={this.state.isModalVisible}>
                        <View style={Styles.modalStyle}>
                            <Image source={require('../../assets/images/alarm.png')}  style={{width:70 , height:70 , transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}]}} resizeMode={'contain'} />
                            <Text style={[Styles.tegisterText , { fontSize:13 , color:'#fff' , top:20 , textAlign:'center', position:'absolute'}]}>{ i18n.t('attention') }</Text>
                            <Text style={[Styles.tegisterText , {marginTop:5 , marginBottom:15 , fontSize:13 , color:'#444444' , textAlign:'center'}]}>{ i18n.t('noteAdd') } <Text style={{color:'#035F5B'}}>1$</Text> { i18n.t('ofUrWallet') } </Text>
                            <View style={{flexDirection:'row' , justifyContent:'center'}}>
                                <TouchableOpacity onPress={() => this.onConfirm()} style={[Styles.touchModal , {backgroundColor:'#035F5B'}]}>
                                    <Text style={[Styles.headerBody , {fontSize:14}]}>{ i18n.t('confirm') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this._toggleModal} style={Styles.touchModal}>
                                    <Text style={[Styles.headerBody , {fontSize:14}]}>{ i18n.t('cancel') }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </Content>
            </Container>

        );
    }
}

export default Category;