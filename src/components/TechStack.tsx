import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";

const skills = [
  { name: "C++", color: "#f34b7d", size: 1.1 },
  { name: "Python", color: "#3572A5", size: 1.2 },
  { name: "Embedded C", color: "#00e699", size: 1.3 },
  { name: "PyTorch", color: "#ee4c2c", size: 1.1 },
  { name: "OpenCV", color: "#5c3ab6", size: 1.1 },
  { name: "KiCAD", color: "#1a5fb4", size: 1.0 },
  { name: "SolidWorks", color: "#e32626", size: 1.1 },
  { name: "YOLOv8", color: "#e1b12c", size: 1.0 },
  { name: "Three.js", color: "#444444", size: 1.2 },
  { name: "React", color: "#61dafb", size: 1.1 },
  { name: "Linux", color: "#333333", size: 1.0 },
  { name: "TensorFlow", color: "#ff6f00", size: 1.1 },
];

const bubblesData = [...skills, ...skills].map((skill, index) => ({
  ...skill,
  id: index,
  initialPos: new THREE.Vector3(
    THREE.MathUtils.randFloatSpread(10),
    THREE.MathUtils.randFloatSpread(10),
    THREE.MathUtils.randFloatSpread(10)
  ),
}));

function BubbleCloud() {
  const { pointer, viewport } = useThree();
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const velocities = useMemo(() => bubblesData.map(() => new THREE.Vector3()), []);

  useFrame(() => {
    const mouse3D = new THREE.Vector3(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      0
    );

    bubblesData.forEach((bubble, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;

      const pos = mesh.position;
      const vel = velocities[i];

      // 1. Force towards center
      const gravity = new THREE.Vector3(0, 0, 0).sub(pos).multiplyScalar(0.001);
      vel.add(gravity);

      // 2. Repulsion from mouse pointer
      const distToMouse = pos.distanceTo(mouse3D);
      if (distToMouse < 4) {
        const dir = new THREE.Vector3().subVectors(pos, mouse3D).normalize();
        const push = dir.multiplyScalar((4 - distToMouse) * 0.08);
        vel.add(push);
      }

      // 3. Collision avoidance with other bubbles
      bubblesData.forEach((other, j) => {
        if (i === j) return;
        const otherMesh = meshRefs.current[j];
        if (!otherMesh) return;

        const otherPos = otherMesh.position;
        const dist = pos.distanceTo(otherPos);
        const minDist = bubble.size + other.size;

        if (dist < minDist) {
          const dir = new THREE.Vector3().subVectors(pos, otherPos).normalize();
          const overlap = minDist - dist;
          const force = dir.multiplyScalar(overlap * 0.15);
          vel.add(force);
        }
      });

      // Apply velocity & damping (friction)
      vel.multiplyScalar(0.92);
      pos.add(vel);
    });
  });

  return (
    <group>
      {bubblesData.map((bubble, i) => (
        <mesh
          key={bubble.id}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          position={bubble.initialPos}
        >
          <sphereGeometry args={[bubble.size, 32, 32]} />
          <meshPhysicalMaterial
            color={bubble.color}
            emissive={bubble.color}
            emissiveIntensity={0.2}
            roughness={0.1}
            metalness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            transmission={0.4}
            thickness={0.5}
          />
          <Html distanceFactor={12} position={[0, 0, 0]} center pointerEvents="none">
            <div
              style={{
                color: "#ffffff",
                fontSize: "12px",
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: "bold",
                textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                whiteSpace: "nowrap",
                background: "rgba(10,10,10,0.75)",
                padding: "3px 8px",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {bubble.name}
            </div>
          </Html>
        </mesh>
      ))}
    </group>
  );
}

const TechStack = () => {
  return (
    <div className="techstack" id="techstack">
      <h2>My Techstack</h2>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        <BubbleCloud />
      </Canvas>
    </div>
  );
};

export default TechStack;
