// Player properties
const player = {
  x: 100,
  y: 0,
  width: 40,
  height: 50,
  jumpVelocity: 0,
  isJumping: false,
  gravity: 1500,
  jumpStrength: 700,
  groundY: 0, // Will be calculated based on canvas height
  animationFrame: 0,
  animationTimer: 0,
};

// Initialize the player jump event listener
let jumpEventInitialized = false;

const initializeJumpEvent = () => {
  if (jumpEventInitialized) return;
  
  document.addEventListener('player-jump', () => {
    if (!player.isJumping) {
      player.jumpVelocity = -player.jumpStrength;
      player.isJumping = true;
    }
  });
  
  jumpEventInitialized = true;
};

export const updatePlayer = (deltaTime: number) => {
  initializeJumpEvent();
  
  // Update animation
  player.animationTimer += deltaTime;
  if (player.animationTimer >= 0.1) {
    player.animationFrame = (player.animationFrame + 1) % 4;
    player.animationTimer = 0;
  }
  
  // Apply gravity and handle jumping
  if (player.isJumping) {
    player.jumpVelocity += player.gravity * deltaTime;
    player.y += player.jumpVelocity * deltaTime;
    
    // Check if player has landed
    if (player.y >= player.groundY) {
      player.y = player.groundY;
      player.isJumping = false;
      player.jumpVelocity = 0;
    }
  }
};

export const drawPlayer = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  // Calculate ground position
  player.groundY = height * 0.8 - player.height;
  
  // If player is not jumping and not positioned correctly, place them on the ground
  if (!player.isJumping && player.y !== player.groundY) {
    player.y = player.groundY;
  }
  
  const x = player.x;
  const y = player.y;
  const w = player.width;
  const h = player.height;
  
  ctx.save();
  
  // Основной цвет тела
  const bodyGradient = ctx.createLinearGradient(x, y, x + w, y + h);
  bodyGradient.addColorStop(0, '#E0E0E0');
  bodyGradient.addColorStop(0.5, '#D3D3D3');
  bodyGradient.addColorStop(1, '#C0C0C0');
  
  // Рисуем голову (немного больше относительно тела)
  const headSize = w * 0.7;
  const headX = x + (w - headSize) / 2;
  const headY = y;
  
  ctx.beginPath();
  ctx.fillStyle = bodyGradient;
  ctx.arc(headX + headSize/2, headY + headSize/2, headSize/2, 0, Math.PI * 2);
  ctx.fill();
  
  // Рисуем глаза
  const eyeSize = headSize * 0.15;
  ctx.fillStyle = '#B0C4DE';
  ctx.beginPath();
  ctx.arc(headX + headSize * 0.35, headY + headSize * 0.4, eyeSize, 0, Math.PI * 2);
  ctx.arc(headX + headSize * 0.65, headY + headSize * 0.4, eyeSize, 0, Math.PI * 2);
  ctx.fill();
  
  // Блики в глазах
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(headX + headSize * 0.35 - eyeSize/3, headY + headSize * 0.4 - eyeSize/3, eyeSize/3, 0, Math.PI * 2);
  ctx.arc(headX + headSize * 0.65 - eyeSize/3, headY + headSize * 0.4 - eyeSize/3, eyeSize/3, 0, Math.PI * 2);
  ctx.fill();
  
  // Рисуем тело
  const bodyWidth = w * 0.6;
  const bodyHeight = h * 0.4;
  const bodyX = x + (w - bodyWidth) / 2;
  const bodyY = y + headSize * 0.8;
  
  ctx.fillStyle = bodyGradient;
  ctx.beginPath();
  ctx.roundRect(bodyX, bodyY, bodyWidth, bodyHeight, 8);
  ctx.fill();
  
  // Рисуем руки
  const armWidth = w * 0.15;
  const armHeight = h * 0.3;
  
  // Анимация рук при беге
  const armSwing = !player.isJumping ? Math.sin(player.animationFrame * Math.PI/2) * 15 : -20;
  
  // Левая рука
  ctx.beginPath();
  ctx.roundRect(
    bodyX - armWidth - 2,
    bodyY + armSwing,
    armWidth,
    armHeight,
    4
  );
  ctx.fill();
  
  // Правая рука
  ctx.beginPath();
  ctx.roundRect(
    bodyX + bodyWidth + 2,
    bodyY - armSwing,
    armWidth,
    armHeight,
    4
  );
  ctx.fill();
  
  // Рисуем ноги с анимацией
  const legWidth = w * 0.2;
  const legHeight = h * 0.3;
  
  if (!player.isJumping) {
    // Анимация бега
    const legPhases = [
      [8, -8],  // Frame 0
      [0, 0],   // Frame 1
      [-8, 8],  // Frame 2
      [0, 0],   // Frame 3
    ];
    
    const [leftOffset, rightOffset] = legPhases[player.animationFrame];
    
    // Левая нога
    ctx.beginPath();
    ctx.roundRect(
      bodyX + bodyWidth * 0.25 + leftOffset,
      bodyY + bodyHeight,
      legWidth,
      legHeight,
      4
    );
    ctx.fill();
    
    // Правая нога
    ctx.beginPath();
    ctx.roundRect(
      bodyX + bodyWidth * 0.55 + rightOffset,
      bodyY + bodyHeight,
      legWidth,
      legHeight,
      4
    );
    ctx.fill();
  } else {
    // Поза прыжка
    ctx.beginPath();
    ctx.roundRect(
      bodyX + bodyWidth * 0.25,
      bodyY + bodyHeight - 5,
      legWidth,
      legHeight,
      4
    );
    ctx.roundRect(
      bodyX + bodyWidth * 0.55,
      bodyY + bodyHeight - 5,
      legWidth,
      legHeight,
      4
    );
    ctx.fill();
  }
  
  ctx.restore();
};

export const getPlayerBounds = () => {
  // Return a slightly smaller collision box for better gameplay feel
  return {
    x: player.x + 5,
    y: player.y + 5,
    width: player.width - 10,
    height: player.height - 10,
  };
};