import axios from 'axios';
import CONST from '../consts'
import {Toast} from "native-base";
import {AsyncStorage} from "react-native";


export const profile = (id, lang) => {
    return (dispatch) => {
        axios({
            method: 'POST',
            url: CONST.url + 'user/userProfile',
            data: { user_id: id, lang }
        }).then(response => {
            const data = response.data.data;
            dispatch({type: 'profile_data', data})
        })
    }
}


export const updateProfile = (data) => {
    return (dispatch) => {
        axios({
            url: CONST.url + 'user/editProfile',
            method: 'POST',
            data: {
				user_id: data.id,
				userName: data.name,
				phoneNo: data.phone,
				image: data.image,
				country_id: data.countryId,
				userType: data.type,
                email: data.email,
                lang: data.lang,
            }}).then(response => {
            if (response.data.status == 1) {
                const data = response.data.data;
                dispatch({type: 'update_profile', data})
            }
            Toast.show({
                text: response.data.message,
                type: response.data.status == 1 ? "success" : "danger",
                duration: 3000
            });
        }).catch(() => {
            Toast.show({
                text: 'لم يتم التعديل بعد , الرجاء المحاوله مره اخري',
                type: "danger",
                duration: 3000
            });
        })
    }
}


export const logout = ({ user_id }) => {
    return (dispatch) => {
        axios({
            url: CONST.url + 'user/LogOut',
            method: 'POST',
            data: { user_id }
        }).then(response => {
                AsyncStorage.clear();
                dispatch({type: 'logout'})
            }
        );

		AsyncStorage.clear();
		dispatch({type: 'logout'})
    }
}

