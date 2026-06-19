import { useEffect, useRef, useState } from "react";

const FILTER = "brightness(1.05) contrast(1.02) saturate(0.95)";
const TOTAL_SHOTS = 6;

export default function CameraCapture({ onDone }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [count, setCount] = useState(null); // angka hitung mundur
  const [shots, setShots] = useState([]);
  const [running, setRunning] = useState(false);

  // nyalakan kamera saat layar muncul, matikan saat keluar
  useEffect(() => {
    let active = true;
    navigator.mediaDevices
      .getUserMedia({ video: { width: 1280, height: 720 }, audio: false })
      .then((stream) => {
        if (!active) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch((e) => alert("Tidak bisa akses kamera: " + e.message));

    return () => {
      active = false;
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  function snap() {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.filter = FILTER; // filter ikut tercetak di hasil
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.95);
  }

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async function startSession() {
    setRunning(true);
    const taken = [];
    for (let i = 0; i < TOTAL_SHOTS; i++) {
      for (let c = 3; c >= 1; c--) {
        setCount(c);
        await sleep(1000);
      }
      setCount(null);
      taken.push(snap());
      setShots([...taken]);
      await sleep(600); // jeda antar jepretan
    }
    setRunning(false);
    onDone(taken);
  }

  return (
    <>
      <h1>Bersiap!</h1>
      <div style={{ position: "relative" }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: "100%",
            borderRadius: 16,
            transform: "scaleX(-1)", // efek cermin agar terasa natural
            filter: FILTER,
          }}
        />
        {count && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 120,
              color: "#fff",
              textShadow: "0 2px 12px rgba(0,0,0,.6)",
            }}
          >
            {count}
          </div>
        )}
      </div>

      <p style={{ textAlign: "center" }}>
        Foto {shots.length} / {TOTAL_SHOTS}
      </p>

      {!running && (
        <button onClick={startSession}>Mulai jepret</button>
      )}
    </>
  );
}