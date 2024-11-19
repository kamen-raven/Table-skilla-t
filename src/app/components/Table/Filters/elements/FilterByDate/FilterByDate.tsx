// components/FilterByDate/FilterByDate.tsx
import React from 'react';
import { format } from 'date-fns';
import styles from './FilterByDate.module.scss';
import useRequestStore from '../../../../../../store/useRequestStore.ts';
import CustomDropdown from '../CustomSelect/CustomDropdown.tsx';

import ArrowIcon from '../../../../../../assets/svg/ToggleIcon.svg?react';
import CalendarIcon from '../../../../../../assets/svg/IconCalendar.svg?react';

const FilterByDate: React.FC = () => {
  const setDateStart = useRequestStore((state) => state.actions.setDateStart);
  const setDateEnd = useRequestStore((state) => state.actions.setDateEnd);
  const dateLabel = useRequestStore((state) => state.dateLabel);
  const setDateLabel = useRequestStore((state) => state.actions.setDateLabel);
  const setIsSorting = useRequestStore((state) => state.actions.setIsSorting);

  const options = [
    { value: '3days', label: '3 дня' },
    { value: 'week', label: 'Неделя' },
    { value: 'month', label: 'Месяц' },
    { value: 'year', label: 'Год' },
    { value: 'custom', label: 'Указать даты' },
  ];

  const handleSelect = (value: string | { start: string; end: string }) => {
    const now = new Date();
    let start: Date;


    if (typeof value === 'string') {
      // Если это строковое значение из заранее определенных диапазонов
      switch (value) {
        case '3days':
          start = new Date(now.setDate(now.getDate() - 2));
          setDateLabel('3days');
          break;
        case 'week':
          start = new Date(now.setDate(now.getDate() - 6));
          setDateLabel('week');
          break;
        case 'month':
          start = new Date(now.setMonth(now.getMonth() - 1));
          setDateLabel('month');
          break;
        case 'year':
          start = new Date(now.setFullYear(now.getFullYear() - 1));
          setDateLabel('year');
          break;
        default:
          start = now;
          setDateLabel('3days');
          break;
      }

      setDateStart(format(start, 'yyyy-MM-dd'));
      setDateEnd(format(new Date(), 'yyyy-MM-dd'));
      setIsSorting(true);
    } else if (typeof value === 'object' && value.start && value.end) {
      // Если это объект с датами
      setDateStart(value.start);
      setDateEnd(value.end);
    }
  };

  return (
    <div className={styles.dateFilter}>
      <button className={`${styles.button} ${styles.button_left}`}>
        <ArrowIcon />
      </button>

      <div className={styles.selectWrapper}>

        <div className={styles.calendarIcon}>
          <CalendarIcon />
        </div>
        <CustomDropdown
          options={options}
          selectedValue={dateLabel} // Значение по умолчанию
          onSelectDate={handleSelect}
          type='date'
        />
      </div>
      <button className={`${styles.button} ${styles.button_right}`}>
        <ArrowIcon />
      </button>

    </div>
  );
};

export { FilterByDate };
