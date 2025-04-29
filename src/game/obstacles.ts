import { getRandomInt } from './utils';

// Obstacle types with their properties
const OBSTACLE_TYPES = [
  {
    name: 'block',
    width: 30,
    height: 50,
    color: '#EF4444', // Red
  },
  {
    name: 'tall',
    width: 30,
    height: 70,
    color: '#F59E0B', // Orange
  },
  {
    name: 'wide',
    width: 60,
    height: 30,
    color: '#10B981', // Green
  }
];

export const generateObstacle = () => {
  const type = OBSTACLE_TYPES[getRandomInt(0, OBSTACLE_TYPES.length - 1)];
  
  return {
    x: window.innerWidth + 50, // Start off-screen
    y: 0, // Will be calculated during drawing
    width: type.width,
    height: type.height,
    type: type.name,
    color: type.color,
  };
};

export const updateObstacles = (deltaTime: number, gameSpeed: number, obstacles: any[]) => {
  // Update position of each obstacle
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].x -= 300 * deltaTime * gameSpeed;
    
    // Remove obstacles that are off-screen
    if (obstacles[i].x < -obstacles[i].width - 50) {
      obstacles.splice(i, 1);
    }
  }
};

export const drawObstacles = (ctx: CanvasRenderingContext2D, obstacles: any[]) => {
  const groundY = ctx.canvas.height * 0.8;
  
  obstacles.forEach(obstacle => {
    // Calculate Y position (on the ground, minus the height)
    obstacle.y = groundY - obstacle.height;
    
    ctx.save();
    
    // Draw different shapes based on obstacle type
    ctx.fillStyle = obstacle.color;
    
    if (obstacle.type === 'block') {
      // Draw a blockchain-like cube
      const x = obstacle.x;
      const y = obstacle.y;
      const w = obstacle.width;
      const h = obstacle.height;
      
      // Main block
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.fill();
      
      // Add blockchain pattern details
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 2;
      
      // Horizontal lines
      for (let i = 1; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(x, y + (h / 3) * i);
        ctx.lineTo(x + w, y + (h / 3) * i);
        ctx.stroke();
      }
      
    } else if (obstacle.type === 'tall') {
      // Draw a tall data column
      const x = obstacle.x;
      const y = obstacle.y;
      const w = obstacle.width;
      const h = obstacle.height;
      
      // Main column
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.fill();
      
      // Add details - digital pattern
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      
      // Binary-like pattern
      for (let i = 0; i < 5; i++) {
        const segH = h / 10;
        const segY = y + i * 2 * segH;
        ctx.beginPath();
        ctx.rect(x + 5, segY + 5, w - 10, segH);
        ctx.fill();
      }
      
    } else if (obstacle.type === 'wide') {
      // Draw a wide firewall
      const x = obstacle.x;
      const y = obstacle.y;
      const w = obstacle.width;
      const h = obstacle.height;
      
      // Main block
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.fill();
      
      // Add details - firewall pattern
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      
      // Vertical lines
      for (let i = 1; i < 4; i++) {
        ctx.beginPath();
        ctx.rect(x + (w / 4) * i - 2, y + 5, 4, h - 10);
        ctx.fill();
      }
    }
    
    ctx.restore();
  });
};

export const getObstacleBounds = (obstacle: any) => {
  return {
    x: obstacle.x,
    y: obstacle.y,
    width: obstacle.width,
    height: obstacle.height,
  };
};