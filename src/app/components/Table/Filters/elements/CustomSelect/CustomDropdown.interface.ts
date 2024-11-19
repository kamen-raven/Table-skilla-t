export interface CustomDropdownInterface {
  options: { value: string; label: string }[];
  selectedValue: 0 | 1 | "all" | string;
  onSelectType?: (value:  0 | 1 | "all") => void;
  onSelectDate?: (value: string | { start: string; end: string }) => void;
  type: "type" | "date";
}
