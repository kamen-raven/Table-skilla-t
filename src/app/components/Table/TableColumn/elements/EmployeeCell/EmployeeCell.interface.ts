import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface EmployeeCellInterface extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  avatarImgUrl?: string;
  personName?: string;
  personSurname?: string;
}
