import React from 'react';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, openModal }) => {
  return (
    <li className={s.moduleItem}>
      <img src={webformatURL} alt="" onClick={() => openModal(largeImageURL)} />
    </li>
  );
};

export default ImageGalleryItem;
