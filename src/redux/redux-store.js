import { configureStore } from "@reduxjs/toolkit";
import proxyIpReducer from './proxy-ip';

export const store = configureStore({
    reducer: {
        proxyIp: proxyIpReducer
    }
})