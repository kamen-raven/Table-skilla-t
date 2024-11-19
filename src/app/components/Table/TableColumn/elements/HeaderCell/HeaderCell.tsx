import React from 'react';
import styles from './HeaderCell.module.scss';
import { HeaderCellInterface } from './HeaderCell.interface';
<<<<<<< HEAD
import ToggleButton from '../../../../../../assets/svg/ToggleIcon.svg?react';
import useInteractionStore from '../../../../../../store/useInteractionStore';
import useRequestStore from '../../../../../../store/useRequestStore';

const HeaderCell: React.FC<HeaderCellInterface> = ({ type }) => {
  // стейт кликнутого заголовка
  const headerCellType = useInteractionStore((state) => state.headerCellType); // Текущая активная ячейка
  const setHeaderCellType = useInteractionStore((state) => state.setHeaderCellType); // Обновление активной ячейки
  // запрос к данным о звонках
 // const fetchCallList = useCallsListStore((state) => state.actions.fetchCallListData)

  // стейт активной сортировки
  const isSorting = useRequestStore((state) => state.isSorting);
  const setIsSorting = useRequestStore((state) => state.actions.setIsSorting);
  // стейт сортировки по типу
  //const sortBy = useRequestStore((state) => state.sortingBy);
  const setSort = useRequestStore((state) => state.actions.setSort);
  // стейт сортировки по порядку
  const order = useRequestStore((state) => state.orderingFrom);
  const setOrder = useRequestStore((state) => state.actions.setOrder);

  // Функция изменения типа сортировки
  const setSortedBy = async() => {
    if (type === 'date' || type === 'duration') {
      setIsSorting(true); // Устанавливаем сортировку
      setHeaderCellType(type); // Обновляем headerCellType
      setSort(type); // Обновляем критерий сортировки
    }

    if (type !== headerCellType) {
      setIsSorting(false); // Устанавливаем сортировку
    }
  };


  // Функция изменения порядка сортировки
  const toggleOrder = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем конфликт событий

    if (type === 'date' || type === 'duration') {
      setHeaderCellType(type); // Устанавливаем текущую ячейку активной
      const newOrder = order === "DESC" ? "ASC" : "DESC";
      setOrder(newOrder);
    }

    setSortedBy();
  };


  // Данные для заголовков и стилей
  const setData = {
    in_out: { style: styles.headerCellType_inOut, title: "Тип" },
    date: { style: styles.headerCellType_date, title: "Время" },
    person_avatar: { style: styles.headerCellType_personAvatar, title: "Сотрудник" },
    to_number: { style: styles.headerCellType_toNumber, title: "Звонок" },
    source: { style: styles.headerCellType_source, title: "Источник" },
    grade: { style: styles.headerCellType_grade, title: "Оценка" },
    record: { style: styles.headerCellType_record, title: "" },
    duration: { style: styles.headerCellType_time, title: "Длительность" },
  };


  return (
    <div className={`${styles.headerCellType} ${setData[type].style}`} onClick={setSortedBy}
      style={{ color: (type === headerCellType) && isSorting ? 'blue' : 'none' } }
    >
      {/* Заголовок шапки */}
      {setData[type].title}

      {/* сортировка во ВРЕМЕНИ и ДЛИТЕЛЬНОСТИ */}
      {type === "date" || type === 'duration' ?
        <div className={`${styles.toggleOrder}
          ${(type === headerCellType) && isSorting && order === 'DESC' ? styles.toggleOrder_asc : styles.toggleOrder_desc}`}
          onClick={toggleOrder}>
          <ToggleButton  style={{ fill: (type === headerCellType) && isSorting ? 'blue' : '' } } />
        </div>
        : null
      }
    </div>
  );
=======


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
>>>>>>> a08a0698e20b2ee794f724a6e9c52ba27801396f
};

export { HeaderCell };
