import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type LakeProps = {
    position?: [number, number, number];
    width?: number;
    height?: number;
    waveStrength?: number;
};

export default function Lake({
    position = [0, 0, 0],
    width = 20,
    height = 20,
    waveStrength = 0.1,
}: LakeProps) {
    const lakeRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (lakeRef.current) {
            const t = clock.getElapsedTime();
            // update uniform for animation
            (lakeRef.current.material as THREE.ShaderMaterial).uniforms.time.value = t;
        }
    });

    return (
        <mesh ref={lakeRef} rotation={[-Math.PI / 2, 0, 0]} position={position}>
            <planeGeometry args={[width, height, 128, 128]} />
            <shaderMaterial
                attach="material"
                uniforms={{
                    time: { value: 0 },
                    waveStrength: { value: waveStrength },
                }}
                vertexShader={`
          uniform float time;
          uniform float waveStrength;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin(pos.x * 2.0 + time * 2.0) * waveStrength;
            pos.z += cos(pos.y * 2.0 + time * 1.5) * waveStrength;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
                fragmentShader={`
          varying vec2 vUv;
          void main() {
            vec3 color = mix(vec3(0.1, 0.3, 0.6), vec3(0.2, 0.5, 0.8), vUv.y);
            gl_FragColor = vec4(color, 0.9);
          }
        `}
            />
        </mesh>
    );
}
