// components/Dropdown/Dropdown.tsx
import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './CustomDropdown.module.scss';
import ToggleIcon from '../../../../../../assets/svg/ToggleIcon.svg?react';
import { CustomDropdownInterface } from './CustomDropdown.interface';
import { formatDateInMoscowTime } from '~utils/date-fns';

import CalendarIcon from '../../../../../../assets/svg/IconCalendar.svg?react';
import useRequestStore from '../../../../../../store/useRequestStore';

const CustomDropdown: React.FC<CustomDropdownInterface> = ({ options, selectedValue, onSelectType, onSelectDate, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customStartDate, setCustomStartDate] = useState<Date | undefined>(undefined);
  const [customEndDate, setCustomEndDate] = useState<Date | undefined>(undefined);
  const setIsSorting = useRequestStore((state) => state.actions.setIsSorting);

  const dropdownRef = useRef<HTMLDivElement>(null);


  const toggleDropdown = () => {
    setIsOpen((prev) => !prev); // Переключение состояния
  };


  // Закрытие списка по клику снаружи
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (type === 'type' && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  const handleOptionClick = (value: 0 | 1 | "all" | string) => {
    if (type === 'type' && onSelectType) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      onSelectType(value);
      setIsOpen(false); // Закрытие списка после выбора
    } else if (type === 'date') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      onSelectDate(value)
    } else {
      setIsOpen(false);
    }

  };

  const applyCustomDates = () => {
    if (customStartDate && customEndDate && onSelectDate) {
      console.log(customStartDate.toISOString().split);
      setIsSorting(true);
      onSelectDate({ start: formatDateInMoscowTime(customStartDate), end: formatDateInMoscowTime(customEndDate) });
      setIsOpen(false);
    }
  };

  const isSelectedNew = (type === 'type' && selectedValue !== 'all') || (type === 'date' && selectedValue !== '');

  const setStyleOptions = {
    type: styles.options_type,
    date: styles.options_date
  }
  const setStyleOption = {
    type: styles.option_type,
    date: styles.option_date
  }

  return (
    <div className={styles.selectWrapper} ref={dropdownRef}>
      <button
        type="button"
        className={`${styles.selectButton} ${isSelectedNew ? styles.selected : ''}`}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        {options.find((option) => option.value === selectedValue)?.label}
        {type === 'type' ? <ToggleIcon /> : null}
      </button>

      {isOpen && (
        <div className={`${styles.options} ${setStyleOptions[type]}`} role="listbox">
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.option} ${setStyleOption[type]} ${selectedValue === option.value ? styles.selected : ''}`}
              onClick={() => handleOptionClick(option.value)}
              role="option"
            >
              {option.label}
            </div>
          ))}
          {type === 'date' && (
            <div className={`${styles.option} ${styles.option_custom} ${setStyleOption[type]}`}>
              <p className = {styles.dateTitle}
              >Указать даты
              </p>
              <div className={styles.datePickers}>
                <DatePicker
                  className = {styles.pickler}
                  selected={customStartDate}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  onChange={(date) => setCustomStartDate(date)}
                  selectsStart
                  startDate={customStartDate}
                  endDate={customEndDate}
                  dateFormat="yy-MM-dd"
                  placeholderText="__.__.__"
                  />
                  -
                <DatePicker
                  selected={customEndDate}
                  className = {styles.pickler}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  onChange={(date) => setCustomEndDate(date)}
                  selectsEnd
                  startDate={customStartDate}
                  endDate={customEndDate}
                  dateFormat="yy-MM-dd"
                  placeholderText="__.__.__"
                />
              <button onClick={applyCustomDates} className={styles.applyButton}>
              <CalendarIcon/>
              </button>
              </div>

            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
