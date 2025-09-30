import { useState, useEffect } from 'react';
import { fetchWPMData } from '@/app/data/services/monkeytype.service';
import { MonkeyTypeResult } from '@/app/core/types/monkey-type.type';

interface UseWPMDataReturn {
  data: MonkeyTypeResult[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  latestResult: MonkeyTypeResult | null;
  personalBest: Boolean | null;
}

export const useWPMData = (): UseWPMDataReturn => {
  const [data, setData] = useState<MonkeyTypeResult[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      console.log('🎯 Hook: Starting WPM data fetch...');
      setLoading(true);
      setError(null);
      const wpmData = await fetchWPMData();
      console.log('🎯 Hook: Received data:', wpmData);
      setData(wpmData);
    } catch (err) {
      console.log('🎯 Hook: Error occurred:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch WPM data');
      console.error('WPM data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Computed values
  const latestResult = data && data.length > 0 ? data[0] : null;
  const personalBest = data && data.length > 0 ? data[0].isPb : null;

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    latestResult,
    personalBest
  };
};
