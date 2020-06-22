import React, { useCallback } from 'react';
import s from './SearchForm.module.scss';

const SearchForm = ({
  value,
  onChange,
}) => {
  const onChangeLocal = useCallback(
    (event) => {
      const newValue = event.target.value;
      onChange(newValue);
    },
    [onChange],
  );

  return (
    <div className={s.wrapper}>
      <input
        type='text'
        value={value}
        className={s.input}
        onChange={onChangeLocal}
        placeholder='Search'
      />
      <div className={s.inputUnderline} />
    </div>
  );
};

export default SearchForm;
