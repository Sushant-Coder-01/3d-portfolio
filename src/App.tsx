// App.tsx or Home.tsx
import { Canvas } from "@react-three/fiber";
import World from "./components/World";
import { Suspense, useState } from "react";
import { Cloud, ContactShadows, Sky } from "@react-three/drei";
import "./app.css"

function App() {
  const [cameraAttached, setCameraAttached] = useState(true);
  const [playerSpeed, setPlayerSpeed] = useState(5);
  return (
    <>
      {/* UI Overlay */}
      <div className="ui-panel" style={{ position: "absolute", zIndex: 100, padding: "2px" }}>
        <label>
          <input
            type="checkbox"
            checked={cameraAttached}
            onChange={(e) => setCameraAttached(e.target.checked)}
          />{" "}
          Attach Camera to Player
        </label>

        <label>
          Player Speed: {playerSpeed.toFixed(1)}
          <input
            type="range"
            min={1}
            max={10}
            step={0.1}
            value={playerSpeed}
            onChange={(e) => setPlayerSpeed(parseFloat(e.target.value))}
          />
        </label>
      </div>
      <Canvas
        camera={{ position: [0, 10, 20], fov: 40 }}
        style={{ height: "100dvh", background: "skyblue" }}
      >
        <Suspense fallback={null}>
          {/* Sky with sun */}
          <Sky
            sunPosition={[50, 40, -20]} // Sun position in the sky
            turbidity={8}              // haziness
            rayleigh={6}               // blue scattering
            mieCoefficient={0.005}     // atmospheric dust
            mieDirectionalG={0.8}      // glow around sun
          />

          {/* A subtle Sun Light */}
          <directionalLight
            intensity={2}
            position={[100, 50, 100]}
            castShadow
          />
          <ambientLight intensity={0.3} />

          <ContactShadows
            position={[0, -1, 0]}
            opacity={0.6}
            scale={10}
            blur={2.5}
            far={4.5}
          />

          {/* Ground / World */}
          <World cameraAttached={cameraAttached} playerSpeed={playerSpeed} />

          {/* Cloud layer 1 - distant, large & soft */}
          <Cloud position={[0, 30, 100]} speed={0.2} opacity={0.4} scale={5} />
          <Cloud position={[30, 35, 80]} speed={0.25} opacity={0.35} scale={4} />

          {/* Cloud layer 2 - closer, smaller */}
          <Cloud position={[-20, 31, -30]} speed={0.3} opacity={0.45} scale={3} />
          <Cloud position={[15, 33, 40]} speed={0.35} opacity={0.4} scale={4} />
          <Cloud position={[40, 37, -50]} speed={0.25} opacity={0.3} scale={5} />

          {/* Cloud layer 3 - scattered, more depth */}
          <Cloud position={[-40, 30, -70]} speed={0.2} opacity={0.3} scale={7} />
          <Cloud position={[60, 32, -90]} speed={0.3} opacity={0.35} scale={6} />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
