import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProxyListRes from "./ProxyListRes/ProxyListRes";

const ProxyListResContainer = ({handleSubmitAddIpToBlacklist}) => {
  const { proxyIpResList } = useSelector((state) => state.proxyIp);
  const [check, setCheck] = useState([
    {
      proxy: "192.168.1.0",
      fraudScore: 0
    },
    {
      proxy: "192.168.2.0",
      fraudScore: 0
    },
    {
      proxy: "192.168.3.0",
      fraudScore: 0
    },
    {
      proxy: "192.168.4.0",
      fraudScore: 0
    },
  ])
  return <ProxyListRes proxyIpResList={proxyIpResList} handleSubmitAddIpToBlacklist={handleSubmitAddIpToBlacklist}/>;
};

export default ProxyListResContainer;
