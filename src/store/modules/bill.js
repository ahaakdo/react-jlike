//账单列表相关的store
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const billStore = createSlice({
  name: 'bill',
  initialState: {
    billList: []
  },
  reducers: {
    //修改方法
    setBillList (state, action) {
      state.billList = action.payload
    },
    //添加账单
    addBill (state, action) {
      state.billList.push(action.payload)
    }
  }
})
//解构actionCreater函数
const { setBillList, addBill } = billStore.actions
const getBillList = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:8888/ka')
    dispatch(setBillList(res.data))
  }
}
const addBillList = (data) => {
  return async (dispatch) => {
    const res = await axios.post('http://localhost:8888/ka', data)
    dispatch(addBill(res.data))
  }
}
//导出reducer
const billReducer = billStore.reducer

export { getBillList, addBillList }

export default billReducer