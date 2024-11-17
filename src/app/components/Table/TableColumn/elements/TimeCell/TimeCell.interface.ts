import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface TimeCellInterface extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  timeData: string;
}
