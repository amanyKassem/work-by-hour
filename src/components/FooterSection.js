import React, { Component } from 'react';
import { View } from 'react-native';
import {Footer, FooterTab, Button, Icon,} from 'native-base';
import Styles from '../../assets/styles'


export default class FooterSection extends Component {
    constructor(props){
        super(props);
        console.log('route name', this.props.routeName);

        this.state={
            routeName:this.props.routeName,
        }
    }


    render() {
        return (
            <Footer style={Styles.footer}>
                <FooterTab style={Styles.footerTab} >
                    <Button  onPress={()=> this.props.navigation.navigate("home")} style={{}} >
                        <Icon name='home' type={"Entypo"} style={{ color:  this.state.routeName === 'home' ? "#FFCC00" : "#fff" , fontSize:23 , marginBottom:0}}/>
                    </Button>
                    <Button onPress={()=> this.props.navigation.navigate("orders")} style={{right:20}} >
                        <Icon name='ios-list-box' type={"Ionicons"} style={{ color:  this.state.routeName === 'orders' ? "#FFCC00" : "#fff" , fontSize:23, marginBottom:0}}/>
                    </Button>
                    <Button onPress={this.footer_toggleModal} style={{  borderWidth:2 , borderColor:this.state.routeName === 'addAd' ? "#FFCC00" : "transparent" , backgroundColor: this.state.routeName === 'addAd' ? "#FFCC00" : "#fff" , borderRadius: 50, bottom: 1, width: 50, height: 50 , position:'absolute', alignItems: 'center', justifyContent: 'center', right: '42.9%'}}>
                        <Icon type={'FontAwesome'} name={'plus'} style={{ fontSize: 20, color:this.state.routeName === 'addAd'  ? "#FFCC00" : "#00918B" , marginLeft:0 , marginRight:0 }} />
                    </Button>
                    <Button onPress={()=> this.props.navigation.navigate("profile")} style={{left:20}}>
                        <Icon name='user' type={"FontAwesome"} style={{ color:  this.state.routeName === 'profile' ? "#FFCC00" : "#fff" , fontSize:23 , marginBottom:0}}/>
                    </Button>
                    <Button onPress={()=> this.props.navigation.navigate("setting")}>
                        <Icon name='cog' type={"FontAwesome"} style={{ color:  this.state.routeName === 'setting'  ? "#FFCC00" : "#fff" , fontSize:23 , marginBottom:0}}/>
                    </Button>
                </FooterTab>

            </Footer>
        );
    }
}