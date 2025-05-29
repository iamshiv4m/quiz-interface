"use client";

import { useEffect, useState } from "react";
import {
  Trophy,
  Medal,
  Award,
  RotateCcw,
  Lock,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
  Target,
  Zap,
  Users,
  Star,
  Crown,
  Shield,
  Sword,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { API_ENDPOINTS } from "@/lib/api-configs";
import apiClient from "@/lib/api-client";
import { formatLeaderboardResponse } from "@/lib/utils";

interface LeaderboardApiItem {
  userId: string;
  userName: string;
  totalScore: number;
  averageScore: number;
  attemptCount: number;
  sessionId: string[];
  scores: number[];
}

interface MatchApiItem {
  sessionId: string;
  userId: string;
  userName: string;
  score: number;
}

interface ApiResponseData {
  overall: LeaderboardApiItem[];
  match1: MatchApiItem[];
  match2: MatchApiItem[];
  match3: MatchApiItem[];
  // …add more matches if your backend returns them
}

interface LeaderboardData {
  rank: number;
  name: string;
  score: number;
  avatar?: string;
  trend?: "up" | "down" | "same";
  previousRank?: number;
  attempts?: number;
  gameTag?:
    | "rival"
    | "challenger"
    | "consistent"
    | "rising-star"
    | "speedster"
    | "top-performer";
}

interface MatchData {
  id: string;
  title: string;
  isAttempted: boolean;
  isRecommended?: boolean;
  userRank?: number;
  isHighlighted?: boolean;
  userScore?: number;
  topScore?: number;
  averageScore?: number;
}

interface LeaderboardScreenProps {
  userScore: number;
  userRank: number;
  onBack: () => void;
  onReattempt: () => void;
  videoId: string;
}

const gameTagConfig = {
  rival: { label: "Rival", color: "bg-red-100 text-red-700", icon: Sword },
  challenger: {
    label: "Challenger",
    color: "bg-orange-100 text-orange-700",
    icon: Shield,
  },
  consistent: {
    label: "Consistent",
    color: "bg-blue-100 text-blue-700",
    icon: Star,
  },
  "rising-star": {
    label: "Rising Star",
    color: "bg-purple-100 text-purple-700",
    icon: TrendingUp,
  },
  speedster: {
    label: "Speedster",
    color: "bg-green-100 text-green-700",
    icon: Zap,
  },
  "top-performer": {
    label: "Elite",
    color: "bg-yellow-100 text-yellow-700",
    icon: Crown,
  },
};

export default function LeaderboardScreen({
  userScore,
  userRank,
  onBack,
  onReattempt,
  videoId,
}: LeaderboardScreenProps) {
  const [selectedMatch, setSelectedMatch] = useState("match1");
  const [expandedLeaderboard, setExpandedLeaderboard] = useState(false);
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);
  const [overall, setOverall] = useState<any>(null);
  const [apiData, setApiData] = useState<any | null>(null);

  // 1) Fetch once on mount
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await apiClient.get<{
          success: boolean;
          data: ApiResponseData;
        }>(API_ENDPOINTS.LEADERBOARD.GENERATE_LEADERBOARD(videoId));
        console.log("res: ", res);
        if (res.data && res.success) {
          const nicelyShaped = formatLeaderboardResponse(res);
          console.log("nicelyShaped: ", nicelyShaped);
          setApiData(nicelyShaped);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetch();
  }, [videoId]);

  // Enhanced mock data with gaming tags
  const fullLeaderboard: LeaderboardData[] = [
    {
      rank: 1,
      name: "Arjun Sharma",
      score: 96,
      trend: "same",
      previousRank: 1,
      attempts: 3,
      gameTag: "top-performer",
    },
    {
      rank: 2,
      name: "Priya Patel",
      score: 93,
      trend: "up",
      previousRank: 4,
      attempts: 2,
      gameTag: "rising-star",
    },
    {
      rank: 3,
      name: "Rahul Kumar",
      score: 89,
      trend: "down",
      previousRank: 2,
      attempts: 4,
      gameTag: "rival",
    },
    {
      rank: 4,
      name: "Sneha Gupta",
      score: 87,
      trend: "up",
      previousRank: 6,
      attempts: 1,
      gameTag: "speedster",
    },
    {
      rank: 5,
      name: "Vikram Singh",
      score: 85,
      trend: "same",
      previousRank: 5,
      attempts: 2,
      gameTag: "consistent",
    },
    {
      rank: 6,
      name: "You",
      score: userScore,
      trend: "down",
      previousRank: 4,
      attempts: 1,
    },
    {
      rank: 7,
      name: "Anita Reddy",
      score: 81,
      trend: "up",
      previousRank: 9,
      attempts: 3,
      gameTag: "challenger",
    },
    {
      rank: 8,
      name: "Karan Mehta",
      score: 79,
      trend: "down",
      previousRank: 7,
      attempts: 2,
      gameTag: "rival",
    },
    {
      rank: 9,
      name: "Pooja Jain",
      score: 77,
      trend: "same",
      previousRank: 9,
      attempts: 1,
      gameTag: "consistent",
    },
    {
      rank: 10,
      name: "Amit Verma",
      score: 75,
      trend: "up",
      previousRank: 12,
      attempts: 4,
      gameTag: "rising-star",
    },
    {
      rank: 11,
      name: "Riya Agarwal",
      score: 73,
      trend: "down",
      previousRank: 8,
      attempts: 2,
      gameTag: "challenger",
    },
    {
      rank: 12,
      name: "Dev Patel",
      score: 71,
      trend: "up",
      previousRank: 15,
      attempts: 3,
      gameTag: "speedster",
    },
    {
      rank: 13,
      name: "Kavya Singh",
      score: 69,
      trend: "same",
      previousRank: 13,
      attempts: 1,
      gameTag: "consistent",
    },
    {
      rank: 14,
      name: "Rohan Gupta",
      score: 67,
      trend: "down",
      previousRank: 11,
      attempts: 2,
      gameTag: "challenger",
    },
    {
      rank: 15,
      name: "Meera Joshi",
      score: 65,
      trend: "up",
      previousRank: 18,
      attempts: 4,
      gameTag: "rising-star",
    },
  ];

  const matchLeaderboard: LeaderboardData[] = [
    { rank: 1, name: "Arjun Sharma", score: 96, gameTag: "top-performer" },
    { rank: 2, name: "Priya Patel", score: 93, gameTag: "rising-star" },
    { rank: 3, name: "Rahul Kumar", score: 89, gameTag: "rival" },
    { rank: 4, name: "Sneha Gupta", score: 87, gameTag: "speedster" },
    { rank: 5, name: "Vikram Singh", score: 85, gameTag: "consistent" },
    { rank: 6, name: "You", score: userScore },
    { rank: 7, name: "Anita Reddy", score: 81, gameTag: "challenger" },
    { rank: 8, name: "Karan Mehta", score: 79, gameTag: "rival" },
    { rank: 9, name: "Pooja Jain", score: 77, gameTag: "consistent" },
    { rank: 10, name: "Amit Verma", score: 75, gameTag: "rising-star" },
    { rank: 11, name: "Riya Agarwal", score: 73, gameTag: "challenger" },
    { rank: 12, name: "Dev Patel", score: 71, gameTag: "speedster" },
  ];

  const matches: MatchData[] = [
    {
      id: "match1",
      title: "Match 1",
      isAttempted: true,
      userRank: 6,
      isHighlighted: true,
      userScore: userScore,
      topScore: 96,
      averageScore: 78,
    },
    {
      id: "match2",
      title: "Match 2",
      isAttempted: true,
      userRank: 8,
      isRecommended: true,
      userScore: 74,
      topScore: 94,
      averageScore: 76,
    },
    {
      id: "match3",
      title: "Match 3",
      isAttempted: true,
      userRank: 4,
      userScore: 88,
      topScore: 95,
      averageScore: 79,
    },
    {
      id: "match4",
      title: "Match 4",
      isAttempted: false,
      topScore: 0,
      averageScore: 0,
    },
    {
      id: "match5",
      title: "Match 5",
      isAttempted: false,
      topScore: 0,
      averageScore: 0,
    },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
    return null;
  };

  const getTrendIcon = (
    trend: string | undefined,
    previousRank: number | undefined,
    currentRank: number
  ) => {
    if (!trend || !previousRank) return null;

    if (trend === "up")
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === "down")
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <div className="w-4 h-4" />; // placeholder for same
  };

  const getGameTag = (gameTag?: string) => {
    if (!gameTag) return null;
    const config = gameTagConfig[gameTag as keyof typeof gameTagConfig];
    if (!config) return null;

    const IconComponent = config.icon;
    return (
      <Badge
        variant="secondary"
        className={`text-xs ${config.color} flex items-center gap-1`}
      >
        <IconComponent className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const getScoreToNextRank = (currentRank: number, currentScore: number) => {
    if (currentRank === 1) return null;
    const nextRankScore = fullLeaderboard.find(
      (p) => p.rank === currentRank - 1
    )?.score;
    if (!nextRankScore) return null;
    return nextRankScore - currentScore + 1;
  };

  const getPotentialRank = (newScore: number) => {
    const betterPlayers = fullLeaderboard.filter(
      (p) => p.name !== "You" && p.score >= newScore
    );
    return betterPlayers.length + 1;
  };

  const hasAttemptedAny = matches.some((m) => m.isAttempted);
  const recommendedMatches = matches.filter((m) => m.isRecommended).length;
  const scoreToNextRank = getScoreToNextRank(userRank, userScore);
  const potentialRankWith90 = getPotentialRank(90);
  const potentialRankWith95 = getPotentialRank(95);

  const displayedLeaderboard = expandedLeaderboard
    ? fullLeaderboard
    : fullLeaderboard.slice(0, 10);

  return (
    <div className="min-h-screen bg-[#eff3f7] p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-[#1b2124]">
              Laws of Motion League
            </h1>
            <p className="text-[#747474]">Match Results & Leaderboard</p>
          </div>
        </div>

        {/* Rank Improvement Motivation */}
        {hasAttemptedAny && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#1b2124] mb-2">
                  🎯 Rank Improvement Goals
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scoreToNextRank && (
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="font-medium text-[#1b2124]">
                          Next Rank Goal
                        </span>
                      </div>
                      <p className="text-sm text-[#747474] mb-2">
                        Score{" "}
                        <span className="font-bold text-green-600">
                          {scoreToNextRank} more
                        </span>{" "}
                        to reach Rank #{userRank - 1}
                      </p>
                      <Progress
                        value={
                          (userScore / (userScore + scoreToNextRank)) * 100
                        }
                        className="h-2 mb-3"
                      />
                      <Button
                        onClick={onReattempt}
                        size="sm"
                        className="w-full bg-green-500 hover:bg-green-600 text-white"
                      >
                        <RotateCcw className="w-3 h-3 mr-1" />
                        Re-attempt Now
                      </Button>
                    </div>
                  )}
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-purple-500" />
                      <span className="font-medium text-[#1b2124]">
                        Top 3 Goal
                      </span>
                    </div>
                    <p className="text-sm text-[#747474] mb-2">
                      Score{" "}
                      <span className="font-bold text-purple-600">90+/100</span>{" "}
                      to reach Rank #{potentialRankWith90}
                    </p>
                    <p className="text-xs text-purple-600 mb-3">
                      🏆 Master level achievement!
                    </p>
                    <Button
                      onClick={onReattempt}
                      size="sm"
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                    >
                      <Target className="w-3 h-3 mr-1" />
                      Aim for Master
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enhanced League Leaderboard */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg border-2 border-[#5a4bda] p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#5a4bda] to-[#7c3aed] rounded-full flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#1b2124]">
                      League Leaderboard
                    </h2>
                    <p className="text-[#747474] text-sm">
                      Based on average score across all matches
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#747474]" />
                  <span className="text-sm text-[#747474]">
                    {fullLeaderboard.length} students
                  </span>
                </div>
              </div>

              {!hasAttemptedAny ? (
                <div className="text-center py-12">
                  <Lock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#1b2124] mb-2">
                    You are not part of the league
                  </h3>
                  <p className="text-[#747474] mb-4">
                    You have missed Laws of Motion Match 1, 2
                  </p>
                  <Button className="bg-[#5a4bda] hover:bg-[#4a3bc7] text-white">
                    Attempt Match 1
                  </Button>
                </div>
              ) : (
                <>
                  {/* Column Headers */}
                  <div className="flex items-center gap-4 p-3 border-b border-gray-200 mb-3">
                    <div className="w-16 text-sm font-medium text-[#747474]">
                      Rank
                    </div>
                    <div className="w-8"></div>
                    <div className="flex-1 text-sm font-medium text-[#747474]">
                      Student
                    </div>
                    <div className="text-sm font-medium text-[#747474]">
                      Average Score
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {displayedLeaderboard.map((player, index) => (
                      <div
                        key={player.rank}
                        className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ${
                          player.name === "You"
                            ? "bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 shadow-md"
                            : "hover:bg-gray-50 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2 w-16">
                          {getRankIcon(player.rank)}
                          <span className="font-semibold text-[#1b2124]">
                            #{player.rank}
                          </span>
                          {getTrendIcon(
                            player.trend,
                            player.previousRank,
                            player.rank
                          )}
                        </div>

                        <div className="relative">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#ff6d0a] to-[#ff8533] rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {player.name.charAt(0)}
                            </span>
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`font-medium ${
                                player.name === "You"
                                  ? "text-blue-700"
                                  : "text-[#1b2124]"
                              }`}
                            >
                              {player.name}
                            </span>
                            {player.name === "You" && (
                              <Badge className="text-xs bg-blue-100 text-blue-700">
                                You
                              </Badge>
                            )}
                            {getGameTag(player.gameTag)}
                          </div>
                          {player.attempts && (
                            <div className="text-xs text-[#747474] flex items-center gap-1">
                              <Zap className="w-3 h-3" />
                              {player.attempts} attempt
                              {player.attempts > 1 ? "s" : ""}
                            </div>
                          )}
                        </div>

                        <div className="text-right">
                          <div className="font-bold text-[#5a4bda]">
                            {player.score}/100
                          </div>
                          {player.trend && player.previousRank && (
                            <div className="text-xs text-[#747474]">
                              {player.trend === "up" &&
                                `↗ +${player.previousRank - player.rank}`}
                              {player.trend === "down" &&
                                `↘ -${player.rank - player.previousRank}`}
                              {player.trend === "same" && "→ Same"}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Expand/Collapse Button */}
                  {fullLeaderboard.length > 10 && (
                    <div className="text-center">
                      <Button
                        variant="ghost"
                        onClick={() =>
                          setExpandedLeaderboard(!expandedLeaderboard)
                        }
                        className="flex items-center gap-2 text-[#5a4bda] hover:bg-purple-50"
                      >
                        {expandedLeaderboard ? (
                          <>
                            <ChevronUp className="w-4 h-4" />
                            Show Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" />
                            Show All {fullLeaderboard.length - 10} More Students
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Enhanced Match Leaderboards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#1b2124]">
                Match Performance
              </h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Recommended Re-attempts Info */}
            {recommendedMatches > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-amber-600" />
                  <span className="font-medium text-amber-800">
                    Improvement Opportunity
                  </span>
                </div>
                <p className="text-amber-800 text-sm">
                  💡 {recommendedMatches} match
                  {recommendedMatches > 1 ? "es" : ""} recommended for
                  re-attempt. Boost your league ranking!
                </p>
              </div>
            )}

            {/* Enhanced Match Cards */}
            <div className="space-y-3">
              {matches.slice(0, 3).map((match) => (
                <div
                  key={match.id}
                  className={`bg-white rounded-lg p-4 border-2 transition-all duration-200 ${
                    match.isHighlighted
                      ? "border-[#ff6d0a] shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-[#1b2124]">
                        {match.title}
                      </h4>
                      {match.isRecommended && (
                        <Badge
                          variant="secondary"
                          className="bg-amber-100 text-amber-800"
                        >
                          Recommended
                        </Badge>
                      )}
                      {match.isHighlighted && (
                        <Badge className="bg-[#ff6d0a] text-white">
                          Latest
                        </Badge>
                      )}
                    </div>
                    {match.isAttempted ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={onReattempt}
                        className="flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Re-attempt
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="bg-[#5a4bda] hover:bg-[#4a3bc7] text-white"
                      >
                        Attempt Now
                      </Button>
                    )}
                  </div>

                  {match.isAttempted ? (
                    <div className="space-y-3">
                      {/* Performance Summary */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div>
                            <div className="text-lg font-bold text-[#1b2124]">
                              #{match.userRank}
                            </div>
                            <div className="text-xs text-[#747474]">
                              Your Rank
                            </div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-[#5a4bda]">
                              {match.userScore}/100
                            </div>
                            <div className="text-xs text-[#747474]">
                              Your Score
                            </div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-[#22c55e]">
                              {match.topScore}/100
                            </div>
                            <div className="text-xs text-[#747474]">
                              Top Score
                            </div>
                          </div>
                        </div>

                        {/* Score vs Average */}
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-[#747474] mb-1">
                            <span>
                              vs Class Average ({match.averageScore}/100)
                            </span>
                            <span
                              className={
                                match.userScore! > match.averageScore!
                                  ? "text-green-600"
                                  : "text-red-600"
                              }
                            >
                              {match.userScore! > match.averageScore!
                                ? "+"
                                : ""}
                              {match.userScore! - match.averageScore!}
                            </span>
                          </div>
                          <Progress
                            value={(match.userScore! / match.topScore!) * 100}
                            className="h-2"
                          />
                        </div>
                      </div>

                      {/* Mini Leaderboard */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-[#1b2124]">
                            Top Performers
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setExpandedMatch(
                                expandedMatch === match.id ? null : match.id
                              )
                            }
                            className="text-xs h-6 px-2"
                          >
                            {expandedMatch === match.id
                              ? "Show Less"
                              : `+${matchLeaderboard.length - 3} more`}
                          </Button>
                        </div>

                        {(expandedMatch === match.id
                          ? matchLeaderboard
                          : matchLeaderboard.slice(0, 3)
                        ).map((player) => (
                          <div
                            key={player.rank}
                            className={`flex items-center gap-2 text-xs p-2 rounded transition-colors ${
                              player.name === "You"
                                ? "bg-blue-50 border border-blue-200"
                                : "bg-gray-50 hover:bg-gray-100"
                            }`}
                          >
                            <span className="w-6 font-medium">
                              #{player.rank}
                            </span>
                            <div className="relative">
                              <div className="w-5 h-5 bg-gradient-to-r from-[#ff6d0a] to-[#ff8533] rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  {player.name.charAt(0)}
                                </span>
                              </div>
                            </div>
                            <span className="flex-1 truncate">
                              {player.name}
                            </span>
                            <span className="font-medium">{player.score}</span>
                            {getGameTag(player.gameTag)}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Lock className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-[#747474] text-sm mb-2">
                        Not attempted yet
                      </p>
                      <p className="text-xs text-[#747474]">
                        Join {matchLeaderboard.length} students who have
                        attempted
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
