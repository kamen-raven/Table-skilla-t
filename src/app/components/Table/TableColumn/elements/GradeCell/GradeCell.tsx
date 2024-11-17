import React from 'react';
import styles from './GradeCell.module.scss';
import { GradeCellInterface } from './GradeCell.interface';


const GradeCell: React.FC<GradeCellInterface> = ({ status, errors }) => {

  // если не дозвонился, то оценки нет (как можно оценить то чего нет)
  if (status === 'Не дозвонился') {
    return null;
  }


  // Функция для получения рандомной оценки
  const getRandomRating = (): ('bad' | 'good' | 'great') => {
    const randomValue = Math.floor(Math.random() * 100); // Генерируем случайные цифры

    if (randomValue <= 50) return 'bad';
    if (randomValue <= 75) return 'good';
    return 'great';
  };

  const grade: ('bad' | 'good' | 'great') = getRandomRating();

  const setGrade = {
    'bad': {
      text: "Плохо",
      style: styles.grade_bad
    },
    'good': {
      text: "Хорошо",
      style: styles.grade_good,
    },
    'great': {
      text: "Отлично",
      style: styles.grade_great,
    }
  }



  return (
    <div className={styles.gradeWrapper}>

      {(errors && errors.length > 0) ? (
        <p className={styles.errorsText}>
          {errors.includes('Скрипт не использован') ? 'Скрипт не использован' : errors[0].toString()}
        </p>
      ) : (
        <div className = {`${styles.grade} ${setGrade[grade].style}`}>
          {setGrade[grade].text}
        </div>
      )}
    </div>
  );
};

export { GradeCell };
