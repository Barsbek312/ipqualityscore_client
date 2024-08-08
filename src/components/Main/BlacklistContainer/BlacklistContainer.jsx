import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlacklist, deleteBlacklistIp, getBlacklist, getBlacklistType } from "../../../redux/proxy-ip";
import Blacklist from "./Blacklist/Blacklist";

const BlacklistContainer = ({
  control,
  errors,
  setIsShowModaWindowCreateBlacklist,
  setIsShowModalWindowChangeBlacklist,
  setCurrentBlacklist,
  selectedBlacklist,
  setSelectedBlacklist
}) => {
  const dispatch = useDispatch();
  const { blacklistType, blacklist } = useSelector((state) => state.proxyIp);

  useEffect(() => {
    dispatch(getBlacklistType());
  }, []);

  const handleChangeSelect = (blacklist) => {
    setCurrentBlacklist(blacklist)
    if (blacklist && blacklist >= 1) {
      dispatch(getBlacklist(blacklist));
    } else if(blacklist && blacklist === -1) {
      setIsShowModaWindowCreateBlacklist(true);
    }
  };

  const handleClickChangeBlacklist = async (nameBlacklistType) => {
    setCurrentBlacklist(nameBlacklistType)
    setIsShowModalWindowChangeBlacklist(true);
  }

  const handleDeleteBlacklistIp = async (currentBlacklist, blacklistIpId) => {
    await dispatch(deleteBlacklistIp(blacklistIpId));
    await dispatch(getBlacklist(currentBlacklist));
  }

  return (
    <Blacklist
      blacklistType={blacklistType}
      control={control}
      errors={errors}
      handleChangeSelect={handleChangeSelect}
      blacklist={blacklist}
      handleClickChangeBlacklist={handleClickChangeBlacklist}
      handleDeleteBlacklistIp={handleDeleteBlacklistIp}
      setSelectedBlacklist={setSelectedBlacklist}
      selectedBlacklist={selectedBlacklist}
    />
  );
};

export default BlacklistContainer;
