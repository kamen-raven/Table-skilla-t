import React from 'react';
import styles from './ClearFilters.module.scss';
import ClearIcon from '../../../../../../assets/svg/ButtonCancel.svg?react';
import useRequestStore from '../../../../../../store/useRequestStore';
import { threeDays, currentDate } from '~utils/date-fns';

const ClearFilters: React.FC = () => {
  const { setDateStart, setDateEnd, setDateLabel, setInOutFilter, setSort, setIsSorting, setOrder } = useRequestStore((state) => state.actions);


  const onClear = () => {
    setIsSorting(false);
    setDateStart(threeDays);
    setDateEnd(currentDate);
    setDateLabel('3days');
    setInOutFilter('all');
    setSort('date');
    setOrder('DESC');
  }

  return (
    <button className={styles.clearButton} onClick={onClear}>
      Сбросить фильтры
      <ClearIcon />
    </button>
  );
};

export { ClearFilters };
