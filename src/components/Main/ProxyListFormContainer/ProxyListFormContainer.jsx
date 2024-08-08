import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { parseProxyIp } from "../../../redux/proxy-ip";
import ProxyListForm from "./ProxyListForm/ProxyListForm";
import ProxyFormContainer from "./ProxyFormContainer/ProxyFormContainer";

const ProxyListFormContainer = ({ currentBlacklist }) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      proxyList: [],
    },
  });

  const [inputValue, setInputValue] = useState("");
  const proxyList = watch("proxyList");

  const addIPs = (input) => {
    const ips = input.split(/[,\s]+/).filter((ip) => ip);
    const currentList = getValues("proxyList") || [];
    const updatedList = [...currentList, ...ips];
    setValue("proxyList", updatedList);
    setInputValue("");
  };

  const handleKeyDown = () => {
    addIPs(inputValue);
  };

  // Парсинг fraud score
  const handleFormSubmit = async (data, event) => {
    event.preventDefault();
    if (currentBlacklist === null || currentBlacklist < 0) {
      setError("proxyList", {
        type: "custom",
        message: "Выберите или пропустите blacklist",
      });
      return null;
    }
    if(data.proxy === null) {
      delete data.proxy
    }
    data.blacklist = currentBlacklist;
    if (data.proxyList && data.proxyList.length > 0) {
      await dispatch(parseProxyIp(data));
    }
  };

  // Proxy form
  const [isShowProxyForm, setIsShowProxyForm] = useState(false);
  const [currentProxy, setCurrentProxy] = useState(null);

  const proxy = watch('proxy');

  const clearProxy = () => {
    setCurrentProxy(null);
    setValue('proxy', null);
  }

  return (
    <div>
      {isShowProxyForm && (
        <ProxyFormContainer
          setIsShowProxyForm={setIsShowProxyForm}
          setCurrentProxy={setCurrentProxy}
          setValueProxyList={setValue}
          currentProxy={currentProxy}
        />
      )}
      <ProxyListForm
        control={control}
        handleSubmit={handleSubmit}
        handleFormSubmit={handleFormSubmit}
        errors={errors}
        handleKeyDown={handleKeyDown}
        setInputValue={setInputValue}
        proxyList={proxyList}
        setIsShowProxyForm={setIsShowProxyForm}
        currentProxy={proxy}
        clearProxy={clearProxy}
        currentBlacklist={currentBlacklist}
      />
    </div>
  );
};

export default ProxyListFormContainer;
