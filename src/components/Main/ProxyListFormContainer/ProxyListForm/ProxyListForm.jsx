import React, { useEffect } from "react";
import styles from "./ProxyListForm.module.css";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const ProxyListForm = ({
  control,
  handleSubmit,
  handleFormSubmit,
  errors,
  handleKeyDown,
  setInputValue,
  proxyList,
  setIsShowProxyForm,
  currentProxy,
  clearProxy,
  currentBlacklist,
}) => {
  return (
    <div className={styles.form__wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
        <h3>Заполните прокси-лист</h3>
        <div className={styles.proxy_ip}>
          <Box mt={2}>
            <Controller
              control={control}
              name="proxyList"
              rules={{
                required: "Не добавлено ни одного IP адреса",
              }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  multiple
                  id="proxyList-filled"
                  options={[]}
                  freeSolo
                  value={proxyList}
                  onChange={(event, values) => {
                    if (event.key === "Enter") {
                      handleKeyDown();
                    } else {
                      onChange(values);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Proxy List"
                      placeholder="Пишите IP адрес и Enter"
                      helperText={errors.proxyList?.message}
                      error={!!errors.proxyList}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  )}
                />
              )}
            />
          </Box>
        </div>
        {currentBlacklist && (
          <div className={styles.octet__wrapper}>
            <FormControl
              size="small"
              fullWidth
              error={!!errors["octetQuantity"]}
            >
              <InputLabel>Кол-во октетов</InputLabel>
              <Controller
                control={control}
                name="octetQuantity"
                defaultValue={""}
                rules={{
                  required: "Кол-во октетов",
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label={"Кол-во октетов"}
                    placeholder={"Кол-во октетов"}
                    error={!!errors["octetQuantity"]}
                  >
                    <MenuItem value={"3"}>3 октета</MenuItem>
                    <MenuItem value={"4"}>4 октета</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </div>
        ) || null}
        <div className={styles.submit__wrapper}>
          <button type="submit">Начать</button>
          <button type="button" onClick={() => setIsShowProxyForm(true)}>
            Парсить через прокси
          </button>
        </div>
        {currentProxy?.username &&
          currentProxy?.password &&
          currentProxy?.host &&
          currentProxy?.port &&
          currentProxy?.protocol && (
            <div className={styles.proxy__wrapper}>
              <button onClick={clearProxy}>Очистить прокси</button>
              <span>
                Ваш прокси:{" "}
                {`${currentProxy.protocol}://${currentProxy.host}:${currentProxy.port}`}
              </span>
            </div>
          )}
      </form>
    </div>
  );
};

export default ProxyListForm;
