import React, { useRef, useState } from 'react';
import styles from './AudioPlayer.module.scss';
import { AudioPlayerInterface } from './AudioPlayer.interface';
import { formatTimeFromSeconds } from '~utils/date-fns';

import ButtonDownload from '../../../assets/svg/ButtonDownload.svg?react';
import ButtonPlay from '../../../assets/svg/ButtonPlay.svg?react';
import ButtonPause from '../../../assets/svg/ButtonPause.svg?react';
import ButtonCancel from '../../../assets/svg/ButtonCancel.svg?react';


const AudioPlayer: React.FC<AudioPlayerInterface> = ({ audioUrl, fileName = "record.mp3" , onClose }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<string>("00:00");
  const [currentTime, setCurrentTime] = useState<string>("00:00");
  const [progress, setProgress] = useState<number>(0);
  const [hoverTime, setHoverTime] = useState<string>("00:00"); // Время, которое показывается при наведении
  const [hoverPosition, setHoverPosition] = useState<number | null>(null); // Позиция для всплывающего времени


  // Обновление времени воспроизведения
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      // Получаем время в секундах, округляем до целого
      const currentTimeInSec = Math.floor(audioRef.current.currentTime);
      setCurrentTime(formatTimeFromSeconds(currentTimeInSec));
      // Обновление прогресса с округленным значением
      setProgress(
        Math.floor((audioRef.current.currentTime / audioRef.current.duration) * 100)
      );
    }
  };

  // Обновление длительности записи
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const durationInSec = Math.floor(audioRef.current.duration);
      setDuration(formatTimeFromSeconds(durationInSec));
    }
  };

  // Управление воспроизведением
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Перемотка записи
  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const rect = event.currentTarget.getBoundingClientRect();
      const clickPosition = event.clientX - rect.left;
      const newProgress = clickPosition / rect.width;
      audioRef.current.currentTime = newProgress * audioRef.current.duration;
    }
  };

  // Обновление позиции и времени при наведении мыши
  const handleProgressMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const rect = event.currentTarget.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const newTime = (mouseX / rect.width) * audioRef.current.duration;
      setHoverTime(formatTimeFromSeconds(Math.floor(newTime)));
      setHoverPosition(mouseX); // Сохраняем позицию
    }
  };

  // Скрытие времени при убирании мыши с полосы
  const handleProgressMouseLeave = () => {
    setHoverPosition(null); // Сбрасываем позицию
  };




  return (
    <div className={styles.audioPlayer}>
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      ></audio>

      <div className={styles.controls}>
        <div className={styles.time}>
          {isPlaying ? currentTime :
            (currentTime === '00:00') ?
              duration : currentTime}
        </div>

        <button onClick={togglePlay} className={`${styles.commonButton} ${styles.playButton}`}>
          {isPlaying ? <ButtonPause /> : <ButtonPlay />}
        </button>

        <div className={styles.progressWrapper}
          onClick={handleProgressClick}
          onMouseMove={handleProgressMouseMove}
          onMouseLeave={handleProgressMouseLeave}>
          <div
            className={styles.progressBar}
            style={{ width: `${progress}%` }}>
          </div>


          {/* Всплывающее время при наведении */}
          {hoverPosition !== null && (
            <div
              className={styles.hoverTime}
              style={{
                left: `${hoverPosition}px`, // Позиция на полосе
              }}
            >
              {hoverTime}
            </div>
          )}
        </div>

        <a
          href={audioUrl}
          download={fileName}
          className={styles.downloadButton}
        >
          <ButtonDownload />
        </a>
        <button onClick={onClose} className={`${styles.commonButton} ${styles.closeButton}`}>
          <ButtonCancel />
        </button>

      </div>
    </div>
  );
};

export { AudioPlayer };
