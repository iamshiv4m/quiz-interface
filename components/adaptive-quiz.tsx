"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Flame, ChevronDown, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Question, QuizState } from "../types";
import { questionBank } from "../data/questions";
import axios from "axios";
import { API_ENDPOINTS } from "@/lib/api-configs";
import apiClient from "@/lib/api-client";

interface AdaptiveQuizProps {
  onComplete: (result: {
    score: number;
    maxScore: number;
    difficulties: ("E" | "M" | "H")[];
    finalScore: number;
    previousScore?: number;
  }) => void;
  previousScore?: number;
  userId: string;
  videoId: string;
}

function FullScreenProgressBar({
  currentQuestion,
  totalQuestions,
}: {
  currentQuestion: number;
  totalQuestions: number;
}) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

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
            <span className="text-[#ff6d0a] font-bold text-lg">
              AI Adaptive
            </span>
          </div>
        </div>

        <div className="text-[#747474] text-sm font-medium">
          {Math.round(progress)}% Complete
        </div>
      </div>
    </div>
  );
}

function SpeedTimeGraph() {
  return (
    <div className="flex justify-center mb-6">
      <div className="bg-[#f8f8f8] p-8 rounded-lg">
        <svg width="400" height="300" viewBox="0 0 400 300" className="border">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 30"
                fill="none"
                stroke="#e5e5e5"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          <line
            x1="60"
            y1="240"
            x2="360"
            y2="240"
            stroke="#1b2124"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          <line
            x1="60"
            y1="240"
            x2="60"
            y2="40"
            stroke="#1b2124"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />

          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#1b2124" />
            </marker>
          </defs>

          <text
            x="45"
            y="245"
            textAnchor="end"
            className="text-sm fill-[#1b2124]"
          >
            0
          </text>
          <text
            x="45"
            y="205"
            textAnchor="end"
            className="text-sm fill-[#1b2124]"
          >
            5
          </text>
          <text
            x="45"
            y="165"
            textAnchor="end"
            className="text-sm fill-[#1b2124]"
          >
            10
          </text>
          <text
            x="45"
            y="125"
            textAnchor="end"
            className="text-sm fill-[#1b2124]"
          >
            15
          </text>
          <text
            x="45"
            y="85"
            textAnchor="end"
            className="text-sm fill-[#1b2124]"
          >
            20
          </text>

          <text
            x="100"
            y="255"
            textAnchor="middle"
            className="text-sm fill-[#1b2124]"
          >
            1
          </text>
          <text
            x="140"
            y="255"
            textAnchor="middle"
            className="text-sm fill-[#1b2124]"
          >
            2
          </text>
          <text
            x="180"
            y="255"
            textAnchor="middle"
            className="text-sm fill-[#1b2124]"
          >
            3
          </text>
          <text
            x="220"
            y="255"
            textAnchor="middle"
            className="text-sm fill-[#1b2124]"
          >
            4
          </text>

          <line
            x1="60"
            y1="240"
            x2="220"
            y2="80"
            stroke="#1b2124"
            strokeWidth="2"
          />
          <circle cx="220" cy="80" r="3" fill="#1b2124" />
          <text x="230" y="85" className="text-sm fill-[#1b2124]">
            A
          </text>

          <line
            x1="220"
            y1="80"
            x2="220"
            y2="240"
            stroke="#cdd1d8"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <line
            x1="60"
            y1="80"
            x2="220"
            y2="80"
            stroke="#cdd1d8"
            strokeWidth="1"
            strokeDasharray="5,5"
          />

          <text
            x="30"
            y="140"
            textAnchor="middle"
            className="text-sm fill-[#1b2124]"
            transform="rotate(-90 30 140)"
          >
            speed
          </text>
          <text
            x="30"
            y="160"
            textAnchor="middle"
            className="text-sm fill-[#1b2124]"
            transform="rotate(-90 30 160)"
          >
            (m/s)
          </text>
          <text
            x="210"
            y="280"
            textAnchor="middle"
            className="text-sm fill-[#1b2124]"
          >
            Time(s)
          </text>
        </svg>
      </div>
    </div>
  );
}

function CatMascot({
  message,
  isCorrect,
  showFeedback,
}: {
  message: string;
  isCorrect?: boolean;
  showFeedback: boolean;
}) {
  // Only show colored feedback when showFeedback is true
  // Use neutral color otherwise
  const titleColor = !showFeedback
    ? "#1b2124"
    : isCorrect
    ? "#22c55e"
    : "#bf2734";

  return (
    <div className="flex-shrink-0">
      <div className="relative">
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-[#e5e5e5]">
          <div
            className="font-medium text-sm mb-1"
            style={{ color: titleColor }}
          >
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
            <path
              d="M 50 45 Q 47 48 44 46"
              stroke="#1b2124"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 50 45 Q 53 48 56 46"
              stroke="#1b2124"
              strokeWidth="1"
              fill="none"
            />
            <line
              x1="30"
              y1="40"
              x2="40"
              y2="42"
              stroke="#1b2124"
              strokeWidth="1"
            />
            <line
              x1="30"
              y1="45"
              x2="40"
              y2="45"
              stroke="#1b2124"
              strokeWidth="1"
            />
            <line
              x1="60"
              y1="42"
              x2="70"
              y2="40"
              stroke="#1b2124"
              strokeWidth="1"
            />
            <line
              x1="60"
              y1="45"
              x2="70"
              y2="45"
              stroke="#1b2124"
              strokeWidth="1"
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
      </div>
    </div>
  );
}

export default function AdaptiveQuiz({
  onComplete,
  previousScore,
  userId,
  videoId,
}: AdaptiveQuizProps) {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    difficulties: ["E"],
    score: 0,
    maxScore: 0,
    isCompleted: false,
  });
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [mascotMessage, setMascotMessage] = useState(
    previousScore
      ? "Ready for your re-attempt!"
      : "Your Physics AI Abhyas is ready"
  );
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const startRealQuiz = async () => {
      try {
        const response = await apiClient.get<any>(
          API_ENDPOINTS.QUIZ.START(userId, videoId)
        );
        console.log("response: ", response);
        if (!response) {
          throw new Error("No data returned from quiz start API");
        }
        const { sessionId, question } = response as any;
        console.log("{ sessionId, question }: ", { sessionId, question });
        setSessionId(sessionId);
        const mappedQuestion: Question = {
          id: question._id,
          question: question.content,
          options: question.options,
          correctAnswer: -1,
          difficulty:
            question.level === "easy"
              ? "E"
              : question.level === "medium"
              ? "M"
              : "H",
          hasGraph: false,
        };
        setCurrentQuestions([mappedQuestion]);
      } catch (error) {
        console.error("Failed to start quiz:", error);
      }
    };

    startRealQuiz();
  }, [userId, videoId]);

  const currentQuestion = currentQuestions[quizState.currentQuestion];
  const isLastQuestion = quizState.currentQuestion === 9; // adjust if total changes

  const getNextDifficulty = (
    currentDiff: "E" | "M" | "H",
    isCorrect: boolean
  ): "E" | "M" | "H" => {
    if (isCorrect) {
      if (currentDiff === "E") return "M";
      if (currentDiff === "M") return "H";
      return "H"; // Stay at Hard
    } else {
      if (currentDiff === "H") return "M";
      if (currentDiff === "M") return "E";
      return "E"; // Stay at Easy
    }
  };

  const getMascotMessage = (
    prevDiff: "E" | "M" | "H",
    newDiff: "E" | "M" | "H",
    isCorrect: boolean
  ) => {
    if (isCorrect) {
      if (prevDiff === "E" && newDiff === "M") {
        return "Great job! Moving up to a medium difficulty question";
      } else if (prevDiff === "M" && newDiff === "H") {
        return "Excellent! Let's try a hard question next";
      } else if (prevDiff === "H" && newDiff === "H") {
        return "Outstanding! You're maintaining the highest level";
      } else {
        return "Great job! Here's your next question";
      }
    } else {
      if (prevDiff === "H" && newDiff === "M") {
        return "Let's try a medium difficulty question instead";
      } else if (prevDiff === "M" && newDiff === "E") {
        return "Let's go back to an easier question";
      } else if (prevDiff === "E" && newDiff === "E") {
        return "Let's try another easy question";
      } else {
        return "Oops, try this easier one";
      }
    }
  };

  const getQuestionByDifficulty = (
    difficulty: "E" | "M" | "H",
    usedIds: number[]
  ): Question => {
    const pool =
      questionBank[
        difficulty === "E" ? "easy" : difficulty === "M" ? "medium" : "hard"
      ];
    const available = pool.filter((q) => !usedIds.includes(q.id));
    return available[Math.floor(Math.random() * available.length)] || pool[0];
  };

  const handleAnswerSelect = (answer: number) => {
    setSelectedAnswer(answer);
  };

  const handleCheck = async () => {
    if (selectedAnswer === null || !sessionId) return;
    // Don't show feedback until after the API response is received

    try {
      // Submit the current answer
      const submitRes = await apiClient.post(API_ENDPOINTS.QUIZ.SUBMIT_ANSWER, {
        userId,
        videoId,
        questionId: currentQuestion.id,
        sessionId,
        selectedAnswer: currentQuestion.options[selectedAnswer],
      });

      // Explicitly type the response data to avoid 'unknown' errors
      const { correctAnswer: correctAnswerArray, isCorrect: isCorrectFlag } =
        submitRes as any;

      const isCorrect = isCorrectFlag === true || isCorrectFlag === "true";
      const correctIndex = currentQuestion.options.findIndex(
        (opt) => opt === correctAnswerArray[0]
      );

      // Update current question with correct answer index
      setCurrentQuestions((prev) => {
        const updated = [...prev];
        updated[quizState.currentQuestion] = {
          ...updated[quizState.currentQuestion],
          correctAnswer: correctIndex,
        };
        return updated;
      });

      // Update score and difficulties
      const currentDiff = currentQuestion.difficulty;
      const points = isCorrect
        ? currentDiff === "H"
          ? 3
          : currentDiff === "M"
          ? 2
          : 1
        : 0;

      setQuizState((prev) => ({
        ...prev,
        answers: { ...prev.answers, [currentQuestion.id]: selectedAnswer },
        score: prev.score + points,
        maxScore:
          prev.maxScore +
          (currentDiff === "H" ? 3 : currentDiff === "M" ? 2 : 1),
        difficulties: [...prev.difficulties, currentDiff],
      }));

      // Update mascot message based on answer correctness
      // During the check phase, we only show correctness feedback
      // The adaptive difficulty feedback will be shown in the next phase
      setMascotMessage(
        isCorrect
          ? "Great job! That's the correct answer!"
          : "That's not correct. The right answer is highlighted in green."
      );

      // Only show feedback AFTER all updates are complete
      setShowFeedback(true);
    } catch (error) {
      console.error("Error submitting answer:", error);
      // Show a user-friendly error via the mascot
      setMascotMessage(
        "Oops! There was a problem checking your answer. Please try again."
      );
    }
  };

  const handleNext = async () => {
    if (!sessionId) return;

    try {
      if (isLastQuestion) {
        // Complete the quiz
        const completeRes = await apiClient.post(API_ENDPOINTS.QUIZ.COMPLETE, {
          userId,
          videoId,
          sessionId,
        });
        const { marks, questionSequence } = completeRes as any;
        onComplete({
          score: Number(marks),
          maxScore: questionSequence.length,
          difficulties: quizState.difficulties,
          finalScore: Math.round(
            (Number(marks) / (questionSequence.length * 1)) * 100
          ),
          previousScore,
        });
        setQuizState((prev) => ({ ...prev, isCompleted: true }));
      } else {
        // Determine if the current answer was correct and decide next difficulty
        const wasAnswerCorrect =
          currentQuestion.correctAnswer === selectedAnswer;
        const currentDifficulty = currentQuestion.difficulty;
        const nextDifficulty = getNextDifficulty(
          currentDifficulty,
          wasAnswerCorrect
        );

        // Convert E/M/H to API-compatible difficulty strings
        const requestedDifficultyStr =
          nextDifficulty === "E"
            ? "easy"
            : nextDifficulty === "M"
            ? "medium"
            : "hard";

        console.log(
          `Adaptive Quiz: Current difficulty: ${currentDifficulty}, Answer correct: ${wasAnswerCorrect}, Next difficulty: ${nextDifficulty}`
        );

        // Fetch next question with requested difficulty
        const nextRes = await apiClient.post(API_ENDPOINTS.QUIZ.NEXT_QUESTION, {
          userId,
          videoId,
          prevQuestionId: currentQuestion.id,
          questionId: currentQuestion.id,
          sessionId,
          requestedDifficulty: requestedDifficultyStr, // Send the desired difficulty
        });

        const { sessionId: newSessionId, question } = nextRes as any;
        setSessionId(newSessionId);

        // Map the server response to our local question format
        const mappedQuestion: Question = {
          id: question._id,
          question: question.content,
          options: question.options,
          correctAnswer: -1,
          // Force our calculated nextDifficulty to ensure consistency
          difficulty: nextDifficulty,
          hasGraph: false,
        };

        // Set appropriate mascot message based on answer and our calculated next difficulty
        setMascotMessage(
          getMascotMessage(currentDifficulty, nextDifficulty, wasAnswerCorrect)
        );

        setCurrentQuestions((prev) => [...prev, mappedQuestion]);
        setQuizState((prev) => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
        }));
        setSelectedAnswer(null);
        setShowFeedback(false);
      }
    } catch (error) {
      console.error("Error fetching next question:", error);
      // Show a user-friendly error via the mascot
      setMascotMessage(
        "Oops! There was a problem loading the next question. Let's try again."
      );
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-[#eff3f7] flex items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#eff3f7]">
      <FullScreenProgressBar
        currentQuestion={quizState.currentQuestion}
        totalQuestions={10}
      />

      <div className="pt-24 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Question */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="text-[#747474] text-sm">Type : Single</span>
                {/* <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    currentQuestion.difficulty === "H"
                      ? "bg-red-100 text-red-700"
                      : currentQuestion.difficulty === "M"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {currentQuestion.difficulty === "H"
                    ? "Hard"
                    : currentQuestion.difficulty === "M"
                    ? "Medium"
                    : "Easy"}
                </span> */}
              </div>
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 text-[#1b2124]"
                    >
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

            <p className="text-[#1b2124] text-lg mb-6">
              {currentQuestion.question}
            </p>

            {currentQuestion.hasGraph && <SpeedTimeGraph />}
          </div>

          <div className="flex gap-6">
            <CatMascot
              message={mascotMessage}
              isCorrect={
                currentQuestion.correctAnswer !== -1 &&
                selectedAnswer === currentQuestion.correctAnswer
              }
              showFeedback={showFeedback}
            />

            <div className="flex-1">
              <RadioGroup
                value={selectedAnswer?.toString() || ""}
                onValueChange={(value) =>
                  handleAnswerSelect(Number.parseInt(value))
                }
                className="space-y-4"
              >
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === currentQuestion.correctAnswer;
                  const isSelectedAndCorrect = isSelected && isCorrect;
                  const isSelectedAndWrong = isSelected && !isCorrect;

                  let bgColor = "bg-white";
                  let borderColor = "border-[#e5e5e5]";
                  let numberBg = "bg-[#f8f8f8]";
                  let numberBorder = "border-[#e5e5e5]";
                  let numberColor = "text-[#747474]";

                  if (showFeedback) {
                    if (isCorrect) {
                      // Always show correct answer in green when feedback is shown
                      bgColor = "bg-[#f0fdf4]";
                      borderColor = "border-[#22c55e]";
                      numberBg = "bg-[#22c55e]";
                      numberBorder = "border-[#22c55e]";
                      numberColor = "text-white";
                    } else if (isSelectedAndWrong) {
                      // Show selected wrong answer in orange/red
                      bgColor = "bg-[#fee7e9]";
                      borderColor = "border-[#e8b1b6]";
                      numberBg = "bg-[#bf2734]";
                      numberBorder = "border-[#bf2734]";
                      numberColor = "text-white";
                    }
                  } else if (isSelected) {
                    // Before feedback, just show selection in neutral color
                    bgColor = "bg-[#f8fafc]";
                    borderColor = "border-[#5a4bda]";
                    numberBg = "bg-white";
                    numberBorder = "border-[#5a4bda]";
                    numberColor = "text-[#5a4bda]";
                  }

                  return (
                    <div
                      key={index}
                      className={`${bgColor} border ${borderColor} rounded-lg p-4`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`flex items-center justify-center w-6 h-6 rounded-full ${numberBg} border ${numberBorder} ${numberColor} font-medium text-sm`}
                        >
                          {index + 1}
                        </div>
                        <Label
                          htmlFor={`option${index}`}
                          className="flex-1 text-[#1b2124] cursor-pointer"
                        >
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
                  );
                })}
              </RadioGroup>

              <div className="flex justify-end mt-8">
                {isLastQuestion ? (
                  showFeedback ? (
                    <Button
                      onClick={handleNext}
                      className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-8 py-2 rounded-lg flex items-center gap-2"
                    >
                      Finish Quiz
                    </Button>
                  ) : (
                    <Button
                      onClick={handleCheck}
                      disabled={selectedAnswer === null}
                      className="bg-[#5a4bda] hover:bg-[#4a3bc7] text-white px-8 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
                    >
                      Check Answer
                    </Button>
                  )
                ) : showFeedback ? (
                  <Button
                    onClick={handleNext}
                    className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-6 py-2 rounded-lg flex items-center gap-2"
                  >
                    Next Question
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleCheck}
                    disabled={selectedAnswer === null}
                    className="bg-[#5a4bda] hover:bg-[#4a3bc7] text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
                  >
                    Check Answer
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
