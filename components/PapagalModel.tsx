"use client"

import React, { useEffect, useRef } from "react"
import * as THREE from "three"

export default function PapagalModel() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup with transparent background
    const scene = new THREE.Scene()

    const width = container.clientWidth || 600
    const height = container.clientHeight || 375

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100)
    camera.position.set(0, 0.2, 7.6)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2)
    keyLight.position.set(5, 8, 6)
    keyLight.castShadow = true
    scene.add(keyLight)

    const emeraldRim = new THREE.DirectionalLight(0x34d399, 2.8)
    emeraldRim.position.set(-6, 3, -4)
    scene.add(emeraldRim)

    const cyanGlow = new THREE.PointLight(0x38bdf8, 3.0, 5)
    cyanGlow.position.set(0, 0, 1.5)
    scene.add(cyanGlow)

    // Master assembly group (rotates continuously in 3D)
    const rootGroup = new THREE.Group()
    scene.add(rootGroup)

    // ==========================================
    // 1. Stacked 3D Database Cylinder Discs (Papagal Native DB Engine)
    // ==========================================
    const discRadius = 1.35
    const discHeight = 0.32
    const discSegments = 48
    const discGap = 0.52

    const discMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      metalness: 0.85,
      roughness: 0.15,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    })

    const edgeRingMat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      emissive: 0x059669,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    })

    const discGroup = new THREE.Group()
    rootGroup.add(discGroup)

    // 3 Stacked Cylinders
    for (let i = -1; i <= 1; i++) {
      const yPos = i * discGap

      // Main Cylinder Body
      const cylinderGeo = new THREE.CylinderGeometry(
        discRadius,
        discRadius,
        discHeight,
        discSegments
      )
      const cylinderMesh = new THREE.Mesh(cylinderGeo, discMat)
      cylinderMesh.position.y = yPos
      cylinderMesh.castShadow = true
      cylinderMesh.receiveShadow = true
      discGroup.add(cylinderMesh)

      // Glowing Emerald Accent Ring on Top Edge
      const ringGeo = new THREE.TorusGeometry(discRadius + 0.02, 0.025, 16, discSegments)
      const ringMesh = new THREE.Mesh(ringGeo, edgeRingMat)
      ringMesh.rotation.x = Math.PI / 2
      ringMesh.position.y = yPos + discHeight / 2
      discGroup.add(ringMesh)

      // Glowing Emerald Accent Ring on Bottom Edge
      const ringMeshBot = new THREE.Mesh(ringGeo, edgeRingMat)
      ringMeshBot.rotation.x = Math.PI / 2
      ringMeshBot.position.y = yPos - discHeight / 2
      discGroup.add(ringMeshBot)
    }

    // ==========================================
    // 2. MetalKit GPU Orbiting Data Shaders & Floating Nodes
    // ==========================================
    const orbitRingGeo = new THREE.TorusGeometry(2.1, 0.015, 16, 64)
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.35,
    })
    const orbitRing1 = new THREE.Mesh(orbitRingGeo, orbitRingMat)
    orbitRing1.rotation.x = Math.PI / 3
    rootGroup.add(orbitRing1)

    const orbitRing2 = new THREE.Mesh(orbitRingGeo, orbitRingMat)
    orbitRing2.rotation.x = -Math.PI / 3
    orbitRing2.rotation.y = Math.PI / 4
    rootGroup.add(orbitRing2)

    // Floating Data Particle Cloud
    const particleCount = 45
    const particleGeo = new THREE.BufferGeometry()
    const particlePos = new Float32Array(particleCount * 3)

    for (let p = 0; p < particleCount; p++) {
      const angle = (p / particleCount) * Math.PI * 2
      const radius = 1.8 + Math.random() * 0.9
      const y = (Math.random() - 0.5) * 2.2

      particlePos[p * 3] = Math.cos(angle) * radius
      particlePos[p * 3 + 1] = y
      particlePos[p * 3 + 2] = Math.sin(angle) * radius
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3))
    const particleMat = new THREE.PointsMaterial({
      color: 0x34d399,
      size: 0.06,
      transparent: true,
      opacity: 0.8,
    })
    const particleSystem = new THREE.Points(particleGeo, particleMat)
    rootGroup.add(particleSystem)

    // ==========================================
    // 3. Smooth Spinning Animation Loop
    // ==========================================
    let reqId: number
    let clock = new THREE.Clock()

    const animate = () => {
      reqId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      // Primary continuous 3D rotation
      rootGroup.rotation.y = elapsed * 0.65
      rootGroup.rotation.x = Math.sin(elapsed * 0.5) * 0.18
      rootGroup.rotation.z = Math.cos(elapsed * 0.4) * 0.08

      // Counter-rotating rings
      orbitRing1.rotation.z = -elapsed * 0.4
      orbitRing2.rotation.z = elapsed * 0.35

      // Pulse particle opacity
      particleMat.opacity = 0.55 + Math.sin(elapsed * 2.5) * 0.25

      renderer.render(scene, camera)
    }

    animate()

    // Handle dynamic resizing
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(reqId)
      window.removeEventListener("resize", handleResize)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-transparent select-none pointer-events-none"
    />
  )
}
