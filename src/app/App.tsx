import { useEffect } from 'react';
import { useCallsListStore } from '../store/useCallsListStore';
import styles from './App.module.scss';
import TableFrame from './components/Table/TableFrame/TableFrame';

import { currentDate, threeDaysAgo } from "~utils/getDate";


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
    if (!callListStore.callList.length) {
      //* берем для отображения данные за 3 дня
      fetchCallList({
        date_start: threeDaysAgo,
        date_end: currentDate
      });
    }
  }, [callListStore.callList, fetchCallList]);

  return (
    <div className={styles.page}>
      <div className={styles.tableContainer}>
        {loadingStore.loading && <p>Загрузка данных...</p>}
        {errorStore.error && <p>{errorStore.error}</p>}
        {!loadingStore.loading && !errorStore.error && callListStore.callList.length > 0 && (
          <TableFrame callListData={callListStore.callList} />
        )}
      </div>
    </div>
  )
}

export default App;
