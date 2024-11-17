import React from 'react';
import styles from './SourceCell.module.scss'
import { SourceCellInterface } from './SourceCell.interface';



const SourceCell: React.FC<SourceCellInterface> = ({ source }) => {
    return (
        <p className = {styles.source}>
          {source}
        </p>
    );
};

export { SourceCell };
