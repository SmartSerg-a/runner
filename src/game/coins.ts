import { getRandomInt } from './utils';

// Coin properties
const COIN_COLORS = ['#F59E0B', '#FBBF24', '#FCD34D']; // Gold/yellow colors

export const generateCoin = () => {
  const size = getRandomInt(20, 25);
  const height = getRandomInt(30, 100); // Variation in height
  
  return {
    x: window.innerWidth + 100, // Start off-screen
    y: 0, // Will be calculated during drawing
    size: size,
    collected: false,
    heightOffset: height,
    rotationAngle: 0,
    color: COIN_COLORS[getRandomInt(0, COIN_COLORS.length - 1)],
  };
};

export const updateCoins = (deltaTime: number, gameSpeed: number, coins: any[]): number => {
  let collectedCount = 0;
  
  // Update position and animation of each coin
  for (let i = coins.length - 1; i >= 0; i--) {
    coins[i].x -= 300 * deltaTime * gameSpeed;
    
    // Animate rotation
    coins[i].rotationAngle += deltaTime * 5;
    
    // Check if coin was collected
    if (coins[i].collected) {
      collectedCount++;
      coins.splice(i, 1);
      continue;
    }
    
    // Remove coins that are off-screen
    if (coins[i].x < -coins[i].size - 50) {
      coins.splice(i, 1);
    }
  }
  
  return collectedCount;
};

export const drawCoins = (ctx: CanvasRenderingContext2D, coins: any[]) => {
  const groundY = ctx.canvas.height * 0.8;

  coins.forEach(coin => {
    coin.y = groundY - coin.heightOffset;

    ctx.save();

    const x = coin.x;
    const y = coin.y;
    const size = coin.size;

    ctx.translate(x + size / 2, y + size / 2);
    ctx.rotate(coin.rotationAngle);

    // 1. Золотой круг с 3D-эффектом
    const gradient = ctx.createRadialGradient(0, 0, size / 4, 0, 0, size / 2);
    gradient.addColorStop(0, '#FFD700'); // Светлое золото (центр)
    gradient.addColorStop(1, '#DAA520'); // Тёмное золото (края)
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
    ctx.fill();

    // 2. Симметричный символ (крест + эллипс)
    const symbolSize = size * 0.8;
    ctx.strokeStyle = '#000000'; // Чёрный цвет для контраста
    ctx.lineWidth = size * 0.1;

    // Крест
    ctx.beginPath();
    ctx.moveTo(-symbolSize / 2, 0);
    ctx.lineTo(symbolSize / 2, 0);
    ctx.moveTo(0, -symbolSize / 2);
    ctx.lineTo(0, symbolSize / 2);
    ctx.stroke();

    // Эллипс
    ctx.beginPath();
    ctx.ellipse(0, 0, symbolSize / 2, symbolSize / 4, 0, 0, Math.PI * 2);
    ctx.stroke();

    // 3. Оранжево-жёлтое свечение
    ctx.shadowColor = '#FFA500'; // Оранжевый оттенок
    ctx.shadowBlur = 20; // Мягкое свечение
    ctx.beginPath();
    ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 165, 0, 0.5)'; // Полупрозрачный оранжевый
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  });
};

export const getCoinBounds = (coin: any) => {
  return {
    x: coin.x,
    y: coin.y,
    width: coin.size,
    height: coin.size,
  };
};

export const collectCoin = (coin: any) => {
  coin.collected = true;
};
