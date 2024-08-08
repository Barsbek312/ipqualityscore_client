import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  changeBlacklist,
  deleteBlacklist,
  getBlacklistType,
} from "../../../redux/proxy-ip";
import ChangeBlacklistModalWindow from "./ChangeBlacklistModalWindow/ChangeBlacklistModalWindow";

const ChangeBlacklistModalWindowContainer = ({
  closeModalWindowChangeBlacklist,
  currentBlacklist,
  setSelectedBlacklist
}) => {
  const dispatch = useDispatch();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleDeleteBlacklist = async () => {
    if (currentBlacklist.id) {
      await dispatch(deleteBlacklist(currentBlacklist.id));
      await dispatch(getBlacklistType());
      setSelectedBlacklist("");
    }
    closeModalWindowChangeBlacklist();
  };

  const handleChangeBlacklist = async ({ nameBlacklistType }) => {
    if (currentBlacklist.id) {
      await dispatch(
        changeBlacklist({ nameBlacklistType, id: currentBlacklist.id })
      );
      await dispatch(getBlacklistType());
    }
    closeModalWindowChangeBlacklist();
  };
  return (
    <ChangeBlacklistModalWindow
      closeModalWindowChangeBlacklist={closeModalWindowChangeBlacklist}
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      currentBlacklist={currentBlacklist}
      handleDeleteBlacklist={handleDeleteBlacklist}
      handleChangeBlacklist={handleChangeBlacklist}
    />
  );
};

export default ChangeBlacklistModalWindowContainer;
