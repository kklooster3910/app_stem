import React, { useState } from "react";
import Image from "next/image";

import styles from "./ImageDetails.module.scss";
import ImageOverlay from "../ImageOverlay/ImageOverlay";

// MAKE SURE YOU HANDLE CLOSING THE IMAGE LOL
type ImageDetailsProps = {
  isOpen: boolean;
  imgSrc: string;
  height: number;
  width: number;
  handleClick: () => void;
};

const ImageDetails = ({
  isOpen,
  imgSrc,
  height,
  width,
}: // handleClick,
ImageDetailsProps) => {
  // const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  // console.log({ isOpen, handleClick });
  console.log({ isOpen });
  return (
    <div
      className={`${styles.imageDetails} ${
        !isOpen ? styles.hidden : styles.show
      }`}
    >
      <Image
        src={imgSrc}
        alt=""
        quality={100}
        height={height}
        width={width}
        className={styles.image}
      />
      <div className={styles.overlay} />
      {/* <ImageOverlay>
      </ImageOverlay> */}
    </div>
  );
};

export default ImageDetails;
