"\"use client";

import { useState } from "react";
import {
  Trophy,
  Calendar,
  Clock,
  Star,
  Flame,
  Target,
  ChevronRight,
  Play,
  RotateCcw,
  Award,
  Zap,
  TrendingUp,
  Users,
  BookOpen,
  Timer,
  AlertCircle,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Match {
  id: string;
  leagueChapterName: string;
  subject: string;
  topic: string;
  todaysMatchNumber: number;
  totalMatches: number;
  status: "not-attempted" | "attempted" | "completed" | "skipped";
  rank?: number;
  lastRank?: number;
  score?: number;
  deadline?: string;
  tags: string[];
  difficulty: "easy" | "medium" | "hard";
  estimatedTime: number;
  studentsAttempted: number;
  topScore: number;
  averageScore: number;
  isSkipped?: boolean;
  skippedMatches?: number[];
}

interface Tournament {
  id: string;
  name: string;
  subject: string;
  status: "active" | "upcoming" | "completed";
  matches: Match[];
  totalParticipants: number;
  userRank?: number;
  endDate: string;
  prize?: string;
  hasSkippedMatches?: boolean;
}

const tagConfig = {
  new: { label: "New", color: "bg-blue-100 text-blue-700", icon: Star },
  recommended: {
    label: "Recommended",
    color: "bg-amber-100 text-amber-700",
    icon: Target,
  },
  "hot-topic": {
    label: "Hot Topic",
    color: "bg-red-100 text-red-700",
    icon: Flame,
  },
  deadline: {
    label: "Deadline Soon",
    color: "bg-orange-100 text-orange-700",
    icon: Clock,
  },
  "rank-drop": {
    label: "Rank Drop",
    color: "bg-purple-100 text-purple-700",
    icon: TrendingUp,
  },
  popular: {
    label: "Popular",
    color: "bg-green-100 text-green-700",
    icon: Users,
  },
  "quick-win": {
    label: "Quick Win",
    color: "bg-cyan-100 text-cyan-700",
    icon: Zap,
  },
  challenging: {
    label: "Challenging",
    color: "bg-gray-100 text-gray-700",
    icon: Award,
  },
  missed: {
    label: "Missed Match",
    color: "bg-red-100 text-red-700",
    icon: AlertCircle,
  },
};

export default function DashboardWidget({
  onNavigateToQuiz,
  onNavigateToLeaderboard,
}: {
  onNavigateToQuiz?: () => void;
  onNavigateToLeaderboard?: () => void;
}) {
  const [activeTab, setActiveTab] = useState("today");

  // Mock data for today's matches with skipped scenarios
  const todaysMatches: Match[] = [
    {
      id: "physics-laws-motion",
      leagueChapterName: "Laws of Motion League",
      subject: "Physics",
      topic: "Laws of Motion",
      todaysMatchNumber: 3,
      totalMatches: 5,
      status: "attempted",
      lastRank: 20,
      score: 78,
      tags: ["rank-drop", "recommended"],
      difficulty: "medium",
      estimatedTime: 15,
      studentsAttempted: 1247,
      topScore: 96,
      averageScore: 72,
      skippedMatches: [1], // Skipped match 1
    },
    {
      id: "chem-states-matter",
      leagueChapterName: "States of Matter Championship",
      subject: "Chemistry",
      topic: "States of Matter",
      todaysMatchNumber: 3,
      totalMatches: 5,
      status: "not-attempted",
      tags: ["new", "hot-topic"],
      difficulty: "easy",
      estimatedTime: 12,
      studentsAttempted: 892,
      topScore: 94,
      averageScore: 68,
      deadline: "2 hours",
      skippedMatches: [], // No skipped matches
    },
    {
      id: "maths-quadratic",
      leagueChapterName: "Quadratic Equations Masters",
      subject: "Mathematics",
      topic: "Quadratic Equations",
      todaysMatchNumber: 4,
      totalMatches: 5,
      status: "attempted",
      rank: 10,
      score: 85,
      tags: ["quick-win", "popular"],
      difficulty: "medium",
      estimatedTime: 18,
      studentsAttempted: 1456,
      topScore: 98,
      averageScore: 75,
      skippedMatches: [2, 3], // Skipped matches 2 and 3
    },
    {
      id: "biology-cell-structure",
      leagueChapterName: "Cell Structure League",
      subject: "Biology",
      topic: "Cell Structure",
      todaysMatchNumber: 2,
      totalMatches: 4,
      status: "not-attempted",
      tags: ["missed", "deadline"],
      difficulty: "hard",
      estimatedTime: 20,
      studentsAttempted: 567,
      topScore: 92,
      averageScore: 65,
      deadline: "1 hour",
      skippedMatches: [1], // Skipped match 1
    },
  ];

  // Mock data for tournaments
  const tournaments: Tournament[] = [
    {
      id: "physics-championship",
      name: "Physics Championship",
      subject: "Physics",
      status: "active",
      matches: todaysMatches.filter((m) => m.subject === "Physics"),
      totalParticipants: 2341,
      userRank: 45,
      endDate: "Dec 25, 2024",
      prize: "₹10,000",
      hasSkippedMatches: true,
    },
    {
      id: "chem-league",
      name: "Chemistry League",
      subject: "Chemistry",
      status: "active",
      matches: todaysMatches.filter((m) => m.subject === "Chemistry"),
      totalParticipants: 1876,
      endDate: "Dec 30, 2024",
      prize: "₹7,500",
      hasSkippedMatches: false,
    },
    {
      id: "maths-masters",
      name: "Mathematics Masters",
      subject: "Mathematics",
      status: "active",
      matches: todaysMatches.filter((m) => m.subject === "Mathematics"),
      totalParticipants: 3124,
      userRank: 23,
      endDate: "Jan 5, 2025",
      prize: "₹15,000",
      hasSkippedMatches: true,
    },
    {
      id: "biology-olympiad",
      name: "Biology Olympiad",
      subject: "Biology",
      status: "active",
      matches: todaysMatches.filter((m) => m.subject === "Biology"),
      totalParticipants: 1567,
      endDate: "Jan 10, 2025",
      prize: "₹12,000",
      hasSkippedMatches: true,
    },
  ];

  const getMatchTag = (tag: string) => {
    const config = tagConfig[tag as keyof typeof tagConfig];
    if (!config) return null;

    const IconComponent = config.icon;
    return (
      <Badge
        key={tag}
        variant="secondary"
        className={`text-xs ${config.color} flex items-center gap-1`}
      >
        <IconComponent className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const hasSkippedMatches = (match: Match) => {
    return match.skippedMatches && match.skippedMatches.length > 0;
  };

  const getActionButton = (match: Match) => {
    if (match.status === "not-attempted") {
      return (
        <Button
          onClick={onNavigateToQuiz}
          className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          Start Now
        </Button>
      );
    } else if (
      match.status === "attempted" &&
      match.tags.includes("recommended")
    ) {
      return (
        <Button
          onClick={onNavigateToQuiz}
          className="bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Improve Now
        </Button>
      );
    } else {
      return (
        <Button
          onClick={onNavigateToQuiz}
          variant="outline"
          className="border-blue-500 text-blue-700 hover:bg-blue-50 flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Re-attempt
        </Button>
      );
    }
  };

  const getLeaderboardButton = (match: Match) => {
    const isLocked = hasSkippedMatches(match);

    if (isLocked) {
      return (
        <Button
          disabled
          variant="outline"
          className="border-gray-300 text-gray-400 cursor-not-allowed flex items-center gap-2"
        >
          <Lock className="w-4 h-4" />
          Leaderboard Locked
        </Button>
      );
    }

    return (
      <Button
        onClick={onNavigateToLeaderboard}
        variant="outline"
        className="border-[#5a4bda] text-[#5a4bda] hover:bg-purple-50 flex items-center gap-2"
      >
        <Trophy className="w-4 h-4" />
        View Leaderboard
      </Button>
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      case "hard":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const CatMascot = () => (
    <div className="absolute bottom-4 right-4 w-20 h-20 z-10">
      <div className="relative">
        <div className="bg-white rounded-full p-2 shadow-lg border-2 border-[#ff6d0a] animate-bounce">
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
            <path
              d="M 44 48 Q 50 52 56 48"
              stroke="#1b2124"
              strokeWidth="2"
              fill="none"
            />
            <ellipse cx="50" cy="65" rx="12" ry="15" fill="#ffffff" />
            <path
              d="M 75 70 Q 85 60 80 45"
              stroke="#ff6d0a"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            <ellipse cx="40" cy="85" rx="6" ry="4" fill="#ffffff" />
            <ellipse cx="60" cy="85" rx="6" ry="4" fill="#ffffff" />
          </svg>
        </div>
        <div className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
          <span className="text-white text-xs font-bold">
            {todaysMatches.length}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen relative">
      <CatMascot />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1b2124] mb-2">
            Youdha Abhyas
          </h1>
          <p className="text-[#747474] flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Today's Practice Sessions
          </p>
        </div>
        <Button
          onClick={onNavigateToLeaderboard}
          className="bg-[#5a4bda] hover:bg-[#4a3bc7] text-white flex items-center gap-2"
        >
          <Trophy className="w-4 h-4" />
          Leaderboard
        </Button>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
          <TabsTrigger value="today" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Today's Matches
          </TabsTrigger>
          <TabsTrigger value="tournaments" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Tournaments
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Practice Mode
          </TabsTrigger>
        </TabsList>

        {/* Today's Matches */}
        <TabsContent value="today" className="space-y-4">
          <div className="grid gap-4">
            {todaysMatches.map((match) => (
              <Card
                key={match.id}
                className={`bg-white shadow-lg border-l-4 hover:shadow-xl transition-all duration-200 ${
                  hasSkippedMatches(match)
                    ? "border-l-red-400 bg-red-50/30"
                    : "border-l-[#ff6d0a]"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      {/* League Chapter Name */}
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-lg font-bold text-[#5a4bda]">
                          {match.leagueChapterName}
                        </h2>
                        {hasSkippedMatches(match) && (
                          <Badge
                            variant="secondary"
                            className="bg-red-100 text-red-700 flex items-center gap-1"
                          >
                            <Lock className="w-3 h-3" />
                            Missed {match.skippedMatches?.length} Match
                            {match.skippedMatches?.length !== 1 ? "es" : ""}
                          </Badge>
                        )}
                      </div>

                      {/* Subject and Topic */}
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-[#1b2124]">
                          {match.subject} - {match.topic}
                        </h3>
                        <span
                          className={`text-sm font-medium ${getDifficultyColor(
                            match.difficulty
                          )}`}
                        >
                          ({match.difficulty})
                        </span>
                        <div className="flex gap-2">
                          {match.tags.map((tag) => getMatchTag(tag))}
                        </div>
                      </div>

                      {/* Today's Match Number */}
                      <div className="flex items-center gap-6 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-[#ff6d0a] rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {match.todaysMatchNumber}
                            </span>
                          </div>
                          <span className="font-medium text-[#1b2124]">
                            Today's Match {match.todaysMatchNumber}/
                            {match.totalMatches}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[#747474]">
                          <Timer className="w-4 h-4" />
                          <span>{match.estimatedTime} min</span>
                        </div>
                        {match.deadline && (
                          <div className="flex items-center gap-2 text-red-600">
                            <AlertCircle className="w-4 h-4" />
                            <span>Ends in {match.deadline}</span>
                          </div>
                        )}
                      </div>

                      {/* Students Attempted */}
                      <div className="flex items-center gap-2 mb-4">
                        <Users className="w-4 h-4 text-[#747474]" />
                        <span className="text-[#747474]">
                          <span className="font-semibold text-[#1b2124]">
                            {match.studentsAttempted.toLocaleString()}
                          </span>{" "}
                          students attempted
                        </span>
                      </div>

                      {/* Performance Stats */}
                      <div className="flex items-center gap-8">
                        {match.rank && (
                          <div className="text-center">
                            <div className="text-2xl font-bold text-[#5a4bda]">
                              #{match.rank}
                            </div>
                            <div className="text-xs text-[#747474]">
                              Current Rank
                            </div>
                          </div>
                        )}
                        {match.lastRank && (
                          <div className="text-center">
                            <div className="text-2xl font-bold text-[#747474]">
                              #{match.lastRank}
                            </div>
                            <div className="text-xs text-[#747474]">
                              Last Rank
                            </div>
                          </div>
                        )}
                        {match.score && (
                          <div className="text-center">
                            <div className="text-2xl font-bold text-[#22c55e]">
                              {match.score}/100
                            </div>
                            <div className="text-xs text-[#747474]">
                              Your Score
                            </div>
                          </div>
                        )}
                        {!match.rank && !match.lastRank && !match.score && (
                          <div className="text-center">
                            <div className="text-2xl font-bold text-[#747474]">
                              -
                            </div>
                            <div className="text-xs text-[#747474]">
                              Not Attempted
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Skipped Matches Warning */}
                      {hasSkippedMatches(match) && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Lock className="w-4 h-4 text-red-600" />
                            <span className="font-medium text-red-800">
                              Leaderboard Access Restricted
                            </span>
                          </div>
                          <p className="text-red-700 text-sm">
                            You've missed {match.skippedMatches?.length}{" "}
                            previous match
                            {match.skippedMatches?.length !== 1 ? "es" : ""}.
                            Complete all matches to unlock the chapter
                            leaderboard.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-3 ml-6">
                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2">
                        {getActionButton(match)}
                        {getLeaderboardButton(match)}
                      </div>

                      {/* Score Comparison */}
                      <div className="text-right text-sm text-[#747474]">
                        <div>Top: {match.topScore}/100</div>
                        <div>Avg: {match.averageScore}/100</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tournaments */}
        <TabsContent value="tournaments" className="space-y-4">
          <div className="grid gap-4">
            {tournaments.map((tournament) => (
              <Card
                key={tournament.id}
                className="bg-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#5a4bda] to-[#7c3aed] rounded-full flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#1b2124]">
                          {tournament.name}
                        </h3>
                        <p className="text-[#747474]">{tournament.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${
                          tournament.status === "active"
                            ? "bg-green-100 text-green-700"
                            : tournament.status === "upcoming"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {tournament.status.charAt(0).toUpperCase() +
                          tournament.status.slice(1)}
                      </Badge>
                      {tournament.hasSkippedMatches && (
                        <Badge
                          variant="secondary"
                          className="bg-red-100 text-red-700 flex items-center gap-1"
                        >
                          <Lock className="w-3 h-3" />
                          Restricted
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-[#1b2124]">
                        {tournament.totalParticipants.toLocaleString()}
                      </div>
                      <div className="text-xs text-[#747474]">Participants</div>
                    </div>
                    {tournament.userRank && !tournament.hasSkippedMatches ? (
                      <div className="text-center">
                        <div className="text-lg font-bold text-[#5a4bda]">
                          #{tournament.userRank}
                        </div>
                        <div className="text-xs text-[#747474]">Your Rank</div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-400 flex items-center justify-center gap-1">
                          <Lock className="w-4 h-4" />-
                        </div>
                        <div className="text-xs text-[#747474]">
                          Rank Locked
                        </div>
                      </div>
                    )}
                    <div className="text-center">
                      <div className="text-lg font-bold text-[#22c55e]">
                        {tournament.endDate}
                      </div>
                      <div className="text-xs text-[#747474]">Ends</div>
                    </div>
                    {tournament.prize && (
                      <div className="text-center">
                        <div className="text-lg font-bold text-[#ff6d0a]">
                          {tournament.prize}
                        </div>
                        <div className="text-xs text-[#747474]">Prize Pool</div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-[#747474]">
                      {tournament.matches.length} matches available
                      {tournament.hasSkippedMatches && (
                        <span className="text-red-600 ml-2">
                          • Leaderboard restricted
                        </span>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      disabled={tournament.hasSkippedMatches}
                    >
                      {tournament.hasSkippedMatches ? (
                        <>
                          <Lock className="w-4 h-4" />
                          Locked
                        </>
                      ) : (
                        <>
                          View Tournament
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Practice Mode */}
        <TabsContent value="practice" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1b2124]">
                      Topic Mastery
                    </h3>
                    <p className="text-[#747474]">Practice specific topics</p>
                  </div>
                </div>
                <p className="text-sm text-[#747474] mb-4">
                  Choose any topic and practice with adaptive difficulty to
                  master concepts at your own pace.
                </p>
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                  Start Practice
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1b2124]">
                      Quick Challenge
                    </h3>
                    <p className="text-[#747474]">5-minute rapid fire</p>
                  </div>
                </div>
                <p className="text-sm text-[#747474] mb-4">
                  Test your speed and accuracy with quick challenges across
                  multiple subjects.
                </p>
                <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                  Quick Start
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
