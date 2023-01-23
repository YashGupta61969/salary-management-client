import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./slices/adminSlice";

const store = configureStore({
    reducer:{
        user:adminSlice
    }
})

export default store