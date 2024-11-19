import { create } from "zustand";

interface InteractionStoreInterface {
  hoveredRowId: string | null;
  setHoveredRow: (rowId: string | null) => void;
  headerCellType: "date" | "duration" | null;
  setHeaderCellType: (type: "date" | "duration" | null) => void;
}

const useInteractionStore = create<InteractionStoreInterface>((set) => ({
  hoveredRowId: null,
  setHoveredRow: (rowId) => set({ hoveredRowId: rowId }),
  headerCellType: null,
  setHeaderCellType: (type) => set({ headerCellType: type }),
}));

export default useInteractionStore;
