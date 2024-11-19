import { create } from "zustand";

import fetchCalls, { FetchCallsParams } from "~api/components/fetchCallList";
import { CallDataInterface } from "~interfaces/callListResponse.interface";

interface CallsListStoreInterface {
  callListData: CallDataInterface[];
  loadingData: boolean;
  errorData: string | null;
  helpers: {
    setLoadingData: (value: boolean) => void;
    setErrorData: (value: string | null) => void;
  };
  sortingBy: "date" | "duration";
  orderingFrom: "ASC" | "DESC";
  isSorting: boolean;
  actions: {
    setCallListData: (data: CallDataInterface[]) => void;
    setSort: (sort: "date" | "duration") => void;
    setOrder: (order: "ASC" | "DESC") => void;
    setIsSorting: (value: boolean) => void;
    fetchCallListData: (params: FetchCallsParams) => Promise<void>;
  };
}

export const useCallsListStore = create<CallsListStoreInterface>(
  (set, get) => ({
    callListData: [],
    loadingData: false,
    errorData: null,
    helpers: {
      setLoadingData: (value) => set({ loadingData: value }),
      setErrorData: (value) => set({ errorData: value }),
    },

    sortingBy: "date", // "date" или "duration"
    orderingFrom: "DESC", // "ASC" или "DESC"
    isSorting: false,

    actions: {
      setCallListData: (data) => set({ callListData: data }),

      setSort: (sort) => set({ sortingBy: sort }),
      setOrder: (order) => set({ orderingFrom: order }),
      setIsSorting: (value) => set({ isSorting: value }),
      // обработчик запроса данных
      fetchCallListData: async (params) => {
        get().helpers.setLoadingData(true); // устанавливаем обозначение загрузки данных
        get().helpers.setErrorData(null);

        try {
          const data = await fetchCalls(params);

          if (data.total_rows !== "0") {
            set({ callListData: data.results });
          } else {
            //* если данных нет, то выводим сообщение об этом
            get().helpers.setErrorData(
              "Данные за указанный период отсутствуют"
            );
          }

        } catch (error) {
          // Выводим ошибку
          console.error("Ошибка при загрузке данных:", error);
          get().helpers.setErrorData(`Ошибка при загрузке данных: ${error}`);
          // Сбрасываем данные в случае ошибки
          set({ callListData: [] });
        } finally {
          get().helpers.setLoadingData(false);
        }
      },
    },
  })
);
