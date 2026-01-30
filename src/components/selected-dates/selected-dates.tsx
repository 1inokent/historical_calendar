import gsap from 'gsap';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useTimeline } from '../../context/TimelineContext';
import styles from './selected-dates.module.scss';

const animateValue = (element: HTMLElement, start: number, end: number, duration = 0.8) => {
  const obj = { value: start };

  gsap.to(obj, {
    value: end,
    duration,
    ease: 'power2.inOut',
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toString();
    },
  });
};

const getShortestRotation = (fromIndex: number, toIndex: number, totalPoints: number) => {
  const step = 360 / totalPoints;
  let diff = (toIndex - fromIndex) * step;

  while (diff > 180) diff -= 360;
  while (diff < -180) diff += 360;

  return diff;
};

function SelectedDates() {
  const { data, activePeriodId, previousPeriodId, activePeriod, setActivePeriodId } = useTimeline();

  const circleRef = useRef<HTMLDivElement>(null);
  const startYearRef = useRef<HTMLSpanElement>(null);
  const endYearRef = useRef<HTMLSpanElement>(null);
  const mobileTooltipRef = useRef<HTMLDivElement>(null);

  const tooltipRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const currentRotation = useRef(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const setCircleRotationVar = (rotation: number) => {
    if (!circleRef.current) return;
    circleRef.current.style.setProperty('--circle-rotation', `${rotation}deg`);
  };

  const radius = 264.5;

  const points = useMemo(() => {
    const total = data.periods.length;
    const step = 360 / total;
    const startAngle = 60;

    return data.periods.map((period, index) => ({
      ...period,
      index,
      angle: startAngle + index * step,
    }));
  }, [data.periods]);

  const hideAllTooltips = () => {
    Object.values(tooltipRefs.current).forEach((tooltip) => {
      if (tooltip) {
        gsap.set(tooltip, { autoAlpha: 0 });
      }
    });

    if (mobileTooltipRef.current) {
      gsap.set(mobileTooltipRef.current, { autoAlpha: 0 });
    }
  };

  useEffect(() => {
    if (!circleRef.current || !isInitialLoad) return;

    const activePoint = points.find((p) => p.id === activePeriodId);
    if (!activePoint) return;

    const initialRotation = activePoint.angle - 180;
    currentRotation.current = initialRotation;

    gsap.set(circleRef.current, {
      rotation: initialRotation,
      scale: 0.9,
      opacity: 0,
    });

    setCircleRotationVar(initialRotation);

    hideAllTooltips();

    gsap.to(circleRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => {
        setIsInitialLoad(false);

        const activeTooltip = tooltipRefs.current[activePeriodId];
        if (activeTooltip) {
          gsap.to(activeTooltip, {
            autoAlpha: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        }

        if (mobileTooltipRef.current) {
          gsap.to(mobileTooltipRef.current, { autoAlpha: 1, duration: 0.3 });
        }
      },
    });
  }, [isInitialLoad, activePeriodId, points]);

  useEffect(() => {
    if (isInitialLoad || previousPeriodId === null || previousPeriodId === activePeriodId) {
      return;
    }

    const prev = points.find((p) => p.id === previousPeriodId);
    const next = points.find((p) => p.id === activePeriodId);

    if (!prev || !next || !circleRef.current) return;

    hideAllTooltips();

    const diff = getShortestRotation(prev.index, next.index, points.length);

    const newRotation = currentRotation.current - diff;

    gsap.to(circleRef.current, {
      rotation: newRotation,
      duration: 0.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (!circleRef.current) return;
        const rotation = Number(gsap.getProperty(circleRef.current, 'rotation'));
        setCircleRotationVar(rotation);
      },
      onComplete: () => {
        currentRotation.current = newRotation;
        setCircleRotationVar(newRotation);

        const activeTooltip = tooltipRefs.current[activePeriodId];
        if (activeTooltip) {
          gsap.to(activeTooltip, { autoAlpha: 1, duration: 0.3 });
        }

        if (mobileTooltipRef.current) {
          gsap.to(mobileTooltipRef.current, { autoAlpha: 1, duration: 0.3 });
        }
      },
    });

    if (startYearRef.current && endYearRef.current) {
      const prevPeriod = data.periods.find((p) => p.id === previousPeriodId);

      if (prevPeriod) {
        animateValue(startYearRef.current, prevPeriod.startYear, activePeriod.startYear);
        animateValue(endYearRef.current, prevPeriod.endYear, activePeriod.endYear);
      }
    }
  }, [activePeriodId, previousPeriodId, isInitialLoad, points, activePeriod, data.periods]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.datesDisplay}>
        <span ref={startYearRef} className={styles.dateStart}>
          {activePeriod.startYear}
        </span>
        <span ref={endYearRef} className={styles.dateEnd}>
          {activePeriod.endYear}
        </span>
      </div>

      <div ref={circleRef} className={styles.circle}>
        {points.map((point) => (
          <div
            key={point.id}
            className={styles.point}
            style={{
              transform: `rotate(${point.angle}deg) translate(${radius}px) rotate(-${point.angle}deg)`,
            }}
          >
            <div className={styles.pointContent}>
              <div
                className={`${styles.dot} ${point.id === activePeriodId ? styles.active : ''}`}
                onClick={() => setActivePeriodId(point.id)}
              >
                <span className={styles.number}>{point.id}</span>
              </div>

              <div
                ref={(el) => {
                  tooltipRefs.current[point.id] = el;
                }}
                className={styles.tooltip}
              >
                {point.category}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div ref={mobileTooltipRef} className={styles.mobileTooltip}>
        {activePeriod.category}
      </div>
    </div>
  );
}

export default SelectedDates;
