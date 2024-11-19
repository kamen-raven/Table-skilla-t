import { create } from "zustand";

interface HoverStore {
  hoveredRowId: string | null;
  setHoveredRow: (rowId: string | null) => void;
  headerCellType: "date" | "duration" | null;
  setHeaderCellType: (type: "date" | "duration" | null) => void;
}

const useInteractionStore = create<HoverStore>((set) => ({
  hoveredRowId: null,
  setHoveredRow: (rowId) => set({ hoveredRowId: rowId }),
  headerCellType: null,
  setHeaderCellType: (type) => set({ headerCellType: type }),
}));

export default useInteractionStore;
