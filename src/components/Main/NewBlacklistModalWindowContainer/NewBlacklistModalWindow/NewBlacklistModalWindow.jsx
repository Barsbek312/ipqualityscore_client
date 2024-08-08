import { FormControl, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import styles from "./NewBlacklistModalWindow.module.css";

const NewBlacklistModalWindow = ({
  setIsShowModaWindowCreateBlacklist,
  control,
  errors,
  handleSubmit,
  handleSubmitForm,
}) => {
  return (
    <div
      className={"modal__window_wrapper"}
      onClick={() => setIsShowModaWindowCreateBlacklist(false)}
    >
      <div className={"modal__window"} onClick={(e) => e.stopPropagation()}>
        <h3>Добавить blacklist</h3>
        <div className={styles.text__input_wrapper}>
          <FormControl
            size="small"
            fullWidth
            error={!!errors["nameBlacklistType"]}
          >
            <Controller
              control={control}
              name="nameBlacklistType"
              defaultValue={""}
              rules={{
                required: "Blacklist пустой",
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Blacklist"
                  placeholder={"Название blacklist"}
                  error={!!errors["nameBlacklistType"]}
                />
              )}
            />
          </FormControl>
        </div>
        <button
          className={styles.submit__button}
          onClick={handleSubmit(handleSubmitForm)}
        >
          Добавить
        </button>
        <button
          className={styles.submit__button}
          onClick={() => setIsShowModaWindowCreateBlacklist(false)}
        >
          Отменить
        </button>
      </div>
    </div>
  );
};

export default NewBlacklistModalWindow;
