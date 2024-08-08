import { Autocomplete, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Controller } from "react-hook-form";
import styles from "./AddIpToBlacklist.module.css";

const AddIpToBlacklistForm = ({
  control,
  errors,
  handleSubmit,
  handleFormSubmit,
  handleKeyDown,
  proxyList,
  setInputValue,
}) => {
  return (
    <div className={styles.form__wrapper}>
      <div>
        <h4>Добавить IP адреса в blacklist</h4>
      </div>
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
      <div className={styles.button__wrapper}>
        <button onClick={handleSubmit(handleFormSubmit)}>Добавить</button>
      </div>
    </div>
  );
};

export default AddIpToBlacklistForm;
