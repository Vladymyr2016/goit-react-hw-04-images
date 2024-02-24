import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import React, { Component } from 'react';
import FeatchInfo from './services/FeatchInfo';
import Searchbar from './Searchbar/Searchbar';

class App extends Component {
  state = {
    items: [],
    loading: false,
    error: null,
    q: '',
    per_page: 12,
    page: 1,
    isOpen: false,
    image: '',
  };

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const { hits } = await FeatchInfo();

      this.setState({ items: hits });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page || prevState.q !== this.state.q) {
      try {
        this.setState({ loading: true, error: null });
        const { hits } = this.state.q
          ? await FeatchInfo({ page: this.state.page, q: this.state.q })
          : await FeatchInfo({ page: this.state.page });
        this.setState(prev => ({
          items: [...prev.items, ...hits],
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleSeeMoreInfo = image => {
    this.setState({ isOpen: true, image });
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  handleToggleModal = () => {
    this.setState(prev => ({ isOpen: !prev.isOpen }));
  };

  onSubmit = q => {
    this.setState({ q, items: [], page: 1 });
  };

  render() {
    const { items, loading, isOpen, image } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery openModal={this.handleSeeMoreInfo} hits={items} />
        {loading && <Loader />}
        {items.length ? <Button handleLoadMore={this.handleLoadMore} /> : null}

        {isOpen && (
          <Modal closeModal={this.handleToggleModal}>
            <img src={image} alt="" />
          </Modal>
        )}
      </>
    );
  }
}
export default App;
