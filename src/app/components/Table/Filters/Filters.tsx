import React from 'react';
import styles from './Filters.module.scss';
import { FilterByType, FilterByDate } from './elements/index.ts';


const Filters: React.FC = () => {
  return (
    <div className={styles.filtersContainer}>
      <FilterByType />
      <FilterByDate />
    </div>
  );
};

export { Filters };
