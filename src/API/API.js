import { resolveBreakpointValues } from "@mui/system/breakpoints";
import axios from "axios";

let instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
  },
});

export const proxyIpAPI = {
  async getFraudScore(octetQuantity, blacklist, data) {
    let res = await instance.post(`/proxy-ip/get-fraud-score/${blacklist}/${octetQuantity}`, data);
    return res;
  },

  async getBlacklistType() {
    const res = await instance.get("/proxy-ip/get-blacklist-type");
    return res;
  },

  async addIpToBlacklist(blacklistId, data) {
    const res = await instance.post(`/proxy-ip/add-ip-to-blacklist/${blacklistId}`, data);
    return res;
  },

  async getBlacklist(blacklistTypeId) {
    const res = await instance.get(
      `/proxy-ip/get-blacklist/${blacklistTypeId}`
    );
    return res;
  },

  async createBlacklist(data) {
    const res = await instance.post(`/proxy-ip/create-blacklist`, data);
    return res;
  },

  async deleteBlacklist(blacklistId) {
    const res = await instance.delete(`/proxy-ip/delete-blacklist/${blacklistId}`);
    return res;
  },

  async changeBlacklist(blacklistId, data) {
    const res = await instance.patch(`/proxy-ip/change-blacklist/${blacklistId}`, data);
    return res;
  },

  async deleteBlacklistIp(blacklistIpId) {
    const res = await instance.delete(`/proxy-ip/delete-blacklist-ip/${blacklistIpId}`);
    return res;
  }
};
