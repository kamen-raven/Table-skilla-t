import React, { useEffect, useState } from 'react';
import styles from './HeaderCell.module.scss';
import { HeaderCellInterface } from './HeaderCell.interface';
import { useCallsListStore } from '../../../../../../store/useCallsListStore';
import ToggleButton from '../../../../../../assets/svg/ToggleIcon.svg?react';
import useInteractionStore from '../../../../../../store/useInteractionStore';
import { currentDate, threeDays } from '~utils/date-fns';

const HeaderCell: React.FC<HeaderCellInterface> = ({ type }) => {


  // стейт кликнутого заголовка
  const headerCellType = useInteractionStore((state) => state.headerCellType); // Текущая активная ячейка
  const setHeaderCellType = useInteractionStore((state) => state.setHeaderCellType); // Обновление активной ячейки

  // стейт активной сортировки
  const isSorting = useCallsListStore((state) => state.isSorting);
  const setIsSorting = useCallsListStore((state) => state.actions.setIsSorting);
  // запрос к данным о звонках
  const fetchCallList = useCallsListStore((state) => state.actions.fetchCallListData)
  // стейт сортировки по типу
  const sortBy = useCallsListStore((state) => state.sortingBy);
  const setSort = useCallsListStore((state) => state.actions.setSort);

  // стейт сортировки по порядку
  const order = useCallsListStore((state) => state.orderingFrom);
  const setOrder = useCallsListStore((state) => state.actions.setOrder);


  //const [localOrder, setLocalOrder] = useState<"ASC" | "DESC">(order); // Локальный стейт порядка сортировки
  const [isFetching, setIsFetching] = useState(false); // Новый флаг загрузки


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


      if (type === headerCellType && !isFetching) {
        setIsFetching(true); // Устанавливаем флаг загрузки
        try {
          await fetchCallList({
            date_start: threeDays,
            date_end: currentDate,
            sort_by: sortBy,
            order: order,
          });
        } catch (error) {
          console.error('Ошибка при выполнении fetchCallList:', error);
        } finally {
          setIsFetching(false); // Сбрасываем флаг загрузки
        }
      }


  };




  // Функция изменения порядка сортировки
  const toggleOrder = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем конфликт событий

    if (type === 'date' || type === 'duration') {
      setHeaderCellType(type); // Устанавливаем текущую ячейку активной
      const newOrder = order === "DESC" ? "ASC" : "DESC";
      setOrder(newOrder); // Локальный стейт
      //setLocalOrder(newOrder);

    }

    if (type !== headerCellType) {
      setIsSorting(false); // Устанавливаем сортировку
    }

    if (type === headerCellType && !isFetching) {
      setIsFetching(true); // Устанавливаем флаг загрузки
      try {
        await fetchCallList({
          date_start: threeDays,
          date_end: currentDate,
          sort_by: sortBy,
          order: order,
        });
      } catch (error) {
        console.error('Ошибка при выполнении fetchCallList:', error);
      } finally {
        setIsFetching(false); // Сбрасываем флаг загрузки
      }
    }

  };


  /*   // API-запрос при изменении сортировки
    useEffect(() => {
      if (sortBy) {
        fetchCallList({
          date_start: '2024-11-01',
          date_end: '2024-11-10',
          sort_by: sortBy,
          order: localOrder,
        });
      }
    }, [sortBy, localOrder, fetchCallList]);

   */



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
        <span className={`${styles.toggleOrder}
          ${type === headerCellType && order === 'DESC' ? styles.toggleOrder_desc : styles.toggleOrder_asc}`}
          onClick={toggleOrder}>
          <ToggleButton />
        </span>
        : null
      }
    </div>
  );
};

export { HeaderCell };
