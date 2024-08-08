import { FormControl, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import styles from "./ChangeBlacklistModalWindow.module.css";

const ChangeBlacklistModalWindow = ({
  closeModalWindowChangeBlacklist,
  control,
  errors,
  handleSubmit,
  currentBlacklist,
  handleDeleteBlacklist,
  handleChangeBlacklist
}) => {
  return (
    <div
      className={"modal__window_wrapper"}
      onClick={closeModalWindowChangeBlacklist}
    >
      <div className={"modal__window"} onClick={(e) => e.stopPropagation()}>
        <h3>Изменить blacklist</h3>
        <div className={styles.text__input_wrapper}>
          <FormControl
            size="small"
            fullWidth
            error={!!errors["nameBlacklistType"]}
          >
            <Controller
              name="nameBlacklistType"
              control={control}
              rules={{
                required: "Blacklist не должен быть пустым",
              }}
              defaultValue={currentBlacklist?.nameBlacklistType}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Blacklist"
                  placeholder="Введите название blacklist"
                  error={!!errors["nameBlacklistType"]}
                />
              )}
            />
          </FormControl>
        </div>
        <div className={styles.button__wrapper}>
          <button onClick={handleSubmit(handleChangeBlacklist)}>Изменить</button>
          <button onClick={handleSubmit(handleDeleteBlacklist)}>Удалить</button>
          <button onClick={closeModalWindowChangeBlacklist}>Отменить</button>
        </div>
      </div>
    </div>
  );
};

export default ChangeBlacklistModalWindow;
