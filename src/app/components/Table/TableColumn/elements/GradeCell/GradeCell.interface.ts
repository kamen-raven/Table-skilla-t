import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface GradeCellInterface extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  status: 'Дозвонился' | 'Не дозвонился';
  errors: string[] | undefined;
}
