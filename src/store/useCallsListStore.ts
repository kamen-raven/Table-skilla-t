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
  actions: {
    setCallListData: (data: CallDataInterface[]) => void;
    fetchCallListData: (params: FetchCallsParams) => Promise<void>;
  };
}

export const useCallsListStore = create<CallsListStoreInterface>((set, get) => ({
    callListData: [],
    loadingData: false,
    errorData: null,
    helpers: {
      setLoadingData: (value) => set({ loadingData: value }),
      setErrorData: (value) => set({ errorData: value }),
    },
    actions: {
      setCallListData: (data) => set({ callListData: data }),
      fetchCallListData: async (params) => {
        get().helpers.setLoadingData(true);
        get().helpers.setErrorData(null);

        try {
          const data = await fetchCalls(params);
          set({ callListData: data.results });
        } catch (error) {
          // Выводим ошибку
          console.error("Failed to fetch data:", error);
          get().helpers.setErrorData(`${error}`);
          // Сбрасываем данные в случае ошибки
          set({ callListData: [] });
        } finally {
          get().helpers.setLoadingData(false);
        }
      },
    },
  })
);

    /*
    if (callListData.length > 0) {

      } else {
        await useCallsListStore.fetchCallListData();
      } */
