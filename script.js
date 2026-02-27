// Canvas setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

// Player setup
const player = { x: 300, y: 350, width: 50, height: 50 };

// Targets setup
let targets = [];
let score = 0;

// Generate targets
function spawnTarget() {
  let x = Math.random() * (canvas.width - 30);
  let y = Math.random() * 150; // top part
  let emoji = ["🎯","💎","⭐","💖"][Math.floor(Math.random()*4)];
  targets.push({x, y, emoji, radius: 20});
}

// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Targets
  targets.forEach(t => {
    ctx.font = "30px Arial";
    ctx.fillText(t.emoji, t.x, t.y);
    t.y += 2; // targets falling
  });

  // Remove off-screen targets
  targets = targets.filter(t => t.y < canvas.height + 30);

  requestAnimationFrame(draw);
}

draw();

// Spawn new target every 1.5 seconds
setInterval(spawnTarget, 1500);

// Shooting detection (click)
canvas.addEventListener("click", e => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  targets.forEach((t, index) => {
    let dx = t.x - mouseX;
    let dy = t.y - mouseY;
    if (Math.sqrt(dx*dx + dy*dy) < t.radius) {
      score += 10;
      document.getElementById("scoreBoard").innerText = "Score: " + score;
      targets.splice(index, 1); // remove hit target
    }
  });
});
