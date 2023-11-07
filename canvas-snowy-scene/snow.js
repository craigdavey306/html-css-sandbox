window.onload = () => {
  const canvas = document.getElementById('sky');
  const ctx = canvas.getContext('2d');

  // set canvas dimensions
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;

  const maxFlakes = 200;
  const flakes = Array.from(Array(maxFlakes), () => {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 5 + 2,
      d: Math.random() + 1, // flake density
    };
  });

  function drawFlakes() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'white';
    ctx.beginPath();

    for (let flake of flakes) {
      console.log(flake);
      ctx.moveTo(flake.x, flake.y);
      ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2, true);
    }

    ctx.fill();
    moveFlakes();
  }

  // animate flakes
  let angle = 0;

  function moveFlakes() {
    angle += 0.01;

    for (let i = 0; i < maxFlakes; i++) {
      let flake = flakes[i];

      // update the X and Y coordinates for each snowflake
      flake.y += Math.pow(flake.d, 2) + 1;
      flake.x += Math.sin(angle) * 2;

      // reset the snowflake to the top when it reaches the bottom
      if (flake.y > height) {
        flakes[i] = { ...flake, x: Math.random() * width, y: 0 };
      }
    }
  }

  setInterval(drawFlakes, 25);
};
