"use client";

import { Button } from "@/components/ui/button";
import { Play, TrendingUp } from "lucide-react";

interface Match {
  id: string;
  subject: string;
  topic: string;
  matchNumber: number;
  status: "new" | "attempted";
  rank?: number;
  lastRank?: number;
}

export default function MinimalHomeWidget({
  onStartQuiz,
  onViewLeaderboard,
}: {
  onStartQuiz: () => void;
  onViewLeaderboard: () => void;
}) {
  const matches: Match[] = [
    {
      id: "physics-motion",
      subject: "Physics",
      topic: "Laws of Motion",
      matchNumber: 3,
      status: "attempted",
      rank: 20,
      lastRank: 20,
    },
    {
      id: "chem-states",
      subject: "Chem",
      topic: "States of Matter",
      matchNumber: 3,
      status: "new",
    },
    {
      id: "maths-quadratic",
      subject: "Maths",
      topic: "Quadratic Equation",
      matchNumber: 3,
      status: "attempted",
      rank: 10,
    },
  ];

  const getActionButton = (match: Match) => {
    if (match.status === "new") {
      return (
        <Button
          onClick={onStartQuiz}
          className="bg-[#22c55e] hover:bg-[#16a34a] text-white flex items-center gap-2 px-6"
        >
          <Play className="w-4 h-4" />
          Start Now
        </Button>
      );
    } else {
      // For attempted matches, "Improve now" goes directly to leaderboard
      return (
        <Button
          onClick={onViewLeaderboard}
          className="bg-[#3b82f6] hover:bg-[#2563eb] text-white flex items-center gap-2 px-6"
        >
          <TrendingUp className="w-4 h-4" />
          Improve now
        </Button>
      );
    }
  };

  const getRankDisplay = (match: Match) => {
    if (match.status === "new") {
      return (
        <div className="text-right text-[#9ca3af]">
          <div className="text-sm">Rank: - nil</div>
        </div>
      );
    } else {
      const rankText = match.lastRank
        ? `Last Rank - ${match.lastRank}`
        : `Rank - ${match.rank}`;
      return (
        <div className="text-right text-[#9ca3af]">
          <div className="text-sm">{rankText}</div>
        </div>
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-[#1f2937]">
            Youdha Abhyas
          </h1>
          <span className="text-[#6b7280]">Today's Matches</span>
        </div>
        <Button
          onClick={onViewLeaderboard}
          className="bg-[#6366f1] hover:bg-[#5b21b6] text-white px-6"
        >
          Leaderboard
        </Button>
      </div>

      {/* Matches List */}
      <div className="divide-y divide-gray-200">
        {matches.map((match) => (
          <div
            key={match.id}
            className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-[#1f2937] text-lg">
                {match.subject} - {match.topic}
              </h3>
              <p className="text-[#6b7280] text-sm">
                Match {match.matchNumber}
              </p>
            </div>

            {getRankDisplay(match)}

            <div className="ml-6">{getActionButton(match)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
