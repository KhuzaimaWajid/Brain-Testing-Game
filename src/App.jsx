import React, { useState, useEffect, useRef } from 'react';
import { Brain, Zap, Target, Clock, TrendingUp, Award, BarChart3, Play, Home } from 'lucide-react';

const STORAGE_KEY = 'brain_training_history';

const BrainTrainingGame = () => {
  const [currentView, setCurrentView] = useState('menu');
  const [gameHistory, setGameHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setGameHistory(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (gameHistory.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameHistory));
    }
  }, [gameHistory]);

  const addGameResult = (gameType, score, details) => {
    const result = {
      id: Date.now(),
      gameType,
      score,
      details,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString()
    };
    setGameHistory(prev => [...prev, result]);
  };

  const getGameStats = (gameType) => {
    const gameResults = gameHistory.filter(g => g.gameType === gameType);
    if (gameResults.length === 0) return null;

    const scores = gameResults.map(g => g.score);
    const recent = gameResults.slice(-10);
    
    return {
      totalPlays: gameResults.length,
      averageScore: (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1),
      bestScore: Math.max(...scores).toFixed(1),
      recentAverage: (recent.map(g => g.score).reduce((a, b) => a + b, 0) / recent.length).toFixed(1),
      trend: gameResults.length > 1 ? scores[scores.length - 1] - scores[0] : 0
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {currentView === 'menu' && <MainMenu setCurrentView={setCurrentView} gameHistory={gameHistory} />}
        {currentView === 'dashboard' && <Dashboard gameHistory={gameHistory} getGameStats={getGameStats} setCurrentView={setCurrentView} />}
        {currentView === 'memory' && <MemoryGame setCurrentView={setCurrentView} addGameResult={addGameResult} />}
        {currentView === 'reaction' && <ReactionGame setCurrentView={setCurrentView} addGameResult={addGameResult} />}
        {currentView === 'pattern' && <PatternGame setCurrentView={setCurrentView} addGameResult={addGameResult} />}
        {currentView === 'focus' && <FocusGame setCurrentView={setCurrentView} addGameResult={addGameResult} />}
      </div>
    </div>
  );
};

const MainMenu = ({ setCurrentView, gameHistory }) => {
  const games = [
    { id: 'memory', name: 'Memory Sequence', icon: Brain, color: 'bg-blue-500', description: 'Remember and repeat sequences' },
    { id: 'reaction', name: 'Reaction Time', icon: Zap, color: 'bg-yellow-500', description: 'Test your reflexes' },
    { id: 'pattern', name: 'Pattern Recognition', icon: Target, color: 'bg-green-500', description: 'Identify matching patterns' },
    { id: 'focus', name: 'Focus Timer', icon: Clock, color: 'bg-purple-500', description: 'Sustain attention over time' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-12">
      <div className="text-center space-y-4 mb-12">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Brain className="w-14 h-14 text-cyan-400" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Brain Training Suite
          </h1>
        </div>
        <p className="text-xl text-gray-300">Enhance your cognitive skills through scientifically-designed mini-games</p>
      </div>

      <div className="space-y-4">
        {games.map(game => (
          <button
            key={game.id}
            onClick={() => setCurrentView(game.id)}
            className="w-full group relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-sm p-6 hover:bg-slate-800/70 transition-all duration-300 border border-slate-700/50 hover:border-slate-600 text-left"
          >
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-xl ${game.color} flex-shrink-0`}>
                <game.icon className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-1">{game.name}</h3>
                <p className="text-gray-400">{game.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={() => setCurrentView('dashboard')}
        className="w-full py-5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transition-all font-semibold text-lg flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
      >
        <BarChart3 className="w-5 h-5" />
        View Progress Dashboard
      </button>

      {gameHistory.length > 0 && (
        <div className="text-center text-gray-400 text-sm pt-4">
          Total games played: {gameHistory.length}
        </div>
      )}
    </div>
  );
};

const Dashboard = ({ gameHistory, getGameStats, setCurrentView }) => {
  const gameTypes = {
    memory: { name: 'Memory Sequence', color: 'cyan' },
    reaction: { name: 'Reaction Time', color: 'yellow' },
    pattern: { name: 'Pattern Recognition', color: 'green' },
    focus: { name: 'Focus Timer', color: 'purple' }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-cyan-400" />
          Progress Dashboard
        </h2>
        <button
          onClick={() => setCurrentView('menu')}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          Back to Menu
        </button>
      </div>

      {gameHistory.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <Award className="w-16 h-16 text-gray-600 mx-auto" />
          <p className="text-xl text-gray-400">No games played yet. Start training to see your progress!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(gameTypes).map(([type, info]) => {
            const stats = getGameStats(type);
            if (!stats) return null;

            return (
              <div key={type} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-2xl font-bold mb-4">{info.name}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard label="Games Played" value={stats.totalPlays} />
                  <StatCard label="Average Score" value={`${stats.averageScore}${type === 'memory' ? ' lvl' : type === 'reaction' ? 'ms' : '%'}`} />
                  <StatCard label="Best Score" value={`${stats.bestScore}${type === 'memory' ? ' lvl' : type === 'reaction' ? 'ms' : '%'}`} />
                  <StatCard 
                    label="Trend" 
                    value={stats.trend > 0 ? '↑ Improving' : stats.trend < 0 ? '↓ Practice' : '→ Stable'} 
                    color={stats.trend > 0 ? 'text-green-400' : stats.trend < 0 ? 'text-red-400' : 'text-gray-400'}
                  />
                </div>
              </div>
            );
          })}

          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-2xl font-bold mb-4">Recent Activity</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {gameHistory.slice(-10).reverse().map(game => (
                <div key={game.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                  <div>
                    <span className="font-semibold">{gameTypes[game.gameType].name}</span>
                    <span className="text-gray-400 text-sm ml-3">{game.date}</span>
                  </div>
                  <span className="font-bold text-cyan-400">
                    {game.score.toFixed(1)}{game.gameType === 'memory' ? ' lvl' : game.gameType === 'reaction' ? 'ms' : '%'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, color = 'text-white' }) => (
  <div className="bg-slate-900/50 rounded-lg p-4">
    <div className="text-gray-400 text-sm mb-1">{label}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
  </div>
);

const MemoryGame = ({ setCurrentView, addGameResult }) => {
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [highlightedCell, setHighlightedCell] = useState(null);

  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];

  const startGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setLevel(1);
    setGameOver(false);
    setIsPlaying(true);
    nextRound([]);
  };

  const nextRound = (currentSequence) => {
    const newSequence = [...currentSequence, Math.floor(Math.random() * 4)];
    setSequence(newSequence);
    setPlayerSequence([]);
    playSequence(newSequence);
  };

  const playSequence = async (seq) => {
    setIsPlayerTurn(false);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    for (let i = 0; i < seq.length; i++) {
      setHighlightedCell(seq[i]);
      await new Promise(resolve => setTimeout(resolve, 600));
      setHighlightedCell(null);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    setIsPlayerTurn(true);
  };

  const handleCellClick = (index) => {
    if (!isPlayerTurn || gameOver) return;

    const newPlayerSequence = [...playerSequence, index];
    setPlayerSequence(newPlayerSequence);

    if (sequence[newPlayerSequence.length - 1] !== index) {
      setGameOver(true);
      setIsPlayerTurn(false);
      addGameResult('memory', level, { finalLevel: level, sequenceLength: sequence.length });
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      setLevel(prev => prev + 1);
      setTimeout(() => nextRound(sequence), 1000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold flex items-center gap-3">
          <Brain className="w-8 h-8 text-blue-400" />
          Memory Sequence Test
        </h2>
        <button
          onClick={() => setCurrentView('menu')}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 space-y-6">
        <div className="text-center space-y-2">
          <div className="text-6xl font-bold text-cyan-400">{level}</div>
          <div className="text-gray-400">Level</div>
        </div>

        {!isPlaying ? (
          <div className="text-center space-y-4">
            <p className="text-lg text-gray-300">Watch the sequence and repeat it by clicking the colored squares</p>
            <button
              onClick={startGame}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 transition-all font-semibold text-lg flex items-center justify-center gap-2 mx-auto"
            >
              <Play className="w-5 h-5" />
              Start Game
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {[0, 1, 2, 3].map(index => (
                <button
                  key={index}
                  onClick={() => handleCellClick(index)}
                  disabled={!isPlayerTurn}
                  className={`h-32 rounded-xl transition-all ${colors[index]} ${
                    highlightedCell === index ? 'opacity-100 scale-95' : 'opacity-50'
                  } ${isPlayerTurn && !gameOver ? 'cursor-pointer hover:opacity-75' : 'cursor-not-allowed'}`}
                />
              ))}
            </div>

            <div className="text-center text-lg">
              {!isPlayerTurn && !gameOver && <div className="text-yellow-400">Watch carefully...</div>}
              {isPlayerTurn && !gameOver && <div className="text-green-400">Your turn! Repeat the sequence</div>}
              {gameOver && (
                <div className="space-y-4">
                  <div className="text-red-400 text-xl font-bold">Game Over!</div>
                  <div className="text-gray-300">You reached level {level}</div>
                  <button
                    onClick={startGame}
                    className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors"
                  >
                    Play Again
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const ReactionGame = ({ setCurrentView, addGameResult }) => {
  const [stage, setStage] = useState('ready');
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [round, setRound] = useState(0);
  const timeoutRef = useRef(null);

  const startTest = () => {
    setStage('waiting');
    setReactionTime(null);
    
    const delay = 2000 + Math.random() * 3000;
    timeoutRef.current = setTimeout(() => {
      setStage('click');
      setStartTime(Date.now());
    }, delay);
  };

 const handleClick = () => {
  // ✅ 1) When it says "Click anywhere to start"
  if (stage === 'ready') {
    startTest();
    return;
  }

  // ⛔ 2) Clicked too early (red screen)
  if (stage === 'waiting') {
    clearTimeout(timeoutRef.current);
    setStage('ready');
    alert('Too early! Wait for the screen to turn green.');
    return;
  }

  // ✅ 3) Correct reaction (green screen)
  if (stage === 'click') {
    const time = Date.now() - startTime;
    setReactionTime(time);
    const newAttempts = [...attempts, time];
    setAttempts(newAttempts);
    setStage('result');
    setRound(prev => prev + 1);

    if (newAttempts.length === 5) {
      const avgTime = newAttempts.reduce((a, b) => a + b, 0) / newAttempts.length;
      addGameResult('reaction', avgTime, {
        attempts: newAttempts,
        best: Math.min(...newAttempts),
      });
    }
  }
};

  const reset = () => {
    setStage('ready');
    setAttempts([]);
    setRound(0);
    setReactionTime(null);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const getBackgroundColor = () => {
    if (stage === 'waiting') return 'bg-red-500';
    if (stage === 'click') return 'bg-green-500';
    return 'bg-slate-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold flex items-center gap-3">
          <Zap className="w-8 h-8 text-yellow-400" />
          Reaction Time Challenge
        </h2>
        <button
          onClick={() => setCurrentView('menu')}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          Back
        </button>
      </div>

      <div 
        onClick={handleClick}
        className={`${getBackgroundColor()} rounded-xl p-12 border border-slate-700 transition-colors duration-200 cursor-pointer min-h-96 flex flex-col items-center justify-center space-y-6`}
      >
        {stage === 'ready' && (
          <div className="text-center space-y-4">
            <div className="text-3xl font-bold">Reaction Time Test</div>
            <p className="text-xl">Round {round + 1} of 5</p>
            <p className="text-gray-300">Click anywhere to start</p>
            {attempts.length > 0 && (
              <div className="text-gray-400">
                Previous: {attempts[attempts.length - 1]}ms
              </div>
            )}
          </div>
        )}

        {stage === 'waiting' && (
          <div className="text-center space-y-4">
            <div className="text-3xl font-bold">Wait for green...</div>
            <p className="text-xl">Don't click yet!</p>
          </div>
        )}

        {stage === 'click' && (
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold">CLICK NOW!</div>
          </div>
        )}

        {stage === 'result' && (
          <div className="text-center space-y-6">
            <div className="text-6xl font-bold text-cyan-400">{reactionTime}ms</div>
            <div className="text-xl">
              {reactionTime < 200 ? '⚡ Lightning fast!' :
               reactionTime < 300 ? '🎯 Excellent!' :
               reactionTime < 400 ? '👍 Good!' :
               '🐢 Keep practicing!'}
            </div>
            
            {attempts.length < 5 ? (
              <button
                onClick={(e) => { e.stopPropagation(); startTest(); }}
                className="px-6 py-3 rounded-xl bg-yellow-600 hover:bg-yellow-500 transition-colors font-semibold"
              >
                Next Round ({attempts.length}/5)
              </button>
            ) : (
              <div className="space-y-4">
                <div className="text-2xl font-bold">Test Complete!</div>
                <div className="text-xl">
                  Average: {(attempts.reduce((a, b) => a + b, 0) / attempts.length).toFixed(0)}ms
                </div>
                <div className="text-lg text-gray-300">
                  Best: {Math.min(...attempts)}ms
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); reset(); }}
                  className="px-6 py-3 rounded-xl bg-yellow-600 hover:bg-yellow-500 transition-colors font-semibold"
                >
                  Play Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {attempts.length > 0 && attempts.length < 5 && (
        <div className="flex gap-2 justify-center">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full ${i < attempts.length ? 'bg-yellow-400' : 'bg-slate-700'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const PatternGame = ({ setCurrentView, addGameResult }) => {
  const [patterns, setPatterns] = useState([]);
  const [targetPattern, setTargetPattern] = useState(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [feedback, setFeedback] = useState('');

  const generatePattern = () => {
    return Array.from({ length: 9 }, () => Math.random() > 0.5);
  };

  const startGame = () => {
    setScore(0);
    setRound(0);
    setGameActive(true);
    setFeedback('');
    nextRound();
  };

  const nextRound = () => {
    const target = generatePattern();
    const options = [target];
    
    for (let i = 0; i < 3; i++) {
      const similar = [...target];
      const changePositions = Math.floor(Math.random() * 2) + 1;
      for (let j = 0; j < changePositions; j++) {
        const pos = Math.floor(Math.random() * 9);
        similar[pos] = !similar[pos];
      }
      options.push(similar);
    }
    
    options.sort(() => Math.random() - 0.5);
    
    setTargetPattern(target);
    setPatterns(options);
    setFeedback('');
  };

  const handlePatternClick = (pattern) => {
    const isCorrect = JSON.stringify(pattern) === JSON.stringify(targetPattern);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setFeedback('✓ Correct!');
    } else {
      setFeedback('✗ Wrong');
    }

    const newRound = round + 1;
    setRound(newRound);

    if (newRound < 10) {
      setTimeout(nextRound, 1000);
    } else {
      setGameActive(false);
      const accuracy = (score + (isCorrect ? 1 : 0)) / 10 * 100;
      addGameResult('pattern', accuracy, { correct: score + (isCorrect ? 1 : 0), total: 10 });
    }
  };

  const PatternGrid = ({ pattern, onClick, isTarget = false }) => (
    <div 
      onClick={onClick}
      className={`grid grid-cols-3 gap-1 p-3 rounded-lg ${
        isTarget ? 'bg-cyan-900/30 border-2 border-cyan-500' : 'bg-slate-800 cursor-pointer hover:bg-slate-700'
      } transition-all`}
    >
      {pattern.map((filled, i) => (
        <div
          key={i}
          className={`w-8 h-8 rounded ${filled ? 'bg-cyan-400' : 'bg-slate-600'}`}
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold flex items-center gap-3">
          <Target className="w-8 h-8 text-green-400" />
          Pattern Recognition
        </h2>
        <button
          onClick={() => setCurrentView('menu')}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 space-y-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">Round: {round}/10</div>
          <div className="text-2xl font-bold text-green-400">Score: {score}</div>
        </div>

        {!gameActive && round === 0 ? (
          <div className="text-center space-y-4 py-8">
            <p className="text-lg text-gray-300">Find the pattern that matches the target</p>
            <button
              onClick={startGame}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transition-all font-semibold text-lg flex items-center justify-center gap-2 mx-auto"
            >
              <Play className="w-5 h-5" />
              Start Game
            </button>
          </div>
        ) : round === 10 ? (
          <div className="text-center space-y-4 py-8">
            <div className="text-4xl font-bold text-cyan-400">{((score / 10) * 100).toFixed(0)}%</div>
            <div className="text-xl">Accuracy</div>
            <div className="text-gray-300">{score} out of 10 correct</div>
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 transition-colors font-semibold"
            >
              Play Again
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              <div className="text-center text-lg font-semibold text-cyan-400">Target Pattern</div>
              <div className="flex justify-center">
                <PatternGrid pattern={targetPattern} isTarget />
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-center text-lg font-semibold">Find the Match</div>
              <div className="grid grid-cols-2 gap-4">
                {patterns.map((pattern, i) => (
                  <PatternGrid
                    key={i}
                    pattern={pattern}
                    onClick={() => handlePatternClick(pattern)}
                  />
                ))}
              </div>
            </div>

            {feedback && (
              <div className={`text-center text-xl font-bold ${feedback.includes('✓') ? 'text-green-400' : 'text-red-400'}`}>
                {feedback}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const FocusGame = ({ setCurrentView, addGameResult }) => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [targetTime, setTargetTime] = useState(60);
  const [distractions, setDistractions] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const intervalRef = useRef(null);

  const startGame = () => {
    setIsActive(true);
    setTime(0);
    setDistractions([]);
    setClicks(0);
    setGameOver(false);

    intervalRef.current = setInterval(() => {
      setTime(prev => {
        const newTime = prev + 0.1;
        
        if (Math.random() < 0.02 && newTime < targetTime) {
          const newDistraction = {
            id: Date.now(),
            x: Math.random() * 80 + 10,
            y: Math.random() * 60 + 20
          };
          setDistractions(prev => [...prev, newDistraction]);
        }

        if (newTime >= targetTime) {
          endGame(targetTime);
          return targetTime;
        }
        
        return newTime;
      });
    }, 100);
  };

  const endGame = (finalTime) => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setGameOver(true);
    
    const accuracy = ((targetTime - clicks) / targetTime) * 100;
    const finalScore = Math.max(0, accuracy);
    addGameResult('focus', finalScore, { duration: finalTime, distractionsClicked: clicks, totalDistractions: distractions.length });
  };

  const handleDistractionClick = (id) => {
    setClicks(prev => prev + 1);
    setDistractions(prev => prev.filter(d => d.id !== id));
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold flex items-center gap-3">
          <Clock className="w-8 h-8 text-purple-400" />
          Focus Timer Test
        </h2>
        <button
          onClick={() => setCurrentView('menu')}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 space-y-6">
        <div className="text-center space-y-2">
          <div className="text-6xl font-bold text-purple-400">{time.toFixed(1)}s</div>
          <div className="text-gray-400">Target: {targetTime}s</div>
          <div className="text-red-400 text-sm">Don't click the distractions!</div>
        </div>

        {!isActive && !gameOver ? (
          <div className="text-center space-y-4">
            <p className="text-lg text-gray-300">Stay focused for {targetTime} seconds. Avoid clicking the red dots!</p>
            <div className="space-y-2">
              <div className="text-sm text-gray-400">Select duration:</div>
              <div className="flex gap-2 justify-center">
                {[30, 60, 90].map(duration => (
                  <button
                    key={duration}
                    onClick={() => setTargetTime(duration)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      targetTime === duration ? 'bg-purple-600' : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    {duration}s
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={startGame}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all font-semibold text-lg flex items-center justify-center gap-2 mx-auto"
            >
              <Play className="w-5 h-5" />
              Start Focus Test
            </button>
          </div>
        ) : gameOver ? (
          <div className="text-center space-y-4">
            <div className="text-2xl font-bold text-cyan-400">Focus Test Complete!</div>
            <div className="space-y-2">
              <div className="text-lg">Distractions clicked: {clicks}</div>
              <div className="text-3xl font-bold text-purple-400">
                {(((targetTime - clicks) / targetTime) * 100).toFixed(1)}%
              </div>
              <div className="text-gray-400">Focus Score</div>
            </div>
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition-colors font-semibold"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="relative bg-slate-900 rounded-lg h-96 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-gray-700 text-2xl font-bold">
              Stay Focused...
            </div>
            {distractions.map(d => (
              <button
                key={d.id}
                onClick={() => handleDistractionClick(d.id)}
                className="absolute w-8 h-8 bg-red-500 rounded-full animate-pulse hover:scale-110 transition-transform"
                style={{ left: `${d.x}%`, top: `${d.y}%` }}
              />
            ))}
          </div>
        )}

        {isActive && (
          <div className="text-center text-yellow-400 font-semibold">
            Clicks: {clicks} (Try to avoid clicking!)
          </div>
        )}
      </div>
    </div>
  );
};

export default BrainTrainingGame;