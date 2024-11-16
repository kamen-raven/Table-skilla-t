import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { CallDataInterface } from '~interfaces/callListResponse.interface';

export interface TableFrameInterface extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  callListData: CallDataInterface[];
}
