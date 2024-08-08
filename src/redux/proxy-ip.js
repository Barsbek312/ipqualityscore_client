import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { proxyIpAPI } from "../API/API";

export const parseProxyIp = createAsyncThunk(
  "proxy-ip/get-proxy-ip-res",
  async (data, thunkAPI) => {
    const { octetQuantity, blacklist, ...otherData } = data;
    const body = JSON.stringify(otherData);
    // const body = JSON.stringify({
    //   proxyList: [
    //     "231.248.174.211",
    //     "131.49.194.211",
    //     "186.175.101.110",
    //     "181.36.218.221",
    //     "51.55.152.49",
    //     "50.50.146.146",
    //     "135.129.78.148",
    //     "149.233.125.48",
    //     "97.87.60.135",
    //     "246.141.67.161",
    //     "107.223.156.57",
    //     "255.89.114.118",
    //     "151.246.34.161",
    //     "4.165.31.136",
    //     "238.86.82.241",
    //     "113.111.240.4",
    //     "151.114.161.74",
    //     "26.134.206.12",
    //     "248.216.68.202",
    //     "96.217.196.218",
    //     "200.100.188.177",
    //   ],
    // });

    try {
      const res = await proxyIpAPI.getFraudScore(octetQuantity, blacklist, body);
      console.log(res);
      if (res.status === 200) {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.data.error);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getBlacklistType = createAsyncThunk(
  "proxy-ip/get-blacklist-type",
  async (_, thunkAPI) => {
    try {
      const res = await proxyIpAPI.getBlacklistType();
      if (res.status === 200) {
        return res.data;
      } else {
        const error = await res.text();
        return thunkAPI.rejectWithValue(error);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const addIpToBlacklist = createAsyncThunk(
  "proxy-ip/add-ip-to-blacklist",
  async (data, thunkAPI) => {
    const { blacklistId, proxyList } = data;
    const body = JSON.stringify({ proxyList });
    try {
      const res = await proxyIpAPI.addIpToBlacklist(blacklistId, body);
      if (res.status === 201) {
        return res.data;
      } else {
        const error = await res.text();
        return thunkAPI.rejectWithValue(error);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getBlacklist = createAsyncThunk(
  "proxy-ip/get-blacklist",
  async (blacklistTypeId, thunkAPI) => {
    try {
      const res = await proxyIpAPI.getBlacklist(blacklistTypeId);
      if (res.status === 200) {
        return res.data;
      } else {
        const error = await res.text();
        return thunkAPI.rejectWithValue(error);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const createBlacklist = createAsyncThunk(
  "proxy-ip/create-blacklist",
  async (data, thunkAPI) => {
    const body = JSON.stringify(data);
    try {
      const res = await proxyIpAPI.createBlacklist(body);

      if (res.status === 201) {
        return res.data;
      } else {
        const error = await res.text();
        return thunkAPI.rejectWithValue(error);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteBlacklist = createAsyncThunk(
  "proxy-ip/delete-blacklist",
  async (blacklistId, thunkAPI) => {
    try {
      const res = await proxyIpAPI.deleteBlacklist(blacklistId);
      if (res.status === 200) {
        return res.data;
      } else {
        const error = await res.text();
        return thunkAPI.rejectWithValue(error);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const changeBlacklist = createAsyncThunk(
  "proxy-ip/change-blacklist",
  async (data, thunkAPI) => {
    const { id, nameBlacklistType } = data;
    const body = JSON.stringify({ nameBlacklistType });
    try {
      const res = await proxyIpAPI.changeBlacklist(id, body);
      if (res.status === 200) {
        return res.data;
      } else {
        const error = await res.text();
        return thunkAPI.rejectWithValue(error);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteBlacklistIp = createAsyncThunk(
  "proxy-ip/delete-blacklist-ip",
  async (blacklistIpId, thunkAPI) => {
    try {
      const res = await proxyIpAPI.deleteBlacklistIp(blacklistIpId);

      if (res.status === 200) {
        return res.data;
      } else {
        const error = await res.text();
        return thunkAPI.rejectWithValue(error);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

let initialState = {
  loadingProxyIp: false,
  blacklistType: null,
  proxyIpResList: null,
  blacklist: null,
};

const proxyIpSlice = createSlice({
  name: "proxyIp",
  initialState,
  reducers: {
    filterProxylist: (state, proxyList) => {
      state.proxyIpResList =
        (state.proxyIpResList &&
          state.proxyIpResList.length > 0 &&
          state.proxyIpResList.filter(
            (ip) => ip.proxy && !proxyList.payload.includes(ip.proxy)
          )) ||
        state.proxyIpResList;
      if(state.proxyIpResList && state.proxyIpResList.length === 0) {
        state.proxyIpResList = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(parseProxyIp.pending, (state) => {
        state.loadingProxyIp = true;
      })
      .addCase(parseProxyIp.fulfilled, (state, action) => {
        state.loadingProxyIp = false;
        state.proxyIpResList = action?.payload?.fraudScore;
      })
      .addCase(parseProxyIp.rejected, (state) => {
        state.loadingProxyIp = false;
      })
      .addCase(getBlacklistType.pending, (state) => {
        state.loadingProxyIp = true;
      })
      .addCase(getBlacklistType.fulfilled, (state, action) => {
        state.loadingProxyIp = false;
        state.blacklistType = action.payload;
      })
      .addCase(getBlacklistType.rejected, (state) => {
        state.loadingProxyIp = false;
      })
      .addCase(addIpToBlacklist.pending, (state) => {
        state.loadingProxyIp = true;
      })
      .addCase(addIpToBlacklist.fulfilled, (state) => {
        state.loadingProxyIp = false;
      })
      .addCase(addIpToBlacklist.rejected, (state) => {
        state.loadingProxyIp = false;
      })
      .addCase(getBlacklist.pending, (state) => {
        state.loadingProxyIp = true;
      })
      .addCase(getBlacklist.fulfilled, (state, action) => {
        state.loadingProxyIp = false;
        state.blacklist = action.payload;
      })
      .addCase(getBlacklist.rejected, (state) => {
        state.loadingProxyIp = false;
      })
      .addCase(createBlacklist.pending, (state) => {
        state.loadingProxyIp = true;
      })
      .addCase(createBlacklist.fulfilled, (state, action) => {
        state.loadingProxyIp = false;
      })
      .addCase(createBlacklist.rejected, (state) => {
        state.loadingProxyIp = false;
      })
      .addCase(deleteBlacklist.pending, (state) => {
        state.loadingProxyIp = true;
      })
      .addCase(deleteBlacklist.fulfilled, (state, action) => {
        state.loadingProxyIp = false;
        state.blacklist = null;
      })
      .addCase(deleteBlacklist.rejected, (state) => {
        state.loadingProxyIp = false;
      })
      .addCase(changeBlacklist.pending, (state) => {
        state.loadingProxyIp = true;
      })
      .addCase(changeBlacklist.fulfilled, (state, action) => {
        state.loadingProxyIp = false;
      })
      .addCase(changeBlacklist.rejected, (state) => {
        state.loadingProxyIp = false;
      })
      .addCase(deleteBlacklistIp.pending, (state) => {
        state.loadingProxyIp = true;
      })
      .addCase(deleteBlacklistIp.fulfilled, (state, action) => {
        state.loadingProxyIp = false;
      })
      .addCase(deleteBlacklistIp.rejected, (state) => {
        state.loadingProxyIp = false;
      });
  },
});

export const { filterProxylist } = proxyIpSlice.actions;
export default proxyIpSlice.reducer;
