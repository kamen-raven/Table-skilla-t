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
