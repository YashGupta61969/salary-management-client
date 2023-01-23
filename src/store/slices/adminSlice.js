import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admin: {token:null}
}

const userSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        login:(state,{payload})=>{
            state.admin = payload
        },
        logout:(state)=>{
            state.admin = {token:null}
        }
    }
})

export default userSlice.reducer

export const {login, logout} = userSlice.actions