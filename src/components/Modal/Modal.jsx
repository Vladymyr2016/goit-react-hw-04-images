import React, { Component } from 'react';
import s from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    document.body.style.overflowY = 'hidden';
    document.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    document.body.style.overflowY = 'auto';

    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    console.log(e.key);
    if (e.key === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <div className={s.overlay} onClick={this.handleBackdropClick}>
        <div className={s.module}>
          <>
            <h1>Modal</h1>
            <hr />
          </>
          <div className={s.content}>{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default Modal;
