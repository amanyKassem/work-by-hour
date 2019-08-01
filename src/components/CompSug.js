import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, FlatList, KeyboardAvoidingView} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Button, Form, Label, Textarea} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'

class CompSug extends Component {
    constructor(props){
        super(props);

        this.state={
            address:'',
            msg:'',
        }
    }


    static navigationOptions = () => ({
        drawerLabel: i18n.t('CompSug') ,
        drawerIcon: (<Image source={require('../../assets/images/pros-and-cons.png')} style={{ height: 20, width: 20 , top:3 }} resizeMode={'contain'} /> )
    })

    render() {
        return (

            <Container style={{}}>
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/back.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , left:-15 , textAlign:'center'}]}>{ i18n.t('CompSug') }</Text>
                    </View>
                </Header>
                <Content style={{padding:15}}>
                    <KeyboardAvoidingView behavior={'padding'} style={Styles.keyboardAvoid}>
                        <Form style={{width: '100%' }}>
                            <View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
                                <Item stackedLabel style={Styles.item } bordered>
                                    <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('address') }</Label>
                                    <Input value={this.state.address} onChangeText={(address) => this.setState({address})} autoCapitalize='none' style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
                                </Item>
                            </View>
                            <View >
                                <Item stackedLabel style={Styles.item } bordered>
                                    <Label style={[Styles.labelItem , {top:5 , left:-10 , backgroundColor:'transparent'}]}>{ i18n.t('msgContent') }</Label>
                                </Item>
                                <Textarea value={this.state.msg} onChangeText={(msg) => this.setState({msg})} autoCapitalize='none' style={[Styles.inputParent ,{ color: '#035F5B',borderColor:  '#eee', textAlign: I18nManager.isRTL ?'right' : 'left' , paddingVertical:10 , paddingHorizontal: 35 , backgroundColor:'#F6F6F6' , borderRadius:25 , height:350 , marginBottom:20}]}  />
                            </View>
                        </Form>
                    </KeyboardAvoidingView>
                </Content>
                <Button onPress={() => this.props.navigation.navigate('home')} style={[Styles.loginBtn , {width:'90%' , marginBottom:40 }]}>
                    <Text style={Styles.btnTxt}>{ i18n.t('sendButton') }</Text>
                </Button>
            </Container>

        );
    }
}

export default CompSug;