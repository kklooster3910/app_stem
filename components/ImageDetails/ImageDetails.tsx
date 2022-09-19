import React from "react";
import Image from "next/image";

import styles from "./ImageDetails.module.scss";

type ImageDetailsProps = {
  isOpen: boolean;
  imgSrc: string;
  height: number;
  width: number;
  handleClose: () => void;
};

const ImageDetails = ({
  isOpen,
  imgSrc,
  height,
  width,
  handleClose,
}: ImageDetailsProps) => {
  return (
    <div
      className={`${styles.imageDetails} ${
        !isOpen ? styles.hidden : styles.show
      }`}
    >
      <div
        className={`${styles.image} ${width > 4000 ? styles.extraWide : ""} ${
          height / width > 1 ? styles.tall : ""
        } `}
      >
        <button
          onClick={() => {
            handleClose && handleClose();
          }}
        >
          x
        </button>
        <Image
          src={imgSrc || ""}
          alt=""
          quality={100}
          layout="responsive"
          objectFit="contain"
          height={height}
          width={width}
        />
      </div>
      <div
        className={styles.overlay}
        onClick={() => {
          handleClose && handleClose();
        }}
      />
    </div>
  );
};

export default ImageDetails;
