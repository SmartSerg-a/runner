import React, { useEffect } from 'react';
import { useGameContext } from '../context/GameContext';
import GameCanvas from './GameCanvas';
import ScoreBoard from './ScoreBoard';
import GameOverScreen from './GameOverScreen';
import StartScreen from './StartScreen';

const Game: React.FC = () => {
  const { gameState, startGame } = useGameContext();

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.code === 'Space' || e.code === 'ArrowUp') && gameState === 'playing') {
        document.dispatchEvent(new Event('player-jump'));
      } else if ((e.code === 'Space' || e.code === 'Enter') && gameState === 'game-over') {
        startGame();
      } else if ((e.code === 'Space' || e.code === 'Enter') && gameState === 'ready') {
        startGame();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, startGame]);

  return (
    <div className="w-full max-w-3xl relative">
      <div className="aspect-[16/9] w-full relative overflow-hidden rounded-lg shadow-2xl border border-indigo-900">
        <GameCanvas />
        
        {gameState === 'ready' && <StartScreen />}
        {gameState === 'game-over' && <GameOverScreen />}
        
        <div className="absolute top-4 left-4 z-10">
          <ScoreBoard />
        </div>
        
        {/* Mobile controls */}
        <div 
          className="absolute bottom-0 left-0 w-full h-1/2 md:hidden z-20"
          onTouchStart={() => {
            if (gameState === 'playing') {
              document.dispatchEvent(new Event('player-jump'));
            } else if (gameState === 'game-over' || gameState === 'ready') {
              startGame();
            }
          }}
        />
      </div>
    </div>
  );
};

export default Game;