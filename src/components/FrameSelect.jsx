import { FRAMES } from "../lib/frames";

export default function FrameSelect({ value, onChange, onNext }) {
  return (
    <>
      <h1>Pilih Frame</h1>
      <div className="grid">
        {FRAMES.map((f) => (
          <div
            key={f.id}
            className={"card" + (value === f.id ? " active" : "")}
            onClick={() => onChange(f.id)}
          >
            <div
              style={{
                height: 120,
                background: f.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: f.color === "#1c1c1c" ? "#fff" : "#333",
              }}
            >
              {f.name}
            </div>
          </div>
        ))}
      </div>
      <button onClick={onNext} disabled={!value}>
        Lanjut
      </button>
    </>
  );
}