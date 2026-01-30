import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useTimeline } from '../../context/TimelineContext';
import styles from './dates-list.module.scss';

function DatesList() {
  const {
    data,
    activePeriod,
    activePeriodId,
    isFirstPeriod,
    isLastPeriod,
    goToNextPeriod,
    goToPreviousPeriod,
  } = useTimeline();

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const currentPeriodIndex = data.periods.findIndex((p) => p.id === activePeriodId);
  const totalPeriods = data.periods.length;

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className={styles.container}>
      <div className={styles.periodsNavigation}>
        <div className={styles.periodsCount}>
          {String(currentPeriodIndex + 1).padStart(2, '0')}/{String(totalPeriods).padStart(2, '0')}
        </div>

        <div className={styles.controls}>
          <button
            className={styles.themeArrow}
            onClick={goToPreviousPeriod}
            disabled={isFirstPeriod}
          >
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M7 1L2 6L7 11" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          <button className={styles.themeArrow} onClick={goToNextPeriod} disabled={isLastPeriod}>
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          <div className={styles.swiperPagination}></div>
        </div>
      </div>

      <div className={styles.swiperWrapper}>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={80}
          slidesPerView={3}
          navigation={{
            prevEl: `.${styles.swiperButtonPrev}`,
            nextEl: `.${styles.swiperButtonNext}`,
          }}
          pagination={{
            el: `.${styles.swiperPagination}`,
            clickable: true,
          }}
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.5,
              spaceBetween: 25,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 80,
            },
          }}
          className={styles.swiper}
        >
          {activePeriod.events.map((event, index) => (
            <SwiperSlide key={index} className={styles.slide}>
              <div className={styles.event}>
                <h3 className={styles.year}>{event.year}</h3>
                <p className={styles.description}>{event.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className={`${styles.swiperButtonPrev} ${isBeginning ? styles.disabled : ''}`}>
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
            <path d="M7 1L2 6L7 11" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
        <button className={`${styles.swiperButtonNext} ${isEnd ? styles.disabled : ''}`}>
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
            <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default DatesList;
