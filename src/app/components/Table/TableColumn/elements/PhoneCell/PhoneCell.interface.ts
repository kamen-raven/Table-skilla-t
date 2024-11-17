import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface PhoneCellInterface extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  toNumber: string;
  contactName?: string;
  contactCompany?: string;
}
