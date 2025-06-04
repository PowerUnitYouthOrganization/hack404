"use client";

import { useEffect, useRef } from "react";
import fragmentShader from "@/shaders/fragment_shader.glsl";
import vertexShader from "@/shaders/vertex_shader.glsl";
import * as THREE from "three";

export default function GradientBackgroundStatic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);

  const initializeScene = () => {
    if (!containerRef.current) return;

    const renderer = new THREE.WebGLRenderer({ antialias: false, preserveDrawingBuffer: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.zIndex = "-1";

    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(
      -0.5,
      0.5,
      0.5,
      -0.5,
      1e-5,
      100,
    );
    camera.position.z = 1;
    cameraRef.current = camera;

    const geo = new THREE.PlaneGeometry(1, 1);
    const mat = new THREE.ShaderMaterial({
      depthTest: false,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader,
      fragmentShader,
    });

    const plane = new THREE.Mesh(geo, mat);
    scene.add(plane);
    renderer.render(scene, camera);

    // Handle context loss
    renderer.domElement.addEventListener('webglcontextlost', (event) => {
      event.preventDefault();
    });

    renderer.domElement.addEventListener('webglcontextrestored', () => {
      if (sceneRef.current && cameraRef.current) {
        renderer.render(sceneRef.current, cameraRef.current);
      }
    });
  };

  useEffect(() => {
    initializeScene();

    const onResize = () => {
      if (rendererRef.current) {
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        if (sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      }
    };

    const onVisibilityChange = () => {
      if (!document.hidden && rendererRef.current && sceneRef.current && cameraRef.current) {
        // Re-render when tab becomes visible
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (containerRef.current?.contains(rendererRef.current.domElement)) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 -z-50 min-h-screen" />;
}