import React, { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

type PlayerProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
};

const Player: React.FC<PlayerProps> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  const { scene, animations } = useGLTF("/standing_man/scene.gltf");
  const { actions } = useAnimations(animations, scene);
  animations[0].duration = 1;
  // Group for movement (keep skeleton intact)
  const groupRef = useRef<THREE.Group>(null!);
  const orbitRef = useRef<any>(null);
  const { camera } = useThree();

  const [keys, setKeys] = useState({ w: false, s: false, a: false, d: false });

  // Start animation once
  useEffect(() => {
    const walkAction = actions["Take 001"];
    if (walkAction) {
      walkAction.reset().fadeIn(0.2).play();
      walkAction.setLoop(THREE.LoopRepeat, Infinity); // Loop animation indefinitely
      walkAction.timeScale = 1; // Set a normal speed initially
      walkAction.setEffectiveTimeScale(1); // Ensure effective speed is applied
      walkAction.time = 2.2; // Skip the first part of the animation (start after the slow part)
    }
  }, [actions]);

  // Keyboard handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() in keys) {
        setKeys((k) => ({ ...k, [e.key.toLowerCase()]: true }));
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() in keys) {
        setKeys((k) => ({ ...k, [e.key.toLowerCase()]: false }));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const player = groupRef.current;

    const moveSpeed = 4;
    const rotateSpeed = 2;
    let isMoving = false;

    // Rotate player
    if (keys.a) {
      player.rotation.y += rotateSpeed * delta;
      isMoving = true;
    }
    if (keys.d) {
      player.rotation.y -= rotateSpeed * delta;
      isMoving = true;
    }

    // Move player forward/back
    const forward = new THREE.Vector3(0, 0, 1).applyEuler(player.rotation);
    if (keys.w) {
      player.position.addScaledVector(forward, moveSpeed * delta);
      isMoving = true;
    }
    if (keys.s) {
      player.position.addScaledVector(forward, -moveSpeed * delta);
      isMoving = true;
    }

    // Animate walking
    const walkAction = actions["Take 001"];
    if (walkAction) {
      if (isMoving) {
        walkAction.timeScale = 1; // Play animation normally when moving
        walkAction.time = 0.5; // Continue from the mid-point, avoiding the slow start
      } else {
        walkAction.timeScale = 0; // Freeze animation when idle
      }
    }

    // Fix root motion: prevent translation
    const rootBone = scene.getObjectByName("mixamorigHips"); // root bone name may vary
    if (rootBone) {
      rootBone.position.set(0, rootBone.position.y, 0); // lock X & Z to 0
    }

    // Camera follow
    if (orbitRef.current) {
      orbitRef.current.target.copy(player.position);
    }

    if (isMoving) {
      if (orbitRef.current) orbitRef.current.enabled = false;
      const offset = new THREE.Vector3(0, 1.2, -5).applyEuler(player.rotation);
      const targetPos = player.position.clone().add(offset);
      camera.position.lerp(targetPos, 0.1);
      camera.lookAt(player.position);
    } else {
      if (orbitRef.current) orbitRef.current.enabled = true;
    }
  });

  return (
    <>
      <group ref={groupRef} scale={0.5} position={position} rotation={rotation}>
        <primitive object={scene} />
      </group>
      <OrbitControls ref={orbitRef} enablePan enableZoom enableRotate />
    </>
  );
};

export default Player;
