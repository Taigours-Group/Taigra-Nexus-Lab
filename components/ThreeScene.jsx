import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Minimal "nexus" network — a slowly drifting constellation of nodes and
 * connecting lines rendered on the white hero. Most nodes are soft ink-gray;
 * a handful are royal red to echo the logo's wing tips. Respects
 * prefers-reduced-motion and cleans up GL resources on unmount.
 */
export const NexusScene = ({ className = '' }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 16;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // ---- node cloud -------------------------------------------------------
    const NODE_COUNT = 110;
    const RED_RATIO = 0.12;
    const positions = [];
    const nodes = new THREE.Group();

    const inkMaterial = new THREE.MeshBasicMaterial({
      color: 0x9a9ca4,
      transparent: true,
      opacity: 0.55,
    });
    const redMaterial = new THREE.MeshBasicMaterial({
      color: 0xbc3232,
      transparent: true,
      opacity: 0.9,
    });
    const nodeGeometry = new THREE.SphereGeometry(0.07, 10, 10);
    const redGeometry = new THREE.SphereGeometry(0.11, 12, 12);

    // deterministic pseudo-random so the scene looks composed, not noisy
    let seed = 42;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (rand() - 0.5) * 30;
      const y = (rand() - 0.5) * 16;
      const z = (rand() - 0.5) * 10;
      positions.push(new THREE.Vector3(x, y, z));

      const isRed = rand() < RED_RATIO;
      const mesh = new THREE.Mesh(
        isRed ? redGeometry : nodeGeometry,
        isRed ? redMaterial : inkMaterial
      );
      mesh.position.set(x, y, z);
      nodes.add(mesh);
    }
    scene.add(nodes);

    // ---- connecting lines (nearest neighbours only) -----------------------
    const linePositions = [];
    const MAX_DIST = 4.2;
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (positions[i].distanceTo(positions[j]) < MAX_DIST) {
          linePositions.push(
            positions[i].x, positions[i].y, positions[i].z,
            positions[j].x, positions[j].y, positions[j].z
          );
        }
      }
    }
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xbc3232,
      transparent: true,
      opacity: 0.6,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    nodes.add(lines);

    // ---- interaction ------------------------------------------------------
    const pointer = { x: 0, y: 0 };
    const onPointerMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const onResize = () => {
      const { clientWidth, clientHeight } = mount;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    window.addEventListener('resize', onResize);

    // ---- render loop ------------------------------------------------------
    let frameId = 0;
    let t = 0;
    const renderFrame = () => {
      t += 0.0016;
      nodes.rotation.y = t + pointer.x * 0.06;
      nodes.rotation.x = Math.sin(t * 0.6) * 0.05 + pointer.y * 0.04;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(renderFrame);
    };

    if (prefersReducedMotion) {
      renderer.render(scene, camera); // single static frame
    } else {
      frameId = requestAnimationFrame(renderFrame);
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      nodeGeometry.dispose();
      redGeometry.dispose();
      lineGeometry.dispose();
      inkMaterial.dispose();
      redMaterial.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 ${className}`}
      aria-hidden="true"
    />
  );
};

export default NexusScene;
