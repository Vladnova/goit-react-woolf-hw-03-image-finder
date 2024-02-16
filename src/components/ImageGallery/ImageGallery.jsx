import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';
const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={styles.imageGallery}>
      {images.map(img => (
        <ImageGalleryItem openModal={openModal} key={img.id} image={img} />
      ))}
    </ul>
  );
};

export default ImageGallery;
