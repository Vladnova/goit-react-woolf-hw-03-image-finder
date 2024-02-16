import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import styles from './App.module.css';
import { getImg } from '../api/images-api';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    isLoader: false,
    currentTargetPage: 1,
    allPages: 0,
    search: '',
    largeImageURL: '',
    tags: '',
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { currentTargetPage, search, images } = this.state;
    if (
      prevState.currentTargetPage !== currentTargetPage ||
      prevState.search !== search
    ) {
      this.getImages();
    }
    if (prevState.images !== images) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  getImages = async () => {
    const { search, currentTargetPage } = this.state;
    this.setState({ isLoader: true });
    try {
      const { hits, totalHits } = await getImg(search, currentTargetPage);
      const images = hits.map(({ id, largeImageURL, webformatURL, tags }) => ({
        id,
        largeImageURL,
        webformatURL,
        tags,
      }));
      this.setState(prev => ({
        images: [...prev.images, ...images],
        allPages: Math.ceil(totalHits / 12),
      }));
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ isLoader: false });
    }
  };

  onSubmit = search => {
    this.setState({ search, images: [], currentTargetPage: 1 });
  };

  loadMore = () => {
    this.setState(prev => ({ currentTargetPage: prev.currentTargetPage + 1 }));
  };

  toggleModal = (largeImageURL, tags) => {
    this.setState(prev => ({
      showModal: !prev.showModal,
      largeImageURL,
      tags,
    }));
  };
  render() {
    const {
      images,
      isLoader,
      largeImageURL,
      tags,
      showModal,
      allPages,
      currentTargetPage,
    } = this.state;
    return (
      <div className={styles.App}>
        {showModal && (
          <Modal closeModal={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={images} openModal={this.toggleModal} />
        {images.length > 0 && !isLoader && allPages !== currentTargetPage && (
          <Button onClick={this.loadMore}>Load more</Button>
        )}
        {isLoader && <Loader />}
      </div>
    );
  }
}
