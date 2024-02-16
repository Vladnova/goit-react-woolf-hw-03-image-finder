import { Component } from 'react';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handlerCloseESC);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handlerCloseESC);
  }

  handlerCloseESC = e => {
    e.key === 'Escape' && this.props.closeModal();
    console.log(e.key);
  };

  handleClickBackdrop = ({ target, currentTarget }) => {
    target === currentTarget && this.props.closeModal();
  };
  render() {
    return createPortal(
      <div className={styles.overlay} onClick={this.handleClickBackdrop}>
        <div className={styles.modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
