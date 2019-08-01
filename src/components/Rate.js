import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity , I18nManager , FlatList} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Button, Form} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import StarRating from 'react-native-star-rating';

class Rate extends Component {
    constructor(props){
        super(props);

        this.state={
            starCount:3
        }
    }


    static navigationOptions = () => ({
        drawerLabel: () => null
    });
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }
    render() {
        return (

            <Container style={{}}>
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/back.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , left:-15 , textAlign:'center'}]}>{ i18n.t('rate') }</Text>
                    </View>
                </Header>
                <Content style={{padding:15}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate("profile")} style={{flex:1 , alignItems: 'center' , marginBottom:5, paddingTop:20}}>
                        <Image source={require('../../assets/images/profile_pic.png')} resizeMode={'cover'} style={{ width: 90, height: 90 , borderRadius:50 }}/>
                        <Text style={{color:'#00918B',  fontSize:17, fontFamily: 'RegularFont'}}>اماني قاسم</Text>
                    </TouchableOpacity>
                    <View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginTop:5 , marginBottom:15}}/>
                    <Text style={[Styles.confirmText , {color:'#00918B',  fontSize:15}]}>{ i18n.t('urRate') }</Text>
                   <View style={{width:'40%' , alignSelf:'center' , marginTop:20}}>
                       <StarRating
                           disabled={false}
                           maxStars={5}
                           rating={this.state.starCount}
                           fullStarColor={'#ffcd00'}
                           selectedStar={(rating) => this.onStarRatingPress(rating)}
                           starSize={20}
                           starStyle={{color: '#ffcd00', marginHorizontal: 1}}
                       />
                   </View>
                </Content>
                <Button onPress={() => this.props.navigation.navigate('drawerNavigator')} style={[Styles.loginBtn , {marginBottom:40 , width:'90%'}]}>
                    <Text style={Styles.btnTxt}>{ i18n.t('confirm') }</Text>
                </Button>
            </Container>

        );
    }
}

export default Rate;