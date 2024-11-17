import React from 'react';
import styles from './PhoneCell.module.scss';
import { PhoneCellInterface } from './PhoneCell.interface';


const PhoneCell: React.FC<PhoneCellInterface> = ({ toNumber, contactName, contactCompany }) => {

  // выбираем темплейт в зависимости от того, какие данные у нас есть
  // если есть информация о контакте, то отображаем ее

  const renderContent = () => {
    switch (true) {
      case (!!toNumber && !!contactName && !contactCompany):
        return (
          <>
            <p className={`${styles.data} ${styles.data_main}`} >
              {contactName}
            </p >
            <p className={`${styles.data} ${styles.data_secondary}`} >
              {toNumber}
            </p >
          </>
        )
      case (!!toNumber && !!contactName && !!contactCompany):
        return (
          <>
            <p className={`${styles.data} ${styles.data_main}`} >
              {contactName}
            </p >
            <p className={`${styles.data} ${styles.data_secondary}`} >
              {contactCompany}
            </p >
          </>
        )

      default:
        return (
          <p className={`${styles.data} ${styles.data_main}`} >
            {toNumber}
          </p >
        )
    }
  }


  return (
    <div className={styles.contactWrapper}>
      {renderContent()}
    </div>
  );
};

export { PhoneCell };
