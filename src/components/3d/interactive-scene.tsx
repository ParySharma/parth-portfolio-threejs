"use client";

import type { Project } from '@/lib/types';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface InteractiveSceneProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export function InteractiveScene({ projects, onProjectClick }: InteractiveSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const objectsRef = useRef<THREE.Mesh[]>([]);
  const hoveredObjectRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 10;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const primaryLight = new THREE.PointLight(0x4B0082, 2, 100);
    primaryLight.position.set(-10, 10, 10);
    scene.add(primaryLight);
    
    const accentLight = new THREE.PointLight(0x00FFFF, 2, 100);
    accentLight.position.set(10, -10, 5);
    scene.add(accentLight);

    // Projects
    const textureLoader = new THREE.TextureLoader();
    const geometry = new THREE.PlaneGeometry(3, 2);
    projects.forEach((project, i) => {
      const texture = textureLoader.load(project.image);
      const material = new THREE.MeshStandardMaterial({ map: texture, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(geometry, material);

      const angle = (i / projects.length) * Math.PI * 2;
      mesh.position.x = Math.cos(angle) * 8;
      mesh.position.y = Math.sin(angle) * 5;
      mesh.position.z = Math.sin(angle) * Math.cos(angle) * 4 - 2;
      
      mesh.lookAt(camera.position);

      mesh.userData = { project };
      objectsRef.current.push(mesh);
      scene.add(mesh);
    });

    // Particles
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 50;
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({ size: 0.02, color: 0x00FFFF });
    const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleMesh);

    // Mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / currentMount.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / currentMount.clientHeight) * 2 + 1;
    };
    currentMount.addEventListener('mousemove', onMouseMove);

    const onClick = () => {
        if(hoveredObjectRef.current) {
            onProjectClick(hoveredObjectRef.current.userData.project);
        }
    };
    currentMount.addEventListener('click', onClick);

    // Animation
    let clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update particles
      particleMesh.rotation.y = elapsedTime * 0.05;

      // Update camera
      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02;
      camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      // Raycasting
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(objectsRef.current);
      
      // Handle hover
      if (intersects.length > 0) {
        const newHovered = intersects[0].object as THREE.Mesh;
        if(hoveredObjectRef.current !== newHovered) {
          if(hoveredObjectRef.current) {
            (hoveredObjectRef.current.material as THREE.MeshStandardMaterial).emissive.setHex(0x000000);
             hoveredObjectRef.current.scale.set(1,1,1);
          }
          hoveredObjectRef.current = newHovered;
          (hoveredObjectRef.current.material as THREE.MeshStandardMaterial).emissive.setHex(0x00ffff);
          hoveredObjectRef.current.scale.set(1.1,1.1,1.1);
          document.body.style.cursor = 'pointer';
        }
      } else {
        if(hoveredObjectRef.current) {
          (hoveredObjectRef.current.material as THREE.MeshStandardMaterial).emissive.setHex(0x000000);
          hoveredObjectRef.current.scale.set(1,1,1);
          hoveredObjectRef.current = null;
          document.body.style.cursor = 'default';
        }
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const onResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', onResize);
      currentMount.removeEventListener('mousemove', onMouseMove);
      currentMount.removeEventListener('click', onClick);
      document.body.style.cursor = 'default';

      if (renderer.domElement.parentElement === currentMount) {
        currentMount.removeChild(renderer.domElement);
      }

      // Dispose Three.js objects
      scene.children.forEach(obj => {
          if (obj instanceof THREE.Mesh) {
              obj.geometry.dispose();
              if (Array.isArray(obj.material)) {
                  obj.material.forEach(material => material.dispose());
              } else {
                  obj.material.dispose();
              }
          }
      });
      renderer.dispose();
      objectsRef.current = [];
    };
  }, [projects, onProjectClick]);

  return <div ref={mountRef} className="fixed inset-0 z-0" />;
}

    