"use client";

import { useEffect, useRef } from "react";
import fragmentShader from "@/shaders/fragment_shader.glsl";
import vertexShader from "@/shaders/vertex_shader.glsl";
import * as THREE from "three";

export default function GradientBackgroundStatic() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.zIndex = "-1";

    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -0.5,
      0.5,
      0.5,
      -0.5,
      1e-5,
      100,
    );
    camera.position.z = 1;

    const geo = new THREE.PlaneGeometry(1, 1);
    const mat = new THREE.ShaderMaterial({
      depthTest: false,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) }, // Static mouse position at center
      },
      vertexShader,
      fragmentShader,
    });

    const plane = new THREE.Mesh(geo, mat);
    scene.add(plane);
    renderer.render(scene, camera);

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-50" />;
}