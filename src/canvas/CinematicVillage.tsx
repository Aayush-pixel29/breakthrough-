import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useGameStore } from "../store/useGameStore";

// Pre-defined camera shots for the tour
const tourStops: Record<string, { camPos: [number, number, number], lookAt: [number, number, number] }> = {
  overview: { camPos: [0, 8, 12], lookAt: [0, 0, 0] },
  about: { camPos: [-4, 2, -1], lookAt: [-3.5, 0.5, -2.5] }, // Cottage
  projects: { camPos: [4, 2, 1], lookAt: [3.0, 0.5, 2.5] }, // Workshop
  contact: { camPos: [1, 1.5, 6], lookAt: [0, 0.5, 4.0] }, // Mailbox
};

function CameraController() {
  const { camera } = useThree();
  const { activeSection, setTransitioning } = useGameStore();
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const stop = tourStops[activeSection] || tourStops.overview;
    
    setTransitioning(true);
    
    // Animate Camera Position
    gsap.to(camera.position, {
      x: stop.camPos[0],
      y: stop.camPos[1],
      z: stop.camPos[2],
      duration: 2.5,
      ease: "power2.inOut",
      onComplete: () => setTransitioning(false)
    });

    // Animate LookAt Target
    targetLookAt.current.set(stop.lookAt[0], stop.lookAt[1], stop.lookAt[2]);
    gsap.to(currentLookAt.current, {
      x: stop.lookAt[0],
      y: stop.lookAt[1],
      z: stop.lookAt[2],
      duration: 2.5,
      ease: "power2.inOut"
    });

  }, [activeSection, camera, setTransitioning]);

  useFrame(() => {
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

function TourAssistant({ activeSection }: { activeSection: string }) {
  const assistantRef = useRef<THREE.Group>(null);
  
  // Move assistant to the current stop
  useEffect(() => {
    const stop = tourStops[activeSection] || tourStops.overview;
    // Offset assistant slightly from the lookAt target so they stand next to the building
    let targetX = stop.lookAt[0] + 1.2;
    let targetZ = stop.lookAt[2] + 0.5;
    
    if (activeSection === 'overview') {
       targetX = 0;
       targetZ = 2;
    }

    if (assistantRef.current) {
      gsap.to(assistantRef.current.position, {
        x: targetX,
        y: 0,
        z: targetZ,
        duration: 2,
        ease: "power2.out",
        delay: 0.5
      });
      
      // Make assistant look at camera
      const camPos = stop.camPos;
      const angle = Math.atan2(camPos[0] - targetX, camPos[2] - targetZ);
      gsap.to(assistantRef.current.rotation, {
        y: angle,
        duration: 1
      });
    }
  }, [activeSection]);

  // Breathing animation
  useFrame((state) => {
    if (assistantRef.current) {
      assistantRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
    }
  });

  return (
    <group ref={assistantRef} position={[0, 0, 2]}>
      {/* Nameplate */}
      <Html position={[0, 1.4, 0]} center>
        <div style={{
          background: 'rgba(255,255,255,0.9)',
          padding: '4px 10px',
          borderRadius: '20px',
          fontWeight: 'bold',
          color: '#4f46e5',
          fontSize: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          pointerEvents: 'none',
          whiteSpace: 'nowrap'
        }}>
          Virtual Assistant
        </div>
      </Html>

      {/* Body - Clean Robot/Suit design */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.5, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 0.85, 0]} castShadow>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#e0e7ff" roughness={0.2} metalness={0.5} />
      </mesh>
      
      {/* Glowing Visor */}
      <mesh position={[0, 0.88, 0.15]}>
        <boxGeometry args={[0.25, 0.08, 0.1]} />
        <meshStandardMaterial color="#4f46e5" emissive="#6366f1" emissiveIntensity={0.8} />
      </mesh>
      
      {/* Floating Hands */}
      <mesh position={[-0.3, 0.4, 0.1]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.3, 0.4, 0.1]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

// 3D Assets (Simplified beautiful primitives)
function CozyCottage() {
  return (
    <group position={[-3.5, 0, -2.5]}>
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 1.2, 1.6]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.4, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[1.6, 1.0, 4]} />
        <meshStandardMaterial color="#ef4444" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.4, 0.81]}>
        <planeGeometry args={[0.4, 0.8]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>
    </group>
  );
}

function Workshop() {
  return (
    <group position={[3.0, 0, 2.5]}>
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 1.4, 1.8]} />
        <meshStandardMaterial color="#334155" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.7, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[1.7, 1.7, 2.0]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.4} />
      </mesh>
    </group>
  );
}

function Mailbox() {
  return (
    <group position={[0, 0, 4.0]}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
        <meshStandardMaterial color="#451a03" />
      </mesh>
      <mesh position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[0.3, 0.3, 0.4]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.3} />
      </mesh>
    </group>
  );
}

function Scenery() {
  const trees = useMemo(() => {
    return Array.from({ length: 15 }).map(() => ({
      x: THREE.MathUtils.randFloatSpread(20),
      z: THREE.MathUtils.randFloatSpread(20) - 5,
      scale: THREE.MathUtils.randFloat(0.6, 1.4),
      color: Math.random() > 0.5 ? '#10b981' : '#ec4899' // Green or Pink
    })).filter(t => Math.abs(t.x) > 2 || Math.abs(t.z) > 2); // Keep center clear
  }, []);

  return (
    <group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#84cc16" roughness={1} />
      </mesh>
      
      {/* Dirt Paths */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.5, -0.04, -1]} receiveShadow>
        <planeGeometry args={[4, 1]} />
        <meshStandardMaterial color="#fcd34d" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.5, -0.04, 1]} receiveShadow>
        <planeGeometry args={[4, 1]} />
        <meshStandardMaterial color="#fcd34d" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 2]} receiveShadow>
        <planeGeometry args={[1, 5]} />
        <meshStandardMaterial color="#fcd34d" roughness={1} />
      </mesh>

      {/* Trees */}
      {trees.map((t, i) => (
        <group key={i} position={[t.x, 0, t.z]} scale={t.scale}>
          <mesh position={[0, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.15, 1, 8]} />
            <meshStandardMaterial color="#78350f" />
          </mesh>
          <mesh position={[0, 1.4, 0]} castShadow>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshStandardMaterial color={t.color} roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function CinematicVillage() {
  const { activeSection } = useGameStore();

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0 }}>
      <Canvas shadows camera={{ position: tourStops.overview.camPos, fov: 45 }}>
        <color attach="background" args={["#7dd3fc"]} />
        <fog attach="fog" args={["#7dd3fc", 10, 40]} />
        
        <ambientLight intensity={0.6} color="#ffffff" />
        <directionalLight
          position={[10, 15, 10]}
          intensity={1.5}
          color="#fef08a"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        <CameraController />
        
        <group position={[0, -0.5, 0]}>
          <Scenery />
          <CozyCottage />
          <Workshop />
          <Mailbox />
          <TourAssistant activeSection={activeSection} />
        </group>
      </Canvas>
    </div>
  );
}
