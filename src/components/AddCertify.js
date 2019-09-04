import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, I18nManager, FlatList, ImageEditor, Dimensions, KeyboardAvoidingView, ImageStore } from "react-native";
import {Container, Content, Icon, Header, Item, Input, Button, Form, Label} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import {ImageBrowser, CameraBrowser} from 'expo-multiple-imagepicker';
import { Permissions } from "expo";
import {DoubleBounce} from "react-native-loader";
import axios from "axios";
import CONST from "../consts";
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";

const height = Dimensions.get('window').height;
let base64   = [];
class AddCertify extends Component {
    constructor(props){
        super(props);

        this.state={
            imageBrowserOpen: false,
            cameraBrowserOpen: false,
            photos: [{ file: null }],
            imageId: null,
            refreshed: false,
            base64: [],
            employerName:'',
            jobTitle:'',
            isSubmitted: false
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    async componentDidMount(){
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }
    _keyExtractor = (item, index) => item.id;

    selectImage(md5){
        this.setState({ imageId: md5, refreshed: !this.state.refreshed })
    }

    deleteImage(item){
        let index = this.state.photos.indexOf(item);
        console.log('this is item ....', index)

        let photos = this.state.photos;
        photos.splice(index, 1);
        console.log('this is photos ....', photos)
        this.setState({ photos, refreshed: !this.state.refreshed, imageId: null })
    }

    renderItems = (item, imageId) => {

        if (item.file === null){
            return(
                <View style={{  justifyContent: 'center', alignItems: 'center', margin: 2 }}>
                    <Button onPress={() => this.setState({imageBrowserOpen: true})} transparent style={{ borderRadius: 3, backgroundColor:'#00918B', width: 40, height: 40,  alignItems: 'center', justifyContent: 'center'}}>
                        <Icon type={'FontAwesome'} name={'plus'} style={{ fontSize: 17, color: '#fff', textAlign: 'center', width: 30 }} />
                    </Button>
                </View>
            );
        }

        return(
            <View style={{ margin: 2, flex: 1 }}>
                <TouchableOpacity onPress={() => this.deleteImage(item)} style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', position: 'absolute', zIndex: 999, height: imageId === item.md5 ? 100 : 0, width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 3 }}>
                    <Icon type={'FontAwesome'} name={'close'} style={{ fontSize: imageId === item.md5 ? 35 : 0, color: '#fff', textAlign: 'center', width: 30, opacity: 1 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 100 }} onPress={() => this.selectImage(item.md5)}>
                    <Image
                        style={{ height: 100, width: '100%', borderRadius: 3 }}
                        source={{uri: item.file}}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    imageBrowserCallback = (callback) => {
        callback.then((photos) => {
            let images =  this.state.photos;
            this.setState({
                imageBrowserOpen: false,
                photos: images.concat(photos)
            });

            const imgs = this.state.photos;
            for (var i =0; i < imgs.length; i++){
				if (imgs[i].file != null) {
					const imageURL = imgs[i].file;
					Image.getSize(imageURL, (width, height) => {
						var imageSize = {
							size: {
								width,
								height
							},
							offset: {
								x: 0,
								y: 0,
							},
						};

						ImageEditor.cropImage(imageURL, imageSize, (imageURI) => {
							console.log(imageURI);
							ImageStore.getBase64ForTag(imageURI, (base64Data) => {
								base64.push(base64Data);
								ImageStore.removeImageForTag(imageURI);
							}, (reason) => console.log(reason))
						}, (reason) => console.log(reason))
					}, (reason) => console.log(reason))
				}
            }
        }).catch((e) => console.log(e))
    };

    array_move(arr, old_index, new_index) {
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr;
    };

    onConfirm(){
		this.setState({ isSubmitted: true });
		axios.post(CONST.url + 'user/Certification', {
			nameCompany: this.state.employerName,
			nameWork: this.state.jobTitle,
			certificates: base64,
			user_id: this.props.user.user_id,
			lang: (this.props.lang).toUpperCase(),
		}).then(response => {
			this.setState({ isSubmitted: false });

			if (response.data.status == '1')
                this.props.navigation.navigate('certify')
		}).catch(e => console.warn(e));

	}

	renderSubmit(){
		if (this.state.employerName == '' || this.state.jobTitle == '' || base64.length == 0 ){
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
			<Button onPress={() => this.onConfirm()} style={[Styles.loginBtn , {marginBottom:40 }]}>
				<Text style={Styles.btnTxt}>{ i18n.t('confirm') }</Text>
			</Button>
		);
	}

	onFocus(){
        this.setState({ employerName: '', photos: [{ file: null }], jobTitle: '' })
    }
	render() {
        if (this.state.imageBrowserOpen) {
            return(<ImageBrowser base64={true} max={10} callback={this.imageBrowserCallback}/>);
        }else if (this.state.cameraBrowserOpen) {
            return(<CameraBrowser base64={true} max={10} callback={this.imageBrowserCallback}/>);
        }

        const oldIndex =  (this.state.photos).findIndex(x => x.file === null );
        const photos   = this.array_move(this.state.photos, oldIndex, (this.state.photos).length - 1);
        console.log('image arr ..', photos);

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
                <Content style={{padding:15}}>
                    <KeyboardAvoidingView behavior={'padding'} style={Styles.keyboardAvoid}>
                        <Form style={{width: '100%' , marginTop:15 , flex:1 }}>
                            <Text style={[Styles.labelItem , {top:0 , left:0 , marginBottom:10 , backgroundColor:'transparent',fontSize:17}]}>{ i18n.t('certifies') }</Text>
                            <FlatList
                                data={photos}
                                renderItem={({item}) => this.renderItems(item, this.state.imageId)}
                                numColumns={3}
                                keyExtractor={this._keyExtractor}
                                extraData={this.state.refreshed}
                            />

                            <View style={{borderWidth:1 , borderColor:'#e6e6e6' , marginVertical:15}}/>

                            <Text style={[Styles.labelItem , {top:0 , left:0 , marginBottom:10 , backgroundColor:'transparent',fontSize:17}]}>{ i18n.t('expertise') }</Text>

                            <View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
                                <Item stackedLabel style={Styles.item } bordered>
                                    <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('employerName') }</Label>
                                    <Input value={this.state.employerName} onChangeText={(employerName) => this.setState({employerName})} autoCapitalize='none' style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
                                </Item>
                            </View>

                            <View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
                                <Item stackedLabel style={Styles.item } bordered>
                                    <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('jobTitle') }</Label>
                                    <Input value={this.state.jobTitle} onChangeText={(jobTitle) => this.setState({jobTitle})} autoCapitalize='none' style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
                                </Item>
                            </View>

                        </Form>
                    </KeyboardAvoidingView>
                    { this.renderSubmit() }
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

export default connect(mapStateToProps, {})(AddCertify);