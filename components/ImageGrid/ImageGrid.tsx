import React, { useState } from "react";
import Image from "next/image";

import ImageDetails from "../ImageDetails/ImageDetails";

import { FormattedPhoto } from "../../apiMiddleware";

import styles from "./ImageGrid.module.scss";

type FormattedPhotos = [FormattedPhoto] | [];

type ImageGridProps = {
  photos: FormattedPhotos;
};

const ImageGrid = ({ photos }: ImageGridProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  // const handleOpenPhotoDte

  return (
    <div className={styles.imageGrid} id="imageContainer">
      {photos.map(({ height, width, id, urls }, i) => {
        // different image sizes
        // remove sizes that aren't needed
        const { full, raw, regular, small } = urls;
        // const handleOpenPhotoDetails = () => {
        //   const photoUrl =
        // }
        return (
          <div key={`${id}`}>
            {/* <Image src={small} quality={100} height={400} width={400} alt="" /> */}
            {/* mess with this height/ width in order to get images to load in faster? */}
            {/* make sure you mess with image size to get these to load faster */}
            <Image
              src={small}
              quality={100}
              layout="responsive"
              height={height}
              width={width}
              alt=""
              onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            />
            <ImageDetails
              handleClick={() => setIsDetailsOpen(true)}
              isOpen={isDetailsOpen}
              imgSrc={full}
              {...{ height, width }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ImageGrid;
