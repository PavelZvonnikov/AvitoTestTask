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
      <textarea
        rows={1}
        value={value}
        className={s.textarea}
        onChange={onChangeLocal}
        placeholder='Search'
      />
      <div className={s.underline} />
    </div>
  );
};

export default SearchForm;
