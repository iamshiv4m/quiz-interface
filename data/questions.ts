import type { Question } from "../types"

export const questionBank: { [key: string]: Question[] } = {
  easy: [
    {
      id: 1,
      difficulty: "E",
      question: "What is the SI unit of force?",
      options: ["Joule", "Newton", "Watt", "Pascal"],
      correctAnswer: 1,
    },
    {
      id: 2,
      difficulty: "E",
      question: "Which of the following is a vector quantity?",
      options: ["Speed", "Distance", "Velocity", "Time"],
      correctAnswer: 2,
    },
    {
      id: 3,
      difficulty: "E",
      question: "What is the acceleration due to gravity on Earth?",
      options: ["9.8 m/s²", "10.8 m/s²", "8.9 m/s²", "11.2 m/s²"],
      correctAnswer: 0,
    },
  ],
  medium: [
    {
      id: 4,
      difficulty: "M",
      question: "A car travels at a constant speed of 60 km/h for 2 hours. What distance does it cover?",
      options: ["100 km", "120 km", "140 km", "160 km"],
      correctAnswer: 1,
    },
    {
      id: 5,
      difficulty: "M",
      question: "What is the formula for kinetic energy?",
      options: ["KE = mv", "KE = ½mv²", "KE = mv²", "KE = ½mv"],
      correctAnswer: 1,
    },
    {
      id: 6,
      difficulty: "M",
      question: "At what angle should a projectile be launched for maximum range?",
      options: ["30°", "45°", "60°", "90°"],
      correctAnswer: 1,
    },
  ],
  hard: [
    {
      id: 7,
      difficulty: "H",
      question:
        "Find the distance covered by a particle during the time interval t=0 and t=4s for which the speed time graph is shown in figure;",
      options: ["40 meters", "80 meters", "60 meters", "100 meters"],
      correctAnswer: 1,
      hasGraph: true,
    },
    {
      id: 8,
      difficulty: "H",
      question:
        "A block of mass 5kg is pulled by a force of 20N at an angle of 30° to the horizontal. If the coefficient of friction is 0.3, what is the acceleration?",
      options: ["1.2 m/s²", "2.1 m/s²", "3.4 m/s²", "4.2 m/s²"],
      correctAnswer: 0,
    },
    {
      id: 9,
      difficulty: "H",
      question:
        "Two blocks of masses 3kg and 5kg are connected by a string over a pulley. What is the acceleration of the system?",
      options: ["2.45 m/s²", "3.68 m/s²", "4.12 m/s²", "5.23 m/s²"],
      correctAnswer: 0,
    },
  ],
}
