import React, { useState } from 'react';
import styles from './EmployeeCell.module.scss';
import { EmployeeCellInterface } from './EmployeeCell.interface';

import AvatarTemplate from "../../../../../../assets/svg/AvatarTemplate.svg?react";


const EmployeeCell: React.FC<EmployeeCellInterface> = ({ avatarImgUrl, personName, personSurname }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={styles.avatarWrapper}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}>

      {avatarImgUrl ?
        <img
          className={styles.img}
          src={avatarImgUrl}
          alt={`${personName} ${personSurname}`}
        />
        :
        <AvatarTemplate className={styles.img} />
      }

      {showTooltip &&
        <span className = {styles.tooltip}>
          {`${personName} ${personSurname}`}
        </span>
      }
    </div>
  );
};

export { EmployeeCell };
