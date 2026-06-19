import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { FRAMES } from "../lib/frames";
import { buildStrip } from "../lib/composite";
import { supabase } from "../lib/supabase";

export default function ResultScreen({ session, onRestart }) {
  const [imgUrl, setImgUrl] = useState(null); // pratinjau lokal
  const [qr, setQr] = useState(null);
  const [status, setStatus] = useState("Menyiapkan...");
  const canvasRef = useRef(null);

  const frame = FRAMES.find((f) => f.id === session.frameId);

  useEffect(() => {
    (async () => {
      // 1. susun strip final
      const canvas = await buildStrip({
        photos: session.selected,
        frameColor: session.frameColor,
        overlay: frame?.overlay,
      });
      canvasRef.current = canvas;
      setImgUrl(canvas.toDataURL("image/jpeg", 0.95));

      // 2. upload ke Supabase
      setStatus("Mengunggah...");
      const blob = await new Promise((r) =>
        canvas.toBlob(r, "image/jpeg", 0.95)
      );
      const filename = `mahakarya_${Date.now()}.jpg`;
      const { error } = await supabase.storage
        .from("results")
        .upload(filename, blob, { contentType: "image/jpeg" });

      if (error) {
        setStatus("Gagal upload: " + error.message);
        return;
      }

      // 3. ambil URL publik & buat QR
      const { data } = supabase.storage.from("results").getPublicUrl(filename);
      const qrImg = await QRCode.toDataURL(data.publicUrl, { width: 280 });
      setQr(qrImg);
      setStatus("Selesai! Scan QR untuk download.");
    })();
  }, []);

  function printStrip() {
    const w = window.open("");
    w.document.write(`
      <style>
        @page { size: 4in 6in; margin: 0; }
        body { margin: 0; }
        img { width: 4in; height: 6in; object-fit: contain; }
      </style>
      <img src="${imgUrl}" onload="window.print();window.close()" />
    `);
  }

  return (
    <>
      <h1>Hasilmu</h1>
      {imgUrl && (
        <img
          src={imgUrl}
          alt="hasil"
          style={{ width: "55%", margin: "0 auto", borderRadius: 8 }}
        />
      )}
      <p style={{ textAlign: "center" }}>{status}</p>
      {qr && (
        <img src={qr} alt="QR" style={{ width: 160, margin: "0 auto" }} />
      )}
      <button onClick={printStrip} disabled={!imgUrl}>
        🖨️ Cetak
      </button>
      <button className="secondary" onClick={onRestart}>
        Sesi baru
      </button>
    </>
  );
}