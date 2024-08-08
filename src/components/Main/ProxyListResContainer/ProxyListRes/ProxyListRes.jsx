import React from "react";
import styles from "./ProxyListRes.module.css";

const ProxyListRes = ({ proxyIpResList, handleSubmitAddIpToBlacklist }) => {
  return (
    <div className={styles.parsing__res_wrapper}>
      <div className={styles.parsing__res_title}>
        <span>IP</span>
      </div>
      <div className={styles.parsing__res_list}>
        {(proxyIpResList  &&
          proxyIpResList.length > 0 &&
          proxyIpResList.map((proxyIpRes, index) => (
            <div className={styles.parsing__res} key={index}>
              <div>
                <h3>{proxyIpRes?.proxy}</h3>
              </div>
              <div>
                <button onClick={handleSubmitAddIpToBlacklist( proxyIpRes?.proxy ? [proxyIpRes.proxy] : null)}>Добавить в blacklist</button> 
              </div>
            </div>
          ))) ||
          (proxyIpResList !== null && (
            <div>
              <h3>Fraud Score с 0 не найден или бесплатный лимит закончился</h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProxyListRes;
