//用户相关
import { removeToken, request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { getToken, setToken as _setToken } from "@/utils";

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: getToken() || '',
    userInfo: {}
  },
  //同步渲染
  reducers: {
    setToken (state, action) {
      state.token = action.payload
      //localStorage
      _setToken(action.payload)
    },
    setUserInfo (state, action) {
      state.userInfo = action.payload
    },
    deleteUser (state) {
      state.userInfo = {}
      state.token = ''
      removeToken()
    }
  }
})

//解构action
const { setToken, setUserInfo, deleteUser } = userStore.actions

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

//异步获取个人信息
const fetchUserInfo = () => {
  return async (dispatch) => {
    //发请求
    const res = await request.get('/user/profile')
    dispatch(setUserInfo(res.data))
  }
}

//获取reducer
const userReducer = userStore.reducer

export { setToken, fetchLogin, fetchUserInfo, deleteUser }

export default userReducer