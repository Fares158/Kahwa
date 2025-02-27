import { supabase } from '../../../../lib/supabase/client';
import { VisitorData, TrafficData, TrafficSource, PageData } from './types';
import { DateRange } from '../../types/analytics';

// Helper function to get date range
const getDateRange = (range: DateRange): { start: string, end: string } => {
  const end = new Date();
  let start = new Date();
  
  switch (range) {
    case '1d':
      start = new Date(end);
      start.setDate(end.getDate() - 1);
      break;
    case '7d':
      start = new Date(end);
      start.setDate(end.getDate() - 7);
      break;
    case '30d':
      start = new Date(end);
      start.setDate(end.getDate() - 30);
      break;
    case 'custom':
      // For custom range, default to last 30 days
      start = new Date(end);
      start.setDate(end.getDate() - 30);
      break;
  }
  
  return {
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0]
  };
};

export async function fetchVisitorMetrics(dateRange: DateRange): Promise<VisitorData> {
  const { start, end } = getDateRange(dateRange);
  
  // Get current period data
  const { data: currentData, error: currentError } = await supabase
    .from('site_metrics')
    .select('visitors, unique_visitors, avg_session_duration')
    .gte('date', start)
    .lte('date', end)
    .order('date', { ascending: false });
    
  if (currentError) throw currentError;
  
  // Calculate previous period
  const prevStart = new Date(start);
  const prevEnd = new Date(end);
  const daysDiff = (new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24);
  prevStart.setDate(prevStart.getDate() - daysDiff);
  prevEnd.setDate(prevEnd.getDate() - daysDiff);
  
  // Get previous period data
  const { data: prevData, error: prevError } = await supabase
    .from('site_metrics')
    .select('visitors, unique_visitors, avg_session_duration')
    .gte('date', prevStart.toISOString().split('T')[0])
    .lte('date', prevEnd.toISOString().split('T')[0])
    .order('date', { ascending: false });
    
  if (prevError) throw prevError;
  
  // Calculate totals and changes
  const currentTotals = currentData.reduce(
    (acc, item) => ({
      visitors: acc.visitors + item.visitors,
      users: acc.users + item.unique_visitors,
      duration: acc.duration + item.avg_session_duration
    }),
    { visitors: 0, users: 0, duration: 0 }
  );
  
  const prevTotals = prevData.reduce(
    (acc, item) => ({
      visitors: acc.visitors + item.visitors,
      users: acc.users + item.unique_visitors,
      duration: acc.duration + item.avg_session_duration
    }),
    { visitors: 0, users: 0, duration: 0 }
  );
  
  // Calculate percentage changes
  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };
  
  return {
    totalVisitors: currentTotals.visitors,
    uniqueUsers: currentTotals.users,
    avgSessionDuration: currentData.length > 0 
      ? Math.round(currentTotals.duration / currentData.length) 
      : 0,
    changeFromPrevious: {
      visitors: calculateChange(currentTotals.visitors, prevTotals.visitors),
      users: calculateChange(currentTotals.users, prevTotals.users),
      duration: calculateChange(
        currentData.length > 0 ? currentTotals.duration / currentData.length : 0,
        prevData.length > 0 ? prevTotals.duration / prevData.length : 0
      )
    }
  };
}

export async function fetchTrafficData(dateRange: DateRange): Promise<TrafficData[]> {
  const { start, end } = getDateRange(dateRange);
  
  const { data, error } = await supabase
    .from('site_metrics')
    .select('date, visitors')
    .gte('date', start)
    .lte('date', end)
    .order('date', { ascending: true });
    
  if (error) throw error;
  
  return data.map(item => ({
    date: item.date,
    visitors: item.visitors
  }));
}

export async function fetchTrafficSources(dateRange: DateRange): Promise<TrafficSource[]> {
  const { start, end } = getDateRange(dateRange);
  
  const { data, error } = await supabase
    .from('traffic_sources')
    .select('source, visitors, percentage')
    .gte('date', start)
    .lte('date', end)
    .order('percentage', { ascending: false });
    
  if (error) throw error;
  
  return data.map(item => ({
    source: item.source,
    visitors: item.visitors,
    percentage: item.percentage
  }));
}

export async function fetchPageMetrics(dateRange: DateRange): Promise<PageData[]> {
  const { start, end } = getDateRange(dateRange);
  
  const { data, error } = await supabase
    .from('page_metrics')
    .select('path, title, views, avg_time, bounce_rate')
    .gte('date', start)
    .lte('date', end)
    .order('views', { ascending: false });
    
  if (error) throw error;
  
  return data.map(item => ({
    path: item.path,
    title: item.title,
    visits: item.views,
    avgTime: item.avg_time,
    bounceRate: item.bounce_rate
  }));
}