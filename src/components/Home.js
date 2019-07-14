import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity , I18nManager , FlatList} from "react-native";
import { Container, Content, Icon, Header  ,Item , Input } from 'native-base'
import FooterSection from './FooterSection';
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'


const categories=[
    {id:1 , name:'وظائف الهندسة' , image:require('../../assets/images/pic_one.png')},
    {id:2 , name:'وظائف طب وصحة' , image:require('../../assets/images/pic_two.png')},
    {id:1 , name:'وظائف التكنولوجيا' , image:require('../../assets/images/pic_one.png')},
    {id:2 , name:'وظائف التعليم' , image:require('../../assets/images/pic_two.png')},
    {id:1 , name:'وظائف الهندسة' , image:require('../../assets/images/pic_one.png')},
    {id:2 , name:'وظائف طب وصحة' , image:require('../../assets/images/pic_two.png')},
    {id:1 , name:'وظائف التكنولوجيا' , image:require('../../assets/images/pic_one.png')},
    {id:2 , name:'وظائف التعليم' , image:require('../../assets/images/pic_two.png')},
]
class Home extends Component {
    constructor(props){
        super(props);

        this.state={
            categories,
            search:''
        }
    }



    static navigationOptions = () => ({
        drawerLabel: i18n.t('home') ,
        drawerIcon: (<Image source={require('../../assets/images/home.png')} style={{ height: 20, width: 20 , top:3 }} resizeMode={'contain'} /> )
    })


    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('category', { id: item.id })} style={Styles.categoryList}>
                <View style={Styles.homeViewContainer}>
                    <View style={Styles.homeTextCont}>
                        <Text style={Styles.homeText}>{item.name}</Text>
                    </View>
                    <Image source={item.image} resizeMode={'cover'} style={Styles.flatImage}/>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (

            <Container style={{}}>
                <Header style={Styles.header} noShadow>
                    <View style={Styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/menu.png')} style={Styles.headerMenu} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={Styles.headerBody}>{ i18n.t('home') }</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('notifications')} style={Styles.headerTouch}>
                            <Image source={require('../../assets/images/notifications.png')} style={Styles.headerNoti} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>
                </Header>
                <Content style={{}}>
                    <View style={Styles.inputView}>
                        <Item  style={Styles.inputItem} bordered>
                            <Input onChangeText={(search) => this.setState({ search })} placeholder={'اكتب ما تريد أن تبحث عنه'} placeholderTextColor={'#acabae'} style={Styles.modalInput}   />
                        </Item>
                        <Image source={require('../../assets/images/search.png')} style={Styles.searchImg} resizeMode={'contain'}/>
                    </View>
                    <View style={Styles.flatContainer}>
                        <FlatList
                            data={this.state.categories}
                            renderItem={({item}) => this.renderItems(item)}
                            numColumns={2}
                            keyExtractor={this._keyExtractor}
                        />
                    </View>
                </Content>
                <FooterSection routeName={'home'} navigation={this.props.navigation}/>
            </Container>

        );
    }
}

export default Home;