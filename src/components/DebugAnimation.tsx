import { useFBX } from "@react-three/drei";
import { useEffect } from "react";

export default function DebugAnimations() {
  const { animations } = useFBX("/standard_walk.fbx");
  // console.log(animations)
  useEffect(() => {
    // console.log(
    //   animations
    // );
  }, [animations]);

  return null;
}
