import React from 'react';
import { format } from "date-fns";
import styles from './FilterByDate.module.scss';
import { FilterByDateInterface } from './FilterByDate.interface.ts';
import useRequestStore from '../../../../../../store/useRequestStore.ts';


const FilterByDate: React.FC<FilterByDateInterface> = ({  }) => {
  const { setDateStart, setDateEnd } = useRequestStore((state) => state.actions);

  const handleDateChange = (range: "3days" | "week" | "month" | "year") => {
    const now = new Date();
    let start: Date;

    switch (range) {
      case "3days":
        start = new Date(now.setDate(now.getDate() - 2));
        break;
      case "week":
        start = new Date(now.setDate(now.getDate() - 6));
        break;
      case "month":
        start = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case "year":
        start = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
    }

    setDateStart(format(start, "yyyy-MM-dd"));
    setDateEnd(format(new Date(), "yyyy-MM-dd"));
  };

  return (
    <div>
      <label htmlFor="filterByDate">Время: </label>
      <select
        id="filterByDate"
        onChange={(e) => handleDateChange(e.target.value as "3days" | "week" | "month" | "year")}
      >
        <option value="3days">3 дня</option>
        <option value="week">Неделя</option>
        <option value="month">Месяц</option>
        <option value="year">Год</option>
      </select>
    </div>
  );
};

export { FilterByDate };
