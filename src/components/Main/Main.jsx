import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  addIpToBlacklist,
  filterProxylist,
  getBlacklist,
} from "../../redux/proxy-ip";
import BlacklistContainer from "./BlacklistContainer/BlacklistContainer";
import ChangeBlacklistModalWindowContainer from "./ChangeBlacklistModalWindowContainer/ChangeBlacklistModalWindowContainer";
import styles from "./Main.module.css";
import NewBlacklistModalWindowContainer from "./NewBlacklistModalWindowContainer/NewBlacklistModalWindowContainer";
import ProxyListFormContainer from "./ProxyListFormContainer/ProxyListFormContainer";
import ProxyListResContainer from "./ProxyListResContainer/ProxyListResContainer";

const Main = () => {
  const {
    control,
    formState: { errors },
    setError,
    getValues,
  } = useForm();
  const dispatch = useDispatch();

  // Добавление IP в Blacklist
  const handleSubmitAddIpToBlacklist = (proxyList) => async () => {
    const blacklistTypeId = getValues("blacklistTypeId");
    if (blacklistTypeId && blacklistTypeId >= 1 && proxyList) {
      await dispatch(
        addIpToBlacklist({
          proxyList,
          blacklistId: blacklistTypeId,
        })
      );
      await dispatch(filterProxylist(proxyList));
      await dispatch(getBlacklist(blacklistTypeId));
    } else {
      setError("blacklistTypeId", {
        type: "custom",
        message: "Выберите blacklist",
      });
    }
  };

  // selected blacklist: нужен когда мы будем менять сам blacklist
  const [selectedBlacklist, setSelectedBlacklist] = useState("");

  // create blacklist
  const [isShowModaWindowCreateBlacklist, setIsShowModaWindowCreateBlacklist] =
    useState(false);

  // change blacklist
  const [
    isShowModalWindowChangeBlacklist,
    setIsShowModalWindowChangeBlacklist,
  ] = useState(false);

  // Нужен для парсинга
  const [currentBlacklist, setCurrentBlacklist] = useState(null);
  const [currentOctetQuantity, setCurrentOctetQuantity] = useState(null);

  const closeModalWindowChangeBlacklist = () => {
    setCurrentBlacklist(null);
    setIsShowModalWindowChangeBlacklist(false);
  };

  return (
    <div className={styles.main__wrapper}>
      {isShowModaWindowCreateBlacklist && (
        <NewBlacklistModalWindowContainer
          setIsShowModaWindowCreateBlacklist={
            setIsShowModaWindowCreateBlacklist
          }
        />
      )}
      {isShowModalWindowChangeBlacklist && currentBlacklist && (
        <ChangeBlacklistModalWindowContainer
          closeModalWindowChangeBlacklist={closeModalWindowChangeBlacklist}
          currentBlacklist={currentBlacklist}
          setSelectedBlacklist={setSelectedBlacklist}
        />
      )}
      <ProxyListFormContainer currentBlacklist={currentBlacklist} />
      <ProxyListResContainer
        handleSubmitAddIpToBlacklist={handleSubmitAddIpToBlacklist}
      />
      <BlacklistContainer
        control={control}
        errors={errors}
        setIsShowModaWindowCreateBlacklist={setIsShowModaWindowCreateBlacklist}
        setIsShowModalWindowChangeBlacklist={
          setIsShowModalWindowChangeBlacklist
        }
        setCurrentBlacklist={setCurrentBlacklist}
        selectedBlacklist={selectedBlacklist}
        setSelectedBlacklist={setSelectedBlacklist}
      />
    </div>
  );
};

export default Main;
