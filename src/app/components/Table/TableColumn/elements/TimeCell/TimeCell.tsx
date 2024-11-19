import React from 'react';
import styles from './TimeCell.module.scss';
import { TimeCellInterface } from './TimeCell.interface';
import { formatTimeWithDateFns } from '~utils/date-fns';


const TimeCell: React.FC<TimeCellInterface> = ({ timeData }) => {
  const time = formatTimeWithDateFns(timeData);

  return (
    <p className={styles.time}>
      {time}
    </p>
  );
};

export { TimeCell };
