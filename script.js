// script.js
const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fit the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const width = canvas.width;
const height = canvas.height;

// Define the size of the graph
const graphSize = Math.min(width, height) * 0.6; // 60% of the smaller screen dimension
const graphX = (width - graphSize) / 2; // Center X
const graphY = (height - graphSize) / 2; // Center Y

// Function to calculate y = x^(2/3) + 0.9sin(kx)sqrt(3-x^2)
function calculateY(x, k) {
  if (Math.abs(x) > Math.sqrt(3)) return null;
  const term1 = Math.cbrt(Math.abs(x) ** 2); // x^(2/3)
  const term2 = 0.9 * Math.sin(k * x) * Math.sqrt(3 - x ** 2);
  return term1 + term2;
}

// Animation variables
let k = 0.0; // Start value of k
const kMax = 100.0; // End value of k
const duration = 8000; // Duration in milliseconds
const fps = 60; // Frames per second
const step = (kMax - k) / (duration / 1000 * fps);

// Animation loop
function animate() {
  ctx.clearRect(0, 0, width, height);

  // Set graph bounds
  const xMin = -Math.sqrt(3);
  const xMax = Math.sqrt(3);
  const xRange = xMax - xMin;
  const yMin = -2;
  const yMax = 2;
  const yRange = yMax - yMin;

  // Draw function
  ctx.beginPath();
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;

  for (let i = 0; i <= graphSize; i++) {
    const x = xMin + (i / graphSize) * xRange; // Map pixel to x
    const y = calculateY(x, k);

    if (y !== null) {
      const px = graphX + i; // Adjusted pixel x-coordinate
      const py = graphY + graphSize - ((y - yMin) / yRange) * graphSize; // Adjusted y to fit graph size

      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
  }

  ctx.stroke();

  // Update k
  k += step;

  // Stop animation if k exceeds kMax
  if (k <= kMax) {
    requestAnimationFrame(animate);
  }
}

// Start animation
animate();