import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground, Dimensions, I18nManager} from "react-native";
import { Container, Content } from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../local/i18n'

const height = Dimensions.get('window').height;
class Language extends Component {
    constructor(props){
        super(props);

    }




    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <ImageBackground source={require('../../assets/images/background.jpg')} resizeMode={'cover'} style={styles.imageBackgroundStyle}>
                        <View style={styles.langView}>
                            <Text style={styles.chooseLang}>{ i18n.t('chooseLang') }</Text>
                            <View style={styles.langRow}>
                                <TouchableOpacity style={styles.TouchLang}>
                                    <Text style={styles.TouchLangText}>العربية</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.TouchLang}>
                                    <Text style={styles.TouchLangText}>English</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </Content>

            </Container>
        );
    }
}





export default Language;