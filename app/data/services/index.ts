// Export all services from a single entry point
export * from './github.service';
export * from './monkeytype.service';

// Combined data fetching function
export const fetchAllData = async () => {
  try {
    console.log('🔄 Fetching all data...');
    
    const [githubData, wpmData] = await Promise.allSettled([
      import('./github.service').then(module => module.fetchGitHubData()),
      import('./monkeytype.service').then(module => module.fetchWPMData())
    ]);

    const result = {
      github: githubData.status === 'fulfilled' ? githubData.value : null,
      wpm: wpmData.status === 'fulfilled' ? wpmData.value : null,
      errors: {
        github: githubData.status === 'rejected' ? githubData.reason : null,
        wpm: wpmData.status === 'rejected' ? wpmData.reason : null
      }
    };

    console.log('✅ All data fetching completed');
    return result;
    
  } catch (error) {
    console.error('❌ Error fetching all data:', error);
    throw error;
  }
};
