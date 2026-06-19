export default function StartScreen({ onNext }) {
  return (
    <>
      <h1>Mahakarya Studio</h1>
      <p style={{ textAlign: "center", color: "#666" }}>
        Sentuh untuk mulai sesi foto kamu
      </p>
      <button onClick={onNext}>Mulai 📸</button>
    </>
  );
}