import styles from './main-page.module.scss';

export function MainPage() {
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
      </div>
    </div>
  );
}
