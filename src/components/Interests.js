import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, FlatList, Dimensions} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Button, Form} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import axios from "axios";
import CONST from "../consts";
import {connect} from "react-redux";
import {DoubleBounce} from "react-native-loader";
import {NavigationEvents} from "react-navigation";

const height = Dimensions.get('window').height;
class Interests extends Component {
    constructor(props){
        super(props);

        this.state={
            interests:[],
			loader: false
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

	componentWillMount() {
		this.setState({ loader: true });
		axios.post( CONST.url + 'user/getImportants', { user_id: this.props.user.user_id, lang: (this.props.lang).toUpperCase(), })
			.then(response => {
				this.setState({ interests: response.data.data, loader: false });
			});
	}

	renderLoader(){
		if (this.state.loader){
			return(
				<View style={{ alignItems: 'center', justifyContent: 'center', height : height - 200, alignSelf:'center' , backgroundColor:'#fff' , width:'100%'  , position:'absolute' , zIndex:1 }}>
					<DoubleBounce size={20} color="#00918B" />
				</View>
			);
		}
	}

	onFocus(){
		this.componentWillMount()
	}

	static navigationOptions = () => ({
        drawerLabel: () => null
    });

    render() {
        return (
            <Container style={{}}>
				<NavigationEvents onWillFocus={() => this.onFocus()} />
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/back.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , left:-15 , textAlign:'center'}]}>{ i18n.t('interests') }</Text>
                    </View>
                </Header>
                <Content style={{padding:15}}>
                    { this.renderLoader() }
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


const mapStateToProps = ({ lang, profile  }) => {
	return {
		lang: lang.lang,
		user: profile.user,
	};
};

export default connect(mapStateToProps, {})(Interests);