//用户相关
import { request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { getToken, setToken as _setToken } from "@/utils";

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: getToken() || ''
  },
  //同步渲染
  reducers: {
    setToken (state, action) {
      state.token = action.payload
      //localStorage
      _setToken(action.payload)
    }
  }
})

//解构action
const { setToken } = userStore.actions

//异步获取token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    //发请求
    try {
      const res = await request.post('/authorizations', loginForm)
      //提交action
      dispatch(setToken(res.data.token))
    } catch (error) {
      console.log(error);
    }
  }
}

//获取reducer
const userReducer = userStore.reducer

export { setToken, fetchLogin }

export default userReducer