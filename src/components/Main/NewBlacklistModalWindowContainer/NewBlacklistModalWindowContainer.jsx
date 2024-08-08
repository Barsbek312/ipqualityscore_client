import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createBlacklist, getBlacklistType } from "../../../redux/proxy-ip";
import NewBlacklistModalWindow from "./NewBlacklistModalWindow/NewBlacklistModalWindow";

const NewBlacklistModalWindowContainer = ({
  setIsShowModaWindowCreateBlacklist,
}) => {
  const { control, formState: {errors}, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const handleSubmitForm = async (data) => {
    await dispatch(createBlacklist(data));
    dispatch(getBlacklistType());
    setIsShowModaWindowCreateBlacklist(false);
  }

  return (
    <NewBlacklistModalWindow
      setIsShowModaWindowCreateBlacklist={setIsShowModaWindowCreateBlacklist}
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      handleSubmitForm={handleSubmitForm}
    />
  );
};

export default NewBlacklistModalWindowContainer;
