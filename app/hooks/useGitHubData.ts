import { useState, useEffect } from 'react';
import { fetchGitHubData } from '@/app/data/services/github.service';
import { ContributionDay } from '@/app/core/types/github.type';

interface UseGitHubDataReturn {
  data: ContributionDay[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useGitHubData = (): UseGitHubDataReturn => {
  const [data, setData] = useState<ContributionDay[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const githubData = await fetchGitHubData();
      setData(githubData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch GitHub data');
      console.error('GitHub data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
};
