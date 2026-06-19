import { useEffect, useRef, useState } from "react";
import { FRAMES } from "../lib/frames";
import { buildStrip } from "../lib/composite";

const COLORS = ["#ffffff", "#f3ead7", "#f7d9e3", "#1c1c1c"];

export default function EditScreen({ session, onChange, onNext }) {
  const canvasBoxRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const frame = FRAMES.find((f) => f.id === session.frameId);

  // bangun ulang pratinjau setiap warna berubah
  useEffect(() => {
    let alive = true;
    buildStrip({
      photos: session.selected,
      frameColor: session.frameColor,
      overlay: frame?.overlay,
    }).then((canvas) => {
      if (alive) setPreview(canvas.toDataURL("image/jpeg", 0.9));
    });
    return () => (alive = false);
  }, [session.selected, session.frameColor, frame]);

  return (
    <>
      <h1>Atur tampilan</h1>
      {preview && (
        <img
          src={preview}
          alt="pratinjau"
          style={{ width: "60%", margin: "0 auto", borderRadius: 8 }}
        />
      )}
      <p style={{ textAlign: "center" }}>Warna frame:</p>
      <div className="grid">
        {COLORS.map((c) => (
          <button
            key={c}
            style={{ background: c, color: c === "#1c1c1c" ? "#fff" : "#222" }}
            onClick={() => onChange({ frameColor: c })}
          >
            {session.frameColor === c ? "✓" : ""}
          </button>
        ))}
      </div>
      <button onClick={onNext}>Selesai</button>
    </>
  );
}