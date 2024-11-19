import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface DurationCellInterface
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  duration: number;
<<<<<<< HEAD
  rowId: string;
=======
>>>>>>> a08a0698e20b2ee794f724a6e9c52ba27801396f
  record?: string; //id записи
  partnershipId?: string; // id партнера
}
