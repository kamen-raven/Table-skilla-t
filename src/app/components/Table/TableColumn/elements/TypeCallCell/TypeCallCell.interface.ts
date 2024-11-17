import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface TypeCallCellInterface extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  status: "Дозвонился" | "Не дозвонился";
  inOut: 1 | 0; // in / out
}
