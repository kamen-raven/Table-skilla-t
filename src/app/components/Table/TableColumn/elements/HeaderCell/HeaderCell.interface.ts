import { ReactNode, DetailedHTMLProps, HTMLAttributes } from "react";

export interface HeaderCellInterface
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  type:"in_out"
      | "date"
      | "person_avatar"
      | "to_number"
      | "source"
      | "grade"
      | "record"
      | "time";
  children?: ReactNode;
}
