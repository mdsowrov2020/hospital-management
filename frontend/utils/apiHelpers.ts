import apiConfig from "@/lib/api/base/base";

interface ApiRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: any;
}

export async function apirequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { method = "GET", headers = {}, body } = options;
  const config: RequestInit = {
    method,
    headers: {
      ...apiConfig.headers,
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const url = `${apiConfig.baseUrl}${endpoint}`;
  const response = await fetch(url, config);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
