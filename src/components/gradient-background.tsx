"use client";

import { useEffect, useRef } from "react";
import fragmentShader from "@/shaders/fragment_shader.glsl";
import vertexShader from "@/shaders/vertex_shader.glsl";
import * as THREE from "three";

export default function GradientBackground() {
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

    const targetMouse = new THREE.Vector2();
    const dampedMouse = new THREE.Vector2(); // starts at (0,0)
    const dampening = 0.05; // smaller is more

    const geo = new THREE.PlaneGeometry(1, 1);
    const mat = new THREE.ShaderMaterial({
      depthTest: false,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: dampedMouse },
      },
      vertexShader,
      fragmentShader,
    });

    const plane = new THREE.Mesh(geo, mat);
    scene.add(plane);

    const dotGeometry = new THREE.CircleGeometry(0.03, 32);
    const dotMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff55 });
    const dot = new THREE.Mesh(dotGeometry, dotMaterial);
    const aspect = window.innerWidth / window.innerHeight;
    dot.scale.set(1 / aspect, 1, 1); // compensates for stretching
    // for testing the damping, don't uncomment for final build
    // scene.add(dot);

    const animate = () => {
      mat.uniforms.uTime.value = performance.now();

      // Apply dampening via lerp
      dampedMouse.lerp(targetMouse, dampening);

      // dot.position.set(dampedMouse.x, dampedMouse.y, 0.01);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    const onMouseMove = (e: MouseEvent) => {
      targetMouse.set(
        e.clientX / window.innerWidth - 0.5,
        0.5 - e.clientY / window.innerHeight,
      );
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-50" />;
}
