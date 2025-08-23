import React, { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useFBX, useAnimations } from "@react-three/drei";
import { RigidBody, RapierRigidBody, CapsuleCollider } from "@react-three/rapier";
import * as THREE from "three";

type PlayerProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
};

const Player: React.FC<PlayerProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) => {
  const group = useRef<THREE.Group>(null);
  const bodyRef = useRef<RapierRigidBody>(null);
  const { camera } = useThree();

  // Load model & animations
  const fbx = useFBX("/standard_walk.fbx");
  const { actions, names } = useAnimations(fbx.animations, group);

  const [keys, setKeys] = useState<{ [key: string]: boolean }>({});

  // Keyboard input handlers
  useEffect(() => {
    const down = (e: KeyboardEvent) => setKeys((k) => ({ ...k, [e.key.toLowerCase()]: true }));
    const up = (e: KeyboardEvent) => setKeys((k) => ({ ...k, [e.key.toLowerCase()]: false }));

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // Initialize animation once
  useEffect(() => {
    if (names.length === 0) return;
    const walkName = names.includes("mixamo.com") ? "mixamo.com" : names[0];
    const walkAction = actions[walkName];
    if (walkAction) {
      walkAction.reset().fadeIn(0.2).play();
      walkAction.setLoop(THREE.LoopRepeat, Infinity);
      walkAction.timeScale = 0; // pause initially
    }
  }, [actions, names]);

  const speed = 4;
  const cameraOffset = new THREE.Vector3(0, 2 , 5); // Behind & above player

  // For smooth camera start  
  const initialCameraSet = useRef(false);

// useFrame(() => {
//   if (!bodyRef.current || !group.current) return;

//   // Movement input
//   const forward = keys["w"] || keys["arrowup"];
//   const back = keys["s"] || keys["arrowdown"];
//   const left = keys["a"] || keys["arrowleft"];
//   const right = keys["d"] || keys["arrowright"];

//   const walkAction = actions[names[0]];

//   // --- Get current rotation from body ---
//   const rotationY = group.current.rotation.y;

//   // --- ROTATION with A/D ---
//   let newRotationY = rotationY;
//   if (left) newRotationY += 0.005;   // turn left
//   if (right) newRotationY -= 0.005;  // turn right
//   group.current.rotation.y = newRotationY; // update mesh
//   bodyRef.current.setRotation(
//     { x: 0, y: newRotationY, z: 0, w: 0 }, // quaternion (approx)
//     true
//   );

//   // --- MOVEMENT with W/S ---
//   let moveDir = new THREE.Vector3(0, 0, 0);
//   if (forward) moveDir.z = -1;
//   if (back) moveDir.z = 1;

//   if (moveDir.length() > 0) {
//     moveDir.normalize();

//     // Apply facing rotation (relative to Y rotation of body)
//     moveDir.applyAxisAngle(new THREE.Vector3(0, 1, 0), newRotationY);

//     const currentVel = bodyRef.current.linvel();
//     bodyRef.current.setLinvel(
//       { x: moveDir.x * speed, y: currentVel.y, z: moveDir.z * speed },
//       true
//     );

//     if (walkAction) walkAction.timeScale = 1;
//   } else {
//     const currentVel = bodyRef.current.linvel();
//     bodyRef.current.setLinvel({ x: 0, y: currentVel.y, z: 0 }, true);

//     if (walkAction) walkAction.timeScale = 0;
//   }

//   // --- CAMERA FOLLOW ---
// const translation = bodyRef.current.translation();
// const playerPos = new THREE.Vector3(translation.x, translation.y, translation.z);

// // Rotate the offset so camera stays behind player
// const rotatedOffset = cameraOffset
//   .clone()
//   .applyAxisAngle(new THREE.Vector3(0, 1, 0), newRotationY);

// const targetCamPos = playerPos.clone().add(rotatedOffset);

// // Smoothly move camera
// if (!initialCameraSet.current) {
//   camera.position.copy(targetCamPos);
//   initialCameraSet.current = true;
// } else {
//   camera.position.lerp(targetCamPos, 0.1);
// }

// // 👀 Look slightly ahead of the player instead of at feet
// const lookAtTarget = playerPos
//   .clone()
//   .add(new THREE.Vector3(0, 1.5, 0)) // look at chest/head height
//   .add(new THREE.Vector3(0, 0, -5).applyAxisAngle(new THREE.Vector3(0, 1, 0), newRotationY)); // ahead in facing direction

// camera.lookAt(lookAtTarget);

// });



  // Lock player rotations to prevent tipping
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.lockRotations(true, false);
    }
  }, []);

  return (
    <RigidBody
      ref={bodyRef}
      type="dynamic"
      position={position}
      rotation={rotation}
      colliders={false}
      mass={80}
      linearDamping={0.8}
      angularDamping={1}
    >
      <CapsuleCollider args={[0.9, 0.3]} position={[0, 0.9, 0]} />
      <group ref={group} scale={0.005} dispose={null}>
        <primitive object={fbx} />
      </group>
    </RigidBody>
  );
};

export default Player;
