"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Flame, ChevronDown, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Question, QuizState } from "../types"
import { questionBank } from "../data/questions"

interface AdaptiveQuizProps {
  onComplete: (result: {
    score: number
    maxScore: number
    difficulties: ("E" | "M" | "H")[]
    finalScore: number
    previousScore?: number
  }) => void
  previousScore?: number
}

function FullScreenProgressBar({
  currentQuestion,
  totalQuestions,
}: { currentQuestion: number; totalQuestions: number }) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="relative h-3 bg-gradient-to-r from-[#f1f5f9] to-[#e2e8f0]">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#ff6d0a] via-[#ff8533] to-[#ffab66] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
        </div>

        {Array.from({ length: totalQuestions }).map((_, index) => (
          <div
            key={index}
            className={`absolute top-0 w-0.5 h-full transition-colors duration-300 ${
              index < currentQuestion + 1 ? "bg-white/50" : "bg-gray-400/30"
            }`}
            style={{ left: `${((index + 1) / totalQuestions) * 100}%` }}
          />
        ))}

        <div
          className="absolute top-0 w-1 h-full bg-white shadow-lg transition-all duration-500"
          style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
        />
      </div>

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
            <span className="text-[#ff6d0a] font-bold text-lg">AI Adaptive</span>
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
          <defs>
            <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#e5e5e5" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          <line x1="60" y1="240" x2="360" y2="240" stroke="#1b2124" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="60" y1="240" x2="60" y2="40" stroke="#1b2124" strokeWidth="2" markerEnd="url(#arrowhead)" />

          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#1b2124" />
            </marker>
          </defs>

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

          <line x1="60" y1="240" x2="220" y2="80" stroke="#1b2124" strokeWidth="2" />
          <circle cx="220" cy="80" r="3" fill="#1b2124" />
          <text x="230" y="85" className="text-sm fill-[#1b2124]">
            A
          </text>

          <line x1="220" y1="80" x2="220" y2="240" stroke="#cdd1d8" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="60" y1="80" x2="220" y2="80" stroke="#cdd1d8" strokeWidth="1" strokeDasharray="5,5" />

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

function CatMascot({
  message,
  isCorrect,
  showFeedback,
}: { message: string; isCorrect?: boolean; showFeedback: boolean }) {
  const titleColor = showFeedback && isCorrect ? "#22c55e" : showFeedback ? "#bf2734" : "#1b2124"

  return (
    <div className="flex-shrink-0">
      <div className="relative">
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-[#e5e5e5]">
          <div className="font-medium text-sm mb-1" style={{ color: titleColor }}>
            {message}
          </div>
          <div className="absolute bottom-0 left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white"></div>
        </div>
        <div className="w-24 h-24 relative">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse cx="50" cy="70" rx="25" ry="20" fill="#ff6d0a" />
            <circle cx="50" cy="40" r="20" fill="#ff6d0a" />
            <polygon points="35,25 40,35 30,35" fill="#ff6d0a" />
            <polygon points="65,25 70,35 60,35" fill="#ff6d0a" />
            <polygon points="36,28 38,32 34,32" fill="#ffffff" />
            <polygon points="64,28 66,32 62,32" fill="#ffffff" />
            <circle cx="45" cy="38" r="3" fill="#1b2124" />
            <circle cx="55" cy="38" r="3" fill="#1b2124" />
            <circle cx="46" cy="37" r="1" fill="#ffffff" />
            <circle cx="56" cy="37" r="1" fill="#ffffff" />
            <polygon points="50,42 48,45 52,45" fill="#1b2124" />
            <path d="M 50 45 Q 47 48 44 46" stroke="#1b2124" strokeWidth="1" fill="none" />
            <path d="M 50 45 Q 53 48 56 46" stroke="#1b2124" strokeWidth="1" fill="none" />
            <line x1="30" y1="40" x2="40" y2="42" stroke="#1b2124" strokeWidth="1" />
            <line x1="30" y1="45" x2="40" y2="45" stroke="#1b2124" strokeWidth="1" />
            <line x1="60" y1="42" x2="70" y2="40" stroke="#1b2124" strokeWidth="1" />
            <line x1="60" y1="45" x2="70" y2="45" stroke="#1b2124" strokeWidth="1" />
            <ellipse cx="50" cy="65" rx="12" ry="15" fill="#ffffff" />
            <path d="M 75 70 Q 85 60 80 45" stroke="#ff6d0a" strokeWidth="8" fill="none" strokeLinecap="round" />
            <ellipse cx="40" cy="85" rx="6" ry="4" fill="#ffffff" />
            <ellipse cx="60" cy="85" rx="6" ry="4" fill="#ffffff" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function AdaptiveQuiz({ onComplete, previousScore }: AdaptiveQuizProps) {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    difficulties: ["E"], // Start with Easy
    score: 0,
    maxScore: 0,
    isCompleted: false,
  })

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([])
  const [mascotMessage, setMascotMessage] = useState(
    previousScore ? "Ready for your re-attempt!" : "Your Physics AI Abhyas is ready",
  )

  // Initialize questions
  useEffect(() => {
    const questions: Question[] = []
    // Start with an easy question
    questions.push(questionBank.easy[0])
    setCurrentQuestions(questions)
  }, [])

  const currentQuestion = currentQuestions[quizState.currentQuestion]
  const isLastQuestion = quizState.currentQuestion === 9 // 10 questions total
  const isFirstQuestion = quizState.currentQuestion === 0

  const getNextDifficulty = (currentDiff: "E" | "M" | "H", isCorrect: boolean): "E" | "M" | "H" => {
    if (isCorrect) {
      if (currentDiff === "E") return "M"
      if (currentDiff === "M") return "H"
      return "H" // Stay at Hard
    } else {
      if (currentDiff === "H") return "M"
      if (currentDiff === "M") return "E"
      return "E" // Stay at Easy
    }
  }

  const getMascotMessage = (prevDiff: "E" | "M" | "H", newDiff: "E" | "M" | "H", isCorrect: boolean) => {
    if (isCorrect) {
      if ((prevDiff === "E" && newDiff === "M") || (prevDiff === "M" && newDiff === "H")) {
        return "Great Job, here is a tougher one"
      } else if (prevDiff === "H" && newDiff === "H") {
        return "Yay, another one, maintaining your level"
      }
      return "Great job!"
    } else {
      return "Oops, try this easier one"
    }
  }

  const getQuestionByDifficulty = (difficulty: "E" | "M" | "H", usedIds: number[]): Question => {
    const pool = questionBank[difficulty === "E" ? "easy" : difficulty === "M" ? "medium" : "hard"]
    const available = pool.filter((q) => !usedIds.includes(q.id))
    return available[Math.floor(Math.random() * available.length)] || pool[0]
  }

  const handleAnswerSelect = (answer: number) => {
    setSelectedAnswer(answer)
  }

  const handleNext = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer
    const currentDiff = currentQuestion.difficulty
    const points = isCorrect ? (currentDiff === "H" ? 3 : currentDiff === "M" ? 2 : 1) : 0

    setShowFeedback(true)

    setTimeout(() => {
      if (isLastQuestion) {
        const finalScore = quizState.score + points
        const finalMaxScore = quizState.maxScore + (currentDiff === "H" ? 3 : currentDiff === "M" ? 2 : 1)
        const finalDifficulties = [...quizState.difficulties, currentDiff]

        // Calculate score out of 100 (max possible is 27 points)
        const scoreOutOf100 = Math.round((finalScore / 27) * 100)

        onComplete({
          score: finalScore,
          maxScore: finalMaxScore,
          difficulties: finalDifficulties,
          finalScore: scoreOutOf100,
          previousScore,
        })

        setQuizState((prev) => ({ ...prev, isCompleted: true }))
      } else {
        const nextDiff = getNextDifficulty(currentDiff, isCorrect)
        const usedIds = currentQuestions.map((q) => q.id)
        const nextQuestion = getQuestionByDifficulty(nextDiff, usedIds)

        setCurrentQuestions((prev) => [...prev, nextQuestion])
        setMascotMessage(getMascotMessage(currentDiff, nextDiff, isCorrect))

        setQuizState((prev) => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
          answers: { ...prev.answers, [currentQuestion.id]: selectedAnswer },
          score: prev.score + points,
          maxScore: prev.maxScore + (currentDiff === "H" ? 3 : currentDiff === "M" ? 2 : 1),
          difficulties: [...prev.difficulties, currentDiff],
        }))

        setSelectedAnswer(null)
        setShowFeedback(false)
      }
    }, 1500)
  }

  if (!currentQuestion) {
    return <div className="min-h-screen bg-[#eff3f7] flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#eff3f7]">
      <FullScreenProgressBar currentQuestion={quizState.currentQuestion} totalQuestions={10} />

      <div className="pt-24 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Question */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="text-[#747474] text-sm">Type : Single</span>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    currentQuestion.difficulty === "H"
                      ? "bg-red-100 text-red-700"
                      : currentQuestion.difficulty === "M"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                  }`}
                >
                  {currentQuestion.difficulty === "H" ? "Hard" : currentQuestion.difficulty === "M" ? "Medium" : "Easy"}
                </span>
              </div>
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

            <p className="text-[#1b2124] text-lg mb-6">{currentQuestion.question}</p>

            {currentQuestion.hasGraph && <SpeedTimeGraph />}
          </div>

          <div className="flex gap-6">
            <CatMascot
              message={mascotMessage}
              isCorrect={selectedAnswer === currentQuestion.correctAnswer}
              showFeedback={showFeedback}
            />

            <div className="flex-1">
              <RadioGroup
                value={selectedAnswer?.toString() || ""}
                onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
                className="space-y-4"
              >
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index
                  const isCorrect = index === currentQuestion.correctAnswer
                  const isSelectedAndCorrect = isSelected && isCorrect
                  const isSelectedAndWrong = isSelected && !isCorrect

                  let bgColor = "bg-white"
                  let borderColor = "border-[#e5e5e5]"
                  let numberBg = "bg-[#f8f8f8]"
                  let numberBorder = "border-[#e5e5e5]"
                  let numberColor = "text-[#747474]"

                  if (showFeedback) {
                    if (isCorrect) {
                      // Always show correct answer in green when feedback is shown
                      bgColor = "bg-[#f0fdf4]"
                      borderColor = "border-[#22c55e]"
                      numberBg = "bg-[#22c55e]"
                      numberBorder = "border-[#22c55e]"
                      numberColor = "text-white"
                    } else if (isSelectedAndWrong) {
                      // Show selected wrong answer in orange/red
                      bgColor = "bg-[#fee7e9]"
                      borderColor = "border-[#e8b1b6]"
                      numberBg = "bg-[#bf2734]"
                      numberBorder = "border-[#bf2734]"
                      numberColor = "text-white"
                    }
                  } else if (isSelected) {
                    // Before feedback, just show selection in neutral color
                    bgColor = "bg-[#f8fafc]"
                    borderColor = "border-[#5a4bda]"
                    numberBg = "bg-white"
                    numberBorder = "border-[#5a4bda]"
                    numberColor = "text-[#5a4bda]"
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
                            showFeedback && isCorrect
                              ? "border-[#22c55e] text-[#22c55e]"
                              : showFeedback && isSelectedAndWrong
                                ? "border-[#bf2734] text-[#bf2734]"
                                : isSelected
                                  ? "border-[#5a4bda] text-[#5a4bda]"
                                  : "border-[#e5e5e5]"
                          }
                          disabled={showFeedback}
                        />
                      </div>
                    </div>
                  )
                })}
              </RadioGroup>

              <div className="flex justify-end mt-8">
                {isLastQuestion ? (
                  <Button
                    onClick={handleNext}
                    disabled={selectedAnswer === null || showFeedback}
                    className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-8 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
                  >
                    {showFeedback ? "Finishing..." : "Submit Quiz"}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={selectedAnswer === null || showFeedback}
                    className="bg-[#5a4bda] hover:bg-[#4a3bc7] text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
                  >
                    {showFeedback ? "Next..." : "Check & Next"}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
