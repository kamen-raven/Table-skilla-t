// components/FilterByType/FilterByType.tsx
import React from 'react';
import useRequestStore from '../../../../../../store/useRequestStore.ts';
import CustomDropdown from '../CustomSelect/CustomDropdown.tsx';


const FilterByType: React.FC = () => {
  const inOutFilter = useRequestStore((state) => state.inOutFilter);
  const setInOutFilter = useRequestStore((state) => state.actions.setInOutFilter);
  const setIsSorting = useRequestStore((state) => state.actions.setIsSorting);
  const options = [
    { value: 'all', label: 'Все типы' },
    { value: '1', label: 'Входящие' },
    { value: '0', label: 'Исходящие' },
  ];

  const handleSelect = (value: 0 | 1 | "all") => {
    setInOutFilter(value);
    setIsSorting(true);
  };

  return (

      <CustomDropdown
        options={options}
        selectedValue={inOutFilter}
        onSelectType={handleSelect}
        type={'type'}
      />

  );
};

export { FilterByType };


/* import React, { useEffect, useRef, useState } from 'react';
import styles from './FilterByType.module.scss';
import useRequestStore from '../../../../../../store/useRequestStore.ts';
import ToggleIcon from '../../../../../../assets/svg/ToggleIcon.svg?react';

const FilterByType: React.FC = () => {
  const inOutFilter = useRequestStore((state) => state.inOutFilter);
  const setInOutFilter = useRequestStore((state) => state.actions.setInOutFilter);

  const [isOpen, setIsOpen] = useState(false); // Состояние для отображения/скрытия списка опций
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: "all", label: "Все типы" },
    { value: "1", label: "Входящие" },
    { value: "0", label: "Исходящие" },
  ];

  const handleOptionClick = (value: 0 | 1 | 'all') => {
    setInOutFilter(value);
    setIsOpen(false); // Закрываем список после выбора
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev); // Переключение состояния
  };


  // закрытие списка по клику снаружи
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

  // Условие для изменения цвета
  const isSelectedNotAll = inOutFilter !== 'all';


  return (
    <div className={styles.selectWrapper} ref={dropdownRef}>

      <button
        type="button"
        className={`${styles.selectButton} ${isSelectedNotAll ? styles.selectedButton : ''}`}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-controls="filterByTypeOptions"
      >
        {options.find((option) => option.value === inOutFilter)?.label}
        <ToggleIcon/>
      </button>


      {isOpen && (
        <div className={styles.options} id="filterByTypeOptions" role="listbox">
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.option} ${inOutFilter === option.value ? styles.selected : ''}`}
              onClick={() => handleOptionClick(option.value as 0 | 1 | 'all')}
              role="option"
              aria-selected={inOutFilter === option.value}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { FilterByType };
 */
