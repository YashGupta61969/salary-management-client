import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admin: {token:null}
}

const adminSlice = createSlice({
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

export default adminSlice.reducer

export const {login, logout} = adminSlice.actions