import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ hits, openModal }) => {
  return (
    <ul className={s.ulItem}>
      {hits.map((hit, index) => {
        return (
          <ImageGalleryItem
            key={index + hit.id}
            {...hit}
            openModal={openModal}
          />
        );
      })}
    </ul>
  );
};

export default ImageGallery;
