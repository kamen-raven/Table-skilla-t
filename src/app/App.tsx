import { useEffect } from 'react';
import { useCallsListStore } from '../store/useCallsListStore';
import styles from './App.module.scss';


import { currentDate, threeDays } from "~utils/date-fns";
import TableFrame from './components/Table/TableFrame/TableFrame';


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


  // если у нас нет данных, то обращаемся за ними
  useEffect(() => {
    const firstRender = async () => {
      if (!callListStore.callList.length) {
        //* берем для отображения данные за 3 дня
        fetchCallList({
          date_start: threeDays,
          date_end: currentDate,
        });
      }
    }

    firstRender();
  }, [callListStore.callList.length, fetchCallList]);


  




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
          <TableFrame callListData={callListStore.callList} />
        )}
      </div>
    </div>
  )
}

export default App;
