import React from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';

const UpdateForm = ({ inputTitle, inputDesc, handleInput, handleSubmit, buttonText, handleCancel, cancelText }) => {
  return (
    <form className="col-12 p-2" onSubmit={handleSubmit}>
      <InputField label="Title" placeholder="Title" value={inputTitle} onChange={handleInput} />
      <InputField
        label="Description"
        placeholder="Description"
        value={inputDesc}
        onChange={handleInput}
      />
      <Button text={buttonText} color="primary" type="submit" />
      <Button text={cancelText} color="secondary" onClick={handleCancel} />
    </form>
  );
};

export default UpdateForm;
