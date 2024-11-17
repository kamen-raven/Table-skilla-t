import React from 'react';
import styles from './TypeCallCell.module.scss';
import { TypeCallCellInterface } from './TypeCallCell.interface';
import CallIcon from '../../../../../../assets/svg/CallIcon.svg?react';

const TypeCallCell: React.FC<TypeCallCellInterface> = ({ inOut, status  }) => {


  const type = {
    0: styles.typeIcon__type_in,
    1: styles.typeIcon__type_out
  }

  const result = {
    'Дозвонился': '',
    'Не дозвонился': styles.typeIcon__status_fail,
  }



    return (
        <div className={styles.typeWrapper}>
          <CallIcon className={`${result[status]} ${type[inOut]} `} />
        </div>
    );
};

export { TypeCallCell };
