// Ukuran kanvas 4R @ 300 DPI = 1200 x 1800 px (potret)
// 2 slot foto disusun vertikal, sisakan bawah untuk nama studio
export const CANVAS = { w: 1200, h: 1800 };

export const SLOTS = [
  { x: 90, y: 90, w: 1020, h: 760 },   // slot foto 1
  { x: 90, y: 900, w: 1020, h: 760 },  // slot foto 2
];

export const FRAMES = [
  { id: "classic", name: "Classic", color: "#ffffff", overlay: null },
  { id: "cream", name: "Cream", color: "#f3ead7", overlay: null },
  { id: "pink", name: "Pink", color: "#f7d9e3", overlay: null },
  { id: "black", name: "Black", color: "#1c1c1c", overlay: null },
  // Contoh frame ber-PNG (taruh file di folder public/frames/):
  // { id: "kpop_01", name: "Idol A", color: "#fff", overlay: "/frames/kpop_01.png" },
];