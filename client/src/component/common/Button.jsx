import React from 'react';

const Button = ({ onClick, text, color  }) => {
  return (
    <button className={`btn btn-${color} mx-2`} onClick={onClick} >
      {text}
    </button>
  );
};

export default Button;
