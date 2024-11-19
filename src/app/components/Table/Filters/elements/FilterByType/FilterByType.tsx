import React, { useEffect, useRef, useState } from 'react';
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



  return (
    <div className={styles.selectWrapper} ref={dropdownRef}>
      {/* Кнопка для открытия/закрытия селекта */}
      <button
        type="button"
        className={styles.selectButton}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-controls="filterByTypeOptions"
      >
        {options.find((option) => option.value === inOutFilter)?.label || "Выбрать"}
        <ToggleIcon/>
      </button>

      {/* Список опций */}
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
