import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions, I18nManager
} from "react-native";
import {
    Container,
    Content,
    Icon,
    Header,
    Item,
    Input,
    Button,
} from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const data = [{'msg': 'السلام عليم ورحمه الله وبركاته السلام عليم ورحمه الله وبركاته'}, {'msg': 'وعليكم السلام ورحمه الله وبركاته'}, {'msg': 'test 1'}, {'msg': 'test 1'}, {'msg': 'test 1'}, {'msg': 'test 1'}, {'msg': 'test 1'}, {'msg': 'test 1'}, {'msg': 'test 2'}, {'msg': 'test2'}]

class Chat extends Component {
    constructor(props){
        super(props);

        this.state={
            data,
            msg: null,
        }
    }

    renderItem(item, i){
        if(i % 2 === 0){
            return(
                <View style={{ minWidth: '80%' , backgroundColor:'#fa6441' , marginBottom: i === this.state.data.length-1 ? 90 : 25 , borderRadius:25 , borderTopRightRadius:0 , padding:10 ,  alignSelf: 'flex-end'}}>
                    <Text note style={{color: '#fff',fontSize: 15, lineHeight:18, alignSelf: 'flex-start',textAlign: I18nManager.isRTL ?'right' : 'left'}}>{ item.msg }</Text>
                </View>
            );
        }
        return(
            <View style={{ minWidth: '80%' , backgroundColor:'#00918a' , marginBottom: i === this.state.data.length-1 ? 90 : 25, borderRadius:25 , borderTopLeftRadius:0, padding:10, alignSelf: 'flex-start'}}>
                <Text note style={{color: '#fff',fontSize: 15 , lineHeight:18, alignSelf: 'flex-start', textAlign: I18nManager.isRTL ?'right' : 'left'}}>{ item.msg }</Text>
            </View>
        );
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });
    render() {
        return (

            <Container style={{}}>
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/back.png')} style={[Styles.headerMenu , Styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , left:-15 , textAlign:'center'}]}>{ i18n.t('username') }</Text>
                    </View>
                </Header>
                <KeyboardAvoidingView behavior={'position'} style={{width:'100%', flexDirection:'column', flex: 1, zIndex: -1 }}>

                    <ScrollView
                        ref={ref => this.scrollView = ref}
                        onContentSizeChange={(contentWidth, contentHeight)=>{
                            this.scrollView.scrollToEnd({animated: true});
                        }}
                        style={{height:height-70 , paddingTop:20, paddingHorizontal:15 }}>
                        {
                            this.state.data.map((msg, i) => this.renderItem(msg, i))
                        }
                    </ScrollView>
                    <View style={{ backgroundColor:'#fff' , borderTopWidth:1 , borderColor:'#eee' , flexDirection:'row' , flex: 1, width: '100%',height:60, position:'absolute' , bottom:0}}>
                        <Item  style={{flex:1,zIndex:2222 , borderWidth:1 , borderColor:'#eee', borderRadius:50, height:45 , alignSelf:'flex-end' , marginBottom:5}}>
                            <Input placeholder={ i18n.t('writeMsg') } onChangeText={(msg) => this.setState({ msg })} value={this.state.msg}
                                   style={{ flex:1, width:'100%', paddingLeft:15 , paddingRight:15,marginRight:15 , borderRadius:50, paddingBottom:10 , color: '#797979' , textAlign: I18nManager.isRTL ?'right' : 'left' , backgroundColor:'#fff'}}
                                   placeholderTextColor={{ color: '#a7a7a7' }}
                            />
                        </Item>
                        <Button transparent={true} onPress={() => this.sendMessage()} rounded style={{ zIndex:-1, justifyContent: 'flex-end', height: 45  , width:45, marginLeft:15 }}>
                            <Icon name={'send'} type={'FontAwesome'} style={{  color: "#00918B" , fontSize:17  }}/>
                        </Button>
                    </View>
                </KeyboardAvoidingView>
            </Container>

        );
    }
}

export default Chat;