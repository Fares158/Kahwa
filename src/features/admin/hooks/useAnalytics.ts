import { useState, useEffect } from 'react';
import { DateRange } from '../types/analytics';
import * as analyticsApi from '../services/analytics/api';
import type { VisitorData, TrafficData, TrafficSource, PageData } from '../services/analytics/types';

export function useVisitorMetrics(dateRange: DateRange) {
  const [data, setData] = useState<VisitorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const result = await analyticsApi.fetchVisitorMetrics(dateRange);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [dateRange]);

  return { data, loading, error };
}

export function useTrafficData(dateRange: DateRange) {
  const [data, setData] = useState<TrafficData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const result = await analyticsApi.fetchTrafficData(dateRange);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [dateRange]);

  return { data, loading, error };
}

export function useTrafficSources(dateRange: DateRange) {
  const [data, setData] = useState<TrafficSource[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const result = await analyticsApi.fetchTrafficSources(dateRange);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [dateRange]);

  return { data, loading, error };
}

export function usePageMetrics(dateRange: DateRange) {
  const [data, setData] = useState<PageData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const result = await analyticsApi.fetchPageMetrics(dateRange);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [dateRange]);

  return { data, loading, error };
}