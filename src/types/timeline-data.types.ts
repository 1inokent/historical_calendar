export interface TimelineEvent {
  year: number;
  description: string;
}

export interface TimelinePeriod {
  id: number;
  category: string;
  startYear: number;
  endYear: number;
  events: TimelineEvent[];
}

export interface TimelineData {
  periods: TimelinePeriod[];
}
