import React from 'react';
import styles from './Filters.module.scss';
import { FilterByType, FilterByDate } from './elements/index.ts';
import { ClearFilters } from './elements/ClearFilters/ClearFilters.tsx';
import useRequestStore from '../../../../store/useRequestStore.ts';


const Filters: React.FC = () => {
  const isSorting = useRequestStore((state) => state.isSorting);


  return (
    <div className={styles.filtersContainer}>
      <div className={styles.leftCOntainer}>
        <FilterByType />
        {isSorting ?
          <ClearFilters />
          : null}
      </div>
      <FilterByDate />
    </div>
  );
};

export { Filters };
