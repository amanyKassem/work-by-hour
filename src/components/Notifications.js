import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity , I18nManager , FlatList} from "react-native";
import { Container, Content, Icon, Header  ,Item , Input } from 'native-base'
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'

class Notifications extends Component {
    constructor(props){
        super(props);

        this.state={
        }
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
                            <Image source={require('../../assets/images/back.png')} style={Styles.headerMenu} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[Styles.headerBody , { flex:1, top:-3 , left:-15 , textAlign:'center'}]}>{ i18n.t('notifications') }</Text>
                    </View>
                </Header>
                <Content style={{padding:15}}>
                    <View style={Styles.noti}>
                        <View style={Styles.notiBall}/>
                        <Text style={Styles.notiText}>هناك طلب جديد على وظيفتك</Text>
                    </View>
                    <View style={Styles.noti}>
                        <View style={Styles.notiBall}/>
                        <Text style={Styles.notiText}>لا تنسي تقييم صاحب الاعلان</Text>
                    </View>
                    <View style={Styles.noti}>
                        <View style={Styles.notiBall}/>
                        <Text style={Styles.notiText}>لا تنسي تقييم الباحث عن العمل</Text>
                    </View>
                </Content>
            </Container>

        );
    }
}

export default Notifications;