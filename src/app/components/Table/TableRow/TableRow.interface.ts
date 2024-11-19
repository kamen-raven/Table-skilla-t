import { Row } from '@tanstack/react-table';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { CallDataInterface } from '~interfaces/callListResponse.interface';

export interface TableRowInterface extends DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement> {
  row: Row<CallDataInterface>
}
