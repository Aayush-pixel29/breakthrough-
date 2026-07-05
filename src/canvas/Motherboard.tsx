import { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Helper interface for traces and data pulses
interface Trace {
  points: THREE.Vector3[];
  width: number;
}

export default function Motherboard() {
  const boardRef = useRef<THREE.Group>(null);
  const mcuMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const pulseMaterialRef = useRef<THREE.MeshBasicMaterial>(null);

  const { pointer } = useThree();

  // Create traces procedurally
  const traces = useMemo<Trace[]>(() => {
    return [
      {
        points: [
          new THREE.Vector3(-1.8, -1.0, 0.06),
          new THREE.Vector3(-0.8, -1.0, 0.06),
          new THREE.Vector3(-0.6, -0.6, 0.06),
          new THREE.Vector3(-0.6, -0.3, 0.06),
        ],
        width: 0.02,
      },
      {
        points: [
          new THREE.Vector3(1.8, 1.2, 0.06),
          new THREE.Vector3(0.8, 1.2, 0.06),
          new THREE.Vector3(0.6, 0.6, 0.06),
          new THREE.Vector3(0.6, 0.3, 0.06),
        ],
        width: 0.02,
      },
      {
        points: [
          new THREE.Vector3(-1.5, 1.0, 0.06),
          new THREE.Vector3(-0.9, 1.0, 0.06),
          new THREE.Vector3(-0.5, 0.5, 0.06),
          new THREE.Vector3(-0.5, 0.3, 0.06),
        ],
        width: 0.015,
      },
      {
        points: [
          new THREE.Vector3(1.5, -1.0, 0.06),
          new THREE.Vector3(0.9, -1.0, 0.06),
          new THREE.Vector3(0.5, -0.5, 0.06),
          new THREE.Vector3(0.5, -0.3, 0.06),
        ],
        width: 0.015,
      },
    ];
  }, []);

  // Data pulse positions running along traces
  const pulseRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    // 1. Mouse tilt (parallax)
    if (boardRef.current) {
      boardRef.current.rotation.x = THREE.MathUtils.lerp(
        boardRef.current.rotation.x,
        -pointer.y * 0.3,
        0.05
      );
      boardRef.current.rotation.y = THREE.MathUtils.lerp(
        boardRef.current.rotation.y,
        pointer.x * 0.3,
        0.05
      );
    }

    // 2. Pulse laser mcu logo glow
    if (mcuMaterialRef.current) {
      const time = state.clock.getElapsedTime();
      mcuMaterialRef.current.emissiveIntensity = 1.0 + Math.sin(time * 3) * 0.5;
    }

    // 3. Move data pulses along traces
    const time = state.clock.getElapsedTime();
    pulseRefs.current.forEach((pulse, index) => {
      if (!pulse) return;
      const trace = traces[index];
      if (!trace) return;

      // Calculate path position
      const speed = 0.8;
      const progress = ((time * speed) + (index * 0.25)) % 1;
      
      // Interpolate along points
      const numSegments = trace.points.length - 1;
      const segmentFloat = progress * numSegments;
      const segmentIndex = Math.min(Math.floor(segmentFloat), numSegments - 1);
      const segmentProgress = segmentFloat - segmentIndex;

      const pStart = trace.points[segmentIndex];
      const pEnd = trace.points[segmentIndex + 1];

      pulse.position.lerpVectors(pStart, pEnd, segmentProgress);
    });
  });

  // Scroll animations
  useEffect(() => {
    if (!boardRef.current) return;

    // Timeline 1: Landing to About
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".landing-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    tl1.to(
      boardRef.current.position,
      {
        x: -2.2,
        y: 0.0,
        z: -0.5,
        ease: "none",
      },
      0
    )
    .to(
      boardRef.current.rotation,
      {
        y: Math.PI / 6,
        z: Math.PI / 12,
        ease: "none",
      },
      0
    )
    .to(
      boardRef.current.scale,
      {
        x: 1.1,
        y: 1.1,
        z: 1.1,
        ease: "none",
      },
      0
    );

    // Timeline 2: About to What I Do
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-section",
        start: "top center",
        end: "bottom top",
        scrub: true,
      },
    });

    // Lay board flatter, keep on left, and face camera more dynamically
    tl2.to(
      boardRef.current.position,
      {
        x: -2.0,
        y: 0.0,
        z: 0.2,
        ease: "none",
      },
      0
    )
    .to(
      boardRef.current.rotation,
      {
        x: -Math.PI / 4,
        y: Math.PI / 6,
        z: Math.PI / 6,
        ease: "none",
      },
      0
    );

    if (pulseMaterialRef.current) {
      const colorTarget = new THREE.Color("#cbb1ff"); // shift colors to pastel violet
      tl2.to(
        pulseMaterialRef.current.color,
        {
          r: colorTarget.r,
          g: colorTarget.g,
          b: colorTarget.b,
          ease: "none",
        },
        0
      );
    }

    // Timeline 3: What I Do to Career
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".whatIDO",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    tl3.to(
      boardRef.current.position,
      {
        y: -6,
        ease: "none",
      },
      0
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <group ref={boardRef} position={[0, 0, 0]} scale={[1, 1, 1]}>
      {/* GLOSSY GREEN PCB BOARD */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[4, 3, 0.08]} />
        <meshPhysicalMaterial
          color="#072013" // deep matte green
          roughness={0.2}
          metalness={0.1}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* GOLD OUTER EDGE BORDER */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.05, 3.05, 0.07]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} wireframe />
      </mesh>

      {/* CENTRAL MICROPROCESSOR (MCU) */}
      <group position={[0, 0, 0.05]}>
        {/* Chip Body */}
        <mesh castShadow>
          <boxGeometry args={[1, 1, 0.12]} />
          <meshStandardMaterial color="#111111" roughness={0.5} metalness={0.6} />
        </mesh>
        {/* Glowing Silkscreen Label */}
        <mesh position={[0, 0, 0.065]}>
          <planeGeometry args={[0.7, 0.7]} />
          <meshStandardMaterial
            ref={mcuMaterialRef}
            color="#00e699"
            emissive="#00e699"
            emissiveIntensity={1.5}
          />
        </mesh>
        {/* Metal Pins */}
        {[-0.45, 0.45].map((x, i) =>
          [-0.4, -0.2, 0, 0.2, 0.4].map((y, j) => (
            <mesh key={`pin-y-${i}-${j}`} position={[x, y, -0.02]}>
              <boxGeometry args={[0.12, 0.06, 0.03]} />
              <meshStandardMaterial color="#e5e7eb" metalness={0.9} roughness={0.1} />
            </mesh>
          ))
        )}
        {[-0.45, 0.45].map((y, i) =>
          [-0.4, -0.2, 0, 0.2, 0.4].map((x, j) => (
            <mesh key={`pin-x-${i}-${j}`} position={[x, y, -0.02]}>
              <boxGeometry args={[0.06, 0.12, 0.03]} />
              <meshStandardMaterial color="#e5e7eb" metalness={0.9} roughness={0.1} />
            </mesh>
          ))
        )}
      </group>

      {/* FLASH STORAGE CHIP */}
      <group position={[-1.2, 0.6, 0.05]}>
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.8, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.5} />
        </mesh>
        {/* Pins */}
        {[-0.25, 0.25].map((x, i) =>
          [-0.3, -0.1, 0.1, 0.3].map((y, j) => (
            <mesh key={`fpin-${i}-${j}`} position={[x, y, -0.02]}>
              <boxGeometry args={[0.1, 0.05, 0.03]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
            </mesh>
          ))
        )}
      </group>

      {/* CAPACITORS (CYLINDERS) */}
      {[
        { pos: [-1.4, -0.8, 0.2], size: [0.18, 0.4] },
        { pos: [-1.1, -0.8, 0.2], size: [0.18, 0.4] },
        { pos: [1.2, -0.8, 0.25], size: [0.22, 0.5] },
        { pos: [1.2, 0.8, 0.2], size: [0.18, 0.4] },
      ].map((cap, i) => (
        <group key={`cap-${i}`} position={[cap.pos[0], cap.pos[1], cap.pos[2]]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[cap.size[0], cap.size[0], cap.size[1], 16]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Violet/Gold Stripe */}
          <mesh position={[0, cap.size[1] / 4, 0]}>
            <cylinderGeometry args={[cap.size[0] + 0.01, cap.size[0] + 0.01, cap.size[1] / 6, 16]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#8b5cf6" : "#eab308"} metalness={0.6} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* RESISTORS & SMD ELEMENTS */}
      {[
        [-0.4, 0.9, 0.05],
        [-0.1, 0.9, 0.05],
        [0.2, 0.9, 0.05],
        [-0.5, -0.8, 0.05],
        [0.8, -0.3, 0.05],
        [0.8, 0.1, 0.05],
      ].map((resPos, i) => (
        <mesh key={`smd-${i}`} position={[resPos[0], resPos[1], resPos[2]]} castShadow>
          <boxGeometry args={[0.25, 0.12, 0.08]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#1e293b" : "#475569"} roughness={0.3} />
        </mesh>
      ))}

      {/* PCB CIRCUITS TRACES */}
      {traces.map((trace, i) => {
        // Build trace geometry from lines
        const curve = new THREE.CatmullRomCurve3(trace.points);
        return (
          <group key={`trace-gp-${i}`}>
            {/* Base Copper Line */}
            <mesh position={[0, 0, 0]}>
              <tubeGeometry args={[curve, 20, trace.width, 8, false]} />
              <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Animated Data Pulse */}
            <mesh
              ref={(el) => {
                if (el) pulseRefs.current[i] = el;
              }}
            >
              <sphereGeometry args={[0.045, 16, 16]} />
              <meshBasicMaterial
                ref={i === 0 ? pulseMaterialRef : undefined}
                color="#00e699"
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
