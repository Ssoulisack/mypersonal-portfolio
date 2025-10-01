import { GitHubDataResponse } from '@/app/core/types/github.type';

/**
 * Fetch GitHub data from the API
 */
export const fetchGitHubData = async (): Promise<GitHubDataResponse> => {
  try {
    console.log('🔄 Fetching GitHub data...');
    
    const response = await fetch('/api/github');
    console.log(response)

    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data)    
    if (!data.success) {
      throw new Error(data.error || 'GitHub API returned unsuccessful response');
    }

    console.log('✅ GitHub data fetched successfully');
    return data.data as GitHubDataResponse;
    
  } catch (error) {
    console.error('❌ Error fetching GitHub data:', error);
    throw new Error(`Failed to fetch GitHub data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Fetch GitHub contributions (alias for main function)
 */
export const fetchGitHubContributions = async (): Promise<GitHubDataResponse> => {
  return fetchGitHubData();
};
