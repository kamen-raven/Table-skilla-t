import { create } from "zustand";
import { currentDate, threeDays } from "~utils/date-fns";

interface RequestStoreInterface {
  dateStart: string; // Дата начала
  dateEnd: string; // Дата конца
  inOutFilter: 0 | 1 | 'all'; // Тип звонков (0 - исходящие, 1 - входящие)
  sortingBy: "date" | "duration";
  orderingFrom: "ASC" | "DESC";
  isSorting: boolean;
  dateLabel: '3days' | 'week' | 'month' | 'year' | 'custom';
  actions: {
    setDateStart: (date: string) => void;
    setDateEnd: (date: string) => void;
    setInOutFilter: (value: 0 | 1 | 'all') => void;
    setSort: (sort: "date" | "duration") => void;
    setOrder: (order: "ASC" | "DESC") => void;
    setIsSorting: (value: boolean) => void;
    setDateLabel: (value: '3days' | 'week' | 'month' | 'year' | 'custom') => void;
  };
}

const useRequestStore = create<RequestStoreInterface>((set) => ({
  dateStart: threeDays, // Дата начала
  dateEnd: currentDate, // Дата конца
  inOutFilter: 'all', // Тип звонков
  sortingBy: "date", // "date" или "duration"
  orderingFrom: "DESC", // "ASC" или "DESC"
  isSorting: false,
  dateLabel: '3days',
  actions: {
    setDateStart: (date) => set({ dateStart: date }),
    setDateEnd: (date) => set({ dateEnd: date }),
    setInOutFilter: (value) => set({ inOutFilter: value }),
    setSort: (sort) => set({ sortingBy: sort }),
    setOrder: (order) => set({ orderingFrom: order }),
    setIsSorting: (value) => set({ isSorting: value }),
    setDateLabel: (value) => set({ dateLabel: value }),
  },
}));

export default useRequestStore;
