import React from "react";
import Image from "next/image";

import styles from "./ImageDetails.module.scss";

// MAKE SURE YOU HANDLE CLOSING THE IMAGE LOL
// ALSO TRY AND TYPE THESE PROPS BETTER?
type ImageDetailsProps = {
  isOpen?: boolean;
  imgSrc?: string;
  height?: number;
  width?: number;
  handleClose?: () => void;
};

const ImageDetails = ({
  isOpen,
  imgSrc,
  height,
  width,
  handleClose,
}: // COME BACK TO THIS STYLING TO GET A MORE RESPONSIVE LAYOUT FOR THE IMAGE DETAILS
// ON WIDER SCREENS WHILE KEEPING THE ASPECT RATIO
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
      {/* CREATE A VISIBLE X TO CLOSE MODAL/IMAGE DETAILS */}
      {/* <div className={styles.imageContainer}> */}
      <div className={styles.image}>
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
          // layout="fill"
          // layout="intrinsic"
          layout="responsive"
          objectFit="contain"
          // fill
          // sizes="100%"
          height={height}
          width={width}
          // layout="responsive"
          // className={styles.image}
        />
      </div>
      <div
        className={styles.overlay}
        onClick={() => {
          console.log("clicking overlay?");
          handleClose && handleClose();
        }}
      />
    </div>
  );
};

export default ImageDetails;
