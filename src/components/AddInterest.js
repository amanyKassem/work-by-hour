import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, FlatList, Dimensions, I18nManager} from "react-native";
import {Container, Content, Header, Item, Input, Label, Form, Button, Picker, Icon} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import axios from "axios";
import CONST from "../consts";
import {DoubleBounce} from "react-native-loader";
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";

const height = Dimensions.get('window').height;
class AddInterest extends Component {
    constructor(props){
        super(props);

        this.state={
            interestName:'',
            interests:[],
            isRefreshed:false,
			isSubmitted: false,
			loader: false,
			categories: [],
			selectedCategory: null
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <View style={Styles.interestParent} >
                <Text style={[Styles.confirmText , {fontSize:13}]}>{item}</Text>
            </View>
        );
    };

    componentWillMount() {
		this.setState({ loader: true });
		axios.post( CONST.url + 'department/allDepartment', { lang : (this.props.lang).toUpperCase()})
			.then(response => {
				this.setState({ categories: response.data.data, loader: false });
			});
	}

	addInterest(){
        this.setState({isRefreshed : !this.state.isRefreshed})
        let interests = this.state.interests;
        interests.push(this.state.interestName)
        this.setState({interests , interestName:'' })

    }

	onConfirm(){
		this.setState({ isSubmitted: true });
		axios.post(CONST.url + 'user/importants', {
			important: this.state.interests,
			user_id: this.props.user.user_id,
			department_id: this.state.selectedCategory,
			lang: (this.props.lang).toUpperCase(),
		}).then(response => {
			this.setState({ isSubmitted: false });

			if (response.data.status == '1')
				this.props.navigation.navigate('interests')
		}).catch(e => console.warn(e));

	}

	renderSubmit(){
		if (this.state.interests.length == 0 || this.state.selectedCategory == null ){
			return(
				<Button disabled style={[Styles.loginBtn , {marginBottom:40, backgroundColor: '#999' }]}>
					<Text style={Styles.btnTxt}>{ i18n.t('confirm') }</Text>
				</Button>
			)
		}

		if (this.state.isSubmitted){
			return (
				<View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
					<DoubleBounce size={20} color="#00918B" />
				</View>
			);
		}

		return (
			<Button onPress={() => this.onConfirm()} style={[Styles.loginBtn , {marginBottom:40 , width:'90%'}]}>
				<Text style={Styles.btnTxt}>{ i18n.t('confirm') }</Text>
			</Button>
		);
	}

	onFocus(){
		this.setState({ employerName: '', photos: [{ file: null }], jobTitle: '' })
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

    render() {
        return (
            <Container style={{}}>
				<NavigationEvents onWillFocus={() => this.onFocus()} />
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/back.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , textAlign:'center'}]}>{ i18n.t('interests') }</Text>
                    </View>
                </Header>

				{ this.renderLoader() }
                <Content >
                    <Form style={{width: '100%' , marginTop:15 ,padding:15}}>
                        <Text style={[Styles.labelItem , {top:0 , left:0 , marginBottom:10 , backgroundColor:'transparent',fontSize:17}]}>{ i18n.t('interests') }</Text>
						<View>
							<Item style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]} regular >
								<Label style={[Styles.labelItem , {top:-35 , left:5 , position:'absolute'}]}>{ i18n.t('section') }</Label>
								<Picker
									mode="dropdown"
									style={Styles.picker}
									placeholder={i18n.t('section')}
									placeholderStyle={{ color: "#acabae", writingDirection: I18nManager.isRTL ?'rtl' : 'ltr', }}
									placeholderIconColor="#acabae"
									selectedValue={this.state.selectedCategory}
									onValueChange={(value) => this.setState({ selectedCategory: value })}
								>
									{
										this.state.categories.map((category, i) => (
											<Picker.Item label={category.departmentName} value={category.departement_id} key={i} />
										))
									}
								</Picker>
								<Icon name='angle-down' type={"FontAwesome"} style={Styles.pickerImg} style={{ color: "#878787", fontSize:23 , right: 0}}/>
							</Item>
						</View>
						<View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:10}]}>
                            <Item stackedLabel style={Styles.item } bordered>
                                <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('interestName') }</Label>
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
                        { this.renderSubmit() }
                    </Form>
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

export default connect(mapStateToProps, {})(AddInterest);