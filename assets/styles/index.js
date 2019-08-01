import {Dimensions, I18nManager} from "react-native";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = ({
    transform:{
        transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}]
    },
    imageBackgroundStyle: {
        width: null,
        height: null,
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    },
    langView:{
        alignItems: 'center',
        justifyContent:'center',
        marginTop:'90%'
    },
    chooseLang:{
        color:'#fff',
        fontSize:20,
        fontFamily: 'BoldFont',
    },
    langRow:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:20
    },
    TouchLang:{
        backgroundColor:'#fff',
        height:35,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:15,
        width:120
    },
    TouchLangText:{
        fontSize:16,
        fontFamily:'RegularFont',
        color:'#035F5B',
        paddingBottom:5
    },
    homecontent:{
        zIndex: -99,
        marginTop: -70
    },
    HeadImg:{
        width: '100%',
        backgroundColor: 'transparent',
        height:400
    },
    title:{
        fontFamily:'BoldFont',
        fontSize:18,
        color:'#035F5B',
        alignSelf: 'center',
        marginBottom:10
    },
    LoginParentView : {
        flex:1,
        backgroundColor:'#fff',
        width:'100%',
        borderTopRightRadius:60  ,
        padding:10,
        height:'auto' ,
        paddingHorizontal:30 ,
        marginTop:-120 ,
        borderTopLeftRadius:60,
        paddingTop:0
    },
    inputParent:{
        borderWidth: 1,
        height: 50,
        padding: 5,
        flexDirection: 'row' ,
        marginTop:29,
        borderColor:  '#035F5B',
        width: '100%',
    },
    item:{
        borderBottomWidth: 0,
        top: -18,
        marginTop: 0,
        position: 'absolute',
        width: '100%',
        paddingHorizontal: 10,
        marginLeft:0
    },
    labelItem:{
        backgroundColor: '#fff',
        alignSelf: 'flex-start',
        fontFamily: 'RegularFont',
        color: '#035F5B' ,
        fontSize:15 ,
        top:-5,
        paddingRight: 5,
        paddingLeft:5,
        left:5
    },
    itemInput:{
        width: '100%',
        color: '#035F5B',
        textAlign: I18nManager.isRTL ?'right' : 'left',
        fontSize: 15,
        top: -10,
        paddingRight:0,
        paddingLeft:10,
        fontFamily: 'RegularFont',
    },
    forgetPass:{
        color: '#035F5B',
        fontSize: 15,
        textDecorationLine: 'underline',
        marginTop:20
    },
    loginBtn:{
        borderRadius: 10,
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center' ,
        backgroundColor:'#00918B',
        marginTop:20
    },
    btnTxt:{
        color:'#fff' ,
        fontSize:16,
        fontFamily: 'RegularFont',
        top:-4
    },
    tegisterText:{
        color: '#035F5B',
        fontSize: 15,
        marginTop:20,
        fontFamily: 'RegularFont',
        alignSelf:'center'
    },
    keyboardAvoid: {
        width:'100%',
        flex: 1
    },
    formImgView:{
        marginTop:10,
        justifyContent:'center',
        alignItems:'center'
    },
    itemPicker : {
        borderWidth: 1,
        borderColor: '#035F5B',
        height: 50,
        marginTop: 30,
        borderRadius: 0,
        width: '100%',
        padding: 5,
        flexDirection: 'row' ,
    },
    picker:{
        width: undefined,
        backgroundColor: 'transparent',
        color: "#035F5B" ,
        fontFamily: 'RegularFont',
        fontWeight: 'normal',
        marginLeft:10,
    },
    pickerImg:{
        width: 20,
        height: 20,
        right: 10
    },
    headerView : {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop:15
    },
    flatImage: {
        width: '100%',
        height: 150 ,
        borderTopLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    flatContainer:{
        flexDirection: 'row',
        justifyContent: 'center' ,
        marginBottom:30 ,
        marginTop:10,
        paddingHorizontal:10
    },
    homeViewContainer: {
        flex: 1,
        width: '100%' ,
        borderRadius:3
    },
    homeTextCont: {
        width:'100%' ,
        height:'100%' ,
        backgroundColor: '#6eb6b380' ,
        justifyContent:'center' ,
        alignItems:'center' ,
        position: 'absolute',
        zIndex:1,
        bottom:0,
        borderTopRightRadius: I18nManager.isRTL ? 25 : 0,
        borderBottomLeftRadius: I18nManager.isRTL ? 25 : 0,
        borderTopLeftRadius: I18nManager.isRTL ? 0 : 25,
        borderBottomRightRadius:  I18nManager.isRTL ? 0 : 25,
    },

    homeText: {
        color:'#fff' ,
        fontFamily: 'BoldFont' ,
        fontSize:18
    },
    categoryList: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1,
        margin: 5 ,
        borderTopLeftRadius: I18nManager.isRTL ? 25 : 0,
        borderBottomRightRadius:  I18nManager.isRTL ? 25 : 0,
        borderTopRightRadius: I18nManager.isRTL ? 0 : 25,
        borderBottomLeftRadius:  I18nManager.isRTL ? 0 : 25,
    },
    headerTouch:{
        width:35,
        height:35 ,
        justifyContent:'center' ,
        alignItems:'center'
    },
    headerMenu:{
        width: 25,
        height: 25,
        alignSelf:'center'
    },
    headerNoti:{
        width: 20,
        height: 20,
        alignSelf:'center'
    },
    header:{
        backgroundColor:'#00918B' ,
        height:80
    },
    headerBody:{
        color:'#fff',
        fontSize:17,
        fontFamily:'RegularFont'
    },
    inputView : {
        borderRadius: 35,
        borderWidth: 1,
        borderColor: '#ddd',
        height: 45,
        padding: 5,
        flexDirection: 'row',
        marginHorizontal: 10,
        backgroundColor: '#F6F6F6',
        marginTop:10
    },
    inputItem :{
        borderBottomWidth: 0,
        width:'100%',
        paddingHorizontal: 10
    },
    modalInput:{
        alignSelf: 'center',
        backgroundColor: 'transparent',
        color: '#acabae',
        fontFamily: 'RegularFont',
        paddingBottom:5,
        textAlign: I18nManager.isRTL ?'right' : 'left',
        fontSize:14,
        paddingRight:25
    },
    searchImg : {
        width: 20,
        height: 20,
        right: 15,
        top: 11,
        position: 'absolute',
        flex: 1
    },
    footer:{
        backgroundColor: 'transparent' ,
        width: width+7 ,
        left :-3.5
    },
    footerTab:{
        backgroundColor: '#00918B',
        borderWidth:2,
        borderColor:'#00918B'  ,
        width: width ,
        flexDirection: 'row',
        justifyContent: 'space-between' ,
        borderTopRightRadius:20  ,
        borderTopLeftRadius:20,
    },
    noti:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#F6F6F6',
        borderRadius:25,
        paddingTop:5,
        paddingBottom:10,
        paddingHorizontal:15,
        marginBottom:15
    },
    notiText:{
        color:'#707070',
        fontSize:15,
        fontFamily:'RegularFont'
    },
    notiBall:{
        borderRadius:50 ,
        backgroundColor:'#00918B' ,
        width:10 ,
        height:10,
        top:2,
        marginRight:10
    },
    pickersParent:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginToo:10,
        marginBottom:20
    },
    catPicker:{
        borderWidth: 1,
        borderColor: '#F6F6F6',
        backgroundColor:'#F6F6F6',
        height: 30,
        borderRadius: 25,
        width: '21.5%',
        padding: 0,
        flexDirection: 'row' ,
    },
    pickerLabel:{
        width: undefined,
        backgroundColor: 'transparent',
        color: "#969292" ,
        fontFamily: 'RegularFont',
        fontWeight: 'normal',
        marginLeft:0,
        fontSize:5,
        textAlign: I18nManager.isRTL ?'right' : 'left',
    }
    ,
    jobBlock:{
        borderColor: '#F6F6F6',
        backgroundColor:'#F6F6F6',
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        padding:10,
        paddingTop:5,
        marginBottom:15
    },
    modalStyle:{
        flex: 1 ,
        backgroundColor:'#fff' ,
        padding:20 ,
        position:'absolute' ,
        width:'100%',
        borderRadius:25,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    touchModal:{
        backgroundColor:'#444444' ,
        width:100 ,
        height:35,
        justifyContent:'center' ,
        alignItems:'center' ,
        borderRadius:25 ,
        marginHorizontal:3,
        paddingBottom:3
    },
    confirm:{
        justifyContent:'center' ,
        alignItems:'center' ,
        flexDirection:'column',
        height:height
    },
    confirmText:{
        color:'#035F5B' ,
        fontFamily:'RegularFont' ,
        textAlign: 'center' ,
        fontSize:16
    },
    bankImg:{
        flexDirection:'row',
        marginBottom:5
    },
    bankName:{
        color:'#035F5B' ,
        marginBottom:3,
        fontFamily:'RegularFont' ,
        fontSize:15,
        alignSelf:'flex-start'
    },
    line:{
        backgroundColor:'#8B8E8D',
        height:1,
        width:width
    },
    orerBtns:{
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:15
    },
    inputImg:{
        width: 35,
        height: 35,
        right: 5,
        top: 0,
        position: 'absolute',
        flex: 1
    },
    interestParent:{
        borderWidth:1 ,
        borderColor:'#00918B' ,
        marginHorizontal:5 ,
        marginBottom:15,
        paddingHorizontal:10 ,
        borderRadius: 25 ,
        paddingBottom:5,
        flexWrap:'wrap',
        flex:1
    },
    itemImage:{
        width: 17,
        height: 17,
        right: 15,
        top: 10,
        position: 'absolute',
        flex: 1
    },

});

export default styles;