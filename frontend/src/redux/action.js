import { GET_LOGIN_USER_SUCCESS } from "./types";

export const LoginUser = (payload) => (dispatch) => {
    // dispatch({ type: types.GET_TASK_REQUEST });
    return axios.post(`/user/login`,  payload)
      .then((res) => {
        console.log(res)
        // return dispatch({
        //   type: GET_LOGIN_USER_SUCCESS,
        //   payload: res.data.user,
        //   msg: res.data.msg,
        // });
      })
      .catch((e) =>
        // dispatch({
        //   type: types.GET_TASK_FAILURE,
        //   payload: e,
        // })
        console.log(e)
      );
  };