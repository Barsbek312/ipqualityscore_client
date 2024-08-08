import {
  Box,
  FormControl,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import styles from "./Blacklist.module.css";
import AddIpToBlacklistFormContainer from "./AddIpToBlacklistFormContainer/AddIpToBlacklistFormContainer";

const Blacklist = ({
  blacklistType,
  control,
  errors,
  handleChangeSelect,
  blacklist,
  handleClickChangeBlacklist,
  handleDeleteBlacklistIp,
  setSelectedBlacklist,
  selectedBlacklist,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={styles.blacklist__wrapper}>
      <div className={styles.blacklist__header}>
        <h3>Blacklist</h3>
        <div className={styles.select__wrapper}>
          <FormControl
            size="small"
            fullWidth
            error={!!errors["blacklistTypeId"]}
          >
            <InputLabel>Выберите blacklist</InputLabel>
            <Controller
              name={"blacklistTypeId"}
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Выберите blacklist"
                  open={!!anchorEl}
                  onOpen={handleOpen}
                  onClose={handleClose}
                  onChange={(event) => {
                    field.onChange(event);
                    handleChangeSelect(event.target.value);
                    setSelectedBlacklist(event.target.value);
                  }}
                  renderValue={(selected) => {
                    if (selected === -1) {
                      return "Создать blacklist";
                    } else if (selected === 0) {
                      return "Пропустить blacklist";
                    }
                    const selectedItem = blacklistType.find(
                      (item) => item.id === selected
                    );
                    return selectedItem ? selectedItem.nameBlacklistType : "";
                  }}
                >
                  <MenuItem value={-1} onClick={() => handleChangeSelect(-1)}>
                    Создать blacklist
                  </MenuItem>
                  <MenuItem value={0} onClick={() => handleChangeSelect(0)}>
                    Пропустить blacklist
                  </MenuItem>
                  {blacklistType &&
                    blacklistType.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {/* {item.nameBlacklistType} */}
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          width="100%"
                        >
                          <span>{item.nameBlacklistType}</span>
                          <IconButton
                            edge="end"
                            onClick={(e) => {
                              handleClose();
                              e.stopPropagation();
                              handleClickChangeBlacklist({
                                nameBlacklistType: item.nameBlacklistType,
                                id: item.id,
                              });
                            }}
                          >
                            <CreateIcon />
                          </IconButton>
                        </Box>
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
          </FormControl>
        </div>
      </div>
      {(selectedBlacklist && selectedBlacklist >= 1 && (
        <div>
          <AddIpToBlacklistFormContainer
            selectedBlacklist={selectedBlacklist}
          />
          <div className={styles.blacklist__res_wrapper}>
            {blacklist &&
              blacklist.map((item) => {
                return (
                  <div className={styles.blacklist__res} key={item.id}>
                    <div>
                      <h3>{item?.ip_address}</h3>
                    </div>
                    <div className={styles.icon__wrapper}>
                      <IconButton
                        edge="end"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBlacklistIp(selectedBlacklist, item.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )) ||
        null}
    </div>
  );
};

export default Blacklist;
