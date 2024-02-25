import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import FeatchInfo from './services/FeatchInfo';
import Searchbar from './Searchbar/Searchbar';

import React, { useReducer, useEffect } from 'react';

const App = () => {
  const initialState = {
    items: [],
    loading: false,
    error: null,
    q: '',
    per_page: 12,
    page: 1,
    isOpen: false,
    image: '',
  };

  const appReducer = (state, action) => {
    switch (action.type) {
      case 'increment':
        return {
          ...state,
          page: state.page + 1,
        };
      case 'change':
        return {
          ...state,
          q: action.payload,
          items: [],
          page: 1,
        };
      case 'changeIsOpen':
        return {
          ...state,
          isOpen: !state.isOpen,
        };
      case 'changeImage':
        return {
          ...state,
          isOpen: true,
          image: action.payload,
        };
      case 'setLoading':
        return {
          ...state,
          loading: action.payload,
        };
      case 'setItems':
        return {
          ...state,
          items: action.payload,
        };
      case 'setError':
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { items, loading, isOpen, image, page, q } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'setLoading', payload: true });
        const { hits } = await FeatchInfo();
        dispatch({ type: 'setItems', payload: { hits } });
      } catch (error) {
        dispatch({ type: 'setError', payload: error });
      } finally {
        dispatch({ type: 'setLoading', payload: false });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (page !== state.page || q !== state.q) {
        try {
          dispatch({ type: 'setLoading', payload: true });
          const { hits } = q
            ? await FeatchInfo({ page, q })
            : await FeatchInfo({ page });
          dispatch({ type: 'setItems', payload: { hits } });
        } catch (error) {
          dispatch({ type: 'setError', payload: error });
        } finally {
          dispatch({ type: 'setLoading', payload: false });
        }
      }
    };

    fetchData();
  }, [state.page, state.q]);

  // async componentDidMount() {
  //   try {
  //     this.setState({ loading: true });
  //     const { hits } = await FeatchInfo();

  //     this.setState({ items: hits });
  //   } catch (error) {
  //     this.setState({ error });
  //   } finally {
  //     this.setState({ loading: false });
  //   }
  // }

  // async componentDidUpdate(prevProps, prevState) {
  //   if (prevState.page !== this.state.page || prevState.q !== this.state.q) {
  //     try {
  //       this.setState({ loading: true, error: null });
  //       const { hits } = this.state.q
  //         ? await FeatchInfo({ page: this.state.page, q: this.state.q })
  //         : await FeatchInfo({ page: this.state.page });
  //       this.setState(prev => ({
  //         items: [...prev.items, ...hits],
  //       }));
  //     } catch (error) {
  //       this.setState({ error });
  //     } finally {
  //       this.setState({ loading: false });
  //     }
  //   }
  // }

  const handleSeeMoreInfo = image => {
    // this.setState({ isOpen: true, image });
    dispatch({ type: 'changeImage', payload: image });
  };

  const handleLoadMore = () => {
    // this.setState(prev => ({ page: prev.page + 1 }));
    dispatch({ type: 'increment' });
  };

  const handleToggleModal = () => {
    // this.setState(prev => ({ isOpen: !prev.isOpen }));
    dispatch({ type: 'changeIsOpen' });
  };

  const onSubmit = q => {
    // this.setState({ q, items: [], page: 1 });
    dispatch({ type: 'changeState', payload: q });
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery openModal={handleSeeMoreInfo} hits={items} />
      {loading && <Loader />}
      {items.length ? <Button handleLoadMore={handleLoadMore} /> : null}

      {isOpen && (
        <Modal closeModal={handleToggleModal}>
          <img src={image} alt="" />
        </Modal>
      )}
    </>
  );
};

export default App;
