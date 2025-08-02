import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export default function DebugAnimations() {
  const { animations } = useGLTF("/players/result.gltf");

  useEffect(() => {
    console.log(
      "Animation Clips:",
      animations.map((a) => a.name)
    );
  }, [animations]);

  return null;
}
