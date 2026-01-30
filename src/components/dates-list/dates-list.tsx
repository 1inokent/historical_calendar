import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './dates-list.module.scss';

interface DateEvent {
  year: number;
  description: string;
}

const events: DateEvent[] = [
  {
    year: 2015,
    description:
      '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
  },
  {
    year: 2016,
    description:
      'Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11',
  },
  {
    year: 2017,
    description:
      'Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi',
  },
  {
    year: 2018,
    description:
      'Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi',
  },
  {
    year: 2019,
    description:
      'Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi',
  },
  {
    year: 2020,
    description:
      'Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi',
  },
];

function DatesList() {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className={styles.container}>
      {/* Навигация для переключения тем */}
      <div className={styles.mobileNavigation}>
        <div className={styles.currentDate}>06/06</div>
        <div className={styles.controls}>
          <button className={styles.themeArrow}>
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M7 1L2 6L7 11" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
          <button className={styles.themeArrow}>
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
          <div className={styles.swiperPagination}></div>
        </div>
      </div>

      {/* Swiper с событиями */}
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
          {events.map((event, i) => (
            <SwiperSlide key={i} className={styles.slide}>
              <div className={styles.event}>
                <h3 className={styles.year}>{event.year}</h3>
                <p className={styles.description}>{event.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Desktop стрелки */}
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
