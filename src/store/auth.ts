import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {user:null},
  reducers: {
    setToken(state:any, action:any) {
        if(action.payload===null){
            state.user=null
            localStorage.removeItem('user')
        }else{
            state.user={...action.payload}
            localStorage.setItem('user',JSON.stringify({...action.payload}))
        }
   
    },

  },
})

export const { setToken } = authSlice.actions
export default authSlice.reducer