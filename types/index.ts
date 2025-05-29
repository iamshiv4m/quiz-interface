export interface Question {
  id: number
  difficulty: "E" | "M" | "H"
  question: string
  options: string[]
  correctAnswer: number
  hasGraph?: boolean
}

export interface QuizState {
  currentQuestion: number
  answers: { [key: number]: number }
  difficulties: ("E" | "M" | "H")[]
  score: number
  maxScore: number
  isCompleted: boolean
}

export interface Student {
  id: string
  name: string
  avatar?: string
}

export interface MatchResult {
  matchId: string
  studentId: string
  score: number
  maxScore: number
  percentage: number
  difficulties: ("E" | "M" | "H")[]
  rank: number
  attemptedAt: Date
}

export interface LeagueData {
  studentId: string
  name: string
  averageScore: number
  matchesAttempted: number
  rank: number
}

export interface Match {
  id: string
  title: string
  chapterName: string
  matchNumber: number
  totalMatches: number
  isAttempted: boolean
  score?: number
  rank?: number
}
