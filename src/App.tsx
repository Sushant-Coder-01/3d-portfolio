// App.tsx
import { Canvas } from "@react-three/fiber";
import World from "./components/World";
import { Suspense } from "react";
import { Cloud, ContactShadows, Sky, Html, useProgress, useFBX, useGLTF } from "@react-three/drei";
import { Joystick } from "react-joystick-component";
import type { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";
import { useGameStore } from "./store/playerStore";

useFBX.preload("/standard_walk.fbx");
useGLTF.preload("/sugarcane/scene.gltf")
useGLTF.preload("/dog/scene.gltf")
useGLTF.preload("/dog_puppy/scene.gltf")
useGLTF.preload("/cow/scene.gltf")
useGLTF.preload("/cow2/scene.gltf")
useGLTF.preload("/horse/scene.gltf")
useGLTF.preload("/labrador_dog/scene.gltf")
useGLTF.preload("/rice_plant/scene.gltf")



export function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(135, 206, 235, 0.5)",
          padding: "30px",
          borderRadius: "12px",
          width: "2000px",
          height: "100dvh",
          boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Faint background image */}
        <img
          src="/3d_village.png"
          alt="Village Background"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.15, // faint effect
            zIndex: 0,
          }}
        />

        {/* Foreground loader content */}
        <div
          style={{
            border: "5px solid rgba(0,0,0,0.1)",
            borderLeftColor: "#333",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            animation: "spin 1s linear infinite",
            marginBottom: "15px",
            zIndex: 1,
          }}
        />

        <p
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            margin: 0,
            color: "#111",
            zIndex: 1,
          }}
        >
          Loading Village... {Math.round(progress)}%
        </p>

        <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
      </div>
    </Html>

  );
}



function App() {
  const setCameraAttached = useGameStore((state) => state.setCameraAttached);
  const setPlayerSpeed = useGameStore((state) => state.setPlayerSpeed);
  const cameraAttached = useGameStore((state) => state.cameraAttached);
  const playerSpeed = useGameStore((state) => state.playerSpeed);

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  const handleMove = (event: IJoystickUpdateEvent) => {

    useGameStore.getState().setMoveInput({
      forward: event.direction === "FORWARD",
      back: event.direction === "BACKWARD",
      left: event.direction === "LEFT",
      right: event.direction === "RIGHT",
    });
  };

  const handleStop = () => {
    useGameStore.getState().setMoveInput({
      forward: false,
      back: false,
      left: false,
      right: false,
    });
  };

  return (
    <>
      {/* UI Overlay */}
      <div
        style={{
          position: "absolute",
          zIndex: 100,
          padding: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          background: "rgba(255,255,255,0.7)",
          borderRadius: "6px",
        }}
      >
        <label>
          <input
            type="checkbox"
            checked={cameraAttached}
            onChange={(e) => setCameraAttached(e.target.checked)}
          />{" "}
          Attach Camera to Player
        </label>

        <label style={{ display: "flex", flexDirection: "column" }}>
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

      {isMobile && (
        <div style={{ position: "absolute", bottom: 40, left: 40, zIndex: 100 }}>
          <Joystick
            size={100}
            baseColor="#888"
            stickColor="#555"
            move={handleMove}
            stop={handleStop}
          />
        </div>
      )}



      <Canvas camera={{ position: [0, 10, 20], fov: 40 }} style={{ height: "100dvh" }}>
        <Suspense fallback={<Loader />}>
          {/* Sky with sun */}
          <Sky sunPosition={[50, 40, -20]} turbidity={8} rayleigh={6} mieCoefficient={0.005} mieDirectionalG={0.8} />
          {/* Lights */}
          <directionalLight intensity={2} position={[100, 50, 100]} castShadow />
          <ambientLight intensity={0.3} />

          {/* Ground / Shadows */}
          <ContactShadows position={[0, -1, 0]} opacity={0.6} scale={10} blur={2.5} far={4.5} />

          {/* World */}
          <Suspense fallback={null}>
            <World />
          </Suspense>

          {/* Clouds */}
          <Cloud position={[0, 30, 100]} speed={0.2} opacity={0.4} scale={5} />
          <Cloud position={[30, 35, 80]} speed={0.25} opacity={0.35} scale={4} />
          <Cloud position={[-20, 31, -30]} speed={0.3} opacity={0.45} scale={3} />
          <Cloud position={[15, 33, 40]} speed={0.35} opacity={0.4} scale={4} />
          <Cloud position={[40, 37, -50]} speed={0.25} opacity={0.3} scale={5} />
          <Cloud position={[-40, 30, -70]} speed={0.2} opacity={0.3} scale={7} />
          <Cloud position={[60, 32, -90]} speed={0.3} opacity={0.35} scale={6} />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
