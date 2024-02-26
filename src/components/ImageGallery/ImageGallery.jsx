import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ hits, openModal }) => {
  console.log(hits);
  return (
    <ul className={s.ulItem}>
      {hits.length > 0 &&
        hits.map(hit => {
          return (
            <ImageGalleryItem key={hit.id} {...hit} openModal={openModal} />
          );
        })}
    </ul>
  );
};

export default ImageGallery;
