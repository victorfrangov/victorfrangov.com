"use client"

import React, { useEffect, useRef } from "react"
import * as THREE from "three"

export default function FluidSimModel() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup with transparent background
    const scene = new THREE.Scene()

    const width = container.clientWidth || 600
    const height = container.clientHeight || 375

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100)
    camera.position.set(0, 3.8, 6.2)
    camera.lookAt(0, -0.1, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4)
    scene.add(ambientLight)

    const sunLight = new THREE.DirectionalLight(0xe0f2fe, 3.2)
    sunLight.position.set(4, 9, 5)
    scene.add(sunLight)

    const blueRimLight = new THREE.DirectionalLight(0x00f5d4, 1.8)
    blueRimLight.position.set(-6, 2, -4)
    scene.add(blueRimLight)

    const underwaterLight = new THREE.PointLight(0x0284c7, 3.0, 5)
    underwaterLight.position.set(0, -0.6, 0)
    scene.add(underwaterLight)

    // Master assembly group (rotates in 3D)
    const rootGroup = new THREE.Group()
    scene.add(rootGroup)

    const tankW = 3.2
    const tankH = 2.4
    const tankD = 3.2

    // ==========================================
    // 1. Simulation Glass Box / Tank
    // ==========================================
    // Tank wireframe edges
    const boxGeo = new THREE.BoxGeometry(tankW, tankH, tankD)
    const boxEdges = new THREE.EdgesGeometry(boxGeo)
    const boxLineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
    })
    const boxWire = new THREE.LineSegments(boxEdges, boxLineMat)
    rootGroup.add(boxWire)

    // Glass walls of the tank (transparent physical material)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0369a1,
      transparent: true,
      opacity: 0.12,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.9,
      thickness: 0.5,
      side: THREE.BackSide,
    })
    const glassTank = new THREE.Mesh(boxGeo, glassMat)
    rootGroup.add(glassTank)

    // Tank bottom base
    const baseGeo = new THREE.BoxGeometry(tankW, 0.08, tankD)
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x082f49,
      roughness: 0.4,
      metalness: 0.3,
    })
    const base = new THREE.Mesh(baseGeo, baseMat)
    base.position.y = -tankH / 2 - 0.04
    rootGroup.add(base)

    // ==========================================
    // 2. Moving Sea / Wave Mesh (High-Res Grid)
    // ==========================================
    const gridRes = 72
    const seaGeo = new THREE.PlaneGeometry(tankW - 0.05, tankD - 0.05, gridRes, gridRes)
    seaGeo.rotateX(-Math.PI / 2) // Orient horizontally

    const seaMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7, // Vibrant tropical deep ocean blue
      emissive: 0x0c4a6e,
      emissiveIntensity: 0.4,
      roughness: 0.08,
      metalness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      flatShading: true,
    })

    const seaMesh = new THREE.Mesh(seaGeo, seaMat)
    seaMesh.position.y = 0.15 // Water level inside the tank
    rootGroup.add(seaMesh)

    // Save initial vertex positions for wave calculations
    const posAttr = seaGeo.attributes.position as THREE.BufferAttribute
    const initialPositions = posAttr.array.slice() as Float32Array

    // ==========================================
    // 3. Underwater Volume Slab
    // ==========================================
    const waterVolGeo = new THREE.BoxGeometry(tankW - 0.08, tankH / 2 + 0.15, tankD - 0.08)
    const waterVolMat = new THREE.MeshPhysicalMaterial({
      color: 0x0369a1,
      transparent: true,
      opacity: 0.35,
      roughness: 0.2,
      transmission: 0.7,
      thickness: 1.2,
    })
    const waterVol = new THREE.Mesh(waterVolGeo, waterVolMat)
    waterVol.position.y = (-tankH / 4) + 0.075
    rootGroup.add(waterVol)

    // ==========================================
    // 4. Foam / Sea Spray Particles
    // ==========================================
    const sprayCount = 120
    const sprayGeo = new THREE.BufferGeometry()
    const sprayPositions = new Float32Array(sprayCount * 3)
    const sprayMeta: { x: number; z: number; speed: number; phase: number }[] = []

    for (let i = 0; i < sprayCount; i++) {
      const x = (Math.random() - 0.5) * (tankW - 0.4)
      const z = (Math.random() - 0.5) * (tankD - 0.4)
      const speed = 1.5 + Math.random() * 2.0
      const phase = Math.random() * Math.PI * 2

      sprayPositions[i * 3] = x
      sprayPositions[i * 3 + 1] = 0.2
      sprayPositions[i * 3 + 2] = z

      sprayMeta.push({ x, z, speed, phase })
    }

    sprayGeo.setAttribute("position", new THREE.BufferAttribute(sprayPositions, 3))
    const sprayMat = new THREE.PointsMaterial({
      color: 0xe0f2fe,
      size: 0.06,
      transparent: true,
      opacity: 0.8,
    })
    const spraySystem = new THREE.Points(sprayGeo, sprayMat)
    rootGroup.add(spraySystem)

    // ==========================================
    // 5. Animation & Continuous 360° Spin
    // ==========================================
    let reqId: number
    let targetRotY = 0
    let targetRotX = 0
    let currentRotY = 0
    let currentRotX = 0
    let clock = new THREE.Clock()

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      targetRotY = x * 0.4
      targetRotX = -y * 0.25
    }

    container.addEventListener("mousemove", handleMouseMove)

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect()
        const touch = e.touches[0]
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1
        const y = -(((touch.clientY - touch.pageY) / rect.height) * 2 - 1)
        targetRotY = x * 0.4
        targetRotX = -y * 0.25
      }
    }
    container.addEventListener("touchmove", handleTouchMove, { passive: true })

    const sprayPosAttr = sprayGeo.attributes.position as THREE.BufferAttribute

    const animate = () => {
      reqId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      // Continuous 360° spin around vertical axis + interactive tilt
      currentRotY += (targetRotY - currentRotY) * 0.06
      currentRotX += (targetRotX - currentRotX) * 0.06

      // Slow, smooth continuous 360° spin around vertical axis + interactive tilt
      rootGroup.rotation.y = elapsed * 0.28 + currentRotY
      rootGroup.rotation.x = currentRotX + Math.sin(elapsed * 0.35) * 0.06
      rootGroup.rotation.z = Math.cos(elapsed * 0.3) * 0.03

      // --- Calmer, Slower Multi-Octave Gerstner Sea Wave Displacements ---
      const vertexCount = posAttr.count
      for (let i = 0; i < vertexCount; i++) {
        const ox = initialPositions[i * 3]
        const oz = initialPositions[i * 3 + 2]

        // Octave 1: Gentle rolling swell (slowed down ~3x)
        const wave1 = Math.sin(ox * 2.0 + elapsed * 0.9) * Math.cos(oz * 1.6 + elapsed * 0.7) * 0.2
        // Octave 2: Cross diagonal wave
        const wave2 = Math.sin((ox + oz) * 2.8 - elapsed * 1.1) * 0.1
        // Octave 3: High-frequency capillary ripples
        const wave3 = Math.cos(Math.sqrt(ox * ox + oz * oz) * 5.0 - elapsed * 1.4) * 0.05

        const totalDisplacement = wave1 + wave2 + wave3
        posAttr.setY(i, totalDisplacement)
      }
      posAttr.needsUpdate = true
      seaGeo.computeVertexNormals()

      // Animate sea spray drops slowly floating above wave crests
      for (let i = 0; i < sprayCount; i++) {
        const meta = sprayMeta[i]
        const h = Math.abs(Math.sin(elapsed * (meta.speed * 0.35) + meta.phase)) * 0.35 + 0.22
        sprayPosAttr.setY(i, h)
      }
      sprayPosAttr.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

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
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("touchmove", handleTouchMove)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-grab active:cursor-grabbing overflow-hidden bg-transparent select-none"
    >
      {/* Interactive 3D pill indicator */}
      <div className="absolute bottom-3 right-3 z-10 pointer-events-none bg-background/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-foreground/20 text-[10px] font-mono text-foreground/70 flex items-center gap-1.5 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>3D Sea Sim</span>
      </div>
    </div>
  )
}
