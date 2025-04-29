import { getPlayerBounds } from './player';
import { getObstacleBounds } from './obstacles';
import { getCoinBounds, collectCoin } from './coins';

// Check for rectangle collision
const isColliding = (rect1: any, rect2: any) => {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
};

export const checkCollisions = (obstacles: any[], coins: any[]) => {
  const playerBounds = getPlayerBounds();
  
  // Check obstacle collisions
  for (const obstacle of obstacles) {
    const obstacleBounds = getObstacleBounds(obstacle);
    
    if (isColliding(playerBounds, obstacleBounds)) {
      // Dispatch collision event
      document.dispatchEvent(new Event('game-collision'));
      return;
    }
  }
  
  // Check coin collisions
  for (const coin of coins) {
    if (coin.collected) continue;
    
    const coinBounds = getCoinBounds(coin);
    
    if (isColliding(playerBounds, coinBounds)) {
      collectCoin(coin);
    }
  }
};