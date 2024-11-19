import { useCallsListStore } from '../store/useCallsListStore';
import styles from './App.module.scss';
<<<<<<< HEAD

import TableFrame from './components/Table/TableFrame/TableFrame';

import useCallListRender from '~hooks/useCallListRender';
import { Filters } from './components/Table/Filters/Filters';
=======


import { currentDate, threeDays } from "~utils/date-fns";
import TableFrame from './components/Table/TableFrame/TableFrame';

>>>>>>> a08a0698e20b2ee794f724a6e9c52ba27801396f

function App() {
  // стейт списка данных звонков
  const callListStore = {
    callList: useCallsListStore((state) => state.callListData),
    setCallList: useCallsListStore((state) => state.actions.setCallListData),
  }


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

  useCallListRender()

<<<<<<< HEAD
=======
  // если у нас нет данных, то обращаемся за ними
  useEffect(() => {
    if (!callListStore.callList.length) {
      //* берем для отображения данные за 3 дня
      fetchCallList({
        date_start: '2024-11-10',
        date_end: currentDate
      });
    }
  }, [callListStore.callList, fetchCallList]);
>>>>>>> a08a0698e20b2ee794f724a6e9c52ba27801396f



  return (
    <div className={styles.page}>
      <div className={styles.tableContainer}>

        {loadingStore.loading &&
          <p className={styles.message}>
<<<<<<< HEAD
            Загрузка...
=======
            Загрузка данных...
>>>>>>> a08a0698e20b2ee794f724a6e9c52ba27801396f
          </p>
        }

        {errorStore.error &&
          <p className={styles.message}>
            {errorStore.error}
<<<<<<< HEAD
            <br/>
            Пожалуйста, обновите страницу и попробуйте заново
=======
>>>>>>> a08a0698e20b2ee794f724a6e9c52ba27801396f
          </p>
        }

        {(!loadingStore.loading && !errorStore.error && callListStore.callList.length > 0) && (
<<<<<<< HEAD
          <>
            <Filters />
            <TableFrame callListData={callListStore.callList} />
          </>
=======
          <TableFrame callListData={callListStore.callList} />
>>>>>>> a08a0698e20b2ee794f724a6e9c52ba27801396f
        )}
      </div>
    </div>
  )
}

export default App;
