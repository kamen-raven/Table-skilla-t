import { useEffect, useState } from "react";
import { useCallsListStore } from "../store/useCallsListStore";
import useRequestStore from "../store/useRequestStore";
import { FetchCallsParams } from "~api/components/fetchCallList";


const useCallListRender = () => {
  // Доступ к состояниям
  const callListStore = {
    callList: useCallsListStore((state) => state.callListData),
    setCallList: useCallsListStore((state) => state.actions.setCallListData),
  };
  const fetchCallList = useCallsListStore(
    (state) => state.actions.fetchCallListData
  );

  const inOutFilter = useRequestStore((state) => state.inOutFilter);
  const dateStart = useRequestStore((state) => state.dateStart);
  const dateEnd = useRequestStore((state) => state.dateEnd);
  const order = useRequestStore((state) => state.orderingFrom);
  const sortBy = useRequestStore((state) => state.sortingBy);
  const isSorting = useRequestStore((state) => state.isSorting);

  const [isFetching, setIsFetching] = useState(false); // флаг загрузки

  // useEffect для первичного рендера и изменений
  useEffect(() => {
    // Функция для генерации параметров fetch
    const generateFetchParams = () => {
      const params: FetchCallsParams = {
        date_start: dateStart,
        date_end: dateEnd,
      };

      if (inOutFilter !== "all") {
        params.in_out = inOutFilter;
      }

      if (isSorting) {
        params.sort_by = sortBy;
        params.order = order;
      }

      return params;
    };

    const fetchData = async () => {
      setIsFetching(true);

      try {
        const params = generateFetchParams();
        await fetchCallList(params);
      } finally {
        setIsFetching(false);
      }
    };

    // Условие для первичного рендера
    if (!callListStore.callList.length) {
      fetchData();
    }

    // Условие для обновления данных при изменении фильтров и сортировки
    if (isSorting || inOutFilter !== "all" || dateStart || dateEnd) {
      fetchData();
    }
  }, [
    callListStore.callList.length,
    dateStart,
    dateEnd,
    inOutFilter,
    order,
    sortBy,
    isSorting,
    fetchCallList,
  ]);

  return isFetching;
};

export default useCallListRender;
