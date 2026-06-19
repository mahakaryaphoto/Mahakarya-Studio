import { useState } from "react";

export default function PhotoSelect({ shots, onDone }) {
  const [picked, setPicked] = useState([]);

  function toggle(index) {
    setPicked((prev) => {
      if (prev.includes(index)) return prev.filter((i) => i !== index);
      if (prev.length >= 2) return prev; // maksimal 2
      return [...prev, index];
    });
  }

  return (
    <>
      <h1>Pilih 2 foto</h1>
      <div className="grid">
        {shots.map((src, i) => (
          <div
            key={i}
            className={"card" + (picked.includes(i) ? " active" : "")}
            onClick={() => toggle(i)}
          >
            <img src={src} alt={"foto " + (i + 1)} />
          </div>
        ))}
      </div>
      <button
        disabled={picked.length !== 2}
        onClick={() => onDone(picked.map((i) => shots[i]))}
      >
        Lanjut ({picked.length}/2)
      </button>
    </>
  );
}