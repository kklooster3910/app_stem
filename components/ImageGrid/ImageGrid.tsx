import React, { useState } from "react";
import Image from "next/image";

import ImageDetails from "../ImageDetails/ImageDetails";

import { FormattedPhoto } from "../../apiMiddleware";

import styles from "./ImageGrid.module.scss";

type FormattedPhotos = [FormattedPhoto] | [];

type ImageGridProps = {
  photos: FormattedPhotos;
};

type ImageDetails = {
  imgSrc: string;
  height: number;
  width: number;
};

const ImageGrid = ({ photos }: ImageGridProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [imageDetails, setImageDetails] = useState<ImageDetails>({
    imgSrc: "",
    height: 0,
    width: 0,
  });

  return (
    <div className={styles.gridContainer}>
      <div className={styles.imageGrid} id="imageContainer">
        {photos.map(({ height, width, id, urls }, i) => {
          const { full, raw, regular, small } = urls;
          return (
            <div key={`${id}_${i}`} className={styles.gridImage}>
              <Image
                src={small}
                quality={75}
                layout="responsive"
                height={height}
                width={width}
                alt=""
                onClick={() => {
                  setImageDetails({
                    imgSrc: regular,
                    height,
                    width,
                  });
                  setIsDetailsOpen(true);
                }}
              />
            </div>
          );
        })}
        {imageDetails?.imgSrc && (
          <ImageDetails
            handleClose={() => setIsDetailsOpen(false)}
            isOpen={isDetailsOpen}
            imgSrc={imageDetails.imgSrc}
            height={imageDetails.height}
            width={imageDetails.width}
          />
        )}
      </div>
    </div>
  );
};

export default ImageGrid;
