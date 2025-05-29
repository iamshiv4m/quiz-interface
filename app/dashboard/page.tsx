"use client";

import { useState } from "react";
import DashboardWidget from "../../components/dashboard-widget";
import AdaptiveQuiz from "../../components/adaptive-quiz";
import ResultsScreen from "../../components/results-screen";
import LeaderboardScreen from "../../components/leaderboard-screen";
import OverviewLeaderboard from "../../components/overview-leaderboard";

type Screen =
  | "dashboard"
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
}

export default function DashboardPage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [previousScore, setPreviousScore] = useState<number | undefined>(
    undefined
  );

  const handleNavigateToQuiz = () => {
    setCurrentScreen("quiz");
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
    setCurrentScreen("overview-leaderboard");
  };

  const handleBackToResults = () => {
    setCurrentScreen("results");
  };

  const handleBackToDashboard = () => {
    setCurrentScreen("dashboard");
  };

  const handleAttemptMatch = (matchId: string) => {
    setCurrentScreen("quiz");
  };

  if (currentScreen === "dashboard") {
    return (
      <DashboardWidget
        onNavigateToQuiz={handleNavigateToQuiz}
        onNavigateToLeaderboard={handleViewLeaderboard}
      />
    );
  }

  if (currentScreen === "quiz") {
    return (
      <AdaptiveQuiz
        onComplete={handleQuizComplete}
        previousScore={previousScore}
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

  if (currentScreen === "leaderboard" && quizResult) {
    return (
      <LeaderboardScreen
        userScore={quizResult.finalScore}
        userRank={6}
        onBack={handleBackToResults}
        onReattempt={handleRestart}
      />
    );
  }

  if (currentScreen === "overview-leaderboard") {
    return (
      <OverviewLeaderboard
        onStartQuiz={handleAttemptMatch}
        onViewDetailedLeaderboard={handleViewLeaderboard}
        onBack={handleBackToDashboard}
      />
    );
  }

  return null;
}
