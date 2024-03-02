//用户相关
import { createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: ''
  },
  //同步渲染
  reducers: {
    setToken (state, action) {
      state.token = action.payload
    }
  }
})

//解构action
const { setToken } = userStore.actions

//获取reducer
const userReducer = userStore.reducer

export { setToken }

export default userReducer