import React from "react";
import { useForm } from "react-hook-form";
import ProxyForm from "./ProxyForm/ProxyForm";

const ProxyFormContainer = ({ setIsShowProxyForm, setCurrentProxy, setValueProxyList, currentProxy }) => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: currentProxy
  });

  const handleFormSubmit = (data) => {
    const readyData = {
        username: data.username,
        password: data.password,
        host: data.host,
        port: data.port,
        protocol: data.protocol
    }
    setCurrentProxy(readyData) 
    setValueProxyList('proxy', readyData);
    setIsShowProxyForm(false);
  };

  const removeModalWindow = () => {
    const collectedData = getValues();
    setCurrentProxy({
        username: collectedData.username,
        port: collectedData.port,
        host: collectedData.host,
        password: collectedData.password,
        protocol: collectedData.protocol
    })
    setIsShowProxyForm(false);
  }

  return (
    <ProxyForm
      control={control}
      handleSubmit={handleSubmit}
      errors={errors}
      handleFormSubmit={handleFormSubmit}
      removeModalWindow={removeModalWindow}
      setIsShowProxyForm={setIsShowProxyForm}
    />
  );
};

export default ProxyFormContainer;
