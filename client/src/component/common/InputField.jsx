import React from 'react';

const InputField = ({ label, placeholder, value, onChange }) => {
  return (
    <div className="my-2">
      <label htmlFor={label}>{label}</label>
      <input
        type="text"
        id={label}
        name={label}
        placeholder={placeholder}
        className="w-100 my-1 p-2"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
