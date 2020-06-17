import React, {
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import cn from 'classnames';

import IconArrow from '../../arrow.svg';

import s from './Pagination.module.scss';

const Pagination = ({
  onChange,
  value,
  start = 1,
  end = 10,
}) => {
  const array = useMemo(() => (new Array(end + 1 - start)).fill(0).map((el, index) => start + index),
    [start, end]);

  const isInvalid = start >= end;

  useEffect(() => {
    if (isInvalid) throw new Error('start should be more than the end');
  }, [isInvalid]);

  const onClickNext = useCallback((event) => {
    if (value < end) {
      onChange(value + 1, event);
    }
  }, [value, end, onChange]);

  const onClickPrev = useCallback((event) => {
    if (value > 1) {
      onChange(value - 1, event);
    }
  }, [value, onChange]);

  if (isInvalid) return null;

  return (
    <div className={s.root}>
      <button
        type="button"
        aria-label="previous"
        className={s.prevArrow}
        disabled={value === 1}
        onClick={onClickPrev}
      >
        <img src={IconArrow} className={s.icon} alt='<' />
      </button>
      {array.map((pageNumber, index) => (
        <React.Fragment key={pageNumber}>
          {((value === array[array.length - 1]
            && index === array.length - 3)
            || (index + 1 === value - 1 && index > 3 && index < array.length - 2)) ? (
              <button
                type="button"
                className={cn(s.dots, s.leftDots)}
              >
                ...
              </button>
            ) : null}

          <button
            type="button"
            onClick={() => onChange(pageNumber)}
            className={cn(s.item, {
              [s.visible]: (
                // первый
                index === 0
                // второй
                || (index === 1 && value < array.length - 4)
                // третий
                || (index === 2 && value < array[5])
                // последний
                || index === array.length - 1
                // предпоследний
                || (value > array[4] && index === array.length - 2)
                // третий с конца
                || ((value === array.length && index === array.length - 3)
                  || (value === array[array.length - 5] && index === array.length - 3))
                // активный
                || index + 1 === value
                // слева от активного
                || index + 1 === value - 1
                // справа от активного
                || index + 1 === value + 1
              ),
              [s.isActive]: index + 1 === value,
            })}
          >
            {pageNumber}
          </button>

          {((index + 1 === value + 1
            && value + 1 <= array.length - 4
            && value > array[2])
            || (index === 3 && value < array[3])) ? (
              <button
                type="button"
                className={cn(s.dots, s.rightDots)}
              >
                ...
              </button>
            ) : null}
        </React.Fragment>
      ))}
      <button
        type="button"
        aria-label="next"
        className={s.nextArrow}
        disabled={value === end}
        onClick={onClickNext}
      >
        <img src={IconArrow} className={s.icon} alt='>' />
      </button>
    </div>
  );
};

export default Pagination;
