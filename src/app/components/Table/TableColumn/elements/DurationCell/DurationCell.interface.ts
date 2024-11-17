import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface DurationCellInterface
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  duration: number;
  record?: string; //id записи
  partnershipId?: string; // id партнера
}
