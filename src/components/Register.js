import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    I18nManager,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import {Container, Content, Button, Icon, Picker, Form, Item,  Label, Input, } from 'native-base'
import Styles from '../../assets/styles'
import i18n from "../../local/i18n";

import { ImagePicker } from 'expo';


const height = Dimensions.get('window').height;
class Register extends Component {
    constructor(props){
        super(props);

        this.state={
            username: '',
            phone: '',
            mail: '',
            password: '',
            rePassword: '',
            image: null,
            selectedCountry: null,
            selectedKayan: null,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64:true
        });

        console.log(result);

        // check if there is image then set it and make button not disabled
        if (!result.cancelled) {
            this.setState({ image: result.uri ,base64:result.base64});
        }
    };
    render() {
        let image = this.state.image;
        return (

            <Container style={{backgroundColor:'#fff'}}>
                <View style={{ marginTop: Platform.OS === 'ios' ? 40 : 10, height:Platform.OS === 'ios' ?70:60 , top:Platform.OS === 'ios' ? 10 : 40 , backgroundColor: 'transparent', position: 'absolute', width: '100%' }} noShadow>
                    <View style={ {flexDirection:'row' , paddingHorizontal:10 , top:-5}}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/back.png')} style={{ transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}] , width:25 , height:25 } } resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Content style={Styles.homecontent}>
                    <KeyboardAvoidingView behavior={'padding'} style={Styles.keyboardAvoid}>
                        <View style={Styles.HeadImg }>
                            <Image source={require('../../assets/images/headBg.png')} style={Styles.HeadImg} resizeMode={'contain'} />

                        </View>

                        <View style={Styles.LoginParentView}>
                            <Form style={{width: '100%' , marginTop:30}}>
                                <Text style={Styles.title}>{ i18n.t('newReg') }</Text>
                                <View style={Styles.formImgView}>

                                    {image != null?
                                        <TouchableOpacity  style={{width:100 , height:100  }} onPress={()=> this._pickImage()} >
                                            <Image
                                                onPress={()=> this._pickImage()}
                                                resizeMode={'cover'}
                                                style={{width:'100%' , height:'100%' , borderRadius:25}}
                                                source={{ uri: image }}
                                            />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity  onPress={()=> this._pickImage()} >
                                            <Image source={require('../../assets/images/img.png')} style={{width:100 , height:100}} resizeMode={'contain'} />
                                        </TouchableOpacity>
                                    }

                                </View>
                                <View style={Styles.inputParent}>
                                    <Item stackedLabel style={Styles.item } bordered>
                                        <Label style={Styles.labelItem}>{ i18n.t('username') }</Label>
                                        <Input value={this.state.username} onChangeText={(username) => this.setState({username})} autoCapitalize='none' style={Styles.itemInput}  />
                                    </Item>
                                </View>
                                <View style={Styles.inputParent}>
                                    <Item stackedLabel style={Styles.item } bordered>
                                        <Label style={Styles.labelItem}>{ i18n.t('phoneNumber') }</Label>
                                        <Input value={this.state.phone} onChangeText={(phone) => this.setState({phone})} keyboardType={'number-pad'} style={Styles.itemInput}  />
                                    </Item>
                                </View>
                                <View style={Styles.inputParent}>
                                    <Item stackedLabel style={Styles.item } bordered>
                                        <Label style={Styles.labelItem}>{ i18n.t('email') }</Label>
                                        <Input autoCapitalize='none' value={this.state.mail} onChangeText={(mail) => this.setState({mail})} keyboardType={'email-address'}  style={Styles.itemInput}  />
                                    </Item>
                                </View>
                                <View>
                                    <Item style={Styles.itemPicker} regular >
                                        <Label style={[Styles.labelItem , {top:-20 , left:15 , position:'absolute'}]}>{ i18n.t('country') }</Label>
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
                                        <Image source={require('../../assets/images/dropdown.png')} style={Styles.pickerImg} resizeMode={'contain'} />
                                    </Item>
                                </View>
                                <View>
                                    <Item style={Styles.itemPicker} regular >
                                        <Label style={[Styles.labelItem , {top:-20 , left:15 , position:'absolute'}]}>{ i18n.t('entityType') }</Label>
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
                                        <Image source={require('../../assets/images/dropdown.png')} style={Styles.pickerImg} resizeMode={'contain'} />
                                    </Item>
                                </View>
                                <View style={Styles.inputParent}>
                                    <Item stackedLabel style={Styles.item } bordered>
                                        <Label style={Styles.labelItem}>{ i18n.t('password') }</Label>
                                        <Input autoCapitalize='none' value={this.state.password} onChangeText={(password) => this.setState({password})} secureTextEntry  style={Styles.itemInput}  />
                                    </Item>
                                </View>
                                <View style={Styles.inputParent}>
                                    <Item stackedLabel style={Styles.item } bordered>
                                        <Label style={Styles.labelItem}>{ i18n.t('verifyNewPass') }</Label>
                                        <Input autoCapitalize='none' value={this.state.rePassword} onChangeText={(rePassword) => this.setState({rePassword})} secureTextEntry  style={Styles.itemInput}  />
                                    </Item>
                                </View>

                                <TouchableOpacity style={{flexDirection:'row' , justifyContent: 'center' , flexWrap: 'wrap'}}>
                                    <Text style={{color: '#035F5B',fontSize: 15, marginTop:20}}>{ i18n.t('agreement') } </Text>
                                    <Text style={[Styles.forgetPass , {color:'#00918B'}]}>{ i18n.t('terms') }</Text>
                                </TouchableOpacity>

                                <Button onPress={() => this.props.navigation.navigate('activateAcc')} style={Styles.loginBtn}>
                                    <Text style={Styles.btnTxt}>{ i18n.t('registerButton') }</Text>
                                </Button>
                            </Form>
                        </View>
                    </KeyboardAvoidingView>
                </Content>
            </Container>

        );
    }
}

export default Register;