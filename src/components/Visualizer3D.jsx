import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Cylinder, Plane, SpotLight, Environment, PerspectiveCamera, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

// DJ Booth Component
function DJBooth({ position }) {
  return (
    <group position={position}>
      {/* Main booth structure */}
      <Box args={[3, 1.2, 1.5]} position={[0, 0.6, 0]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </Box>
      
      {/* DJ Controller */}
      <Box args={[1.8, 0.1, 0.8]} position={[0, 1.25, 0]}>
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} />
      </Box>
      
      {/* Laptop Stand */}
      <Box args={[0.5, 0.02, 0.3]} position={[0, 1.35, -0.3]}>
        <meshStandardMaterial color="#silver" metalness={1} roughness={0} />
      </Box>
      
      {/* Front scrim */}
      <Plane args={[3, 1.2]} position={[0, 0.6, 0.76]}>
        <meshStandardMaterial color="#000000" opacity={0.9} transparent />
      </Plane>
    </group>
  );
}

// Speaker Component
function Speaker({ position, size = [0.5, 1, 0.4] }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle vibration to simulate bass
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 30) * 0.001;
    }
  });
  
  return (
    <group position={position} ref={meshRef}>
      <Box args={size}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
      </Box>
      {/* Speaker cone */}
      <Cylinder args={[0.15, 0.2, 0.05]} position={[0, 0.2, 0.21]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Cylinder>
      <Cylinder args={[0.08, 0.12, 0.05]} position={[0, -0.2, 0.21]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Cylinder>
    </group>
  );
}

// Subwoofer Component
function Subwoofer({ position }) {
  return (
    <Box args={[0.6, 0.6, 0.6]} position={position}>
      <meshStandardMaterial color="#0a0a0a" metalness={0.6} roughness={0.4} />
    </Box>
  );
}

// Uplight Component
function Uplight({ position, color = '#ff00ff' }) {
  return (
    <group position={position}>
      {/* Light fixture - wider at base */}
      <Cylinder args={[0.15, 0.1, 0.3]} position={[0, 0.15, 0]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </Cylinder>
      
      {/* Light beam pointing straight up */}
      <SpotLight
        position={[0, 0.3, 0]}
        angle={0.4}
        penumbra={0.5}
        intensity={3}
        color={color}
        distance={15}
        target-position={[position[0], 10, position[2]]}  // Points straight up
      />
      
      {/* Vertical light cone effect */}
      <mesh position={[0, 4, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.8, 8, 8, 1, true]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.1}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      
      {/* Glow effect on floor */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.5, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

// Moving Head Light Component
function MovingHead({ position, color = '#00ffff' }) {
  const headRef = useRef();
  
  useFrame((state) => {
    if (headRef.current) {
      // Animate the moving head
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.5;
      headRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.7) * 0.3;
    }
  });
  
  return (
    <group position={position}>
      {/* Base */}
      <Cylinder args={[0.15, 0.15, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </Cylinder>
      
      {/* Moving head */}
      <group ref={headRef} position={[0, 0.2, 0]}>
        <Cylinder args={[0.08, 0.08, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </Cylinder>
        
        {/* Light beam */}
        <SpotLight
          position={[0, 0, 0.2]}
          angle={0.3}
          penumbra={0.2}
          intensity={3}
          color={color}
          distance={15}
          target-position={[0, -5, 5]}
        />
      </group>
    </group>
  );
}

// Dance Floor Lighting Component
function DanceFloorLighting({ position }) {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
  
  return (
    <group position={position}>
      {/* Create a grid of floor lights */}
      {[-1, 0, 1].map((x) => 
        [-1, 0, 1].map((z) => {
          const index = (x + 1) * 3 + (z + 1);
          return (
            <mesh key={`${x}-${z}`} position={[x * 0.8, 0.01, z * 0.8]}>
              <boxGeometry args={[0.6, 0.02, 0.6]} />
              <meshBasicMaterial 
                color={colors[index % colors.length]} 
                transparent 
                opacity={0.5}
              />
            </mesh>
          );
        })
      )}
    </group>
  );
}

// TV Screen Component
function TVScreen({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Screen */}
      <Box args={[2, 1.2, 0.05]}>
        <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
      </Box>
      {/* Display */}
      <Plane args={[1.9, 1.1]} position={[0, 0, 0.026]}>
        <meshBasicMaterial color="#001155" />
      </Plane>
      {/* Stand */}
      <Cylinder args={[0.3, 0.3, 0.05]} position={[0, -0.65, 0]}>
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </Cylinder>
      <Box args={[0.6, 0.02, 0.4]} position={[0, -0.7, 0]}>
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </Box>
    </group>
  );
}

// Photo Booth Component
function PhotoBooth({ position }) {
  return (
    <group position={position}>
      {/* Backdrop */}
      <Box args={[2, 2.5, 0.1]} position={[0, 1.25, 0]}>
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.9} />
      </Box>
      {/* Camera on tripod */}
      <Cylinder args={[0.02, 0.02, 1.5]} position={[0, 0.75, 1.5]}>
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </Cylinder>
      <Box args={[0.3, 0.2, 0.2]} position={[0, 1.5, 1.5]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </Box>
      {/* Ring light */}
      <Cylinder args={[0.3, 0.3, 0.05]} position={[0, 1.5, 1.4]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#ffffff" opacity={0.8} transparent />
      </Cylinder>
    </group>
  );
}

// Main 3D Visualizer Component
export default function Visualizer3D({ formData }) {
  const { 
    uplighting, 
    movingHeads, 
    tvScreens, 
    subwoofers, 
    photoBooths,
    danceFloorLighting,
    extraSpeakers,
    customGobo 
  } = formData;

  const uplightColors = ['#ff00ff', '#00ffff', '#ffff00', '#ff00ff', '#00ff00', '#ff0088', '#8800ff', '#00ffff'];

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <Canvas shadows camera={{ position: [0, 12, 18], fov: 50 }}>
        <Suspense fallback={null}>
          {/* Light fog for atmosphere */}
          <fog attach="fog" args={['#000000', 10, 50]} />
          
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          
          {/* Environment for reflections */}
          <Environment preset="city" />
          
          {/* Camera Controls */}
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true}
            minDistance={5}
            maxDistance={30}
            maxPolarAngle={Math.PI / 2}
          />
          
          {/* Dance Floor */}
          <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={40}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#101010"
              metalness={0.5}
            />
          </mesh>
          
          {/* DJ Booth - Always visible */}
          <DJBooth position={[0, 0, -2]} />
          
          {/* Main Speakers - Always visible */}
          <Speaker position={[-3, 0, -2]} />
          <Speaker position={[3, 0, -2]} />
          
          {/* Extra Speakers */}
          {extraSpeakers > 0 && (
            <>
              {extraSpeakers >= 1 && <Speaker position={[-5, 0, 2]} size={[0.4, 0.8, 0.3]} />}
              {extraSpeakers >= 2 && <Speaker position={[5, 0, 2]} size={[0.4, 0.8, 0.3]} />}
            </>
          )}
          
          {/* Subwoofers */}
          {subwoofers > 0 && (
            <>
              {[...Array(Math.min(subwoofers, 4))].map((_, i) => (
                <Subwoofer key={`sub-${i}`} position={[(i - 1.5) * 0.8, 0.3, -1]} />
              ))}
            </>
          )}
          
          {/* Uplighting - Placed at perimeter starting from corners */}
          {uplighting > 0 && (
            <>
              {[...Array(Math.min(uplighting, 16))].map((_, i) => {
                let x, z;
                const floorSize = 9; // Half the floor size (floor is 20x20, so edges at ±9)
                
                // Place uplights at perimeter: corners first, then edges
                if (i === 0) {
                  // Back left corner
                  x = -floorSize; z = -floorSize;
                } else if (i === 1) {
                  // Back right corner
                  x = floorSize; z = -floorSize;
                } else if (i === 2) {
                  // Front left corner
                  x = -floorSize; z = floorSize;
                } else if (i === 3) {
                  // Front right corner
                  x = floorSize; z = floorSize;
                } else if (i === 4) {
                  // Back center
                  x = 0; z = -floorSize;
                } else if (i === 5) {
                  // Front center
                  x = 0; z = floorSize;
                } else if (i === 6) {
                  // Left center
                  x = -floorSize; z = 0;
                } else if (i === 7) {
                  // Right center
                  x = floorSize; z = 0;
                } else if (i === 8) {
                  // Back left-center
                  x = -floorSize/2; z = -floorSize;
                } else if (i === 9) {
                  // Back right-center
                  x = floorSize/2; z = -floorSize;
                } else if (i === 10) {
                  // Front left-center
                  x = -floorSize/2; z = floorSize;
                } else if (i === 11) {
                  // Front right-center
                  x = floorSize/2; z = floorSize;
                } else if (i === 12) {
                  // Left back-center
                  x = -floorSize; z = -floorSize/2;
                } else if (i === 13) {
                  // Right back-center
                  x = floorSize; z = -floorSize/2;
                } else if (i === 14) {
                  // Left front-center
                  x = -floorSize; z = floorSize/2;
                } else if (i === 15) {
                  // Right front-center
                  x = floorSize; z = floorSize/2;
                }
                
                return (
                  <Uplight 
                    key={`uplight-${i}`} 
                    position={[x, 0, z]} 
                    color={uplightColors[i % uplightColors.length]}
                  />
                );
              })}
            </>
          )}
          
          {/* Moving Heads */}
          {movingHeads > 0 && (
            <>
              {movingHeads >= 1 && <MovingHead position={[-3, 3, -3]} color="#00ffff" />}
              {movingHeads >= 2 && <MovingHead position={[3, 3, -3]} color="#ffff00" />}
            </>
          )}
          
          {/* TV Screens */}
          {tvScreens > 0 && (
            <>
              {tvScreens >= 1 && <TVScreen position={[-5, 1.5, 0]} rotation={[0, Math.PI / 4, 0]} />}
              {tvScreens >= 2 && <TVScreen position={[5, 1.5, 0]} rotation={[0, -Math.PI / 4, 0]} />}
              {tvScreens >= 3 && <TVScreen position={[0, 1.5, 5]} rotation={[0, Math.PI, 0]} />}
            </>
          )}
          
          {/* Photo Booth */}
          {photoBooths > 0 && (
            <PhotoBooth position={[6, 0, 6]} />
          )}
          
          {/* Dance Floor Lighting */}
          {danceFloorLighting > 0 && (
            <DanceFloorLighting position={[0, 0, 3]} />
          )}
          
          {/* Custom Gobo - Simple light projection */}
          {customGobo > 0 && (
            <group position={[0, 5, 2]}>
              <SpotLight
                position={[0, 0, 0]}
                angle={0.5}
                penumbra={0.5}
                intensity={2}
                color="#8b5cf6"
                distance={10}
                target-position={[0, 0, 2]}
              />
              <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[1.5, 32]} />
                <meshBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
              </mesh>
            </group>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}