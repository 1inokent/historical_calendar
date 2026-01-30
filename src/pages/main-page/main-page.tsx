import DatesList from '../../components/dates-list/dates-list';
import SelectedDates from '../../components/selected-dates/selected-dates';
import styles from './main-page.module.scss';

function MainPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <img className={styles.icon} src="/svg/Vector.svg" alt="logo" />

          <h1 className={styles.title}>
            Исторические <br />
            даты
          </h1>
        </div>

        <SelectedDates />
        <DatesList />
      </div>
    </div>
  );
}

export default MainPage;
