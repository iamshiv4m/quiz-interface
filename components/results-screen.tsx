"use client"
import { Trophy, Medal, Award, RotateCcw, TrendingUp, Lightbulb, Target, Zap, ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface ResultsScreenProps {
  score: number
  maxScore: number
  difficulties: ("E" | "M" | "H")[]
  finalScore: number
  previousScore?: number
  onRestart: () => void
  onViewLeaderboard: () => void
}

function ScoreChangeAnimation({
  currentScore,
  previousScore,
  onComplete,
}: {
  currentScore: number
  previousScore: number
  onComplete: () => void
}) {
  const [showAnimation, setShowAnimation] = useState(true)
  const scoreDiff = currentScore - previousScore
  const isImprovement = scoreDiff > 0
  const isSignificantChange = Math.abs(scoreDiff) >= 10

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false)
      onComplete()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onComplete])

  if (!showAnimation) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-2xl p-8 text-center animate-bounce max-w-md mx-4 ${
          isImprovement ? "border-4 border-green-400" : "border-4 border-blue-400"
        }`}
      >
        {isImprovement ? (
          <>
            <div className="text-6xl mb-4 animate-pulse">🎉</div>
            <h2 className="text-3xl font-bold text-green-600 mb-2">
              {isSignificantChange ? "AMAZING IMPROVEMENT!" : "GREAT PROGRESS!"}
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl font-bold text-gray-600">{previousScore}</span>
              <ArrowUp className="w-8 h-8 text-green-500 animate-bounce" />
              <span className="text-3xl font-bold text-green-600">{currentScore}</span>
            </div>
            <p className="text-green-700 text-lg mb-4">+{scoreDiff} points improvement! 🚀</p>
            {isSignificantChange && (
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-green-800 text-sm font-medium">
                  🏆 Outstanding! You've mastered more difficult questions!
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="text-6xl mb-4">💪</div>
            <h2 className="text-3xl font-bold text-blue-600 mb-2">
              {Math.abs(scoreDiff) >= 10 ? "KEEP PUSHING!" : "STAY STRONG!"}
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl font-bold text-gray-600">{previousScore}</span>
              <ArrowDown className="w-8 h-8 text-blue-500" />
              <span className="text-3xl font-bold text-blue-600">{currentScore}</span>
            </div>
            <p className="text-blue-700 text-lg mb-4">Every attempt makes you stronger! 💪</p>
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-blue-800 text-sm font-medium">
                🎯 Focus on accuracy to unlock harder questions next time!
              </p>
            </div>
          </>
        )}

        <div className="mt-4 flex justify-center gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full animate-pulse ${isImprovement ? "bg-green-400" : "bg-blue-400"}`}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ResultsScreen({
  score,
  maxScore,
  difficulties,
  finalScore,
  previousScore,
  onRestart,
  onViewLeaderboard,
}: ResultsScreenProps) {
  const [showScoreAnimation, setShowScoreAnimation] = useState(!!previousScore)
  const [animationComplete, setAnimationComplete] = useState(!previousScore)

  const getBadge = (score: number) => {
    if (score >= 90) return { name: "Master", color: "text-yellow-600", bg: "bg-yellow-50", icon: Trophy }
    if (score >= 70) return { name: "Intermediate", color: "text-blue-600", bg: "bg-blue-50", icon: Medal }
    return { name: "Beginner", color: "text-green-600", bg: "bg-green-50", icon: Award }
  }

  const badge = getBadge(finalScore)
  const BadgeIcon = badge.icon

  const difficultyCount = {
    E: difficulties.filter((d) => d === "E").length,
    M: difficulties.filter((d) => d === "M").length,
    H: difficulties.filter((d) => d === "H").length,
  }

  const handleRestartWithPreviousScore = () => {
    onRestart()
  }

  return (
    <>
      {showScoreAnimation && previousScore && (
        <ScoreChangeAnimation
          currentScore={finalScore}
          previousScore={previousScore}
          onComplete={() => {
            setShowScoreAnimation(false)
            setAnimationComplete(true)
          }}
        />
      )}

      <div
        className={`min-h-screen bg-[#eff3f7] p-4 transition-opacity duration-500 ${
          animationComplete ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-4xl mx-auto pt-8">
          <div className="bg-white rounded-lg p-8 text-center">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#1b2124] mb-2">Laws of Motion - Match 1/5</h1>
              <p className="text-[#747474]">AI Adaptive DPP Results</p>
              {previousScore && (
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="text-sm text-[#747474]">Previous: {previousScore}/100</span>
                  <span className="text-sm text-[#747474]">→</span>
                  <span className="text-sm font-semibold text-[#1b2124]">Current: {finalScore}/100</span>
                  {finalScore > previousScore && <Zap className="w-4 h-4 text-green-500" />}
                </div>
              )}
            </div>

            {/* Score Circle */}
            <div className="mb-8">
              <div className="relative w-48 h-48 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#e5e5e5" strokeWidth="8" fill="none" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#ff6d0a"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${finalScore * 2.51} 251`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#1b2124]">{finalScore}</div>
                    <div className="text-sm text-[#747474]">out of 100</div>
                  </div>
                </div>
              </div>

              {/* Badge */}
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${badge.bg} ${badge.color} font-medium`}
              >
                <BadgeIcon className="w-5 h-5" />
                {badge.name}
              </div>
            </div>

            {/* Adaptive Scoring Explanation */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-[#1b2124] mb-2">🧠 How AI Adaptive Scoring Works</h3>
                  <p className="text-[#747474] text-sm mb-3">
                    Your score is calculated based on the difficulty of questions you answered correctly. More accurate
                    answers unlock harder questions, resulting in higher scores!
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-700">Easy Questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-blue-700">Medium Questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-red-700">Hard Questions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Question Difficulty Breakdown */}
            <div className="bg-[#f8f8f8] rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-[#1b2124] mb-4">Question Difficulty Breakdown</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-[#22c55e]">{difficultyCount.E}</div>
                  <div className="text-[#747474] text-sm">Easy Questions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#3b82f6]">{difficultyCount.M}</div>
                  <div className="text-[#747474] text-sm">Medium Questions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#ef4444]">{difficultyCount.H}</div>
                  <div className="text-[#747474] text-sm">Hard Questions</div>
                </div>
              </div>
            </div>

            {/* Difficulty Pattern */}
            <div className="bg-white border rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-[#1b2124] mb-4">Your Adaptive Journey</h3>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {difficulties.map((diff, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      diff === "H" ? "bg-red-500" : diff === "M" ? "bg-blue-500" : "bg-green-500"
                    }`}
                  >
                    {diff}
                  </div>
                ))}
              </div>
              <p className="text-[#747474] text-sm mt-2">Your difficulty progression through the quiz</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button onClick={handleRestartWithPreviousScore} variant="outline" className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Re-attempt
              </Button>
              <Button
                onClick={onViewLeaderboard}
                className="bg-[#5a4bda] hover:bg-[#4a3bc7] text-white flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                View Leaderboard
              </Button>
            </div>

            {/* Motivational Message */}
            {finalScore < 90 && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-700">Improvement Tip</span>
                </div>
                <p className="text-blue-700 text-sm">
                  💡 Focus on accuracy to unlock harder questions! Re-attempt to reach more difficult levels and achieve
                  90/100 for Master status.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
