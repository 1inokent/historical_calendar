// context/TimelineContext.tsx
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { mockTimelineData } from '../mock-data/timeline.mock';
import { TimelineData, TimelinePeriod } from '../types/timeline-data.types';

interface TimelineContextType {
  data: TimelineData;
  activePeriodId: number;
  activePeriod: TimelinePeriod;
  setActivePeriodId: (id: number) => void;
  goToNextPeriod: () => void;
  goToPreviousPeriod: () => void;
  isFirstPeriod: boolean;
  isLastPeriod: boolean;
}

const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

interface TimelineProviderProps {
  children: ReactNode;
  initialData?: TimelineData;
}

export function TimelineProvider({
  children,
  initialData = mockTimelineData,
}: TimelineProviderProps) {
  const [activePeriodId, setActivePeriodId] = useState(1);

  const activePeriod = useMemo(
    () =>
      initialData.periods.find((period) => period.id === activePeriodId) || initialData.periods[0],
    [activePeriodId, initialData.periods],
  );

  const currentIndex = useMemo(
    () => initialData.periods.findIndex((period) => period.id === activePeriodId),
    [activePeriodId, initialData.periods],
  );

  const isFirstPeriod = currentIndex === 0;
  const isLastPeriod = currentIndex === initialData.periods.length - 1;

  const goToNextPeriod = () => {
    if (!isLastPeriod) {
      setActivePeriodId(initialData.periods[currentIndex + 1].id);
    }
  };

  const goToPreviousPeriod = () => {
    if (!isFirstPeriod) {
      setActivePeriodId(initialData.periods[currentIndex - 1].id);
    }
  };

  const value = useMemo(
    () => ({
      data: initialData,
      activePeriodId,
      activePeriod,
      setActivePeriodId,
      goToNextPeriod,
      goToPreviousPeriod,
      isFirstPeriod,
      isLastPeriod,
    }),
    [activePeriodId, activePeriod, initialData, isFirstPeriod, isLastPeriod],
  );

  return <TimelineContext.Provider value={value}>{children}</TimelineContext.Provider>;
}

export function useTimeline() {
  const context = useContext(TimelineContext);
  if (context === undefined) {
    throw new Error('useTimeline must be used within a TimelineProvider');
  }
  return context;
}
