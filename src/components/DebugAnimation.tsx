import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export default function DebugAnimations() {
  const { animations } = useGLTF("/standing_man/scene.gltf");
  console.log(animations)
  useEffect(() => {
    console.log(
      animations
    );
  }, [animations]);

  return null;
}
