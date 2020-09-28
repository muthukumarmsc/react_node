import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    FORGOT,
    USER_LOADING,
    USER_UPDATE
} from "./types";
import keys from "./config";
const url = keys.baseUrl;
export const registerUser = (userData, history) => dispatch => {
    axios
        .post(url+"api/user-add1", userData)
        .then(res => history.push("/login"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const loginUser = userData => dispatch => {
    axios
        .post(url+"api/login", userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const forgotUser = (forgotData,history) => dispatch => {
  axios
      .post(url+"api/forgot", forgotData)
      .then(res => history.push("/login"))
      .catch(err =>
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          })
      );
 };

export const resetUser = (resetData) => dispatch => {
   axios
       .post(url+"api/resetUser", resetData)
       .then(res => dispatch({
           type: USER_UPDATE,
           payload: res,
           
       })

       )
       .catch(err =>
           dispatch({
               type: GET_ERRORS,
               payload: err.response.data
           })
       );
  };
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};
