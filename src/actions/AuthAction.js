import axios from 'axios';
import { AsyncStorage } from 'react-native';
import CONST from '../consts';

export const userLogin = ({phone, password, token}, lang) => {
    return (dispatch) => {
        dispatch({type: 'user/login'});

        console.log('auth action lang', lang);

        axios.post( CONST.url + 'user/login', { phoneNo: phone, password, device_ID: token, lang})
            .then(response => handelLogin(dispatch, response))
            .catch(error => console.warn(error.data));
    };
};


export const tempAuth = () => {
    return (dispatch) => {
        dispatch({type: 'temp_auth'});
    };
};


const handelLogin = (dispatch, data) => {
    if (data.status != 1){
        loginFailed(dispatch, data)
    }else{
        loginSuccess(dispatch, data)
    }
};


const loginSuccess = (dispatch, data) => {
    AsyncStorage.setItem('token', JSON.stringify(data.data.user_id))
        .then(() => dispatch({type: 'login_success', data }));
};

const loginFailed = (dispatch, error) => {
    dispatch({type: 'login_failed', error});
}
