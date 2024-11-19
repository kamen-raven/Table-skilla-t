import { useState } from 'react';
import { useCallsListStore } from '../store/useCallsListStore';
import styles from './App.module.scss';

import TableFrame from './components/Table/TableFrame/TableFrame';
import useRequestStore from '../store/useRequestStore';
import useCallListRender from '~hooks/useCallListRender';
import { Filters } from './components/Table/Filters/Filters';

function App() {
  // стейт списка данных звонков
  const callListStore = {
    callList: useCallsListStore((state) => state.callListData),
    setCallList: useCallsListStore((state) => state.actions.setCallListData),
  }
  // запрос к данным о звонках
  const fetchCallList = useCallsListStore((state) => state.actions.fetchCallListData)

  // стейт состояния загрузки данных
  const loadingStore = {
    loading: useCallsListStore((state) => state.loadingData),
    setLoading: useCallsListStore((state) => state.helpers.setLoadingData),
  }
  // стейт состояния ошибки при загрузке
  const errorStore = {
    error: useCallsListStore((state) => state.errorData),
    setError: useCallsListStore((state) => state.helpers.setErrorData),
  }
  const [isFetching, setIsFetching] = useState(false); // флаг загрузки

  const inOutFilter = useRequestStore((state) => state.inOutFilter);
  const dateStart = useRequestStore((state) => state.dateStart);
  const dateEnd = useRequestStore((state) => state.dateEnd);
  const order = useRequestStore((state) => state.orderingFrom);
  const sortBy = useRequestStore((state) => state.sortingBy);
  const isSorting = useRequestStore((state) => state.isSorting);


  // если у нас нет данных, то обращаемся за ними
  /*   useEffect(() => {
      const firstRender = async () => {
        if (!callListStore.callList.length) {
          //* берем для отображения данные за 3 дня
          fetchCallList({
            date_start: dateStart,
            date_end: dateEnd,
          });
        }
      }

      firstRender();
    }, [callListStore.callList.length, dateEnd, dateStart, fetchCallList]);

   */
  useCallListRender()

  /*   useEffect(() => {
      const fetchFunc = async () => {
        if (!isFetching) {
          setIsFetching(true); // Устанавливаем флаг загрузки

          let params;

          if (inOutFilter !== "all") {
            params = { date_start: dateStart, date_end: dateEnd, in_out: inOutFilter };
          } else {
            params = { date_start: dateStart, date_end: dateEnd };
          }


          try {
            await fetchCallList(params)
          } catch (error) {
            console.error('Ошибка при выполнении fetchCallList:', error);
          } finally {
            setIsFetching(false); // Сбрасываем флаг загрузки
          }
        }
      }
      fetchFunc()
    }, [dateEnd, dateStart, inOutFilter, isFetching]); */





  return (
    <div className={styles.page}>
      <div className={styles.tableContainer}>

        {loadingStore.loading &&
          <p className={styles.message}>
            Загрузка...
          </p>
        }

        {errorStore.error &&
          <p className={styles.message}>
            {errorStore.error}
          </p>
        }

        {(!loadingStore.loading && !errorStore.error && callListStore.callList.length > 0) && (
          <>
            <Filters />
            <TableFrame callListData={callListStore.callList} />
          </>
        )}
      </div>
    </div>
  )
}

export default App;
