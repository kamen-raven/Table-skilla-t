import { useCallsListStore } from '../store/useCallsListStore';
import styles from './App.module.scss';

import TableFrame from './components/Table/TableFrame/TableFrame';

import useCallListRender from '~hooks/useCallListRender';
import { Filters } from './components/Table/Filters/Filters';

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
            <br/>
            Пожалуйста, обновите страницу и попробуйте заново
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
