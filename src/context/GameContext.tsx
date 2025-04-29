import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { initGame, resetGameObjects } from '../game/gameEngine';

type GameState = 'ready' | 'playing' | 'game-over';

interface GameContextType {
  score: number;
  highScore: number;
  gameState: GameState;
  startGame: () => void;
  gameOver: () => void;
  setScore: (score: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>('ready');

  // Initialize game objects
  useEffect(() => {
    initGame();
    
    // Load high score from localStorage
    const savedHighScore = localStorage.getItem('cryptoRunnerHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Update high score when game over
  useEffect(() => {
    if (gameState === 'game-over' && score > highScore) {
      setHighScore(score);
      localStorage.setItem('cryptoRunnerHighScore', score.toString());
    }
  }, [gameState, score, highScore]);

  const startGame = useCallback(() => {
    setScore(0);
    setGameState('playing');
    resetGameObjects();
  }, []);

  const gameOver = useCallback(() => {
    setGameState('game-over');
  }, []);

  const value = {
    score,
    highScore,
    gameState,
    startGame,
    gameOver,
    setScore,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};