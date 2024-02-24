import React from 'react';

const Button = ({ handleLoadMore }) => {
  return (
    <div>
      <button onClick={handleLoadMore}>Load more</button>
    </div>
  );
};

export default Button;
