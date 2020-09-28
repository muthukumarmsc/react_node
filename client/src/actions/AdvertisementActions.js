import axios from "axios";
import {
    GET_ERRORS,
    USER_ADD,
    USER_UPDATE,
    PROFILE_UPDATE,
    PASSWORD_UPDATE,
    SETTINGS_UPDATE,
    REPLY_CONTACT,
    SUPPORT_REPLY,
    
} from "./types";
import keys from "./config";
const url = keys.baseUrl;
export const Advertisement = (userData, history) => dispatch => {
    console.log(userData);
    axios
        .post(url+"api/advertisement-add", userData)
        .then(res =>
            dispatch({
                type: USER_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};
