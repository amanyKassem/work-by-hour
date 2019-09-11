import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, FlatList, Dimensions} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Button, Form} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import axios from "axios";
import CONST from "../consts";
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import {DoubleBounce} from "react-native-loader";

const height = Dimensions.get('window').height;
class Certify extends Component {
    constructor(props){
        super(props);

        this.state={
            certifications: [],
            loader: false
        }
    }

    componentWillMount() {
		this.setState({ loader: true });
		axios.post( CONST.url + 'user/getCertification', { user_id: this.props.user.user_id, lang: (this.props.lang).toUpperCase(), })
			.then(response => {
				this.setState({ certifications: response.data.data, loader: false });
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


	static navigationOptions = () => ({
        drawerLabel: () => null
    });

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
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , left:-15 , textAlign:'center'}]}>{ i18n.t('certify&exp') }</Text>
                    </View>
                </Header>
                <Content >
                    { this.renderLoader() }
                    <View style={{padding:15}}>
					<View style={{flexDirection:'row' , justifyContent:'space-between', alignItems:'center'}}>
						<Text style={{color:'#00918B',  fontSize:17, fontFamily: 'RegularFont' }}>{ i18n.t('certifies') }</Text>
						<TouchableOpacity onPress={() => this.props.navigation.navigate('addCertify')}>
							<Icon name='cog' type={"FontAwesome"} style={{ color: "#00918B", fontSize:23 }}/>
						</TouchableOpacity>
					</View>

                    {
                        this.state.certifications.map(( certificate, i ) => (
							<View key={i}>
								<View style={{flexDirection:'row' , flexWrap:'wrap' , justifyContent:'space-between', alignItems:'center' , marginTop:15}}>
                                    {
										certificate.certificates ?
										certificate.certificates.map(( img, j ) => {
										    console.log('img', img);
										    return (
												(
													<Image key={'img_' + j} source={{ uri: 'https://' + img }} style={{width:100 , height:100}} resizeMode={'contain'} />
												)
                                            )
                                        }) : (<View />)
                                    }
								</View>
								<View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginVertical:15}}/>
								<Text style={{color:'#00918B',  fontSize:17, fontFamily: 'RegularFont' , alignSelf: 'flex-start' }}>{ i18n.t('expertise') }</Text>
								<Text style={{color:'#5d5d5d',  fontSize:16, fontFamily: 'RegularFont' ,alignSelf: 'flex-start'  }}>{ certificate.nameWork }</Text>
								<Text style={{color:'#b8b5b5',  fontSize:12, fontFamily: 'RegularFont', lineHeight:14 ,alignSelf: 'flex-start' }}>({ certificate.nameCompany })</Text>
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

export default connect(mapStateToProps, {})(Certify);