import React from 'react';

const Button = ({ handleLoadMore }) => {
  console.log(handleLoadMore);
  return (
    <div>
      <button onClick={handleLoadMore}>Load more</button>
    </div>
  );
};

export default Button;
