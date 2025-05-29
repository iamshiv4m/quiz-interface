# Youdha Abhyas - AI Adaptive Quiz Platform

A modern, interactive quiz platform with AI-powered adaptive difficulty and comprehensive analytics.

## Features

### 🧠 AI Adaptive Learning
- **Dynamic Difficulty Adjustment**: Questions adapt based on student performance
- **Personalized Learning Path**: AI determines optimal question difficulty in real-time
- **Smart Scoring System**: Points awarded based on question difficulty (Easy: 1pt, Medium: 2pts, Hard: 3pts)

### 🏆 Gamified Experience
- **Streak System**: Track consecutive correct answers with visual celebrations
- **Achievement Badges**: Beginner, Intermediate, and Master levels
- **Leaderboards**: Chapter-specific and league-wide rankings
- **Gaming Tags**: Rival, Challenger, Rising Star, Elite, and more

### 📊 Comprehensive Analytics
- **Performance Tracking**: Detailed score breakdowns and improvement metrics
- **Difficulty Progression**: Visual representation of adaptive journey
- **Rank Improvement Goals**: Targeted suggestions for advancement
- **Score Change Animations**: Motivational feedback for re-attempts

### 🎯 Match-Based Learning
- **League System**: Subject-specific competitions (Physics, Chemistry, Math, Biology)
- **Daily Matches**: Fresh content with deadlines and participation tracking
- **Tournament Mode**: Multi-match competitions with prizes
- **Social Learning**: See how you compare with peers

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on all devices
- **Intuitive Navigation**: Clean, card-based interface
- **Visual Feedback**: Color-coded difficulty levels and performance indicators
- **Accessibility**: Screen reader friendly with proper ARIA labels

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **State Management**: React hooks

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd youdha-abhyas-quiz
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── adaptive-quiz.tsx # AI adaptive quiz logic
│   ├── home-screen-widget.tsx # Entry point widget
│   ├── results-screen.tsx # Results and analytics
│   └── leaderboard-screen.tsx # Rankings and competition
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
└── data/                 # Mock data and question banks
\`\`\`

## Key Components

### HomeScreenWidget
- Entry point displaying today's matches
- League-based organization with expandable sections
- Featured match highlighting
- Smart tagging system (New, Recommended, Popular, etc.)

### AdaptiveQuiz
- AI-powered difficulty adjustment
- Real-time feedback with mascot interactions
- Progress tracking with full-screen progress bar
- Streak celebrations and motivational messages

### ResultsScreen
- Comprehensive score analysis
- Difficulty breakdown visualization
- Score change animations for re-attempts
- Improvement suggestions and goals

### LeaderboardScreen
- Multi-level rankings (match and league)
- Gaming-style tags and achievements
- Rank improvement motivation
- Social comparison features

## Customization

### Adding New Subjects
1. Update the question bank in `data/questions.ts`
2. Add subject-specific styling in the components
3. Configure league settings in the dashboard widget

### Modifying Difficulty Algorithm
The adaptive algorithm is in `components/adaptive-quiz.tsx`:
- Correct answer: Increase difficulty
- Wrong answer: Decrease difficulty
- Scoring: Easy (1pt), Medium (2pts), Hard (3pts)

### Styling Customization
- Colors and themes: `tailwind.config.js`
- Component styles: Individual component files
- Global styles: `app/globals.css`

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms
\`\`\`bash
npm run build
npm start
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the GitHub repository.
