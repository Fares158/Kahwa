export interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  date: string;
  time: string;
  image: string;
  status: 'upcoming' | 'past';
}

export type EventSortOption = 'date-asc' | 'date-desc' | 'title-asc' | 'title-desc';
export type EventFilterOption = 'all' | 'upcoming' | 'past';