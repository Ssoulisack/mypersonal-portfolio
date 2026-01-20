import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

// Extend AxiosError to include apiError metadata
interface ApiErrorMetadata {
  message: string;
  status: number;
}

declare module "axios" {
  export interface AxiosError {
    apiError?: ApiErrorMetadata;
  }
}

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
  baseURL: process.env.GITHUB_URL || "https://api.github.com/graphql",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const svgAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SVG_URL || "https://api.svgl.app",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const monkeyTypeAxios = axios.create({
  baseURL: process.env.MONKEY_URL || "https://api.monkeytype.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "Portfolio-App/1.0",
  },
});

// GitHub token interceptor
githubAxios.interceptors.request.use(
  (config) => {
    console.log("🔑 GitHub API Request:", {
      token: process.env.GITHUB_ACCESS_TOKEN,
      hasToken: !!process.env.GITHUB_ACCESS_TOKEN,
      tokenLength: process.env.GITHUB_ACCESS_TOKEN?.length || 0,
    });

    if (process.env.GITHUB_ACCESS_TOKEN) {
      config.headers["Authorization"] = `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`;
      console.log("✅ GitHub token added to request");
    } else {
      console.log("⚠️ No GitHub token found - request will be unauthenticated");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// MonkeyType API key interceptor
monkeyTypeAxios.interceptors.request.use(
  (config) => {
    // console.log("🔑 APE_KEY Environment Variable Check:");
    // console.log("  - APE_KEY exists:", !!process.env.APE_KEY);
    // console.log("  - APE_KEY length:", process.env.APE_KEY?.length || 0);
    // console.log(
    //   "  - APE_KEY first 4 chars:",
    //   process.env.APE_KEY?.substring(0, 4) || "N/A"
    // );
    // console.log(
    //   "  - All env vars starting with APE:",
    //   Object.keys(process.env).filter((key) => key.startsWith("APE"))
    // );

    if (process.env.APE_KEY) {
      config.headers["Authorization"] = `ApeKey ${process.env.APE_KEY}`;
    //   console.log("✅ APE_KEY added to Authorization header");
    } else {
      console.log("⚠️ APE_KEY not found - requests will be unauthenticated");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("token");
    // const language = localStorage.getItem('language') || 'en';
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    // config.headers['Accept-Language'] = language;
    return config;
  },
  (error) => Promise.reject(error)
);

// Request interceptor
githubAxios.interceptors.request.use(
  (config) => {
    console.log("➡️ API Request:", {
      baseURL: config.baseURL,
      url: config.url,
      fullURL: `${config.baseURL}${config.url}`,
      params: config.params,
    });

    return config;
  },
  (error) => Promise.reject(error)
);

monkeyTypeAxios.interceptors.request.use(
  (config) => {
    console.log("➡️ API Request:", {
      baseURL: config.baseURL,
      url: config.url,
      fullURL: `${config.baseURL}${config.url}`,
      params: config.params,
    });

    return config;
  },
  (error) => Promise.reject(error)
);

svgAxios.interceptors.request.use(
  (config) => {
    console.log("➡️ API Request:", {
      baseURL: config.baseURL,
      url: config.url,
      fullURL: `${config.baseURL}${config.url}`,
      params: config.params,
    });

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
githubAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    
    // Add error metadata to error object for centralized handling
    switch (status) {
      case 401:
        error.apiError = {
          message: 'GitHub API unauthorized. Token may be invalid or expired.',
          status: 401,
        };
        console.error("❌ Unauthorized (401):", process.env.GITHUB_ACCESS_TOKEN, error.apiError.message);
        break;
      case 403:
        error.apiError = {
          message: 'GitHub API access forbidden. Rate limit exceeded or insufficient permissions.',
          status: 403,
        };
        console.error("❌ Forbidden (403):", error.apiError.message);
        break;
      case 404:
        error.apiError = {
          message: `GitHub API endpoint not found: ${error.config?.url}`,
          status: 404,
        };
        console.error("❌ 404 Not Found:", error.config?.url);
        console.error("Full URL:", error.config?.baseURL + error.config?.url);
        break;
      case 422:
        error.apiError = {
          message: 'GitHub API validation error. Request data is invalid.',
          status: 422,
        };
        console.error("❌ Validation Error (422):", error.response?.data?.message || error.apiError.message);
        break;
      case 429:
        error.apiError = {
          message: 'GitHub API rate limit exceeded. Please try again later.',
          status: 429,
        };
        console.error("❌ Rate Limit (429):", error.apiError.message);
        break;
      case 500:
      case 502:
      case 503:
        error.apiError = {
          message: `GitHub API server error (${status}). Please try again later.`,
          status: status,
        };
        console.error(`❌ Server Error (${status}):`, error.apiError.message);
        break;
      default:
        error.apiError = {
          message: `GitHub API error: ${status} ${error.response?.statusText || error.message}`,
          status: status || 500,
        };
        console.error("❌ API Error:", status, error.message);
        break;
    }
    
    return Promise.reject(error);
  }
);

monkeyTypeAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    
    // Add error metadata to error object for centralized handling
    switch (status) {
      case 403:
        error.apiError = {
          message: 'MonkeyType API access forbidden. API key may be invalid or insufficient permissions.',
          status: 403,
        };
        console.error("❌ Forbidden (403):", error.apiError.message);
        break;
      case 429:
        error.apiError = {
          message: 'MonkeyType API rate limit exceeded. Please try again later.',
          status: 429,
        };
        console.error("❌ Rate Limit (429):", error.apiError.message);
        break;
      case 479:
        error.apiError = {
          message: 'ApeKey rate limit exceeded.',
          status: 479,
        };
        console.error("❌ ApeKey Rate Limit (479):", error.apiError.message);
        break;
      case 401:
        error.apiError = {
          message: 'Unauthorized (401)',
          status: 401,
        };
        console.error("❌ Unauthorized (401)");
        break;
      case 404:
        error.apiError = {
          message: `404 Not Found: ${error.config?.url}`,
          status: 404,
        };
        console.error("❌ 404 Not Found:", error.config?.url);
        console.error("Full URL:", error.config?.baseURL + error.config?.url);
        break;
      default:
        error.apiError = {
          message: `MonkeyType API error: ${status} ${error.response?.statusText || error.message}`,
          status: status || 500,
        };
        console.error("❌ API Error:", status, error.message);
        break;
    }
    
    return Promise.reject(error);
  }
);

svgAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      console.error("❌ Unauthorized (401)");
    } else if (status === 404) {
      console.error("❌ 404 Not Found:", error.config?.url);
      console.error("Full URL:", error.config?.baseURL + error.config?.url);
    } else {
      console.error("❌ API Error:", status, error.message);
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get("refresh_token");
      console.log("refreshToken", refreshToken);
      try {
        const { data } = await axiosPublicInstance.get("/token/refresh", {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });
        Cookies.set("token", data.data.access_token);
        Cookies.set("refresh_token", data.data.refresh_token);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.data.access_token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle token refresh error (e.g., redirect to login)
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
// Helper function to convert axios errors to standardized error response
// Use this in API routes to handle errors centrally
export function handleAxiosError(error: unknown): {
  success: false;
  error: string;
  status: number;
} {
  if (axios.isAxiosError(error) && error.apiError) {
    return {
      success: false,
      error: error.apiError.message,
      status: error.apiError.status,
    };
  }
  
  if (axios.isAxiosError(error)) {
    return {
      success: false,
      error: `API error: ${error.response?.status} ${error.response?.statusText || error.message}`,
      status: error.response?.status || 500,
    };
  }
  
  return {
    success: false,
    error: error instanceof Error ? error.message : "Unknown error occurred",
    status: 500,
  };
}

export { axiosPublicInstance, githubAxios, monkeyTypeAxios, svgAxios };
export default axiosInstance;
