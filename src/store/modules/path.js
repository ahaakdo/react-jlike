import { createSlice } from "@reduxjs/toolkit";


const pathStore = createSlice({
  name: 'path',
  initialState: {
    path: '/'
  },
  reducers: {
    setPath (state, action) {
      state.path = action.payload
    }
  }
})

const { setPath } = pathStore.actions

const pathReducer = pathStore.reducer

export { setPath }

export default pathReducer