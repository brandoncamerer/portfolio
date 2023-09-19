import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = () => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <group>
      <hemisphereLight intensity={2} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={2} />
      <primitive
        object={computer.scene}
        scale={0.75}
        position={[0, -4.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </group>
  );
};

const ComputersCanvas = () => {
  const [cameraSettings, setCameraSettings] = useState({
    position: [20, 3, 5],
    fov: 25,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        console.log("Changing FOV to 50");
        setCameraSettings({ ...cameraSettings, fov: 75 });
      } else {
        console.log("Changing FOV to 25");
        setCameraSettings({ ...cameraSettings, fov: 25 });
      }
    };

    

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cameraSettings]);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={cameraSettings}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <Computers />
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default ComputersCanvas;
