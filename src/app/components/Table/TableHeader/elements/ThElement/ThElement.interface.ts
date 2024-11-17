import { ReactNode, DetailedHTMLProps, HTMLAttributes } from 'react';
import { CallDataInterface } from '~interfaces/callListResponse.interface';

export interface ThElementInterface extends DetailedHTMLProps<HTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement> {
  type:(string & {}) | keyof CallDataInterface | undefined;
  children?: ReactNode;
}
