import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, FlatList, Dimensions} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Button, Form, Toast} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import StarRating from 'react-native-star-rating';
import {DoubleBounce} from "react-native-loader";
import axios from "axios";
import CONST from "../consts";
import {connect} from "react-redux";

const height = Dimensions.get('window').height;
class Rate extends Component {
    constructor(props){
        super(props);

        this.state={
            starCount: 0,
            userData: [],
			isSubmitted: false,
            loader: false
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    onStarRatingPress(rating) {
        this.setState({ starCount: rating });
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

	onConfirmRate(){
		const user_id = this.props.navigation.state.params.id;
		this.setState({ isSubmitted: true });

		axios.post( CONST.url + 'user/Rating', {
			lang: (this.props.lang).toUpperCase(),
			rating: this.state.starCount,
			user_id,
		}).then( response => {
			Toast.show({
				text: response.data.message,
				type: response.data.status == 1 ? "success" : "danger",
				duration: 3000
			});

			this.setState({ starCount: response.data.data.rating, isSubmitted: false });
		})
    }

	renderSubmit(){
		if (this.state.isSubmitted){
			return (
				<View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
					<DoubleBounce size={20} color="#00918B" />
				</View>
			);
		}

		return (
			<Button onPress={() => this.onConfirmRate()} style={[Styles.loginBtn , {marginBottom:40 , width:'90%'}]}>
				<Text style={Styles.btnTxt}>{ i18n.t('confirm') }</Text>
			</Button>
		);
	}

	componentWillMount() {
        const user_id = this.props.navigation.state.params.id;
		this.setState({ loader: true });
		axios.post( CONST.url + 'user/userProfile', { lang : (this.props.lang).toUpperCase(), user_id })
			.then(response => {
				this.setState({ userData: response.data.data, starCount: response.data.data.rating, loader: false });
			});

		console.log('user_id', this.props.user.user_id);
	}

    render() {
        return (
            <Container style={{}}>
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/back.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , textAlign:'center'}]}>{ i18n.t('rate') }</Text>
                    </View>
                </Header>
                <Content >
                    { this.renderLoader() }
                    <View style={{padding:15}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate("profile")} style={{flex:1 , alignItems: 'center' , marginBottom:5, paddingTop:20}}>
                        <Image source={{ uri: 'https://' + this.state.userData.imageProfile }} resizeMode={'cover'} style={{ width: 90, height: 90 , borderRadius:50 }}/>
                        <Text style={{color:'#00918B',  fontSize:17, fontFamily: 'RegularFont'}}>{ this.state.userData.userName }</Text>
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
					</View>
                </Content>
                { this.renderSubmit() }
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

export default connect(mapStateToProps, {})(Rate);