// Analytics data types
export interface VisitorData {
  totalVisitors: number;
  uniqueUsers: number;
  avgSessionDuration: number;
  changeFromPrevious: {
    visitors: number;
    users: number;
    duration: number;
  };
}

export interface TrafficData {
  date: string;
  visitors: number;
}

export interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
}

export interface PageData {
  path: string;
  title: string;
  visits: number;
  avgTime: number;
  bounceRate: number;
}