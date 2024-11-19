import React, { useEffect, useState } from 'react';
import styles from './DurationCell.module.scss';
import { DurationCellInterface } from './DurationCell.interface';
<<<<<<< HEAD
import { formatTimeFromSeconds } from '~utils/date-fns';
import fetchCallRecord from '~api/components/fetchCallRecord';
import { AudioPlayer } from '../../../../AudioPlayer/AudioPlayer';
import useInteractionStore from '../../../../../../store/useInteractionStore';


const DurationCell: React.FC<DurationCellInterface> = ({ duration, rowId, record, partnershipId }) => {
  const hoveredRow = useInteractionStore((state) => state.hoveredRowId);

  const [isVisible, setIsVisible] = useState(false);
=======
import { formatTimeFromMinutes } from '~utils/date-fns';
import fetchCallRecord from '~api/components/fetchCallRecord';
import { AudioPlayer } from '../../../../AudioPlayer/AudioPlayer';
import useHoverStore from '../../../../../../store/useHoverStore';


const DurationCell: React.FC<DurationCellInterface> = ({ duration, record, partnershipId }) => {
  const [isVisible, setIsVisible] = useState(true);
>>>>>>> a08a0698e20b2ee794f724a6e9c52ba27801396f
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

<<<<<<< HEAD
    useEffect(() => {
      if (rowId === hoveredRow) {
        setIsVisible(true);
      }
    }, [hoveredRow, rowId]);

=======
>>>>>>> a08a0698e20b2ee794f724a6e9c52ba27801396f


  const renderTime = () => {
    if (duration > 0) {
      return (
        <div className={styles.duration} onClick={handleCloseAudio}>
<<<<<<< HEAD
          {formatTimeFromSeconds(duration)}
=======
          {formatTimeFromMinutes(duration)}
>>>>>>> a08a0698e20b2ee794f724a6e9c52ba27801396f
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
