import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, FlatList, Dimensions} from "react-native";
import { Container, Content, Icon, Header  ,Item , Input } from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import axios from "axios";
import CONST from "../consts";
import {connect} from "react-redux";
import {DoubleBounce} from "react-native-loader";

const height = Dimensions.get('window').height;
class Notifications extends Component {
    constructor(props){
        super(props);

        this.state={
			loader: false,
            notifications: []
        }
    }


	componentWillMount() {
		this.setState({ loader: true });
		axios.post( CONST.url + 'user/getNotification', { lang : (this.props.lang).toUpperCase(), user_id: this.props.user.user_id })
			.then(response => {
				this.setState({ notifications: response.data.data, loader: false });
			});

		console.log('user_id', this.props.user.user_id);
	}

	static navigationOptions = () => ({
        drawerLabel: () => null
    });

	renderLoader(){
		if (this.state.loader){
			return(
				<View style={{ alignItems: 'center', justifyContent: 'center', height : height - 200, alignSelf:'center' , backgroundColor:'#fff' , width:'100%'  , position:'absolute' , zIndex:1 }}>
					<DoubleBounce size={20} color="#00918B" />
				</View>
			);
		}
	}

    render() {
        return (

            <Container style={{}}>
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/back.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , left:-15 , textAlign:'center'}]}>{ i18n.t('notifications') }</Text>
                    </View>
                </Header>
                <Content style={{padding:15}}>
                    { this.renderLoader() }
                    {
                        this.state.notifications.map(( notify, i ) => (
							<TouchableOpacity key={i} onPress={() => this.props.navigation.navigate(notify.isRating == 1 ? 'rate' : '' , { id: notify.rateUser_id })} style={Styles.noti}>
								<View style={Styles.notiBall}/>
								<Text style={Styles.notiText}>{ notify.notification }</Text>
							</TouchableOpacity>
                        ))
                    }
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

export default connect(mapStateToProps, {})(Notifications);