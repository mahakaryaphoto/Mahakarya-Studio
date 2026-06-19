import { CANVAS, SLOTS } from "./frames";

function loadImage(src) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
}

// menggambar foto agar mengisi slot tanpa gepeng (seperti object-fit: cover)
function drawCover(ctx, img, slot, mirror = true) {
  const { x, y, w, h } = slot;
  const imgRatio = img.width / img.height;
  const slotRatio = w / h;
  let sx, sy, sw, sh;
  if (imgRatio > slotRatio) {
    sh = img.height;
    sw = sh * slotRatio;
    sx = (img.width - sw) / 2;
    sy = 0;
  } else {
    sw = img.width;
    sh = sw / slotRatio;
    sx = 0;
    sy = (img.height - sh) / 2;
  }
  ctx.save();
  if (mirror) {
    // karena preview pakai efek cermin, balik lagi agar konsisten
    ctx.translate(x + w, y);
    ctx.scale(-1, 1);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
  } else {
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  }
  ctx.restore();
}

export async function buildStrip({ photos, frameColor, overlay }) {
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS.w;
  canvas.height = CANVAS.h;
  const ctx = canvas.getContext("2d");

  // 1. warna dasar frame
  ctx.fillStyle = frameColor || "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. tempel 2 foto ke slot
  for (let i = 0; i < SLOTS.length; i++) {
    const img = await loadImage(photos[i]);
    drawCover(ctx, img, SLOTS[i]);
  }

  // 3. (opsional) tempel frame PNG di atas
  if (overlay) {
    const frameImg = await loadImage(overlay);
    ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
  }

  // 4. nama studio di bawah
  ctx.fillStyle = frameColor === "#1c1c1c" ? "#fff" : "#333";
  ctx.font = "bold 48px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Mahakarya Studio", canvas.width / 2, 1740);

  return canvas;
}