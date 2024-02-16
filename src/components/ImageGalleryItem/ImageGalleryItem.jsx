import styles from './ImageGalleryItem.module.css';
const ImageGalleryItem = ({ image, openModal }) => {

  const {webformatURL, tags, largeImageURL} = image;
  return (
    <li className={styles.imageGalleryItem}>
      <img onClick={()=>openModal(largeImageURL, tags)} src={webformatURL} alt={tags} className={styles.image} />
    </li>
  );
};

export default ImageGalleryItem;
