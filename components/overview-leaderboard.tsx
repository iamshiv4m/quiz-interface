"use client";

import { useState } from "react";
import {
  Trophy,
  Medal,
  Award,
  Play,
  RotateCcw,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Zap,
  Clock,
  Crown,
  CheckCircle,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MatchOverview {
  id: string;
  subject: string;
  topic: string;
  matchNumber: number;
  totalMatches: number;
  hasAttempted: boolean;
  userRank?: number;
  userScore?: number;
  previousRank?: number;
  topperName: string;
  topperScore: number;
  totalParticipants: number;
  averageScore: number;
  deadline?: string;
  isRecommended?: boolean;
  rankTrend?: "up" | "down" | "same";
  pointsToNextRank?: number;
  nextRankScore?: number;
  status: "live" | "ended";
  endDate?: string;
}

interface OverallStats {
  totalMatches: number;
  attemptedMatches: number;
  averageRank: number;
  bestRank: number;
}

interface OverviewLeaderboardProps {
  onStartQuiz: (matchId: string) => void;
  onViewDetailedLeaderboard: (matchId: string) => void;
  onBack: () => void;
}

export default function OverviewLeaderboard({
  onStartQuiz,
  onViewDetailedLeaderboard,
  onBack,
}: OverviewLeaderboardProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");

  // Mock data for match overviews with live/ended status
  const matchOverviews: MatchOverview[] = [
    // Live Leagues
    {
      id: "physics-motion",
      subject: "Physics",
      topic: "Laws of Motion",
      matchNumber: 3,
      totalMatches: 5,
      hasAttempted: true,
      userRank: 6,
      userScore: 78,
      previousRank: 4,
      topperName: "Arjun Sharma",
      topperScore: 96,
      totalParticipants: 1247,
      averageScore: 72,
      deadline: "",
      isRecommended: true,
      rankTrend: "down",
      pointsToNextRank: 7,
      nextRankScore: 85,
      status: "live",
    },
    {
      id: "chemistry-states",
      subject: "Chemistry",
      topic: "States of Matter",
      matchNumber: 2,
      totalMatches: 5,
      hasAttempted: false,
      topperName: "Priya Patel",
      topperScore: 94,
      totalParticipants: 892,
      averageScore: 68,
      deadline: "1 day",
      status: "live",
    },
    {
      id: "maths-quadratic",
      subject: "Mathematics",
      topic: "Quadratic Equations",
      matchNumber: 4,
      totalMatches: 5,
      hasAttempted: true,
      userRank: 3,
      userScore: 89,
      previousRank: 5,
      topperName: "Rahul Kumar",
      topperScore: 98,
      totalParticipants: 1456,
      averageScore: 75,
      rankTrend: "up",
      pointsToNextRank: 4,
      nextRankScore: 93,
      status: "live",
    },
    {
      id: "biology-cell",
      subject: "Biology",
      topic: "Cell Structure",
      matchNumber: 2,
      totalMatches: 4,
      hasAttempted: false,
      topperName: "Sneha Gupta",
      topperScore: 87,
      totalParticipants: 567,
      averageScore: 58,
      deadline: "3 hours",
      status: "live",
    },
    // Ended Leagues
    {
      id: "physics-kinematics",
      subject: "Physics",
      topic: "Kinematics",
      matchNumber: 5,
      totalMatches: 5,
      hasAttempted: true,
      userRank: 8,
      userScore: 85,
      topperName: "Vikram Singh",
      topperScore: 98,
      totalParticipants: 1123,
      averageScore: 71,
      status: "ended",
      endDate: "Dec 15, 2024",
    },
    {
      id: "chemistry-atomic",
      subject: "Chemistry",
      topic: "Atomic Structure",
      matchNumber: 4,
      totalMatches: 4,
      hasAttempted: true,
      userRank: 12,
      userScore: 73,
      topperName: "Anita Reddy",
      topperScore: 95,
      totalParticipants: 789,
      averageScore: 65,
      status: "ended",
      endDate: "Dec 10, 2024",
    },
    {
      id: "maths-algebra",
      subject: "Mathematics",
      topic: "Linear Algebra",
      matchNumber: 3,
      totalMatches: 3,
      hasAttempted: false,
      topperName: "Karan Mehta",
      topperScore: 92,
      totalParticipants: 645,
      averageScore: 68,
      status: "ended",
      endDate: "Dec 8, 2024",
    },
  ];

  // Updated overall stats (removed overall rank and total points)
  const overallStats: OverallStats = {
    totalMatches: 7,
    attemptedMatches: 4,
    averageRank: 7.25,
    bestRank: 3,
  };

  const subjects = ["all", "Physics", "Chemistry", "Mathematics", "Biology"];

  const liveMatches = matchOverviews.filter(
    (match) =>
      match.status === "live" &&
      (selectedSubject === "all" || match.subject === selectedSubject)
  );

  const endedMatches = matchOverviews.filter(
    (match) =>
      match.status === "ended" &&
      (selectedSubject === "all" || match.subject === selectedSubject)
  );

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-4 h-4 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-4 h-4 text-gray-400" />;
    if (rank === 3) return <Award className="w-4 h-4 text-amber-600" />;
    return null;
  };

  const getTrendIcon = (trend?: "up" | "down" | "same") => {
    if (trend === "up")
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === "down")
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    return null;
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case "Physics":
        return "from-blue-500 to-blue-600";
      case "Chemistry":
        return "from-purple-500 to-purple-600";
      case "Mathematics":
        return "from-green-500 to-green-600";
      case "Biology":
        return "from-red-500 to-red-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const LiveMatchCard = ({ match }: { match: MatchOverview }) => (
    <Card
      className={`bg-white shadow-lg hover:shadow-xl transition-all duration-200 ${
        match.isRecommended ? "border-l-4 border-l-amber-400" : ""
      }`}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          {/* Subject and Match Info */}
          <div className="flex items-center gap-4">
            <div
              className={`w-10 h-10 bg-gradient-to-r ${getSubjectColor(
                match.subject
              )} rounded-full flex items-center justify-center`}
            >
              <span className="text-white font-bold">
                {match.subject.charAt(0)}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-[#1b2124]">
                  {match.subject} - {match.topic}
                </h3>
                {match.isRecommended && (
                  <Badge className="bg-amber-100 text-amber-700 flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    Recommended
                  </Badge>
                )}
              </div>
              <p className="text-[#747474] text-sm">
                Match {match.matchNumber}/{match.totalMatches}
              </p>
            </div>
          </div>

          {/* Status and Deadline */}
          <div className="flex items-center gap-2">
            {match.hasAttempted ? (
              <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Attempted
              </Badge>
            ) : (
              <Badge className="bg-blue-100 text-blue-700 flex items-center gap-1">
                <Play className="w-3 h-3" />
                Available
              </Badge>
            )}
            {match.deadline && (
              <Badge variant="outline" className="text-red-600 border-red-200">
                <Clock className="w-3 h-3 mr-1" />
                {match.deadline}
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Your Performance or Call to Action */}
          <div>
            {match.hasAttempted ? (
              <div className="space-y-3">
                <h4 className="font-semibold text-[#1b2124] flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Your Performance
                </h4>

                {/* Rank Display */}
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {getRankIcon(match.userRank!)}
                    <span className="font-bold text-[#1b2124]">
                      Rank #{match.userRank}
                    </span>
                    {getTrendIcon(match.rankTrend)}
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">
                      {match.userScore}/100
                    </div>
                  </div>
                </div>

                {/* Next Rank Goal */}
                {match.pointsToNextRank && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        Next Rank Goal
                      </span>
                    </div>
                    <p className="text-xs text-green-700 mb-2">
                      Score {match.pointsToNextRank} more to reach Rank #
                      {match.userRank! - 1}
                    </p>
                    <Progress
                      value={(match.userScore! / match.nextRankScore!) * 100}
                      className="h-2"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Play className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-[#1b2124] mb-2">
                  Ready to Start?
                </h4>
                <p className="text-[#747474] text-sm mb-4">
                  Join {match.totalParticipants.toLocaleString()} students
                </p>
                <Button
                  onClick={() => onStartQuiz(match.id)}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Now
                </Button>
              </div>
            )}
          </div>

          {/* Right Side - Topper & Actions */}
          <div className="space-y-4">
            {/* Topper Info */}
            <div>
              <h4 className="font-semibold text-[#1b2124] flex items-center gap-2 mb-3">
                <Crown className="w-4 h-4" />
                Current Leader
              </h4>
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-[#1b2124]">
                        {match.topperName}
                      </div>
                      <div className="text-sm text-[#747474]">#{1}</div>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-yellow-600">
                    {match.topperScore}/100
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-[#1b2124]">
                  {match.totalParticipants.toLocaleString()}
                </div>
                <div className="text-xs text-[#747474]">Participants</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-[#1b2124]">
                  {match.averageScore}/100
                </div>
                <div className="text-xs text-[#747474]">Average</div>
              </div>
            </div>

            {/* Action Buttons */}
            {match.hasAttempted && (
              <div className="space-y-2">
                <Button
                  onClick={() => onViewDetailedLeaderboard(match.id)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Improve now
                </Button>
                {/* <Button
                  onClick={() => onViewDetailedLeaderboard(match.id)}
                  variant="outline"
                  className="w-full border-[#5a4bda] text-[#5a4bda] hover:bg-purple-50"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Improve now
                </Button> */}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const EndedMatchCard = ({ match }: { match: MatchOverview }) => (
    <Card className="bg-gray-50 border border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {/* Left Side - Match Info */}
          <div className="flex items-center gap-4">
            <div
              className={`w-10 h-10 bg-gradient-to-r ${getSubjectColor(
                match.subject
              )} opacity-60 rounded-full flex items-center justify-center`}
            >
              <span className="text-white font-bold">
                {match.subject.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1b2124]">
                {match.subject} - {match.topic}
              </h3>
              <div className="flex items-center gap-4 text-sm text-[#747474]">
                <span>
                  Match {match.matchNumber}/{match.totalMatches}
                </span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Ended {match.endDate}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Results */}
          <div className="flex items-center gap-8">
            {/* Topper */}
            <div className="text-center">
              <div className="flex items-center gap-2 mb-1">
                <Crown className="w-4 h-4 text-yellow-500" />
                <span className="font-semibold text-[#1b2124]">Topper</span>
              </div>
              <div className="font-bold text-[#1b2124]">{match.topperName}</div>
              <div className="text-sm text-yellow-600 font-medium">
                {match.topperScore}/100
              </div>
            </div>

            {/* Your Result */}
            <div className="text-center">
              {match.hasAttempted ? (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    {getRankIcon(match.userRank!)}
                    <span className="font-semibold text-[#1b2124]">
                      Your Rank
                    </span>
                  </div>
                  <div className="font-bold text-[#1b2124]">
                    #{match.userRank}
                  </div>
                  <div className="text-sm text-blue-600 font-medium">
                    {match.userScore}/100
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-gray-400">
                      Not Attempted
                    </span>
                  </div>
                  <div className="text-gray-400">—</div>
                  <div className="text-sm text-gray-400">Missed</div>
                </>
              )}
            </div>

            {/* Participants */}
            <div className="text-center">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-[#747474]" />
                <span className="font-semibold text-[#747474]">Total</span>
              </div>
              <div className="font-bold text-[#1b2124]">
                {match.totalParticipants.toLocaleString()}
              </div>
              <div className="text-sm text-[#747474]">students</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-[#eff3f7] p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#1b2124]">Yudh Abhyash</h1>
            <p className="text-[#747474]">
              Your performance across all matches
            </p>
          </div>
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to Dashboard
          </Button>
        </div>

        {/* Updated Stats Cards (removed overall rank and total points) */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-700">
                #{overallStats.bestRank}
              </div>
              <div className="text-sm text-green-600">Best Rank</div>
              <div className="text-xs text-green-500">Personal best</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-700">
                {overallStats.attemptedMatches}/{overallStats.totalMatches}
              </div>
              <div className="text-sm text-purple-600">Matches</div>
              <div className="text-xs text-purple-500">Attempted</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-700">
                {overallStats.attemptedMatches}/{overallStats.totalMatches}
              </div>
              <div className="text-sm text-yellow-600">League</div>
              <div className="text-xs text-yellow-500">Attempted</div>
            </CardContent>
          </Card>
        </div>

        {/* Subject Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {subjects.map((subject) => (
            <Button
              key={subject}
              variant={selectedSubject === subject ? "default" : "outline"}
              onClick={() => setSelectedSubject(subject)}
              className={`whitespace-nowrap ${
                selectedSubject === subject
                  ? "bg-[#5a4bda] text-white"
                  : "text-[#747474]"
              }`}
            >
              {subject === "all" ? "All Subjects" : subject}
            </Button>
          ))}
        </div>

        {/* Tabs for Live and Ended Leagues */}
        <Tabs defaultValue="live" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm">
            <TabsTrigger value="live" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Live Leagues ({liveMatches.length})
            </TabsTrigger>
            <TabsTrigger value="ended" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Ended Leagues ({endedMatches.length})
            </TabsTrigger>
          </TabsList>

          {/* Live Leagues */}
          <TabsContent value="live" className="space-y-6">
            {liveMatches.length > 0 ? (
              liveMatches.map((match) => (
                <LiveMatchCard key={match.id} match={match} />
              ))
            ) : (
              <div className="text-center py-12">
                <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#1b2124] mb-2">
                  No live matches
                </h3>
                <p className="text-[#747474]">
                  No active matches for the selected subject.
                </p>
              </div>
            )}
          </TabsContent>

          {/* Ended Leagues */}
          <TabsContent value="ended" className="space-y-4">
            {endedMatches.length > 0 ? (
              endedMatches.map((match) => (
                <EndedMatchCard key={match.id} match={match} />
              ))
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#1b2124] mb-2">
                  No ended matches
                </h3>
                <p className="text-[#747474]">
                  No completed matches for the selected subject.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
