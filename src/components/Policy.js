import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, WebView, Dimensions} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Button, Form} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import axios from "axios";
import CONST from "../consts";
import {connect} from "react-redux";

const height = Dimensions.get('window').height;
class Policy extends Component {
    constructor(props){
        super(props);

        this.state={
			loader: false,
            terms: '',
            routeName:this.props.routeName,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: i18n.t('terms') ,
        drawerIcon: (<Image source={require('../../assets/images/policy.png')} style={{ height: 20, width: 20 , top:3 }} resizeMode={'contain'} /> )
    });

	componentWillMount() {
		this.setState({ loader: true });
		axios.post( CONST.url + 'user/condition', { lang : (this.props.lang).toUpperCase() })
			.then(response => {
				this.setState({ terms: response.data.data.conditionControll, loader: false });
			});
	}

    render() {
        return (

            <Container style={{}}>
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.state.routeName === 'register' ?this.props.navigation.navigate('register') : this.props.navigation.goBack()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/back.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , left:-15 , textAlign:'center'}]}>{ i18n.t('terms') }</Text>
                    </View>
                </Header>
                <Content >
                    <View style={{padding:15}}>
                    <WebView source={{ html: this.state.terms }} style={{ width: '100%', height , justifyContent:'flex-start' }} />
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

export default connect(mapStateToProps, {})(Policy);