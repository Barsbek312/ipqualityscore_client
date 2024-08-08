import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import styles from "./Loader.module.css";

const Loader = ({ isShow }) => {
  if (isShow) {
    return (
      <div className={styles.loader__wrapper}>
        <CircularProgress />
      </div>
    );
  }
};

export default Loader;
