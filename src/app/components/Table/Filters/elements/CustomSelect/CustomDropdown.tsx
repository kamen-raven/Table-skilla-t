// components/Dropdown/Dropdown.tsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './CustomDropdown.module.scss';
import ToggleIcon from '../../../../../../assets/svg/ToggleIcon.svg?react';
import { CustomDropdownInterface } from './CustomDropdown.interface';
import { format } from 'date-fns';
import CalendarIcon from '../../../../../../assets/svg/IconCalendar.svg?react';

const CustomDropdown: React.FC<CustomDropdownInterface> = ({ options, selectedValue, onSelectType, onSelectDate, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customDateRange, setCustomDateRange] = useState<string>('');

  const dropdownRef = useRef<HTMLDivElement>(null);


  const toggleDropdown = () => {
    setIsOpen((prev) => !prev); // Переключение состояния
  };


  // Закрытие списка по клику снаружи
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);




  const handleOptionClick = (value: 0 | 1 | "all"| string) => {
    if (type === 'type' && onSelectType) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    onSelectType(value);
  } else if (type === 'date' && value !== 'custom') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      onSelectDate(value)
    } else {
      setIsOpen(false);
    }

    setIsOpen(false); // Закрытие списка после выбора
  };


  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomDateRange(e.target.value);
  };

  const handleDateSubmit = () => {
    const [startDate, endDate] = customDateRange.split('-');
    if (startDate && endDate && onSelectDate) {
      const startFormatted = format(new Date(startDate.trim()), 'yyyy-MM-dd');
      const endFormatted = format(new Date(endDate.trim()), 'yyyy-MM-dd');
      onSelectDate({ start: startFormatted, end: endFormatted });
    }
  };


  const isSelectedNew = (type === 'type' && selectedValue !== 'all') || (type === 'date' && selectedValue !== '');

  const setStyle = {
    type: styles.options_type,
    date: styles.options_date
  }

  return (
    <div className={`${styles.selectWrapper}`} ref={dropdownRef}>
      <button
        type="button"
        className={`${styles.selectButton} ${isSelectedNew ? styles.selected : ''}`}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        {options.find((option) => option.value === selectedValue)?.label}
        {type === 'type' ?  <ToggleIcon/> : null}
      </button>

      {isOpen && (
        <div className={`${styles.options}  ${setStyle[type]}`} role="listbox">
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.option} ${selectedValue === option.value ? styles.selected : ''}`}
              onClick={() => handleOptionClick(option.value)}
              role="option"
            >
              {option.label}
            </div>
          ))}

           {/* Добавляем возможность указания своих дат */}
           {selectedValue === 'custom' && (
            <div className={styles.customInput}>
              <input
                type="text"
                value={customDateRange}
                onChange={handleDateChange}
                placeholder="дд-мм-гггг __.__.____ - __.__.____"
              />
              <button onClick={handleDateSubmit} aria-label="Submit Dates">
              <CalendarIcon />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
