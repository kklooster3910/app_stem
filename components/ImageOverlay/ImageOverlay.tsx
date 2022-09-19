import React, { ReactNode } from "react";

import styles from "./ImageOverlay.module.scss";

type ImageOverlayProps = {
  children: ReactNode;
};

const ImageOverlay = ({ children }: ImageOverlayProps) => {
  return (
    <div className={styles.imageOverlay}>
      {children}
      <div className={styles.overlay} />
    </div>
  );
};

export default ImageOverlay;
