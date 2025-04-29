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
    // Calculate Y position (above the ground by the height offset)
    coin.y = groundY - coin.heightOffset;
    
    ctx.save();
    
    // Create a coin that looks like a cryptocurrency token
    const x = coin.x;
    const y = coin.y;
    const size = coin.size;
    
    // Draw the coin with rotation for 3D effect
    ctx.translate(x + size / 2, y + size / 2);
    ctx.rotate(coin.rotationAngle);
    
    // Main coin circle
    ctx.beginPath();
    ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
    
    // Create a gradient for the coin
    const gradient = ctx.createRadialGradient(0, 0, size / 4, 0, 0, size / 2);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
    gradient.addColorStop(1, coin.color);
    
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Add a cryptocurrency symbol
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.font = `bold ${size * 0.5}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('₿', 0, 0);
    
    // Add subtle glow effect
    ctx.shadowColor = coin.color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
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