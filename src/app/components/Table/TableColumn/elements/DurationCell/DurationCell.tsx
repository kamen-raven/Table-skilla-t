import React, { useEffect, useState } from 'react';
import styles from './DurationCell.module.scss';
import { DurationCellInterface } from './DurationCell.interface';
import { formatTimeFromMinutes } from '~utils/date-fns';
import fetchCallRecord from '~api/components/fetchCallRecord';
import { AudioPlayer } from '../../../../AudioPlayer/AudioPlayer';
import useHoverStore from '../../../../../../store/useHoverStore';


const DurationCell: React.FC<DurationCellInterface> = ({ duration, record, partnershipId }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchAudio = async () => {
      if (record && partnershipId) {
        const audio = await fetchCallRecord({ record, partnershipId });
        if (audio) {
          setAudioUrl(audio); // Устанавливаем URL аудио
        }
      }
    };

    fetchAudio();
  }, [partnershipId, record]);

    // Закрытие аудиоплеера
    const handleCloseAudio = () => {
      setIsVisible(!isVisible);
    };



  const renderTime = () => {
    if (duration > 0) {
      return (
        <div className={styles.duration} onClick={handleCloseAudio}>
          {formatTimeFromMinutes(duration)}
        </div>
      )
    } else {
      return null;
    }
  }

  const renderPlayer = () => {
    if (audioUrl && isVisible) {
      return (
        <AudioPlayer audioUrl={audioUrl} onClose={handleCloseAudio} />
      )
    } else {
      return null;
    }
  }



  return (
    <div className={styles.durationWrapper}>
      {renderPlayer() ? renderPlayer() : renderTime()}
    </div>

  )
};

export { DurationCell };
