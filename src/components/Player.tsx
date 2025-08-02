import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export default function Player() {
  const { scene, animations } = useGLTF("/players/result.gltf");
  const { actions } = useAnimations(animations, scene);

  const playerRef = useRef<THREE.Object3D>(null!);
  const { camera } = useThree();

  const [keys, setKeys] = useState({ w: false, s: false, a: false, d: false });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() in keys)
        setKeys((k) => ({ ...k, [e.key.toLowerCase()]: true }));
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() in keys)
        setKeys((k) => ({ ...k, [e.key.toLowerCase()]: false }));
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // useFrame((_, delta) => {
  //   const moveSpeed = 4;
  //   const rotateSpeed = 2;

  //   if (!playerRef.current) return;

  //   let moving = false;
  //   const player = playerRef.current;

  //   if (keys.a) {
  //     player.rotation.y += rotateSpeed * delta;
  //   }
  //   if (keys.d) {
  //     player.rotation.y -= rotateSpeed * delta;
  //   }

  //   const forward = new THREE.Vector3(0, 0, 1).applyEuler(player.rotation);
  //   if (keys.w) {
  //     player.position.addScaledVector(forward, moveSpeed * delta);
  //     moving = true;
  //   }
  //   if (keys.s) {
  //     player.position.addScaledVector(forward, -moveSpeed * delta);
  //     moving = true;
  //   }

  //   if (moving) {
  //     actions["Walk"]?.fadeIn(0.2).play();
  //     actions["Idle"]?.fadeOut(0.2);
  //   } else {
  //     actions["Walk"]?.fadeOut(0.2);
  //     actions["Idle"]?.fadeIn(0.2).play();
  //   }

  //   const playerPos = player.position;
  //   const offset = new THREE.Vector3(0, 1.2, -5);

  //   const cameraOffset = offset.clone().applyEuler(player.rotation);

  //   camera.position.lerp(playerPos.clone().add(cameraOffset), 0.1);
  //   camera.lookAt(playerPos);
  // });

  return <primitive ref={playerRef} object={scene} scale={0.003} />;
}
