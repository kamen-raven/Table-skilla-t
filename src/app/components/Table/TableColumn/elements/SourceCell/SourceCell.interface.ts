import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SourceCellInterface extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  source: string;
}
