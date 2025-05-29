/* API Configuration */
const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://fb92-103-222-252-210.ngrok-free.app",
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
}

/* API Response Types */
interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
  code?: number
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

/* Error Types */
class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: any,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

class NetworkError extends Error {
  constructor(message = "Network connection failed") {
    super(message)
    this.name = "NetworkError"
  }
}

class AuthError extends Error {
  constructor(message = "Authentication failed") {
    super(message)
    this.name = "AuthError"
  }
}

type RequestInterceptor = (config: RequestInit & { url: string }) => RequestInit & { url: string }
type ResponseInterceptor = (response: Response) => Response | Promise<Response>

class ApiClient {
  private baseURL: string
  private defaultHeaders: HeadersInit
  private requestInterceptors: RequestInterceptor[] = []
  private responseInterceptors: ResponseInterceptor[] = []

  constructor(baseURL: string = API_CONFIG.BASE_URL) {
    this.baseURL = baseURL
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
      // ngrok interstitial bypass
      "ngrok-skip-browser-warning": "1",
    }
  }

  setAuthToken(token: string) {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      Authorization: `Bearer ${token}`,
    }
  }

  removeAuthToken() {
    const { Authorization, ...headers } = this.defaultHeaders as any
    this.defaultHeaders = headers
  }

  setApiKey(apiKey: string, headerName = "X-API-Key") {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      [headerName]: apiKey,
    }
  }

  setHeader(key: string, value: string) {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      [key]: value,
    }
  }

  addRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor)
  }

  addResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptors.push(interceptor)
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  private buildUrl(endpoint: string): string {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint
    const cleanBaseUrl = this.baseURL.endsWith("/") ? this.baseURL.slice(0, -1) : this.baseURL
    return `${cleanBaseUrl}/${cleanEndpoint}`
  }

  private applyRequestInterceptors(config: RequestInit & { url: string }): RequestInit & { url: string } {
    return this.requestInterceptors.reduce((acc, interceptor) => interceptor(acc), config)
  }

  private async applyResponseInterceptors(response: Response): Promise<Response> {
    return this.responseInterceptors.reduce(
      async (acc, interceptor) => interceptor(await acc),
      Promise.resolve(response),
    )
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}, attempt = 1): Promise<ApiResponse<T>> {
    try {
      let config: RequestInit & { url: string } = {
        url: this.buildUrl(endpoint),
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
        ...options,
      }

      config = this.applyRequestInterceptors(config)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT)

      let response = await fetch(config.url, {
        ...config,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      response = await this.applyResponseInterceptors(response)

      if (response.status === 401) throw new AuthError("Authentication required")
      if (response.status === 403) throw new AuthError("Access forbidden")
      if (response.status === 429) {
        if (attempt < API_CONFIG.RETRY_ATTEMPTS) {
          await this.sleep(API_CONFIG.RETRY_DELAY * attempt)
          return this.makeRequest<T>(endpoint, options, attempt + 1)
        }
        throw new ApiError("Rate limit exceeded", response.status)
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          errorData.code,
          errorData,
        )
      }

      const data = await response.json()
      return data
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        if (attempt < API_CONFIG.RETRY_ATTEMPTS) {
          await this.sleep(API_CONFIG.RETRY_DELAY * attempt)
          return this.makeRequest<T>(endpoint, options, attempt + 1)
        }
        throw new NetworkError("Network connection failed")
      }
      if (error instanceof DOMException && error.name === "AbortError") {
        if (attempt < API_CONFIG.RETRY_ATTEMPTS) {
          await this.sleep(API_CONFIG.RETRY_DELAY * attempt)
          return this.makeRequest<T>(endpoint, options, attempt + 1)
        }
        throw new NetworkError("Request timeout")
      }
      if (error instanceof ApiError || error instanceof AuthError || error instanceof NetworkError) {
        throw error
      }
      throw new ApiError("An unexpected error occurred", 500, "UNKNOWN_ERROR", error)
    }
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    let url = endpoint
    if (params) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) searchParams.append(key, String(value))
      })
      url += `?${searchParams.toString()}`
    }
    return this.makeRequest<T>(url, { method: "GET" })
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { method: "POST", body: data ? JSON.stringify(data) : undefined, })
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { method: "PUT", body: data ? JSON.stringify(data) : undefined, })
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { method: "PATCH", body: data ? JSON.stringify(data) : undefined, })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { method: "DELETE" })
  }

  async upload<T>(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<ApiResponse<T>> {
    const formData = new FormData()
    formData.append("file", file)
    if (additionalData) Object.entries(additionalData).forEach(([k, v]) => formData.append(k, String(v)))
    const { "Content-Type": _, ...headersWithoutContentType } = this.defaultHeaders as any
    return this.makeRequest<T>(endpoint, { method: "POST", body: formData, headers: headersWithoutContentType })
  }
}

const apiClient = new ApiClient()

if (process.env.NODE_ENV === "development") {
  apiClient.addRequestInterceptor((config) => { console.log(`🚀 API Request: ${config.method || "GET"} ${config.url}`); return config })
  apiClient.addResponseInterceptor((response) => { console.log(`✅ API Response: ${response.status} ${response.url}`); return response })
}

export default apiClient
export { ApiError, NetworkError, AuthError }
export type { ApiResponse, PaginatedResponse }