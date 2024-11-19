import React from 'react';
import styles from './ThElement.module.scss';
import { ThElementInterface } from './ThElement.interface';


const ThElement: React.FC<ThElementInterface> = ({ type, children }) => {


  const setData = {
    in_out: styles.th_inOut,
    date: styles.th_date,
    person_avatar: styles.th_personAvatar,
    to_number: styles.th_toNumber,
    source: styles.th_source,
    grade: styles.th_grade,
    record: styles.th_record,
    time: styles.th_time,
  }

  return (
    <th className={`${styles.th} ${setData[type]}`}>
      {children}
    </th>
  );
};

export { ThElement };
