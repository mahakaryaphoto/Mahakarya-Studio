import { useState } from "react";
import StartScreen from "./components/StartScreen";
import PeopleSelect from "./components/PeopleSelect";
import FrameSelect from "./components/FrameSelect";
import CameraCapture from "./components/CameraCapture";
import PhotoSelect from "./components/PhotoSelect";
import EditScreen from "./components/EditScreen";
import ResultScreen from "./components/ResultScreen";
import "./App.css";

const emptySession = {
  people: 1,
  frameId: null,
  shots: [],        // semua hasil jepretan
  selected: [],     // 2 foto terpilih
  frameColor: "#ffffff",
};

export default function App() {
  const [step, setStep] = useState("start");
  const [session, setSession] = useState(emptySession);

  // helper agar tiap layar mudah meng-update sebagian data
  const update = (patch) => setSession((s) => ({ ...s, ...patch }));

  const reset = () => {
    setSession(emptySession);
    setStep("start");
  };

  return (
    <div className="app">
      {step === "start" && <StartScreen onNext={() => setStep("people")} />}

      {step === "people" && (
        <PeopleSelect
          value={session.people}
          onChange={(people) => update({ people })}
          onNext={() => setStep("frame")}
        />
      )}

      {step === "frame" && (
        <FrameSelect
          value={session.frameId}
          onChange={(frameId) => update({ frameId })}
          onNext={() => setStep("camera")}
        />
      )}

      {step === "camera" && (
        <CameraCapture
          onDone={(shots) => {
            update({ shots });
            setStep("select");
          }}
        />
      )}

      {step === "select" && (
        <PhotoSelect
          shots={session.shots}
          onDone={(selected) => {
            update({ selected });
            setStep("edit");
          }}
        />
      )}

      {step === "edit" && (
        <EditScreen
          session={session}
          onChange={update}
          onNext={() => setStep("result")}
        />
      )}

      {step === "result" && (
        <ResultScreen session={session} onRestart={reset} />
      )}
    </div>
  );
}