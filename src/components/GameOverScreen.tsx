import React from 'react';
import { useGameContext } from '../context/GameContext';
import { RefreshCw, Trophy } from 'lucide-react';

const GameOverScreen: React.FC = () => {
  const { score, highScore, startGame } = useGameContext();
  const isNewHighScore = score > 0 && score >= highScore;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-10">
      <div className="bg-gray-800 rounded-lg p-6 text-center w-10/12 max-w-md shadow-2xl border border-indigo-700 relative">
        <h2 className="text-3xl font-bold text-white mb-1">Game Over</h2>
        
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-yellow-400 flex items-center gap-1">
            <Trophy className="w-5 h-5" />
            Score: {score}
          </span>
        </div>

        {isNewHighScore && (
          <div className="mb-6 px-4 py-2 bg-yellow-500/20 rounded-lg text-yellow-300 font-semibold">
            New High Score! 🎉
          </div>
        )}

        <button
          onClick={startGame}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white font-semibold flex items-center justify-center gap-2 transition-colors mx-auto"
        >
          <RefreshCw className="w-5 h-5" /> 
          Play Again
        </button>
        
        {/* Обновлённая кнопка X с SVG */}
        <a
          href="https://x.com/whatphotofuck"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default GameOverScreen;
