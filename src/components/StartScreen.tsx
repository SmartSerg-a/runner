import React from 'react';
import { useGameContext } from '../context/GameContext';
import { Play, ArrowUp, Coins } from 'lucide-react';

const StartScreen: React.FC = () => {
  const { startGame } = useGameContext();

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-10">
      <div className="bg-gray-800 rounded-lg p-6 text-center w-10/12 max-w-md shadow-2xl border border-indigo-700">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-2">
          Crypto Runner
        </h1>
        <p className="text-gray-300 mb-6">Jump over obstacles and collect crypto!</p>
        
        <div className="mb-5 grid grid-cols-2 gap-3 text-sm">
          <div className="bg-gray-700 rounded-lg p-3 flex flex-col items-center">
            <div className="bg-indigo-600/40 p-2 rounded-lg mb-2">
              <ArrowUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-300">Jump</span>
          </div>
          <div className="bg-gray-700 rounded-lg p-3 flex flex-col items-center">
            <div className="bg-yellow-600/40 p-2 rounded-lg mb-2">
              <Coins className="w-5 h-5 text-yellow-400" />
            </div>
            <span className="text-gray-300">Collect</span>
          </div>
        </div>
        
        <button
          onClick={startGame}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white font-semibold flex items-center justify-center gap-2 transition-colors mx-auto"
        >
          <Play className="w-5 h-5" /> 
          Start Game
        </button>
      </div>
    </div>
  );
};

export default StartScreen;