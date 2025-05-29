"use client";

import { useState } from "react";
import HomeScreenWidget from "@/components/home-screen-widget";
import AdaptiveQuiz from "@/components/adaptive-quiz";
import ResultsScreen from "@/components/results-screen";
import LeaderboardScreen from "@/components/leaderboard-screen";
import OverviewLeaderboard from "@/components/overview-leaderboard";

type Screen =
  | "home"
  | "quiz"
  | "results"
  | "leaderboard"
  | "overview-leaderboard";

interface QuizResult {
  score: number;
  maxScore: number;
  difficulties: ("E" | "M" | "H")[];
  finalScore: number;
  previousScore?: number;
  rank?: number;
}

export default function Page() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [previousScore, setPreviousScore] = useState<number | undefined>(
    undefined
  );
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);

  const handleAttemptMatch = (matchId: string) => {
    setSelectedMatchId(matchId);
    setCurrentScreen("quiz");
  };

  const handleNavigateToQuiz = () => {
    setCurrentScreen("quiz");
  };

  const handleNavigateToLeaderboard = () => {
    setCurrentScreen("overview-leaderboard");
  };

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setCurrentScreen("results");
  };

  const handleRestart = () => {
    if (quizResult) {
      setPreviousScore(quizResult.finalScore);
    }
    setQuizResult(null);
    setCurrentScreen("quiz");
  };

  const handleViewLeaderboard = () => {
    setCurrentScreen("leaderboard");
  };

  const handleBackToResults = () => {
    setCurrentScreen("results");
  };

  const handleBackToHome = () => {
    setCurrentScreen("home");
  };

  if (currentScreen === "home") {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto mb-6">
          <h1 className="text-3xl font-bold text-[#1b2124] mb-2">
            Youdha Abhyas
          </h1>
          <p className="text-[#747474]">Your daily practice platform</p>
        </div>
        <HomeScreenWidget
          onStartQuiz={handleNavigateToQuiz}
          onViewLeaderboard={handleNavigateToLeaderboard}
        />
        <div className="max-w-4xl mx-auto mt-4 text-center">
          <p className="text-[#747474] text-sm">More features coming soon...</p>
        </div>
      </div>
    );
  }

  if (currentScreen === "quiz") {
    return (
      <AdaptiveQuiz
        onComplete={handleQuizComplete}
        previousScore={previousScore}
        userId="6838182cb05c7eeec49e0f32"
        videoId="68382e00ea95a664aaef9853"
      />
    );
  }

  if (currentScreen === "results" && quizResult) {
    return (
      <ResultsScreen
        score={quizResult.score}
        maxScore={quizResult.maxScore}
        difficulties={quizResult.difficulties}
        finalScore={quizResult.finalScore}
        previousScore={quizResult.previousScore}
        onRestart={handleRestart}
        onViewLeaderboard={handleViewLeaderboard}
      />
    );
  }

  if (currentScreen === "leaderboard") {
    return (
      <LeaderboardScreen
        // userId="6838182cb05c7eeec49e0f32"
        userScore={80}
        userRank={6}
        onBack={handleBackToResults}
        onReattempt={handleRestart}
        videoId="68382e00ea95a664aaef9853"
      />
    );
  }

  if (currentScreen === "overview-leaderboard") {
    return (
      <OverviewLeaderboard
        onStartQuiz={handleAttemptMatch}
        onViewDetailedLeaderboard={handleViewLeaderboard}
        onBack={handleBackToHome}
      />
    );
  }

  return null;
}
