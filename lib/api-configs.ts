// Centralized API configuration
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },

  // Quiz endpoints
  QUIZ: {
    // Starts the test and returns the first question and sessionId
    START: (userId: string, videoId: string) =>
      `/items/start-test?userId=${userId}&videoId=${videoId}`,

    // Submit a single answer (note: new API uses POST and body params, not sessionId in path)
    SUBMIT_ANSWER: `/items/submit-answer`, // Use POST with body

    // Get next question after previous one is answered
    NEXT_QUESTION: `/items/next-question`, // Use POST with body

    // Submit the entire test after attempting (e.g., 10 questions)
    COMPLETE: `/items/submit-test`, // Use POST with body
  },


  // // Match endpoints
  // MATCHES: {
  //   LIST: "/matches",
  //   DETAIL: (id: string) => `/matches/${id}`,
  //   TODAY: "/matches/today",
  //   FEATURED: "/matches/featured",
  //   RECOMMENDED: "/matches/recommended",
  //   STATUS: (id: string) => `/matches/${id}/status`,
  //   STATS: (id: string) => `/matches/${id}/stats`,
  //   JOIN: (id: string) => `/matches/${id}/join`,
  //   LEAVE: (id: string) => `/matches/${id}/leave`,
  //   PARTICIPANTS: (id: string) => `/matches/${id}/participants`,
  // },

  // // Leaderboard endpoints
  LEADERBOARD: {
    GENERATE_LEADERBOARD: (videoId: string) => `/leaderboard/generate-leaderboard?videoId=${videoId}`,
  },

  // System endpoints
  SYSTEM: {
    HEALTH: "/health",
    VERSION: "/version",
  }
} as const

// API response status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
}