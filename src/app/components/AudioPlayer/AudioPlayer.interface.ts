import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface AudioPlayerInterface extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  audioUrl?:  string;  //id записи
  fileName?: string;
  onClose: () => void;
}
