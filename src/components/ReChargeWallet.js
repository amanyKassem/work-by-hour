import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity , I18nManager , FlatList} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Label, Picker, Button, Form} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import Modal from "react-native-modal";
import { ImagePicker } from 'expo';

class ReChargeWallet extends Component {
    constructor(props){
        super(props);

        this.state={
            bankName:'',
            username:'',
            accNum:'',
            money:'',
            image: null,
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

            <Container style={{}}>
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/back.png')} style={Styles.headerMenu} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , left:-15 , textAlign:'center'}]}>المحفظة</Text>
                    </View>
                </Header>
                <Content style={{padding:15}}>
                    <View style={Styles.bankImg}>
                        <Image source={require('../../assets/images/walletCharge.png')} style={{width:100 , height:100}} resizeMode={'contain'} />
                        <View style={{flexDirection:'column' ,marginLeft:5 }}>
                            <Text  style={[ Styles.bankName ]}>مصرف الراجحي</Text>
                            <Text style={[ Styles.bankName ,{color:'#8B8E8D'}]}>Sa211sd25422SaA221</Text>
                            <Text style={[ Styles.bankName ,{color:'#8B8E8D'}]}>32645523563561</Text>
                        </View>
                    </View>
                    <View style={Styles.bankImg}>
                        <Image source={require('../../assets/images/walletCharge.png')} style={{width:100 , height:100}} resizeMode={'contain'} />
                        <View style={{flexDirection:'column' ,marginLeft:5 }}>
                            <Text  style={[ Styles.bankName ]}>مصرف الراجحي</Text>
                            <Text style={[ Styles.bankName ,{color:'#8B8E8D'}]}>Sa211sd25422SaA221</Text>
                            <Text style={[ Styles.bankName ,{color:'#8B8E8D'}]}>32645523563561</Text>
                        </View>
                    </View>
                    <View style={Styles.line}/>
                    <Text style={[ Styles.bankName ,{color:'#444444' , textAlign:'center'}]}>يمكنك شحن رصيدك عن طريق تزويدنا بمعلومات
                        حسابك البنكى</Text>
                    <Form style={{width: '100%' , marginTop:15}}>
                        <View style={[Styles.inputParent ,{ borderColor:  '#707070' , borderRadius:25 , height:40 , marginBottom:10}]}>
                            <Item stackedLabel style={Styles.item } bordered>
                                <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>اسم البنك المحول منه</Label>
                                <Input value={this.state.bankName} onChangeText={(bankName) => this.setState({bankName})} autoCapitalize='none' style={[Styles.itemInput , {top:-20}]}  />
                            </Item>
                        </View>
                        <View style={[Styles.inputParent ,{ borderColor:  '#707070' , borderRadius:25 , height:40, marginBottom:10}]}>
                            <Item stackedLabel style={Styles.item } bordered>
                                <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>اسم صاحب الحساب</Label>
                                <Input value={this.state.username} onChangeText={(username) => this.setState({username})} autoCapitalize='none' style={[Styles.itemInput , {top:-20}]}  />
                            </Item>
                        </View>
                        <View style={[Styles.inputParent ,{ borderColor:  '#707070' , borderRadius:25 , height:40, marginBottom:10}]}>
                            <Item stackedLabel style={Styles.item } bordered>
                                <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>رقم الحساب</Label>
                                <Input value={this.state.accNum} onChangeText={(accNum) => this.setState({accNum})}keyboardType={'number-pad'} style={[Styles.itemInput , {top:-20}]}  />
                            </Item>
                        </View>
                        <View style={[Styles.inputParent ,{ borderColor:  '#707070' , borderRadius:25 , height:40, marginBottom:10}]}>
                            <Item stackedLabel style={Styles.item } bordered>
                                <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>المبلغ المطلوب شحنه</Label>
                                <Input value={this.state.money} onChangeText={(money) => this.setState({money})}keyboardType={'number-pad'} style={[Styles.itemInput , {top:-20}]}  />
                            </Item>
                        </View>
                        <Label style={[Styles.labelItem , {top:0 , left:0 , marginBottom:10 , backgroundColor:'transparent'}]}>صورة إيصال التحويل</Label>

                        <View style={{marginVertical:5}}>

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
                                    <Image source={require('../../assets/images/addImg.png')} style={{width:100 , height:100}} resizeMode={'contain'} />
                                </TouchableOpacity>
                            }

                        </View>
                        <Button onPress={() => this.props.navigation.navigate('congrats')} style={[Styles.loginBtn , {marginBottom:40}]}>
                            <Text style={Styles.btnTxt}>{ i18n.t('confirm') }</Text>
                        </Button>
                    </Form>
                </Content>

            </Container>

        );
    }
}

export default ReChargeWallet;