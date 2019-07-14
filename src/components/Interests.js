import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity , I18nManager , FlatList} from "react-native";
import {Container, Content, Header, Item, Input, Label, Form} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'

class Interests extends Component {
    constructor(props){
        super(props);

        this.state={
            interestName:'',
            interests:['oooo', 'kkkk'],
            isRefreshed:false
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        console.log('ooooooooo', item);
        return(
            <View style={Styles.interestParent} >
                <Text style={[Styles.confirmText , {fontSize:13}]}>{item}</Text>
            </View>
        );
    }
    addInterest(){
        this.setState({isRefreshed : !this.state.isRefreshed})
        let interests = this.state.interests;
        interests.push(this.state.interestName)
        this.setState({interests , interestName:'' })

    }

    render() {
        return (

            <Container style={{}}>
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/back.png')} style={Styles.headerMenu} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , left:-15 , textAlign:'center'}]}>الاهتمامات</Text>
                    </View>
                </Header>
                <Content style={{padding:15}}>
                    <Form style={{width: '100%' , marginTop:15}}>
                        <Text style={[Styles.labelItem , {top:0 , left:0 , marginBottom:10 , backgroundColor:'transparent',fontSize:17}]}>الاهتمامات</Text>
                        <View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:10}]}>
                            <Item stackedLabel style={Styles.item } bordered>
                                <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>اسم الاهتمام</Label>
                                <Input value={this.state.interestName} onChangeText={(interestName) => this.setState({interestName})} autoCapitalize='none' style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
                            </Item>
                            <TouchableOpacity onPress={() => this.addInterest()} style={Styles.inputImg}>
                                <Image source={require('../../assets/images/plus.png')} style={{width:'100%' , height:'100%'}}  resizeMode={'contain'}/>
                            </TouchableOpacity>

                        </View>
                        <View style={Styles.flatContainer}>
                            <FlatList
                                data={this.state.interests}
                                renderItem={({item}) => this.renderItems(item)}
                                numColumns={3}
                                keyExtractor={this._keyExtractor}
                                extraData={this.state.isRefreshed}
                            />
                        </View>
                    </Form>
                </Content>
            </Container>

        );
    }
}

export default Interests;