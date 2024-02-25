import { useState } from 'react';
import s from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [q, setQ] = useState('');

  const handleChangeValue = e => {
    setQ(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(q);
  };

  return (
    <header className={s.Searchbar}>
      <form onSubmit={handleSubmit} className={s.SearchForm}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          value={q}
          onChange={handleChangeValue}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
