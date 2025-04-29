export const drawBackground = (
  ctx: CanvasRenderingContext2D, 
  width: number, 
  height: number, 
  offset: number
) => {
  // Новый градиент неба
  const skyGradient = ctx.createLinearGradient(0, 0, 0, height);
  skyGradient.addColorStop(0, '#6AB7F5');  // Яркий голубой
  skyGradient.addColorStop(1, '#D9EFFF');  // Светлый голубой
  
  ctx.fillStyle = skyGradient;
  ctx.fillRect(0, 0, width, height);
  
  // Рисуем логотип
  drawLogo(ctx, width);
  
  // Рисуем облака
  drawClouds(ctx, width, height, offset);
  
  // Рисуем сетку для "цифрового мира"
  drawGrid(ctx, width, height, offset);
  
  // Рисуем землю
  const groundY = height * 0.8;
  
  const groundGradient = ctx.createLinearGradient(0, groundY, 0, height);
  groundGradient.addColorStop(0, '#A3D0C4');  // Зеленовато-голубой
  groundGradient.addColorStop(1, '#D7E8E2');  // Светлый зеленовато-голубой
  
  ctx.fillStyle = groundGradient;
  ctx.fillRect(0, groundY, width, height - groundY);
  
  // Линия земли
  ctx.strokeStyle = '#B0C4DE';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  ctx.lineTo(width, groundY);
  ctx.stroke();
};

const drawLogo = (ctx: CanvasRenderingContext2D, width: number) => {
  const logoSize = 60;
  const x = width - logoSize - 20;
  const y = 20;
  
  ctx.save();
  
  // Настройки для рисования
  ctx.strokeStyle = 'rgba(255, 255, 240, 0.8)';
  ctx.lineWidth = 3;
  
  // Рисуем овал
  ctx.beginPath();
  ctx.ellipse(x + logoSize/2, y + logoSize/2, logoSize/2, logoSize/4, 0, 0, Math.PI * 2);
  ctx.stroke();
  
  // Рисуем крест внутри
  // Вертикальная линия
  ctx.beginPath();
  ctx.moveTo(x + logoSize/2, y + logoSize/4);
  ctx.lineTo(x + logoSize/2, y + logoSize * 3/4);
  ctx.stroke();
  
  // Горизонтальная линия
  ctx.beginPath();
  ctx.moveTo(x + logoSize/4, y + logoSize/2);
  ctx.lineTo(x + logoSize * 3/4, y + logoSize/2);
  ctx.stroke();
  
  ctx.restore();
};

const drawClouds = (
  ctx: CanvasRenderingContext2D, 
  width: number, 
  height: number, 
  offset: number
) => {
  const clouds = [
    { color: '#C2E0FF', size: 100 },
    { color: '#F5D7E3', size: 80 },
    { color: '#D7BFFF', size: 120 }
  ];
  
  ctx.save();
  
  clouds.forEach((cloud, i) => {
    const x = ((offset * 0.2) + i * 400) % (width + 400) - 200;
    const y = height * 0.2 + (i * 50);
    
    ctx.beginPath();
    ctx.fillStyle = cloud.color;
    ctx.globalAlpha = 0.4;
    
    // Рисуем облако как группу кругов
    for (let j = 0; j < 3; j++) {
      ctx.arc(
        x + j * (cloud.size * 0.5), 
        y + Math.sin(j) * 20, 
        cloud.size * 0.3, 
        0, 
        Math.PI * 2
      );
    }
    
    ctx.fill();
  });
  
  ctx.restore();
};

const drawGrid = (
  ctx: CanvasRenderingContext2D, 
  width: number, 
  height: number, 
  offset: number
) => {
  const groundY = height * 0.8;
  
  ctx.save();
  
  // Горизонтальные линии
  ctx.strokeStyle = 'rgba(176, 196, 222, 0.2)';  // Светло-голубой с прозрачностью
  ctx.lineWidth = 1;
  
  const horizontalGap = 50;
  for (let y = groundY; y > 0; y -= horizontalGap) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  
  // Вертикальные линии с эффектом параллакса
  const verticalGap = 100;
  for (let x = width - (offset % verticalGap); x >= 0; x -= verticalGap) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, groundY);
    ctx.stroke();
  }
  
  // Эффект "горизонта"
  const horizonGradient = ctx.createLinearGradient(0, groundY - 200, 0, groundY);
  horizonGradient.addColorStop(0, 'rgba(176, 196, 222, 0)');
  horizonGradient.addColorStop(1, 'rgba(176, 196, 222, 0.3)');
  
  ctx.fillStyle = horizonGradient;
  ctx.fillRect(0, groundY - 200, width, 200);
  
  ctx.restore();
};