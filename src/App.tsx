// App.tsx or Home.tsx
import { Canvas } from "@react-three/fiber";
import World from "./components/World";
import { Suspense } from "react";

function App() {
  return (
    <Canvas
      camera={{ position: [0, 10, 20], fov: 40 }}
      style={{ height: "100dvh" }}
    >
      <Suspense>
        <World />
      </Suspense>
    </Canvas>
  );
}

export default App;
