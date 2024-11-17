import React from 'react';
import styles from './HeaderCell.module.scss';
import { HeaderCellInterface } from './HeaderCell.interface';


const HeaderCell: React.FC<HeaderCellInterface> = ({ type }) => {
  const setData = {
    in_out: {
      style: styles.headerCellType_inOut,
      title: 'Тип'
    },
    date: {
      style: styles.headerCellType_date,
      title: 'Время'
    },
    person_avatar: {
      style: styles.headerCellType_personAvatar,
      title: 'Сотрудник'
    },
    to_number: {
      style: styles.headerCellType_toNumber,
      title: 'Звонок'
    },
    source: {
      style: styles.headerCellType_source,
      title: 'Источник'
    },
    grade: {
      style: styles.headerCellType_grade,
      title: 'Оценка'
    },
    record: {
      style: styles.headerCellType_record,
      title: ''
    },
    time: {
      style: styles.headerCellType_time,
      title: 'Длительность'
    },
  }



    return (
        <div className={`${styles.headerCellType} ${setData[type].style}`}>
          {setData[type].title}
        </div>
    );
};

export { HeaderCell };
