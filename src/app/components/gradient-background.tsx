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

		const mouse = new THREE.Vector2();
		const geo = new THREE.PlaneGeometry(1, 1);
		const mat = new THREE.ShaderMaterial({
			depthTest: false,
			uniforms: {
				uTime: { value: 0 },
				uMouse: { value: mouse },
			},
			vertexShader,
			fragmentShader,
		});

		const plane = new THREE.Mesh(geo, mat);
		scene.add(plane);

		const animate = () => {
			mat.uniforms.uTime.value = performance.now();
			renderer.render(scene, camera);
			requestAnimationFrame(animate);
		};
		requestAnimationFrame(animate);

		const onMouseMove = (e: MouseEvent) => {
			mouse.set(
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

	return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}
