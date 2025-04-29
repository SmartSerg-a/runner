import React, { useRef, useEffect } from 'react';
import { useGameContext } from '../context/GameContext';
import { drawGame, updateGameObjects } from '../game/gameEngine';

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { gameState, setScore, gameOver, score } = useGameContext();
  const frameIdRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Game loop
    const gameLoop = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;
      
      if (gameState === 'playing') {
        const newScore = updateGameObjects(deltaTime, score);
        if (newScore !== score) {
          setScore(newScore);
        }
      }

      drawGame(ctx, canvas.width, canvas.height, gameState);
      
      frameIdRef.current = requestAnimationFrame(gameLoop);
    };

    // Handle collisions
    const handleCollision = () => {
      gameOver();
    };

    // Set up event listeners
    document.addEventListener('game-collision', handleCollision);

    // Start the game loop if in playing state
    if (gameState === 'playing' || gameState === 'ready') {
      frameIdRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('game-collision', handleCollision);
      cancelAnimationFrame(frameIdRef.current);
    };
  }, [gameState, setScore, gameOver, score]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900 to-blue-900"
    />
  );
};

export default GameCanvas;