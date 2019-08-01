import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity , I18nManager , KeyboardAvoidingView} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Button, Form, Label, Picker} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'

class EditProfile extends Component {
    constructor(props){
        super(props);

        this.state={
            username: '',
            phone: '',
            mail: '',
            selectedCountry: null,
            selectedKayan: null,
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
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/back.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , left:-15 , textAlign:'center'}]}>{ i18n.t('profile') }</Text>
                    </View>
                </Header>
                <Content style={{padding:15}}>
                    <KeyboardAvoidingView behavior={'padding'} style={Styles.keyboardAvoid}>
                      <Image source={require('../../assets/images/profile_pic.png')} resizeMode={'cover'} style={{ width: 90, height: 90 , borderRadius:50 , alignSelf:'center'}}/>
                        <Form style={{width: '100%' , marginTop:30}}>
                            <View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
                                <Item stackedLabel style={Styles.item } bordered>
                                    <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('username') }</Label>
                                    <Input value={this.state.username} onChangeText={(username) => this.setState({username})} autoCapitalize='none' style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
                                </Item>
                            </View>
                            <View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
                                <Item stackedLabel style={Styles.item } bordered>
                                    <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('phoneNumber') }</Label>
                                    <Input value={this.state.phone} onChangeText={(phone) => this.setState({phone})} keyboardType={'number-pad'} style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
                                </Item>
                            </View>
                            <View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
                                <Item stackedLabel style={Styles.item } bordered>
                                    <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('email') }</Label>
                                    <Input autoCapitalize='none' value={this.state.mail} onChangeText={(mail) => this.setState({mail})} keyboardType={'email-address'} style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
                                </Item>
                            </View>
                            <View>
                                <Item style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]} regular >
                                    <Label style={[Styles.labelItem , {top:-35 , left:0 , position:'absolute'}]}>{ i18n.t('country') }</Label>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={Styles.picker}
                                        placeholderStyle={{ color: "#acabae" }}
                                        placeholderIconColor="#acabae"
                                        selectedValue={this.state.selectedCountry}
                                        onValueChange={(value) => this.setState({ selectedCountry: value })}
                                    >
                                        <Picker.Item label={''} value={null} />
                                        <Picker.Item label={'الرياض'} value={"1"} />
                                        <Picker.Item label={'الامارات'} value={"2"} />
                                        <Picker.Item label={'مصر'} value={"3"} />
                                    </Picker>
                                    <Icon name='angle-down' type={"FontAwesome"} style={Styles.pickerImg} style={{ color: "#878787", fontSize:23 , right: 10}}/>
                                </Item>
                            </View>
                            <View>
                                <Item style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:10}]} regular >
                                    <Label style={[Styles.labelItem , {top:-35 , left:0 , position:'absolute'}]}>{ i18n.t('entityType') }</Label>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={Styles.picker}
                                        placeholderStyle={{ color: "#acabae" }}
                                        placeholderIconColor="#acabae"
                                        selectedValue={this.state.selectedKayan}
                                        onValueChange={(value) => this.setState({ selectedKayan: value })}
                                    >
                                        <Picker.Item label={''} value={null} />
                                        <Picker.Item label={'هيئة ١'} value={"1"} />
                                        <Picker.Item label={'هيئة ٢'} value={"2"} />
                                        <Picker.Item label={'هيئة ٣'} value={"3"} />
                                    </Picker>
                                    <Icon name='angle-down' type={"FontAwesome"} style={Styles.pickerImg} style={{ color: "#878787", fontSize:23 , right: 10}}/>
                                </Item>
                            </View>
                            <View style={{flexDirection: 'row' , justifyContent: 'space-between' , alignItems:'center'}}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('changePass')}>
                                    <Text style={[Styles.forgetPass ]}>{ i18n.t('ChangePass') }ر</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('socials')}>
                                    <Text style={[Styles.forgetPass ]}>{ i18n.t('socialAcc') }</Text>
                                </TouchableOpacity>
                            </View>
                        </Form>
                        <Button onPress={() => this.props.navigation.navigate('profile')} style={[Styles.loginBtn , {marginBottom:40 }]}>
                            <Text style={Styles.btnTxt}>{ i18n.t('confirm') }</Text>
                        </Button>
                    </KeyboardAvoidingView>
                </Content>
            </Container>

        );
    }
}

export default EditProfile;