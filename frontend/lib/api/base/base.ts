const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3001/api";

interface ApiConfig {
  baseUrl: string;
  headers: Record<string, string>;
}

const apiConfig: ApiConfig = {
  baseUrl: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

export default apiConfig;
