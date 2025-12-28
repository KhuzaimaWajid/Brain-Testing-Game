  # 🧠 Brain Training Suite
  
  A modern React mini-game app to train your brain with quick, focused exercises.  
  Includes memory, reaction time, pattern recognition, and focus tests – plus a
  dashboard to track your progress over time.
  
  ---
  
  ## ✨ Features
  
  - **Beautiful UI**
    - Gradient background and glassmorphism cards using Tailwind CSS
    - Fully responsive layout (desktop / laptop friendly)
  
  - **4 Cognitive Mini-Games**
    1. **Memory Sequence**
       - Simon-style color grid
       - Watch the sequence, then repeat it
       - Level increases as you succeed
    2. **Reaction Time**
       - Wait for the screen to turn green and click as fast as you can
       - 5 rounds per test
       - Shows average and best reaction time
    3. **Pattern Recognition**
       - Match the target 3×3 pattern from four options
       - 10 rounds per game
       - Calculates accuracy percentage
    4. **Focus Timer**
       - Stay focused for a selected duration (30s / 60s / 90s)
       - Avoid clicking moving red distractions
       - Generates a Focus Score based on mistakes
  
  - **Progress Dashboard**
    - Stores history in `localStorage`
    - Shows:
      - Games played per mode
      - Average score
      - Best score
      - Trend (improving / stable / needs practice)
    - Recent activity list (last 10 sessions)
  
  ---
  
  ## 🛠 Tech Stack
  
  - **Frontend:** React + Vite  
  - **Styling:** Tailwind CSS  
  - **Icons:** `lucide-react`  
  - **State & Logic:** React hooks (`useState`, `useEffect`, `useRef`)  
  - **Storage:** `localStorage` for game history
  
  ---
  
  ## 🚀 Getting Started
  
  ### 1. Clone the repository
  
  ```bash
  git clone https://github.com/<your-username>/Brain-Testing-Game.git
  cd Brain-Testing-Game
  Replace <your-username> with your GitHub username.
  
  2. Install dependencies
  bash
  Copy code
  npm install
  3. Run the dev server
  bash
  Copy code
  npm run dev
  Open the URL shown in the terminal (usually http://localhost:5173) in your browser.
  
  4. Build for production
  bash
  Copy code
  npm run build
  📁 Project Structure
  text
  Copy code
  Brain-Testing-Game/
  ├─ public/
  ├─ src/
  │  ├─ assets/           # images / icons
  │  ├─ App.jsx           # main BrainTrainingGame component + all mini-games
  │  ├─ App.css           # extra styles (if used)
  │  ├─ index.css         # Tailwind + global styles
  │  ├─ main.jsx          # React entry point
  ├─ index.html           # Vite HTML template
  ├─ package.json         # scripts & dependencies
  ├─ package-lock.json
  ├─ postcss.config.js    # PostCSS + Tailwind config
  ├─ tailwind.config.js   # Tailwind paths & theme
  ├─ vite.config.js       # Vite + React plugin
  └─ README.md            # this file
  🧩 Game Details
  Memory Sequence
  4 colored squares (red, blue, green, yellow)
  
  Each round adds one more step to the sequence
  
  Game ends on the first mistake
  
  Saved score: highest level reached
  
  Reaction Time
  Stage flow:
  
  ready → click to start
  
  waiting (red) → too early if clicked
  
  click (green) → measure reaction time
  
  result → show time + feedback
  
  5 attempts per session
  
  Saved score: average reaction time (ms)
  
  Pattern Recognition
  Target pattern: 3×3 grid
  
  4 options: 1 correct, 3 similar but slightly changed
  
  10 rounds per game
  
  Saved score: accuracy %
  
  Focus Timer
  Choose duration: 30s / 60s / 90s
  
  Moving red dots appear as distractions
  
  Goal: avoid clicking them
  
  Saved score: focus % based on number of distractions clicked
  
  🧮 Progress & Stats
  For each game type the dashboard shows:
  
  Games Played – total sessions
  
  Average Score – all-time average
  
  Best Score – personal best
  
  Trend – difference between first and latest score
  
  ↑ Improving, → Stable, ↓ Practice
  
  Recent games are displayed with:
  
  Game name
  
  Date
  
  Score with proper unit (lvl, ms, or %)
  
  All progress is stored locally in the browser using localStorage
  under the key:
  
  text
  Copy code
  brain_training_history
  💡 Possible Future Improvements
  User profiles and cloud sync
  
  Difficulty settings per game
  
  More mini-games (e.g., math speed, dual-tasking)
  
  Dark / light theme toggle
  
  Shareable results / screenshots
  
  📜 License
  This project is for personal / portfolio use.
  Feel free to fork it, tweak the design, or extend the games for your own learning.
