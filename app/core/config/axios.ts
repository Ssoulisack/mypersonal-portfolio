import axios from 'axios';
import Cookies from 'js-cookie';

// Main app API instance
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 10000,
});

const axiosPublicInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 10000,
});

// External API instances for different services
const githubAxios = axios.create({
    baseURL: process.env.GITHUB_URL || 'https://api.github.com/graphql',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Portfolio-App/1.0',
    }
});

const monkeyTypeAxios = axios.create({
    baseURL: process.env.MONKEY_URL || 'https://api.monkeytype.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Portfolio-App/1.0',
    }
});

// GitHub token interceptor
githubAxios.interceptors.request.use(
    (config) => {
        console.log('🔑 GitHub API Request:', {
            hasToken: !!process.env.GITHUB_TOKEN,
            tokenLength: process.env.GITHUB_TOKEN?.length || 0
        });
        
        if (process.env.GITHUB_TOKEN) {
            config.headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
            console.log('✅ GitHub token added to request');
        } else {
            console.log('⚠️ No GitHub token found - request will be unauthenticated');
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// MonkeyType API key interceptor
monkeyTypeAxios.interceptors.request.use(
    (config) => {
        console.log('🔑 APE_KEY Environment Variable Check:');
        console.log('  - APE_KEY exists:', !!process.env.APE_KEY);
        console.log('  - APE_KEY length:', process.env.APE_KEY?.length || 0);
        console.log('  - APE_KEY first 4 chars:', process.env.APE_KEY?.substring(0, 4) || 'N/A');
        console.log('  - All env vars starting with APE:', Object.keys(process.env).filter(key => key.startsWith('APE')));
        
        if (process.env.APE_KEY) {
            config.headers['Authorization'] = `ApeKey ${process.env.APE_KEY}`;
            console.log('✅ APE_KEY added to Authorization header');
        } else {
            console.log('⚠️ APE_KEY not found - requests will be unauthenticated');
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = Cookies.get('token');
        // const language = localStorage.getItem('language') || 'en';
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        // config.headers['Accept-Language'] = language;
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = Cookies.get('refresh_token');
            console.log('refreshToken', refreshToken);
            try {
                const { data } = await axiosPublicInstance.get('/token/refresh', {
                    headers: { 'Authorization': `Bearer ${refreshToken}` }
                });
                Cookies.set('token', data.data.access_token);
                Cookies.set('refresh_token', data.data.refresh_token);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.data.access_token}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Handle token refresh error (e.g., redirect to login)
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
export { axiosPublicInstance, githubAxios, monkeyTypeAxios };
export default axiosInstance;