import { throttle } from "lodash";

export const renderPredictions = (predictions, ctx) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.width);

  // Fonts
  const font = "16px sans-serif";
  ctx.font = font;
  ctx.textBaseLine = "top";

  predictions.forEach((prediciton) => {
    const [x, y, width, height] = prediciton["bbox"];
    const isPerson = prediciton.class === "person";

    // bounding box
    ctx.strokeStyle = isPerson ? "#FF0000" : "#00FFFF";
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, width, height);

    // fill the color
    ctx.fillStyle = `rgba(255, 0, 0, ${isPerson ? 0.2 : 0})`;
    const textWidth = ctx.measureText(prediciton.class).width;
    const textHeight = parseInt(font, 10); // base 10
    ctx.fillRect(x, y, textWidth + 4, textHeight + 4);

    ctx.fillStyle = "#000000";
    ctx.fillText(prediciton.class, x, y);

    if (isPerson) {
      playAudio();
    }
  });
};

const playAudio = () =>
  throttle(() => {
    const audio = new Audio("/pols-aagyi-pols.mp3");
    audio.play();
  }, 2000);
