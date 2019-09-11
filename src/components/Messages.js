import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Platform, FlatList, Dimensions} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Button, Form} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import {DoubleBounce} from "react-native-loader";
import {connect} from "react-redux";
import axios from "axios";
import CONST from "../consts";
import {NavigationEvents} from "react-navigation";

const height = Dimensions.get('window').height;
class Messages extends Component {
    constructor(props){
        super(props);

        this.state={
            rooms: [],
			loader: false
        }
    }

    static navigationOptions = () => ({
        drawerLabel: i18n.t('messages') ,
        drawerIcon: (<Image source={require('../../assets/images/msg.png')} style={{ height: 20, width: 20 , top:3 }} resizeMode={'contain'} /> )
    });

	componentWillMount() {
		this.setState({ loader: true });
		axios.post( CONST.url + 'user/allRooms', { lang : (this.props.lang).toUpperCase(), user_id: this.props.user.user_id })
			.then(response => {
				this.setState({ rooms: response.data.data, loader: false });
			});
	}

    renderLoader(){
        if (this.state.loader){
            return(
                <View style={{ alignItems: 'center', justifyContent: 'center', height, alignSelf:'center' , backgroundColor:'#fff' , width:'100%'  , position:'absolute' , zIndex:1 }}>
                    <DoubleBounce size={20} color="#00918B" />
                </View>
            );
        }
    }

	onFocus(){
		this.componentWillMount()
	}

    render() {
        return (
            <Container style={{}}>
				<NavigationEvents onWillFocus={() => this.onFocus()} />
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/back.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , left:-15 , textAlign:'center'}]}>{ i18n.t('messages') }</Text>
                    </View>
                </Header>
				{ this.renderLoader() }
                <Content >
                    <View style={{padding:15}}>
                    {
                        this.state.rooms.map((room, i) => (
                            <View key={i}>
								<TouchableOpacity onPress={() => this.props.navigation.navigate('chat', { roomId: room.room_id, username: room.userName })} style={{flexDirection:'row' , alignItems:'center'}}>
									<Image source={{ uri: 'https://' + room.image }} resizeMode={'cover'} style={{ width: 60, height: 60 , borderRadius:Platform.OS === 'ios' ?35 :50 , marginRight:10}}/>
									<View style={{flex:1}}>
										<View style={{flexDirection:'row' , justifyContent:'space-between'}}>
											<Text style={{color:'#00918B',  fontSize:17, fontFamily: 'RegularFont' }}>{ room.userName }</Text>
											<Text style={{color:'#00918B',  fontSize:12, fontFamily: 'RegularFont' }}>{ room.time }</Text>
										</View>
										<Text style={{color:'#878787',  fontSize:13, fontFamily: 'RegularFont',alignSelf: 'flex-start'}}>{ room.message }</Text>
									</View>
								</TouchableOpacity>
								<View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginVertical:15}}/>
                            </View>
                        ))
                    }
                    </View>
                </Content>
            </Container>
        );
    }
}


const mapStateToProps = ({ lang, profile  }) => {
	return {
		lang: lang.lang,
		user: profile.user,
	};
};

export default connect(mapStateToProps, {})(Messages);