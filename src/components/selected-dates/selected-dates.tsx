import { useMemo } from 'react';

import { useTimeline } from '../../context/TimelineContext';
import styles from './selected-dates.module.scss';

function SelectedDates() {
  const { data, activePeriod, activePeriodId, setActivePeriodId } = useTimeline();

  const points = useMemo(() => {
    const totalPoints = data.periods.length;
    const angleStep = 360 / totalPoints;

    return data.periods.map((period, index) => ({
      ...period,
      angle: index * angleStep,
    }));
  }, [data.periods]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.datesDisplay}>
        <span className={styles.dateStart}>{activePeriod.startYear}</span>
        <span className={styles.dateEnd}>{activePeriod.endYear}</span>
      </div>

      <div className={styles.circle}>
        {points.map((point) => (
          <div
            key={point.id}
            className={styles.point}
            style={{
              transform: `rotate(${point.angle}deg) translate(265px) rotate(-${point.angle}deg)`,
            }}
          >
            <div
              className={`${styles.dot} ${point.id === activePeriodId ? styles.active : ''}`}
              onClick={() => setActivePeriodId(point.id)}
            >
              <span className={styles.number}>{point.id}</span>
            </div>
            <div className={styles.tooltip}>{point.category}</div>
          </div>
        ))}
      </div>
      <div className={styles.mobileTooltip}>{activePeriod.category}</div>
    </div>
  );
}

export default SelectedDates;
