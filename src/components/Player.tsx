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
  const cameraOffset = new THREE.Vector3(0, 2, 5); // Behind & above player

  // For smooth camera start
  const initialCameraSet = useRef(false);

  useFrame(() => {
    if (!bodyRef.current || !group.current) return;

    // Movement input
    const forward = keys["w"] || keys["arrowup"];
    const back = keys["s"] || keys["arrowdown"];
    const left = keys["a"] || keys["arrowleft"];
    const right = keys["d"] || keys["arrowright"];

    // Local movement vector before rotation
    const localMove = new THREE.Vector3();
    if (forward) localMove.z -= 1;
    if (back) localMove.z += 1;
    if (left) localMove.x -= 1;
    if (right) localMove.x += 1;

    const walkAction = actions[names[0]];

    if (localMove.length() > 0) {
      localMove.normalize();

      // Convert local movement to world movement based on player's current rotation
      // Note: group.current.rotation.y is the player's facing angle
      const moveDirWorld = localMove.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), group.current.rotation.y);

      // Rotate player to face movement direction smoothly (optional: lerp rotation)
      const targetAngle = Math.atan2(moveDirWorld.x, moveDirWorld.z);
      // Smooth rotation:
      const currentY = group.current.rotation.y;
      const lerpFactor = 0.2;
      group.current.rotation.y = THREE.MathUtils.lerp(currentY, targetAngle, lerpFactor);

      // Move physics body (preserve vertical velocity)
      const currentVel = bodyRef.current.linvel();
      bodyRef.current.setLinvel(
        { x: moveDirWorld.x * speed, y: currentVel.y, z: moveDirWorld.z * speed },
        true
      );

      if (walkAction) walkAction.timeScale = 1; // play animation
    } else {
      // No input: stop horizontal movement, preserve vertical velocity
      const currentVel = bodyRef.current.linvel();
      bodyRef.current.setLinvel({ x: 0, y: currentVel.y, z: 0 }, true);

      if (walkAction) walkAction.timeScale = 0; // pause animation
    }

    // Get player position
    const translation = bodyRef.current.translation();
    const playerPos = new THREE.Vector3(translation.x, translation.y, translation.z);

    // Calculate camera target position: offset behind player (based on current player rotation)
    const rotatedOffset = cameraOffset.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), group.current.rotation.y);
    const targetCamPos = playerPos.clone().add(rotatedOffset);

    // Smoothly move camera position
    if (!initialCameraSet.current) {
      camera.position.copy(targetCamPos);
      initialCameraSet.current = true;
    } else {
      camera.position.lerp(targetCamPos, 0.1);
    }

    // Smoothly rotate camera to look at player (using quaternions for smooth rotation)
    const lookAtMatrix = new THREE.Matrix4().lookAt(camera.position, playerPos, new THREE.Vector3(0, 1, 0));
    const targetQuat = new THREE.Quaternion().setFromRotationMatrix(lookAtMatrix);
    camera.quaternion.slerp(targetQuat, 0.1);
  });

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
