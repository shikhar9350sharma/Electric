import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  uniform vec3 uMouse;
  
  attribute vec3 aRandomPosition;
  attribute vec3 aRandomAnimation;
  attribute vec3 color;
  
  varying vec3 vColor;
  
  void main() {
    vColor = color;
    
    vec3 newPosition = position + aRandomPosition;
    
    // Organic drift animation
    newPosition.x += sin(uTime * aRandomAnimation.x) * 0.03;
    newPosition.y += cos(uTime * aRandomAnimation.y) * 0.02;
    newPosition.z += sin(uTime * aRandomAnimation.z + position.x * 8.0) * 0.06;
    
    // Mouse repulsion
    vec3 toMouse = uMouse - newPosition;
    float distToMouse = length(toMouse);
    if (distToMouse < 1.2) {
      newPosition -= normalize(toMouse) * 0.03 / (distToMouse + 0.1);
    }
    
    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
    gl_PointSize = 120.0 * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec3 vColor;
  
  void main() {
    vec2 uv = gl_PointCoord.xy;
    vec4 t = texture2D(uTexture, uv);
    gl_FragColor = vec4(vColor, t.r);
  }
`;

function ParticlesField() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouseRef = useRef(new THREE.Vector3(0, 0, 0.5));
  const targetMouse = useRef(new THREE.Vector3(0, 0, 0.5));
  const { viewport, pointer } = useThree();

  const particleCount = 1500;

  const {
    positions,
    randomPositions,
    randomAnimations,
    colors,
    videoTexture,
  } = useMemo(() => {
    // Create video element for texture
    const video = document.createElement('video');
    video.src = '/videos/particle-texture.mp4';
    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.crossOrigin = 'anonymous';
    video.play().catch(() => {});

    const texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const positions = new Float32Array(particleCount * 3);
    const randomPositions = new Float32Array(particleCount * 3);
    const randomAnimations = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color('#ffffff'),  // warm white
      new THREE.Color('#f2ae72'),  // orange glow
      new THREE.Color('#1c1c1c'),  // dark motes
      new THREE.Color('#fff5e6'),  // cream white
      new THREE.Color('#e8d5b5'),  // warm beige
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Base positions spread across viewport
      positions[i3] = (Math.random() - 0.5) * 12;
      positions[i3 + 1] = (Math.random() - 0.5) * 8;
      positions[i3 + 2] = (Math.random() - 0.5) * 6;
      
      // Random offset for animation base
      randomPositions[i3] = (Math.random() - 0.5) * 2;
      randomPositions[i3 + 1] = (Math.random() - 0.5) * 2;
      randomPositions[i3 + 2] = (Math.random() - 0.5) * 2;
      
      // Animation speed/phase
      randomAnimations[i3] = 0.2 + Math.random() * 0.8;
      randomAnimations[i3 + 1] = 0.2 + Math.random() * 0.8;
      randomAnimations[i3 + 2] = 0.2 + Math.random() * 0.8;
      
      // Random color from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return {
      positions,
      randomPositions,
      randomAnimations,
      colors,
      videoTexture: texture,
    };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: videoTexture },
      uMouse: { value: new THREE.Vector3(0, 0, 0.5) },
    }),
    [videoTexture]
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    
    // Lerp mouse position
    targetMouse.current.set(pointer.x * viewport.width * 0.5, pointer.y * viewport.height * 0.5, 0.5);
    mouseRef.current.lerp(targetMouse.current, 0.1);
    uniforms.uMouse.value.copy(mouseRef.current);
  });

  // Cleanup video on unmount
  useEffect(() => {
    return () => {
      videoTexture.source.data?.pause?.();
      videoTexture.dispose();
    };
  }, [videoTexture]);

  return (
    <points ref={meshRef as any}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aRandomPosition"
          args={[randomPositions, 3]}
        />
        <bufferAttribute
          attach="attributes-aRandomAnimation"
          args={[randomAnimations, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  );
}

export default function AtmosphericParticles() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: false }}
        style={{ background: 'transparent' }}
      >
        <ParticlesField />
      </Canvas>
    </div>
  );
}
