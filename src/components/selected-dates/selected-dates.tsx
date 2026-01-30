import styles from './selected-dates.module.scss';

interface DatePoint {
  id: number;
  angle: number;
  category: string;
}
interface SelectedDate {
  start: number;
  end: number;
}

const datePoints: DatePoint[] = [
  { id: 1, angle: 60, category: 'Наука' },
  { id: 2, angle: 120, category: 'Кино' },
  { id: 3, angle: 180, category: 'Литература' },
  { id: 4, angle: 240, category: 'Технологии' },
  { id: 5, angle: 300, category: 'Спорт' },
  { id: 6, angle: 0, category: 'История' },
];

const selectedDate: SelectedDate = {
  start: 2015,
  end: 2022,
};

function SelectedDates() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.datesDisplay}>
        <span className={styles.dateStart}>{selectedDate.start}</span>
        <span className={styles.dateEnd}>{selectedDate.end}</span>
      </div>

      <div className={styles.circle}>
        {datePoints.map((point) => (
          <div
            key={point.id}
            className={styles.point}
            style={{
              transform: `rotate(${point.angle}deg) translate(265px) rotate(-${point.angle}deg)`,
            }}
          >
            <div className={styles.dot}>
              <span className={styles.number}>{point.id}</span>
            </div>
            <div className={styles.tooltip}>{point.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectedDates;
