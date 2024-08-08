import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import styles from "./ProxyForm.module.css";

const ProxyForm = ({
  control,
  errors,
  handleSubmit,
  handleFormSubmit,
  removeModalWindow,
  setIsShowProxyForm,
}) => {
  return (
    <div className="modal__window_wrapper" onClick={removeModalWindow}>
      <div
        className={`${styles.modal__window} modal__window`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Форма прокси</h3>
        <div>
          <FormControl fullWidth size="small" error={!!errors["protocol"]}>
            <InputLabel id={styles.select_label}>Выберите blacklist</InputLabel>
            <Controller
              control={control}
              name="protocol"
              defaultValue={""}
              rules={{
                required: "Select не должен быть пустым",
              }}
              render={({ field, fieldState: { error } }) => (
                <Select {...field} label={"Выберите протокол"}>
                  {["http", "https", "socks5", "socks"].map((protocol, index) => (
                    <MenuItem key={index} value={protocol}>
                      {protocol}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </div>
        <div>
          <FormControl fullWidth size="small" error={!!errors["username"]}>
            <Controller
              control={control}
              name="username"
              rules={{
                required: "Заполните username",
              }}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="username"
                  placeholder="Введите username"
                  error={!!errors["username"]}
                />
              )}
            />
          </FormControl>
        </div>
        <div>
          <FormControl fullWidth size="small" error={!!errors["host"]}>
            <Controller
              control={control}
              name="host"
              rules={{
                required: "Заполните host",
              }}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="host"
                  placeholder="Введите host"
                  error={!!errors["host"]}
                />
              )}
            />
          </FormControl>
        </div>
        <div>
          <FormControl fullWidth size="small" error={!!errors["port"]}>
            <Controller
              control={control}
              name="port"
              rules={{
                required: "Заполните port",
              }}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="port"
                  placeholder="Введите port"
                  error={!!errors["port"]}
                />
              )}
            />
          </FormControl>
        </div>
        <div>
          <FormControl fullWidth size="small" error={!!errors["password"]}>
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Заполните password",
              }}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="password"
                  type="password"
                  placeholder="Введите password"
                  error={!!errors["password"]}
                />
              )}
            />
          </FormControl>
        </div>
        <div className={styles.button__wrapper}>
          <button onClick={handleSubmit(handleFormSubmit)}>Добавить</button>
          <button type="button" onClick={() => setIsShowProxyForm(false)}>
            Отменить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProxyForm;
