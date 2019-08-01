import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity , I18nManager , FlatList} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Button, Form} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'

class Interests extends Component {
    constructor(props){
        super(props);

        this.state={
            interests:['css', 'html' ,'js' , 'jquery']
        }
    }
    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <View style={Styles.interestParent} >
                <Text style={[Styles.confirmText , {fontSize:13}]}>{item}</Text>
            </View>
        );
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
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , left:-15 , textAlign:'center'}]}>{ i18n.t('interests') }</Text>
                    </View>
                </Header>
                <Content style={{padding:15}}>
                    <View style={{flexDirection:'row' , justifyContent:'space-between', alignItems:'center' , marginBottom:15}}>
                        <Text style={{color:'#00918B',  fontSize:17, fontFamily: 'RegularFont' }}>{ i18n.t('interests') }</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('addInterest')}>
                            <Icon name='cog' type={"FontAwesome"} style={{ color: "#00918B", fontSize:23 }}/>
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.flatContainer}>
                        <FlatList
                            data={this.state.interests}
                            renderItem={({item}) => this.renderItems(item)}
                            numColumns={3}
                            keyExtractor={this._keyExtractor}
                        />
                    </View>
                </Content>
            </Container>

        );
    }
}

export default Interests;