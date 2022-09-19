import React, { ReactNode, useState } from "react";

import styles from "./MainPageWrapper.module.scss";

type MainPageWrapperProps = {
  children: ReactNode;
};

const MainPageWrapper = ({ children }: MainPageWrapperProps) => {
  // const [searchInput, setSearchInput] = useState<string>("");
  return <div className={styles.mainPageWrapper}>{children}</div>;
};

export default MainPageWrapper;
