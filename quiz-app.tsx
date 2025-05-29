"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Flame, ChevronDown, MoreVertical, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Question {
  id: number
  type: string
  question: string
  options: string[]
  correctAnswer: number
  hasGraph?: boolean
}

interface QuizState {
  currentQuestion: number
  answers: { [key: number]: number }
  score: number
  streak: number
  maxStreak: number
  hasAchievedStreak: boolean
  isCompleted: boolean
  answeredQuestions: Set<number>
}

const questions: Question[] = [
  {
    id: 1,
    type: "Single",
    question:
      "Find the distance covered by a particle during the time interval t=0 and t=4s for which the speed time graph is shown in figure;",
    options: ["40 meters", "80 meters", "60 meters", "100 meters"],
    correctAnswer: 1,
    hasGraph: true,
  },
  {
    id: 2,
    type: "Single",
    question: "What is the acceleration of the particle in the given speed-time graph?",
    options: ["2.5 m/s²", "5 m/s²", "7.5 m/s²", "10 m/s²"],
    correctAnswer: 1,
  },
  {
    id: 3,
    type: "Single",
    question: "A car travels at a constant speed of 60 km/h for 2 hours. What distance does it cover?",
    options: ["100 km", "120 km", "140 km", "160 km"],
    correctAnswer: 1,
  },
  {
    id: 4,
    type: "Single",
    question: "What is the SI unit of force?",
    options: ["Joule", "Newton", "Watt", "Pascal"],
    correctAnswer: 1,
  },
  {
    id: 5,
    type: "Single",
    question: "Which of the following is a vector quantity?",
    options: ["Speed", "Distance", "Velocity", "Time"],
    correctAnswer: 2,
  },
  {
    id: 6,
    type: "Single",
    question: "What is the formula for kinetic energy?",
    options: ["KE = mv", "KE = ½mv²", "KE = mv²", "KE = ½mv"],
    correctAnswer: 1,
  },
  {
    id: 7,
    type: "Single",
    question: "At what angle should a projectile be launched for maximum range?",
    options: ["30°", "45°", "60°", "90°"],
    correctAnswer: 1,
  },
  {
    id: 8,
    type: "Single",
    question: "What is the acceleration due to gravity on Earth?",
    options: ["9.8 m/s²", "10.8 m/s²", "8.9 m/s²", "11.2 m/s²"],
    correctAnswer: 0,
  },
  {
    id: 9,
    type: "Single",
    question: "Which law states that every action has an equal and opposite reaction?",
    options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Conservation of Energy"],
    correctAnswer: 2,
  },
  {
    id: 10,
    type: "Single",
    question: "What is the unit of electric current?",
    options: ["Volt", "Ampere", "Ohm", "Coulomb"],
    correctAnswer: 1,
  },
]

const motivationalMessages = [
  { title: "Fantastic!", subtitle: "You're unstoppable!" },
  { title: "Amazing!", subtitle: "Keep the momentum!" },
  { title: "Brilliant!", subtitle: "You're on fire!" },
  { title: "Outstanding!", subtitle: "Nothing can stop you!" },
  { title: "Incredible!", subtitle: "You're a genius!" },
  { title: "Phenomenal!", subtitle: "Absolutely crushing it!" },
  { title: "Spectacular!", subtitle: "You're in the zone!" },
  { title: "Magnificent!", subtitle: "Pure excellence!" },
]

function FullScreenProgressBar({
  currentQuestion,
  totalQuestions,
  score,
}: { currentQuestion: number; totalQuestions: number; score: number }) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="relative h-3 bg-gradient-to-r from-[#f1f5f9] to-[#e2e8f0]">
        {/* Main progress bar */}
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#ff6d0a] via-[#ff8533] to-[#ffab66] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
        </div>

        {/* Progress markers */}
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <div
            key={index}
            className={`absolute top-0 w-0.5 h-full transition-colors duration-300 ${
              index < currentQuestion + 1 ? "bg-white/50" : "bg-gray-400/30"
            }`}
            style={{ left: `${((index + 1) / totalQuestions) * 100}%` }}
          />
        ))}

        {/* Current position indicator */}
        <div
          className="absolute top-0 w-1 h-full bg-white shadow-lg transition-all duration-500"
          style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
        />
      </div>

      {/* Progress info bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#ff6d0a] to-[#ff8533] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-xs font-bold">★</span>
            </div>
            <span className="text-[#1b2124] font-semibold text-lg">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
          </div>

          <div className="h-6 w-px bg-gray-300"></div>

          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#ff6d0a]" />
            <span className="text-[#ff6d0a] font-bold text-lg">{score * 10} pts</span>
          </div>
        </div>

        <div className="text-[#747474] text-sm font-medium">{Math.round(progress)}% Complete</div>
      </div>
    </div>
  )
}

function SpeedTimeGraph() {
  return (
    <div className="flex justify-center mb-6">
      <div className="bg-[#f8f8f8] p-8 rounded-lg">
        <svg width="400" height="300" viewBox="0 0 400 300" className="border">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#e5e5e5" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Axes */}
          <line x1="60" y1="240" x2="360" y2="240" stroke="#1b2124" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="60" y1="240" x2="60" y2="40" stroke="#1b2124" strokeWidth="2" markerEnd="url(#arrowhead)" />

          {/* Arrow markers */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#1b2124" />
            </marker>
          </defs>

          {/* Y-axis labels */}
          <text x="45" y="245" textAnchor="end" className="text-sm fill-[#1b2124]">
            0
          </text>
          <text x="45" y="205" textAnchor="end" className="text-sm fill-[#1b2124]">
            5
          </text>
          <text x="45" y="165" textAnchor="end" className="text-sm fill-[#1b2124]">
            10
          </text>
          <text x="45" y="125" textAnchor="end" className="text-sm fill-[#1b2124]">
            15
          </text>
          <text x="45" y="85" textAnchor="end" className="text-sm fill-[#1b2124]">
            20
          </text>

          {/* X-axis labels */}
          <text x="100" y="255" textAnchor="middle" className="text-sm fill-[#1b2124]">
            1
          </text>
          <text x="140" y="255" textAnchor="middle" className="text-sm fill-[#1b2124]">
            2
          </text>
          <text x="180" y="255" textAnchor="middle" className="text-sm fill-[#1b2124]">
            3
          </text>
          <text x="220" y="255" textAnchor="middle" className="text-sm fill-[#1b2124]">
            4
          </text>

          {/* Graph line */}
          <line x1="60" y1="240" x2="220" y2="80" stroke="#1b2124" strokeWidth="2" />

          {/* Point A */}
          <circle cx="220" cy="80" r="3" fill="#1b2124" />
          <text x="230" y="85" className="text-sm fill-[#1b2124]">
            A
          </text>

          {/* Dashed lines */}
          <line x1="220" y1="80" x2="220" y2="240" stroke="#cdd1d8" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="60" y1="80" x2="220" y2="80" stroke="#cdd1d8" strokeWidth="1" strokeDasharray="5,5" />

          {/* Axis labels */}
          <text x="30" y="140" textAnchor="middle" className="text-sm fill-[#1b2124]" transform="rotate(-90 30 140)">
            speed
          </text>
          <text x="30" y="160" textAnchor="middle" className="text-sm fill-[#1b2124]" transform="rotate(-90 30 160)">
            (m/s)
          </text>
          <text x="210" y="280" textAnchor="middle" className="text-sm fill-[#1b2124]">
            Time(s)
          </text>
        </svg>
      </div>
    </div>
  )
}

function StreakIndicator({ streak, maxStreak }: { streak: number; maxStreak: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: Math.min(streak, 5) }).map((_, i) => (
        <Flame key={i} className="w-4 h-4 text-[#ff6d0a] animate-pulse" />
      ))}
      {streak > 0 && (
        <span className="text-[#ff6d0a] font-bold text-sm ml-1">
          {streak} {streak >= 5 ? "🔥" : ""}
        </span>
      )}
    </div>
  )
}

function StreakCelebration({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000) // Changed from 3000 to 2000
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 text-center animate-bounce">
        <div className="text-6xl mb-4">🔥</div>
        <h2 className="text-3xl font-bold text-[#ff6d0a] mb-2">STREAK MASTER!</h2>
        <p className="text-[#1b2124] text-lg mb-4">5 correct answers in a row!</p>
        <div className="flex justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Flame key={i} className="w-6 h-6 text-[#ff6d0a] animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}

function CatMascot({
  isCorrect,
  showFeedback,
  streak,
  hasAchievedStreak,
  isAnswered,
}: {
  isCorrect?: boolean
  showFeedback: boolean
  streak: number
  hasAchievedStreak: boolean
  isAnswered: boolean
}) {
  const getMessage = () => {
    if (!isAnswered) return { title: "Good luck!", subtitle: "You can do it!" }

    if (isCorrect) {
      if (streak >= 5 && hasAchievedStreak) {
        // After achieving streak, use motivational messages
        const messageIndex = Math.floor(Math.random() * motivationalMessages.length)
        return motivationalMessages[messageIndex]
      } else if (streak === 5) {
        return { title: "STREAK MASTER!", subtitle: "5 in a row! 🔥" }
      } else if (streak >= 3) {
        return { title: "On fire!", subtitle: `${streak} in a row!` }
      } else {
        return { title: "Great job!", subtitle: "Keep it up!" }
      }
    }

    return { title: "Oops! Don't worry", subtitle: "Keep it up" }
  }

  const message = getMessage()
  const titleColor = isAnswered && isCorrect ? "#22c55e" : isAnswered ? "#bf2734" : "#1b2124"

  return (
    <div className="flex-shrink-0">
      <div className="relative">
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-[#e5e5e5]">
          <div className="font-medium text-sm mb-1" style={{ color: titleColor }}>
            {message.title}
          </div>
          <div className="text-[#1b2124] text-sm">{message.subtitle}</div>
          {streak >= 3 && isAnswered && isCorrect && (
            <div className="flex justify-center mt-2">
              <StreakIndicator streak={streak} maxStreak={streak} />
            </div>
          )}
          <div className="absolute bottom-0 left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white"></div>
        </div>
        <div className="w-24 h-24 relative">
          {/* Celebration effects for streak */}
          {streak >= 5 && isAnswered && isCorrect && (
            <div className="absolute -top-2 -right-2 animate-bounce">
              <div className="w-6 h-6 bg-[#ff6d0a] rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
            </div>
          )}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Cat body */}
            <ellipse cx="50" cy="70" rx="25" ry="20" fill="#ff6d0a" />
            {/* Cat head */}
            <circle cx="50" cy="40" r="20" fill="#ff6d0a" />
            {/* Cat ears */}
            <polygon points="35,25 40,35 30,35" fill="#ff6d0a" />
            <polygon points="65,25 70,35 60,35" fill="#ff6d0a" />
            {/* Inner ears */}
            <polygon points="36,28 38,32 34,32" fill="#ffffff" />
            <polygon points="64,28 66,32 62,32" fill="#ffffff" />
            {/* Eyes - special eyes for streak */}
            {streak >= 5 && isAnswered && isCorrect ? (
              <>
                <text x="45" y="42" className="text-xs">
                  ⭐
                </text>
                <text x="55" y="42" className="text-xs">
                  ⭐
                </text>
              </>
            ) : (
              <>
                <circle cx="45" cy="38" r="3" fill="#1b2124" />
                <circle cx="55" cy="38" r="3" fill="#1b2124" />
                <circle cx="46" cy="37" r="1" fill="#ffffff" />
                <circle cx="56" cy="37" r="1" fill="#ffffff" />
              </>
            )}
            {/* Nose */}
            <polygon points="50,42 48,45 52,45" fill="#1b2124" />
            {/* Mouth - happy mouth for streak */}
            {streak >= 3 && isAnswered && isCorrect ? (
              <path d="M 44 48 Q 50 52 56 48" stroke="#1b2124" strokeWidth="2" fill="none" />
            ) : (
              <>
                <path d="M 50 45 Q 47 48 44 46" stroke="#1b2124" strokeWidth="1" fill="none" />
                <path d="M 50 45 Q 53 48 56 46" stroke="#1b2124" strokeWidth="1" fill="none" />
              </>
            )}
            {/* Whiskers */}
            <line x1="30" y1="40" x2="40" y2="42" stroke="#1b2124" strokeWidth="1" />
            <line x1="30" y1="45" x2="40" y2="45" stroke="#1b2124" strokeWidth="1" />
            <line x1="60" y1="42" x2="70" y2="40" stroke="#1b2124" strokeWidth="1" />
            <line x1="60" y1="45" x2="70" y2="45" stroke="#1b2124" strokeWidth="1" />
            {/* Chest */}
            <ellipse cx="50" cy="65" rx="12" ry="15" fill="#ffffff" />
            {/* Tail */}
            <path d="M 75 70 Q 85 60 80 45" stroke="#ff6d0a" strokeWidth="8" fill="none" strokeLinecap="round" />
            {/* Paws */}
            <ellipse cx="40" cy="85" rx="6" ry="4" fill="#ffffff" />
            <ellipse cx="60" cy="85" rx="6" ry="4" fill="#ffffff" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function QuizQuestion({
  question,
  selectedAnswer,
  onAnswerChange,
  showFeedback,
  isCorrect,
}: {
  question: Question
  selectedAnswer: number | null
  onAnswerChange: (answer: number) => void
  showFeedback: boolean
  isCorrect?: boolean
}) {
  return (
    <div className="bg-white rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[#747474] text-sm">Type : {question.type}</span>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 text-[#1b2124]">
                English
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Spanish</DropdownMenuItem>
              <DropdownMenuItem>French</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <p className="text-[#1b2124] text-lg mb-6">{question.question}</p>

      {question.hasGraph && <SpeedTimeGraph />}
    </div>
  )
}

function QuizOptions({
  options,
  selectedAnswer,
  onAnswerChange,
  showFeedback,
  correctAnswer,
  isAnswered,
}: {
  options: string[]
  selectedAnswer: number | null
  onAnswerChange: (answer: number) => void
  showFeedback: boolean
  correctAnswer: number
  isAnswered: boolean
}) {
  return (
    <RadioGroup
      value={selectedAnswer?.toString() || ""}
      onValueChange={(value) => onAnswerChange(Number.parseInt(value))}
      className="space-y-4"
    >
      {options.map((option, index) => {
        const isSelected = selectedAnswer === index
        const isCorrect = index === correctAnswer

        let bgColor = "bg-white"
        let borderColor = "border-[#e5e5e5]"
        let numberBg = "bg-[#f8f8f8]"
        let numberBorder = "border-[#e5e5e5]"
        let numberColor = "text-[#747474]"

        if (isAnswered && showFeedback) {
          if (isCorrect) {
            bgColor = "bg-[#f0fdf4]"
            borderColor = "border-[#22c55e]"
            numberBg = "bg-[#22c55e]"
            numberBorder = "border-[#22c55e]"
            numberColor = "text-white"
          } else if (isSelected && !isCorrect) {
            bgColor = "bg-[#fee7e9]"
            borderColor = "border-[#e8b1b6]"
            numberBg = "bg-[#bf2734]"
            numberBorder = "border-[#bf2734]"
            numberColor = "text-white"
          }
        } else if (isSelected) {
          bgColor = "bg-[#fee7e9]"
          borderColor = "border-[#e8b1b6]"
          numberBg = "bg-white"
          numberBorder = "border-[#e8b1b6]"
          numberColor = "text-[#bf2734]"
        }

        return (
          <div key={index} className={`${bgColor} border ${borderColor} rounded-lg p-4`}>
            <div className="flex items-center space-x-3">
              <div
                className={`flex items-center justify-center w-6 h-6 rounded-full ${numberBg} border ${numberBorder} ${numberColor} font-medium text-sm`}
              >
                {index + 1}
              </div>
              <Label htmlFor={`option${index}`} className="flex-1 text-[#1b2124] cursor-pointer">
                {option}
              </Label>
              <RadioGroupItem
                value={index.toString()}
                id={`option${index}`}
                className={
                  isAnswered && showFeedback && isCorrect
                    ? "border-[#22c55e] text-[#22c55e]"
                    : isSelected
                      ? "border-[#bf2734] text-[#bf2734]"
                      : "border-[#e5e5e5]"
                }
              />
            </div>
          </div>
        )
      })}
    </RadioGroup>
  )
}

function QuizResults({
  score,
  totalQuestions,
  maxStreak,
  onRestart,
}: {
  score: number
  totalQuestions: number
  maxStreak: number
  onRestart: () => void
}) {
  const percentage = Math.round((score / totalQuestions) * 100)

  return (
    <div className="min-h-screen bg-[#eff3f7] p-4">
      <div className="max-w-4xl mx-auto pt-20">
        <div className="bg-white rounded-lg p-8 text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Celebration cat */}
                <ellipse cx="50" cy="70" rx="25" ry="20" fill="#ff6d0a" />
                <circle cx="50" cy="40" r="20" fill="#ff6d0a" />
                <polygon points="35,25 40,35 30,35" fill="#ff6d0a" />
                <polygon points="65,25 70,35 60,35" fill="#ff6d0a" />
                <polygon points="36,28 38,32 34,32" fill="#ffffff" />
                <polygon points="64,28 66,32 62,32" fill="#ffffff" />
                <text x="45" y="42" className="text-xs">
                  ⭐
                </text>
                <text x="55" y="42" className="text-xs">
                  ⭐
                </text>
                <polygon points="50,42 48,45 52,45" fill="#1b2124" />
                <path d="M 44 48 Q 50 52 56 48" stroke="#1b2124" strokeWidth="2" fill="none" />
                <ellipse cx="50" cy="65" rx="12" ry="15" fill="#ffffff" />
                <path d="M 75 70 Q 85 60 80 45" stroke="#ff6d0a" strokeWidth="8" fill="none" strokeLinecap="round" />
                <ellipse cx="40" cy="85" rx="6" ry="4" fill="#ffffff" />
                <ellipse cx="60" cy="85" rx="6" ry="4" fill="#ffffff" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-[#1b2124] mb-4">Quiz Completed!</h1>

            <div className="text-6xl font-bold text-[#5a4bda] mb-2">{percentage}%</div>
            <p className="text-[#747474] text-lg mb-6">
              You scored {score} out of {totalQuestions} questions correctly
            </p>

            <div className="bg-[#f8f8f8] rounded-lg p-6 mb-8">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-[#22c55e]">{score}</div>
                  <div className="text-[#747474] text-sm">Correct</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#bf2734]">{totalQuestions - score}</div>
                  <div className="text-[#747474] text-sm">Incorrect</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#ff6d0a]">{percentage}%</div>
                  <div className="text-[#747474] text-sm">Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#ff6d0a] flex items-center justify-center gap-1">
                    {maxStreak}
                    <Flame className="w-5 h-5" />
                  </div>
                  <div className="text-[#747474] text-sm">Max Streak</div>
                </div>
              </div>
            </div>

            {maxStreak >= 5 && (
              <div className="bg-gradient-to-r from-[#ff6d0a] to-[#ff8533] text-white rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Flame className="w-6 h-6" />
                  <span className="text-xl font-bold">STREAK MASTER!</span>
                  <Flame className="w-6 h-6" />
                </div>
                <p className="text-sm opacity-90">You achieved a {maxStreak}-question streak! 🔥</p>
              </div>
            )}

            <div className="space-y-4">
              <Button
                onClick={onRestart}
                className="bg-[#5a4bda] hover:bg-[#4a3bc7] text-white px-8 py-3 rounded-lg text-lg"
              >
                Try Again
              </Button>
              <div>
                <Button variant="outline" className="text-[#747474] border-[#e5e5e5]">
                  Review Answers
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function QuizApp() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    score: 0,
    streak: 0,
    maxStreak: 0,
    hasAchievedStreak: false,
    isCompleted: false,
    answeredQuestions: new Set(),
  })

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showStreakCelebration, setShowStreakCelebration] = useState(false)

  const currentQuestion = questions[quizState.currentQuestion]
  const isLastQuestion = quizState.currentQuestion === questions.length - 1
  const isFirstQuestion = quizState.currentQuestion === 0
  const isAnswered = quizState.answeredQuestions.has(currentQuestion.id)
  const isCorrect = selectedAnswer !== null && selectedAnswer === currentQuestion.correctAnswer

  // Load saved answer when navigating to a question
  useEffect(() => {
    const savedAnswer = quizState.answers[currentQuestion.id]
    if (savedAnswer !== undefined) {
      setSelectedAnswer(savedAnswer)
    } else {
      setSelectedAnswer(null)
    }
  }, [quizState.currentQuestion, currentQuestion.id, quizState.answers])

  const handleAnswerSelect = (answer: number) => {
    setSelectedAnswer(answer)
  }

  const handleNext = () => {
    // Process current answer if not already processed
    if (selectedAnswer !== null && !isAnswered) {
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer
      const newAnswers = { ...quizState.answers, [currentQuestion.id]: selectedAnswer }
      const newScore = isCorrect ? quizState.score + 1 : quizState.score
      const newStreak = isCorrect ? quizState.streak + 1 : 0
      const newMaxStreak = Math.max(quizState.maxStreak, newStreak)
      const newHasAchievedStreak = quizState.hasAchievedStreak || newStreak >= 5
      const newAnsweredQuestions = new Set(quizState.answeredQuestions).add(currentQuestion.id)

      setQuizState((prev) => ({
        ...prev,
        answers: newAnswers,
        score: newScore,
        streak: newStreak,
        maxStreak: newMaxStreak,
        hasAchievedStreak: newHasAchievedStreak,
        answeredQuestions: newAnsweredQuestions,
      }))

      // Show streak celebration if reaching 5 for the first time
      if (newStreak === 5 && !quizState.hasAchievedStreak) {
        setTimeout(() => setShowStreakCelebration(true), 500)
      }

      // Show feedback for 1.5 seconds before moving to next question
      setTimeout(() => {
        if (isLastQuestion) {
          setQuizState((prev) => ({ ...prev, isCompleted: true }))
        } else {
          setQuizState((prev) => ({ ...prev, currentQuestion: prev.currentQuestion + 1 }))
        }
      }, 1500)
    } else if (selectedAnswer !== null && isAnswered) {
      // Just update the saved answer and move to next question
      const newAnswers = { ...quizState.answers, [currentQuestion.id]: selectedAnswer }
      setQuizState((prev) => ({
        ...prev,
        answers: newAnswers,
      }))

      if (isLastQuestion) {
        setQuizState((prev) => ({ ...prev, isCompleted: true }))
      } else {
        setQuizState((prev) => ({ ...prev, currentQuestion: prev.currentQuestion + 1 }))
      }
    }
  }

  const handlePrev = () => {
    // Process current answer if not already processed
    if (selectedAnswer !== null && !isAnswered) {
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer
      const newAnswers = { ...quizState.answers, [currentQuestion.id]: selectedAnswer }
      const newScore = isCorrect ? quizState.score + 1 : quizState.score
      const newStreak = isCorrect ? quizState.streak + 1 : 0
      const newMaxStreak = Math.max(quizState.maxStreak, newStreak)
      const newHasAchievedStreak = quizState.hasAchievedStreak || newStreak >= 5
      const newAnsweredQuestions = new Set(quizState.answeredQuestions).add(currentQuestion.id)

      setQuizState((prev) => ({
        ...prev,
        answers: newAnswers,
        score: newScore,
        streak: newStreak,
        maxStreak: newMaxStreak,
        hasAchievedStreak: newHasAchievedStreak,
        answeredQuestions: newAnsweredQuestions,
        currentQuestion: prev.currentQuestion - 1,
      }))

      // Show streak celebration if reaching 5 for the first time
      if (newStreak === 5 && !quizState.hasAchievedStreak) {
        setTimeout(() => setShowStreakCelebration(true), 500)
      }
    } else if (selectedAnswer !== null && isAnswered) {
      // Just update the saved answer and move to previous question
      const newAnswers = { ...quizState.answers, [currentQuestion.id]: selectedAnswer }
      setQuizState((prev) => ({
        ...prev,
        answers: newAnswers,
        currentQuestion: prev.currentQuestion - 1,
      }))
    } else if (!isFirstQuestion) {
      // No answer selected, just navigate
      setQuizState((prev) => ({ ...prev, currentQuestion: prev.currentQuestion - 1 }))
    }
  }

  const handleRestart = () => {
    setQuizState({
      currentQuestion: 0,
      answers: {},
      score: 0,
      streak: 0,
      maxStreak: 0,
      hasAchievedStreak: false,
      isCompleted: false,
      answeredQuestions: new Set(),
    })
    setSelectedAnswer(null)
    setShowStreakCelebration(false)
  }

  if (quizState.isCompleted) {
    return (
      <>
        <FullScreenProgressBar
          currentQuestion={questions.length - 1}
          totalQuestions={questions.length}
          score={quizState.score}
        />
        <QuizResults
          score={quizState.score}
          totalQuestions={questions.length}
          maxStreak={quizState.maxStreak}
          onRestart={handleRestart}
        />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-[#eff3f7]">
      {/* Full screen progress bar */}
      <FullScreenProgressBar
        currentQuestion={quizState.currentQuestion}
        totalQuestions={questions.length}
        score={quizState.score}
      />

      <div className="pt-24 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Question */}
          <QuizQuestion
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onAnswerChange={handleAnswerSelect}
            showFeedback={isAnswered}
            isCorrect={isCorrect}
          />

          <div className="flex gap-6">
            {/* Cat mascot */}
            <CatMascot
              isCorrect={isCorrect}
              showFeedback={isAnswered}
              streak={quizState.streak}
              hasAchievedStreak={quizState.hasAchievedStreak}
              isAnswered={isAnswered}
            />

            {/* Answer options */}
            <div className="flex-1">
              <QuizOptions
                options={currentQuestion.options}
                selectedAnswer={selectedAnswer}
                onAnswerChange={handleAnswerSelect}
                showFeedback={isAnswered}
                correctAnswer={currentQuestion.correctAnswer}
                isAnswered={isAnswered}
              />

              {/* Navigation buttons */}
              <div className="flex justify-between items-center mt-8">
                <Button
                  onClick={handlePrev}
                  disabled={isFirstQuestion}
                  variant="outline"
                  className="flex items-center gap-2 px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                {/* Streak indicator */}
                {quizState.streak > 0 && (
                  <div className="flex items-center gap-1 bg-white rounded-full px-4 py-2 border border-[#ff6d0a] shadow-sm">
                    <StreakIndicator streak={quizState.streak} maxStreak={quizState.maxStreak} />
                  </div>
                )}

                {isLastQuestion ? (
                  <Button
                    onClick={handleNext}
                    disabled={selectedAnswer === null}
                    className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-8 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {!isAnswered && selectedAnswer !== null ? "Check & Submit" : "Submit Quiz"}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={selectedAnswer === null}
                    className="bg-[#5a4bda] hover:bg-[#4a3bc7] text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {!isAnswered && selectedAnswer !== null ? "Check & Next" : "Next"}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Streak celebration modal */}
      {showStreakCelebration && <StreakCelebration onClose={() => setShowStreakCelebration(false)} />}
    </div>
  )
}
