import { create } from "zustand";

interface HoverStore {
  hoveredRowId: string | null;
  setHoveredRow: (rowId: string | null) => void;
/*   showAudioBar: boolean;
  setShowAudioBar: (value: boolean) => void; */
}

const useHoverStore = create<HoverStore>((set) => ({
  hoveredRowId: null,
  setHoveredRow: (rowId) => set({ hoveredRowId: rowId }),

/*   showAudioBar: false,
  setShowAudioBar:(value) => set({ showAudioBar: value }), */
}));

export default useHoverStore;
