import { Canvas } from "@react-three/fiber";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <Canvas
        style={{ width: "full", height: "100dvh", backgroundColor: "black" }}
      ></Canvas>
    </React.Fragment>
  );
}

export default App;
