# 🧠 Brain Training Suite

A modern React mini-game app to train your brain with quick, focused exercises.  
Includes memory, reaction time, pattern recognition, and focus tests – plus a
dashboard to track your progress over time.

---

## ✨ Features

- **Beautiful UI**
  - Gradient background, glassmorphism cards, and iconography using Tailwind CSS
  - Fully responsive layout (desktop & laptop friendly)

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
- **Icons:** [lucide-react](https://github.com/lucide-icons/lucide)
- **State & Logic:** React hooks (`useState`, `useEffect`, `useRef`)
- **Storage:** `localStorage` for game history

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/Brain-Testing-Game.git
cd Brain-Testing-Game
