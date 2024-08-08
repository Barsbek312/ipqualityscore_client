import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addIpToBlacklist, getBlacklist } from "../../../../../redux/proxy-ip";
import AddIpToBlacklistForm from "./AddIpToBlacklistForm/AddIpToBlacklistForm";

const AddIpToBlacklistFormContainer = ({ selectedBlacklist }) => {
  const dispatch = useDispatch();
  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    watch,
    handleSubmit,
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

  const handleFormSubmit = async (data, event) => {
    event.preventDefault();
    console.log(data);
    if (data.proxyList && data.proxyList.length > 0) {
      await dispatch(
        addIpToBlacklist({
          blacklistId: selectedBlacklist,
          proxyList: data.proxyList,
        })
      );
      dispatch(getBlacklist(selectedBlacklist))
    }
  };

  return (
    <AddIpToBlacklistForm
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      handleFormSubmit={handleFormSubmit}
      handleKeyDown={handleKeyDown}
      proxyList={proxyList}
      setInputValue={setInputValue}
    />
  );
};

export default AddIpToBlacklistFormContainer;
