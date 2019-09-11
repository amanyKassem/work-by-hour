import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    I18nManager,
    FlatList,
    KeyboardAvoidingView,
    Dimensions,
    ImageEditor,
    ImageStore, Platform
} from "react-native";
import {Container, Content, Icon, Header, Item, Input, Button, Form, Label, Picker , Textarea} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
import DateTimePicker from "react-native-modal-datetime-picker";
import { MapView, Location, Permissions } from 'expo';
import axios from 'axios';
import {ImageBrowser,CameraBrowser} from 'expo-multiple-imagepicker';
import {DoubleBounce} from "react-native-loader";
import {connect} from "react-redux";

import Modal from "react-native-modal";
import CONST from "../consts";

const height = Dimensions.get('window').height;
const base64 = [];
class AddAd extends Component {
    constructor(props){
        super(props);

        this.state={
            jobName:'',
            selectedType:1,
            selectedSection:null,
            selectedCountry:null,
            jobDet:'',
            date: '',
            time: '',
            hoursNo: null,
            pricePerHour: null,
            finalFee: null,
            isDatePickerVisible: false,
            isTimePickerVisible: false,
            location: '',
            activity: '',
            isModalVisible: false,
            city: '',
            mapRegion: null,
            hasLocationPermissions: false,
            initMap: true,
            imageBrowserOpen: false,
            cameraBrowserOpen: false,
            photos: [{ file: null }],
            imageId: null,
            refreshed: false,
            base64: [],
            modalAddAd: false,
			categories: [],
			countries: [],
			loader: false,
            isSubmitted: false,
			percentItem: null
        }
    }


    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    _toggleModalAd = () => this.setState({ modalAddAd: !this.state.modalAddAd });

    onConfirm() {
    	this.addAd();
        this.setState({ modalAddAd: !this.state.modalAddAd });
        this.props.navigation.navigate('addAdCongrats');
    };

    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
    };

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false });
    };

    handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        let formatted_date = date.getFullYear() + "-" + ("0"+(date.getMonth() + 1)).slice(-2) + "-" + ("0" +date.getDate()).slice(-2);
        this.setState({ date : formatted_date });

        this.hideDatePicker();
    };
    showTimePicker = () => {
        this.setState({ isTimePickerVisible: true });
    };

    hideTimePicker = () => {
        this.setState({ isTimePickerVisible: false });
    };

    handleTimePicked = time => {
        console.log("A time has been picked: ", time);
        let formatedTime = time.getHours() + ":" + time.getMinutes()
        this.setState({ time : formatedTime })
        this.hideTimePicker();
    };



    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });


    async componentWillMount() {

		this.setState({ loader: true });
		axios.post( CONST.url + 'department/allDepartment', { lang : (this.props.lang).toUpperCase()})
			.then(response => {
				this.setState({ categories: response.data.data, loader: false });
			});

		axios.post( CONST.url + 'country/allCountry', { lang : (this.props.lang).toUpperCase() })
			.then(response => {
				this.setState({ countries: response.data.data, loader: false });
			});

		axios.post( CONST.url + 'user/percent', { lang : (this.props.lang).toUpperCase() })
			.then(response => {
				this.setState({ percentItem: response.data.data.percentItem, loader: false });
			});


        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('صلاحيات تحديد موقعك الحالي ملغاه');
        }else {
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
            const userLocation = { latitude, longitude };
            this.setState({  initMap: false, mapRegion: userLocation });

        }

        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity += this.state.mapRegion.latitude + ',' + this.state.mapRegion.longitude;
        getCity += '&key=AIzaSyDYjCVA8YFhqN2pGiW4I8BCwhlxThs1Lc0&language=ar&sensor=true';

        console.log(getCity);

        try {
            const { data } = await axios.get(getCity);
            this.setState({ city: data.results[0].formatted_address });

        } catch (e) {
            console.log(e);
        }
    }



    async componentDidMount(){
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
        const userLocation = { latitude, longitude };
        this.setState({  initMap: false, mapRegion: userLocation });
    }


    _handleMapRegionChange  = async (mapRegion) =>  {
        console.log(mapRegion);
        this.setState({ mapRegion });

        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity += mapRegion.latitude + ',' + mapRegion.longitude;
        getCity += '&key=AIzaSyDYjCVA8YFhqN2pGiW4I8BCwhlxThs1Lc0&language=ar&sensor=true';

        console.log('locations data', getCity);


        try {
            const { data } = await axios.get(getCity);
            console.log(data);
            this.setState({ city: data.results[0].formatted_address });

        } catch (e) {
            console.log(e);
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                locationResult: 'Permission to access location was denied',
            });
        } else {
            this.setState({ hasLocationPermissions: true });
        }

        let location = await Location.getCurrentPositionAsync({});

        // Center the map on the location we just fetched.
        this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
    };



    confirmLocation(){
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }

    _keyExtractor = (item, index) => item.id;

    selectImage(md5){
        this.setState({ imageId: md5, refreshed: !this.state.refreshed })
    }

    deleteImage(item){
        let index = this.state.photos.indexOf(item);
        console.log('this is item ....', index);

        let photos = this.state.photos;
        photos.splice(index, 1);
        console.log('this is photos ....', photos);
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
             console.log('imgs', imgs);
            for (var i =0; i < imgs.length; i++){
                if (imgs[i].file != null){
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
							console.log('imageURI', imageURI);
							ImageStore.getBase64ForTag(imageURI, (base64Data) => {
								base64.push(base64Data);
								ImageStore.removeImageForTag(imageURI);
							}, (reason) => console.log(reason) )
						}, (reason) => console.log(reason) )
					}, (reason) => console.log(reason))
                }
            }
        }).catch((e) => console.log(e))
    };

    array_move(arr, old_index, new_index) {
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing
    };

    addAd(){
        this.setState({ isSubmitted: true });
        axios.post(CONST.url + 'advertise/addAdvertiseApp', {
			workName: this.state.jobName,
			department_id: this.state.selectedSection,
			user_id: this.props.user.user_id,
			country_id: this.state.selectedCountry,
			details: this.state.jobDet,
			lat: this.state.mapRegion.latitude,
			long: this.state.mapRegion.longitude,
			time_Started: this.state.date,
			timeOFWork: this.state.time,
			NumberOfHour: this.state.hoursNo,
			PriceOfHour: this.state.pricePerHour,
			finalPrice: this.state.finalFee,
			workStyle: this.state.activity,
			keyImage: 0,
			Attachments: base64,
			lang: (this.props.lang).toUpperCase(),
			typeWork: this.state.selectedType === 1 ? 'with' : 'withNot',
        }).then(response => {
        	// alert(JSON.stringify(response.data))
		}).catch(e => console.warn(e));
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

	renderSubmit(){
    	console.log('name :', this.state.jobName , 'desc :', this.state.jobDet, 'date :', this.state.date, 'time :', this.state.time, 'country :', this.state.selectedCountry , 'cat :', this.state.selectedSection, 'cost :', ( (( this.state.selectedType == 1 && this.state.hoursNo == null ) || ( this.state.selectedType == 1  && this.state.pricePerHour == null )) || (this.state.selectedType == 2 && this.state.finalFee == null) ));
		if (this.state.jobName == '' || this.state.jobDet == '' || this.state.date == '' || this.state.time == ''
			|| this.state.selectedSection == null || this.state.selectedCountry == null ||
			( (( this.state.selectedType == 1 && this.state.hoursNo == null ) || ( this.state.selectedType == 1  && this.state.pricePerHour == null )) || (this.state.selectedType == 2 && this.state.finalFee == null) )
		){
			console.log('not valid');
			return(
				<Button disabled style={[Styles.loginBtn , {marginBottom:40, backgroundColor: '#999' }]}>
					<Text style={Styles.btnTxt}>{ i18n.t('add') }</Text>
				</Button>
			)
		}

		return (
			<Button onPress={this._toggleModalAd} style={[Styles.loginBtn , {marginBottom:40 }]}>
				<Text style={Styles.btnTxt}>{ i18n.t('add') }</Text>
			</Button>
		);
	}

    render() {

        if (this.state.imageBrowserOpen) {
            return(<ImageBrowser base64={true} max={10} callback={this.imageBrowserCallback}/>);
        }else if (this.state.cameraBrowserOpen) {
            return(<CameraBrowser base64={true} max={10} callback={this.imageBrowserCallback}/>);
        }

        const oldIndex =  (this.state.photos).findIndex(x => x.file === null );
        const photos = this.array_move(this.state.photos, oldIndex, (this.state.photos).length - 1);

        return (
            <Container style={{}}>
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/back.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , left:-15 , textAlign:'center'}]}>{ i18n.t('addAd') }</Text>
                    </View>
                </Header>
                <Content >
					{ this.renderLoader() }
					<View style={{padding:15}}>
                    <KeyboardAvoidingView behavior={'absolute'} style={Styles.keyboardAvoid}>
                    <Form style={{width: '100%' }}>
                        <View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
                            <Item stackedLabel style={Styles.item } bordered>
                                <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('jobName') }</Label>
                                <Input value={this.state.jobName} onChangeText={(jobName) => this.setState({jobName})} autoCapitalize='none' style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
                            </Item>
                        </View>
                        <View>
                            <Item style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]} regular >
                                <Label style={[Styles.labelItem , {top:-35 , left:5 , position:'absolute'}]}>{ i18n.t('section') }</Label>
                                <Picker
                                    mode="dropdown"
                                    style={Styles.picker}
                                    placeholder={i18n.t('section')}
                                    placeholderStyle={{ color: "#acabae" }}
                                    placeholderIconColor="#acabae"
                                    selectedValue={this.state.selectedSection}
                                    onValueChange={(value) => this.setState({ selectedSection: value })}
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
                        <View >
                            <Item stackedLabel style={Styles.item } bordered>
                            <Label style={[Styles.labelItem , {top:5 , left:-5 , backgroundColor:'transparent'}]}>{ i18n.t('jobDet') }</Label>
                            </Item>
                            <Textarea value={this.state.jobDet} onChangeText={(jobDet) => this.setState({jobDet})} autoCapitalize='none' style={[Styles.inputParent ,{ color: '#035F5B',borderColor:  '#eee', textAlign: I18nManager.isRTL ?'right' : 'left' , paddingVertical:10 , paddingHorizontal: 35 , backgroundColor:'#F6F6F6' , borderRadius:25 , height:150 , marginBottom:20}]}  />
                        </View>
						<View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
							<Item stackedLabel style={Styles.item } bordered>
								<Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('activity') }</Label>
								<Input value={this.state.activity} onChangeText={(activity) => this.setState({activity})} autoCapitalize='none' style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
							</Item>
						</View>
                        <View>
                            <Item style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]} regular >
                                <Label style={[Styles.labelItem , {top:-35 , left:0 , position:'absolute'}]}>{ i18n.t('workType') }</Label>
                                <Picker
                                    mode="dropdown"
                                    style={Styles.picker}
                                    placeholder={i18n.t('workType')}
                                    placeholderStyle={{ color: "#acabae" }}
                                    placeholderIconColor="#acabae"
                                    selectedValue={this.state.selectedType}
                                    onValueChange={(value) => this.setState({ selectedType: value })}
                                >
                                    <Picker.Item label={ i18n.t('perHour') } value={1} />
                                    <Picker.Item label={ i18n.t('noHour') } value={2} />
                                </Picker>
                                <Icon name='angle-down' type={"FontAwesome"} style={Styles.pickerImg} style={{ color: "#878787", fontSize:23 , right: 0}}/>
                            </Item>
                        </View>

                        {
                            this.state.selectedType === 1 ? (
                                <View>
                                    <View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
                                        <Item stackedLabel style={Styles.item } bordered>
                                            <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('hoursNo') }</Label>
                                            <Input value={this.state.hoursNo} onChangeText={(hoursNo) => this.setState({hoursNo})} autoCapitalize='none' style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
                                        </Item>
                                    </View>
                                    <View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
                                        <Item stackedLabel style={Styles.item } bordered>
                                            <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('pricePerHour') }</Label>
                                            <Input value={this.state.pricePerHour} onChangeText={(pricePerHour) => this.setState({pricePerHour})} autoCapitalize='none' style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
                                        </Item>
                                    </View>
                                </View>
                            )    : (
                                <View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
                                    <Item stackedLabel style={Styles.item } bordered>
                                        <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('finalFee') }</Label>
                                        <Input value={this.state.finalFee} onChangeText={(finalFee) => this.setState({finalFee})} autoCapitalize='none' style={[Styles.itemInput , {top:-20 , paddingRight:15}]}  />
                                    </Item>
                                </View>
                            )
                        }

                        <View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
                            <TouchableOpacity  style={[Styles.item , {top:0}]} onPress={this.showDatePicker} bordered>
                                <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('date') }</Label>
                                <Text style={[ Styles.itemText]} > {this.state.date.toString()} </Text>
                            </TouchableOpacity>
                            <Image source={require('../../assets/images/calendar.png')}  style={Styles.itemImage} resizeMode={'contain'}/>
                            <DateTimePicker
                                isVisible={this.state.isDatePickerVisible}
                                onConfirm={this.handleDatePicked}
                                onCancel={this.hideDatePicker}
                                mode={'date'}
                            />
                        </View>

                        <View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
                            <TouchableOpacity  style={[Styles.item , {top:0}]} bordered onPress={this.showTimePicker}>
                                <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('time') }</Label>
                                <Text style={[ Styles.itemText]} > {this.state.time.toString()} </Text>
                            </TouchableOpacity>
                            <Image source={require('../../assets/images/clock.png')}  style={Styles.itemImage} resizeMode={'contain'}/>
                            <DateTimePicker
                                isVisible={this.state.isTimePickerVisible}
                                onConfirm={this.handleTimePicked}
                                onCancel={this.hideTimePicker}
                                mode={'time'}
                            />
                        </View>
                        <View>
                            <Item style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]} regular >
                                <Label style={[Styles.labelItem , {top:-35 , left:0 , position:'absolute'}]}>{ i18n.t('country') }</Label>
                                <Picker
                                    mode="dropdown"
                                    style={[ Styles.picker ]}
                                    placeholder={i18n.t('country')}
                                    placeholderStyle={{ color: "#acabae" }}
                                    placeholderIconColor="#acabae"
                                    selectedValue={this.state.selectedCountry}
                                    onValueChange={(value) => this.setState({ selectedCountry: value })}
                                >
									{
										this.state.countries.map((country, i) => (
											<Picker.Item label={country.countryName} value={country.country_id} key={i} />
										))
									}
                                </Picker>
                                <Icon name='angle-down' type={"FontAwesome"} style={{ color: "#878787", fontSize:23 , right: 0}}/>
                            </Item>
                        </View>


                        <View style={[Styles.inputParent ,{ borderColor:  '#eee' , backgroundColor:'#F6F6F6' , borderRadius:25 , height:40 , marginBottom:20}]}>
                            <TouchableOpacity  style={[Styles.item , {top:0}]}bordered onPress={() =>this._toggleModal()}>
                                <Label style={[Styles.labelItem , {top:-25 , left:-13 , backgroundColor:'transparent'}]}>{ i18n.t('location') }</Label>
                                <Text style={[ Styles.itemText]} > {this.state.city} </Text>
                            </TouchableOpacity>
                            <Icon name='map-marker' type={"FontAwesome"}  style={{ color: '#00918B', fontSize:20 , right: 15, top:10 ,position:'absolute'}}/>
                        </View>

                        <Text style={[Styles.labelItem , {top:0 , left:0 , marginBottom:10 , backgroundColor:'transparent',fontSize:17}]}>{ i18n.t('attachments') }</Text>
                        <FlatList
                            data={photos}
                            renderItem={({item}) => this.renderItems(item, this.state.imageId)}
                            numColumns={3}
                            keyExtractor={this._keyExtractor}
                            extraData={this.state.refreshed}
                        />
                        <Modal onBackdropPress={()=> this.setState({ isModalVisible : false })} isVisible={this.state.isModalVisible}>
                            <View style={[Styles.modalStyle , {padding:10}]}>
                                {
                                    !this.state.initMap ? (
                                        <MapView
                                            style={{ flex: 1 , width:'100%' , height:350 }}
                                            initialRegion={{
                                                latitude: this.state.mapRegion.latitude,
                                                longitude: this.state.mapRegion.longitude,
                                                latitudeDelta: 0.0922,
                                                longitudeDelta: 0.0421,
                                            }}
                                        >
                                            <MapView.Marker draggable
                                                            coordinate={this.state.mapRegion}
                                                            onDragEnd={(e) =>  this._handleMapRegionChange(e.nativeEvent.coordinate)}
                                            >
                                                <Image source={require('../../assets/images/location_map.png')} resizeMode={'cover'} style={{ width: 35, height: 35 }}/>
                                            </MapView.Marker>
                                        </MapView>
                                    ) : (<View />)
                                }
                                <Button onPress={() => this.confirmLocation()} style={[Styles.loginBtn , {marginTop:10 }]}>
                                    <Text style={Styles.btnTxt}>{ i18n.t('confirm') }</Text>
                                </Button>
                            </View>
                        </Modal>
						<Modal onBackdropPress={()=> this.setState({ modalAddAd : false })} isVisible={this.state.modalAddAd}>
							<View style={Styles.modalStyle}>
								<Image source={require('../../assets/images/alarm.png')}  style={{width:70 , height:70 , transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}]}} resizeMode={'contain'} />
								<Text style={[Styles.tegisterText , { fontSize:13 , color:'#fff' , top:20 , textAlign:'center', position:'absolute'}]}>{ i18n.t('attention') }</Text>
                                <Text style={[Styles.tegisterText , {marginTop:5 , marginBottom:15 , fontSize:13 , color:'#444444' , textAlign:'center'}]}>{ i18n.t('noteThat') } <Text style={{color:'#035F5B'}}>{ this.state.percentItem }$</Text> { i18n.t('ofUrWallet') } </Text>
								<View style={{flexDirection:'row' , justifyContent:'center'}}>
									<TouchableOpacity onPress={() => this.onConfirm()} style={[Styles.touchModal , {backgroundColor:'#035F5B'}]}>
										<Text style={[Styles.headerBody , {fontSize:14}]}>{ i18n.t('confirm') }</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={this._toggleModalAd} style={Styles.touchModal}>
										<Text style={[Styles.headerBody , {fontSize:14}]}>{ i18n.t('cancel') }</Text>
									</TouchableOpacity>
								</View>
							</View>
						</Modal>
                    </Form>
                        { this.renderSubmit() }
                    </KeyboardAvoidingView>
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

export default connect(mapStateToProps, {})(AddAd);