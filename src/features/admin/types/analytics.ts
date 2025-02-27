export type DateRange = '1d' | '7d' | '30d' | 'custom';

export interface AnalyticsMetric {
  value: number;
  change: number;
  trend: 'up' | 'down';
}

export interface PageMetrics {
  path: string;
  title: string;
  visits: number;
  avgTime: string;
  bounceRate: string;
}

export interface TrafficSource {
  name: string;
  value: number;
  color: string;
}