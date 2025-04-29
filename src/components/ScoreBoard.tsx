import React from 'react';
import { useGameContext } from '../context/GameContext';
import { Coins } from 'lucide-react';

const ScoreBoard: React.FC = () => {
  const { score, highScore } = useGameContext();

  return (
    <div className="flex flex-col gap-1 bg-gray-800/70 backdrop-blur-sm rounded-lg px-4 py-3 text-white shadow-lg">
      <div className="flex items-center gap-2">
        <Coins className="w-5 h-5 text-yellow-400" />
        <span className="font-semibold text-xl">{score}</span>
      </div>
      <div className="text-xs text-gray-400">
        High Score: {highScore}
      </div>
    </div>
  );
};

export default ScoreBoard;