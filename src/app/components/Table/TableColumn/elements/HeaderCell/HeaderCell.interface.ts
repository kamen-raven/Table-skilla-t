import { ReactNode, DetailedHTMLProps, HTMLAttributes } from "react";

export interface HeaderCellInterface
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  type:"in_out"
      | "date"
      | "person_avatar"
      | "to_number"
      | "source"
      | "grade"
<<<<<<< HEAD
      | "duration";
  children?: ReactNode;

=======
      | "record"
      | "time";
  children?: ReactNode;
>>>>>>> a08a0698e20b2ee794f724a6e9c52ba27801396f
}
