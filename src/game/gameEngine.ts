import { drawPlayer, updatePlayer } from './player';
import { drawObstacles, updateObstacles, generateObstacle } from './obstacles';
import { drawCoins, updateCoins, generateCoin } from './coins';
import { drawBackground } from './background';
import { checkCollisions } from './collisions';

// Game constants
const OBSTACLE_SPAWN_INTERVAL = 1.8;
const COIN_SPAWN_INTERVAL = 1.2;
const DIFFICULTY_INCREASE_INTERVAL = 10;
const MAX_GAME_SPEED = 2.5;

// Game state variables
let gameObjects = {
  obstacles: [] as any[],
  coins: [] as any[],
  gameSpeed: 1,
  lastObstacleTime: 0,
  lastCoinTime: 0,
  lastDifficultyIncrease: 0,
  backgroundOffset: 0,
};

export const initGame = () => {
  resetGameObjects();
};

export const resetGameObjects = () => {
  gameObjects = {
    obstacles: [],
    coins: [],
    gameSpeed: 1,
    lastObstacleTime: 0,
    lastCoinTime: 0,
    lastDifficultyIncrease: 0,
    backgroundOffset: 0,
  };
};

export const updateGameObjects = (deltaTime: number, currentScore: number): number => {
  let score = currentScore;
  
  // Update game speed over time
  gameObjects.lastDifficultyIncrease += deltaTime;
  if (gameObjects.lastDifficultyIncrease >= DIFFICULTY_INCREASE_INTERVAL) {
    gameObjects.lastDifficultyIncrease = 0;
    gameObjects.gameSpeed = Math.min(gameObjects.gameSpeed + 0.1, MAX_GAME_SPEED);
  }
  
  // Generate obstacles
  gameObjects.lastObstacleTime += deltaTime;
  if (gameObjects.lastObstacleTime >= OBSTACLE_SPAWN_INTERVAL / gameObjects.gameSpeed) {
    gameObjects.obstacles.push(generateObstacle());
    gameObjects.lastObstacleTime = 0;
  }
  
  // Generate coins
  gameObjects.lastCoinTime += deltaTime;
  if (gameObjects.lastCoinTime >= COIN_SPAWN_INTERVAL / gameObjects.gameSpeed) {
    gameObjects.coins.push(generateCoin());
    gameObjects.lastCoinTime = 0;
  }
  
  // Update player
  updatePlayer(deltaTime);
  
  // Update obstacles
  updateObstacles(deltaTime, gameObjects.gameSpeed, gameObjects.obstacles);
  
  // Update coins and handle collection
  const collectedCoins = updateCoins(deltaTime, gameObjects.gameSpeed, gameObjects.coins);
  score += collectedCoins;
  
  // Check for collisions
  checkCollisions(gameObjects.obstacles, gameObjects.coins);
  
  // Update background
  gameObjects.backgroundOffset += deltaTime * 50 * gameObjects.gameSpeed;
  gameObjects.backgroundOffset %= 400; // Loop background pattern
  
  return score;
};

export const drawGame = (ctx: CanvasRenderingContext2D, width: number, height: number, gameState: string) => {
  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  // Draw background
  drawBackground(ctx, width, height, gameObjects.backgroundOffset);
  
  // Draw player
  drawPlayer(ctx, width, height);
  
  // Draw obstacles
  drawObstacles(ctx, gameObjects.obstacles);
  
  // Draw coins
  drawCoins(ctx, gameObjects.coins);
  
  // Draw game state overlays if needed
  if (gameState === 'ready') {
    // Ready state overlay (handled by React component)
  } else if (gameState === 'game-over') {
    // Game over overlay (handled by React component)
  }
};