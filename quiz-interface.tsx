"use client"

import { useState } from "react"
import { ChevronLeft, Flame, ChevronDown, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Component() {
  const [selectedAnswer, setSelectedAnswer] = useState("option1")

  return (
    <div className="min-h-screen bg-[#eff3f7] p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" className="flex items-center gap-2 text-[#1b2124] hover:bg-white/50">
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          <div className="flex items-center gap-4">
            {/* Progress indicator */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#ff6d0a] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">★</span>
              </div>
              <div className="bg-[#d9dce1] rounded-full h-2 w-32">
                <div className="bg-[#ff6d0a] h-2 rounded-full w-3"></div>
              </div>
            </div>

            <span className="text-[#1b2124] font-medium">01/10</span>

            <div className="flex items-center gap-1 text-[#ff6d0a] font-bold">
              <Flame className="w-5 h-5" />
              25
            </div>
          </div>
        </div>

        {/* Question header */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#747474] text-sm">Type : Single</span>
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

          <p className="text-[#1b2124] text-lg mb-6">
            Find the distance covered by a particle during the time interval t=0 and t=4s for which the speed time graph
            is shown in figure;
          </p>

          {/* Graph */}
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
                <text x="210" y="280" textAnchor="middle" className="text-sm fill-[#1b2124]">
                  Time(s)
                </text>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Cat mascot */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-[#e5e5e5]">
                <div className="text-[#bf2734] font-medium text-sm mb-1">Oops! Don't worry</div>
                <div className="text-[#1b2124] text-sm">Keep it up</div>
                <div className="absolute bottom-0 left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white"></div>
              </div>
              <div className="w-24 h-24">
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
                  {/* Eyes */}
                  <circle cx="45" cy="38" r="3" fill="#1b2124" />
                  <circle cx="55" cy="38" r="3" fill="#1b2124" />
                  <circle cx="46" cy="37" r="1" fill="#ffffff" />
                  <circle cx="56" cy="37" r="1" fill="#ffffff" />
                  {/* Nose */}
                  <polygon points="50,42 48,45 52,45" fill="#1b2124" />
                  {/* Mouth */}
                  <path d="M 50 45 Q 47 48 44 46" stroke="#1b2124" strokeWidth="1" fill="none" />
                  <path d="M 50 45 Q 53 48 56 46" stroke="#1b2124" strokeWidth="1" fill="none" />
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

          {/* Answer options */}
          <div className="flex-1">
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} className="space-y-4">
              <div className="bg-[#fee7e9] border border-[#e8b1b6] rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white border border-[#e8b1b6] text-[#bf2734] font-medium text-sm">
                    1
                  </div>
                  <Label htmlFor="option1" className="flex-1 text-[#1b2124] cursor-pointer">
                    This is the first option
                  </Label>
                  <RadioGroupItem value="option1" id="option1" className="border-[#bf2734] text-[#bf2734]" />
                </div>
              </div>

              <div className="bg-white border border-[#e5e5e5] rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#f8f8f8] border border-[#e5e5e5] text-[#747474] font-medium text-sm mt-1">
                    2
                  </div>
                  <Label htmlFor="option2" className="flex-1 text-[#1b2124] cursor-pointer leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur. Eros vitae neque sit in orci egestas dolor ultrices. Eget id
                    arcu phasellus pharetra laoreet vel enim tellus aliquam. Aliquam enim magna sit cum ac. Mattis
                    pellentesque urna posuere egestas.
                  </Label>
                  <RadioGroupItem value="option2" id="option2" className="border-[#e5e5e5] mt-1" />
                </div>
              </div>
            </RadioGroup>

            <div className="flex justify-end mt-8">
              <Button className="bg-[#5a4bda] hover:bg-[#4a3bc7] text-white px-8 py-2 rounded-lg">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
