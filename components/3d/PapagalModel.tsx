"use client"

import React, { useEffect, useRef } from "react"
import * as THREE from "three"

export default function PapagalModel() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()

    const width = container.clientWidth || 600
    const height = container.clientHeight || 375

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100)
    camera.position.set(0, 0.1, 7.5)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2)
    keyLight.position.set(5, 8, 6)
    keyLight.castShadow = true
    scene.add(keyLight)

    const emeraldRim = new THREE.DirectionalLight(0x34d399, 2.8)
    emeraldRim.position.set(-6, 3, -4)
    scene.add(emeraldRim)

    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 2.0)
    cyanRim.position.set(6, -2, -3)
    scene.add(cyanRim)

    const underGlow = new THREE.PointLight(0x34d399, 2.5, 4.5)
    underGlow.position.set(0, -1.2, 1.2)
    scene.add(underGlow)

    // Master assembly group (rotates smoothly in 3D)
    const rootGroup = new THREE.Group()
    scene.add(rootGroup)

    // ==========================================
    // Stylized Low-Poly / Geometric 3D Parrot ("Papagal")
    // ==========================================
    const parrotGroup = new THREE.Group()
    parrotGroup.position.set(0, 0.1, 0)
    rootGroup.add(parrotGroup)

    // Materials Palette
    const emeraldBodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x10b981,
      roughness: 0.25,
      metalness: 0.15,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
      flatShading: true,
    })

    const yellowChestMat = new THREE.MeshPhysicalMaterial({
      color: 0xfbbf24,
      roughness: 0.3,
      metalness: 0.1,
      clearcoat: 0.5,
      flatShading: true,
    })

    const cyanWingMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      roughness: 0.2,
      metalness: 0.25,
      clearcoat: 0.7,
      flatShading: true,
    })

    const tealAccentMat = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4,
      roughness: 0.25,
      metalness: 0.2,
      clearcoat: 0.6,
      flatShading: true,
    })

    const beakMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.35,
      metalness: 0.3,
      flatShading: true,
    })

    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc })
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x09090b })

    // 1. Torso / Body (Tapered geometric cone-cylinder)
    const bodyGeo = new THREE.CylinderGeometry(0.55, 0.38, 1.35, 10)
    const bodyMesh = new THREE.Mesh(bodyGeo, emeraldBodyMat)
    bodyMesh.position.set(0, -0.15, 0)
    bodyMesh.castShadow = true
    parrotGroup.add(bodyMesh)

    // Chest Front Plate (Warm golden plumage)
    const chestGeo = new THREE.ConeGeometry(0.48, 1.1, 8)
    const chestMesh = new THREE.Mesh(chestGeo, yellowChestMat)
    chestMesh.position.set(0, -0.18, 0.22)
    chestMesh.rotation.x = 0.1
    parrotGroup.add(chestMesh)

    // 2. Head Assembly
    const headGroup = new THREE.Group()
    headGroup.position.set(0, 0.72, 0.08)
    parrotGroup.add(headGroup)

    const headGeo = new THREE.DodecahedronGeometry(0.46, 1)
    const headMesh = new THREE.Mesh(headGeo, emeraldBodyMat)
    headMesh.castShadow = true
    headGroup.add(headMesh)

    // Feather Crest / Tuft on top of head
    for (let c = 0; c < 3; c++) {
      const crestGeo = new THREE.ConeGeometry(0.08, 0.45 - c * 0.08, 5)
      const crestMesh = new THREE.Mesh(crestGeo, c % 2 === 0 ? yellowChestMat : tealAccentMat)
      crestMesh.position.set(0, 0.42 + c * 0.05, -0.08 - c * 0.1)
      crestMesh.rotation.x = -0.35 - c * 0.2
      headGroup.add(crestMesh)
    }

    // Curved Hooked Beak
    const upperBeakGeo = new THREE.ConeGeometry(0.2, 0.52, 6)
    const upperBeak = new THREE.Mesh(upperBeakGeo, beakMat)
    upperBeak.position.set(0, -0.05, 0.46)
    upperBeak.rotation.x = Math.PI / 2.6
    headGroup.add(upperBeak)

    const lowerBeakGeo = new THREE.ConeGeometry(0.12, 0.24, 6)
    const lowerBeak = new THREE.Mesh(lowerBeakGeo, beakMat)
    lowerBeak.position.set(0, -0.22, 0.38)
    lowerBeak.rotation.x = Math.PI / 2.1
    headGroup.add(lowerBeak)

    // Eyes (Left & Right with white facial rings)
    for (const side of [-1, 1]) {
      // Facial white patch
      const patchGeo = new THREE.CircleGeometry(0.16, 8)
      const patch = new THREE.Mesh(patchGeo, eyeWhiteMat)
      patch.position.set(side * 0.4, 0.08, 0.2)
      patch.rotation.y = side * (Math.PI / 2.8)
      headGroup.add(patch)

      // Black Pupil
      const pupilGeo = new THREE.SphereGeometry(0.06, 8, 8)
      const pupil = new THREE.Mesh(pupilGeo, pupilMat)
      pupil.position.set(side * 0.43, 0.08, 0.22)
      headGroup.add(pupil)
    }

    // 3. Wings (Folded multi-tiered geometric plumage)
    const wingLeftGroup = new THREE.Group()
    wingLeftGroup.position.set(-0.55, 0.3, 0)
    parrotGroup.add(wingLeftGroup)

    const wingRightGroup = new THREE.Group()
    wingRightGroup.position.set(0.55, 0.3, 0)
    parrotGroup.add(wingRightGroup)

    // Build wing feathers for each side
    ;[wingLeftGroup, wingRightGroup].forEach((wGroup, idx) => {
      const dir = idx === 0 ? -1 : 1

      // Top Primary Wing
      const w1Geo = new THREE.ConeGeometry(0.28, 1.45, 6)
      const w1 = new THREE.Mesh(w1Geo, cyanWingMat)
      w1.position.set(dir * 0.05, -0.65, -0.05)
      w1.rotation.z = dir * 0.18
      w1.rotation.x = -0.25
      wGroup.add(w1)

      // Secondary Turquoise Layer
      const w2Geo = new THREE.ConeGeometry(0.22, 1.2, 6)
      const w2 = new THREE.Mesh(w2Geo, tealAccentMat)
      w2.position.set(dir * 0.08, -0.5, 0.06)
      w2.rotation.z = dir * 0.22
      w2.rotation.x = -0.15
      wGroup.add(w2)

      // Golden Accent Shoulder
      const shoulderGeo = new THREE.SphereGeometry(0.22, 6, 6)
      const shoulder = new THREE.Mesh(shoulderGeo, yellowChestMat)
      shoulder.position.set(dir * 0.02, -0.05, 0.05)
      wGroup.add(shoulder)
    })

    // 4. Long Geometric Macaw Tail Feathers
    const tailGroup = new THREE.Group()
    tailGroup.position.set(0, -0.8, -0.2)
    parrotGroup.add(tailGroup)

    // Center Long Tail Feather
    const tail1Geo = new THREE.ConeGeometry(0.18, 1.9, 6)
    const tail1 = new THREE.Mesh(tail1Geo, cyanWingMat)
    tail1.position.set(0, -0.9, 0)
    tail1.rotation.x = 0.22
    tailGroup.add(tail1)

    // Left & Right Tail Accents
    const tail2 = new THREE.Mesh(new THREE.ConeGeometry(0.12, 1.5, 6), tealAccentMat)
    tail2.position.set(-0.14, -0.7, 0.05)
    tail2.rotation.x = 0.26
    tail2.rotation.z = 0.08
    tailGroup.add(tail2)

    const tail3 = new THREE.Mesh(new THREE.ConeGeometry(0.12, 1.5, 6), tealAccentMat)
    tail3.position.set(0.14, -0.7, 0.05)
    tail3.rotation.x = 0.26
    tail3.rotation.z = -0.08
    tailGroup.add(tail3)

    // 5. Perch Ring Orbit
    const perchRingGeo = new THREE.TorusGeometry(1.85, 0.02, 16, 64)
    const perchRingMat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0x059669,
      emissiveIntensity: 0.4,
    })
    const perchRing = new THREE.Mesh(perchRingGeo, perchRingMat)
    perchRing.rotation.x = Math.PI / 2.3
    perchRing.position.set(0, -0.85, 0)
    rootGroup.add(perchRing)

    // Floating Data Energy Sparks
    const sparkCount = 28
    const sparkGeo = new THREE.BufferGeometry()
    const sparkPos = new Float32Array(sparkCount * 3)

    for (let s = 0; s < sparkCount; s++) {
      const angle = (s / sparkCount) * Math.PI * 2
      const radius = 1.4 + Math.random() * 0.8
      sparkPos[s * 3] = Math.cos(angle) * radius
      sparkPos[s * 3 + 1] = (Math.random() - 0.5) * 2.2
      sparkPos[s * 3 + 2] = Math.sin(angle) * radius
    }

    sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPos, 3))
    const sparkMat = new THREE.PointsMaterial({
      color: 0x34d399,
      size: 0.065,
      transparent: true,
      opacity: 0.85,
    })
    const sparks = new THREE.Points(sparkGeo, sparkMat)
    rootGroup.add(sparks)

    // ==========================================
    // 6. Smooth Animation Loop
    // ==========================================
    let reqId: number
    const clock = new THREE.Clock()

    const animate = () => {
      reqId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      // Primary continuous 3D rotation of entire assembly
      rootGroup.rotation.y = elapsed * 0.75
      rootGroup.rotation.x = Math.sin(elapsed * 0.6) * 0.12
      rootGroup.rotation.z = Math.cos(elapsed * 0.4) * 0.05

      // Subtle breathing & hovering motion
      parrotGroup.position.y = 0.08 + Math.sin(elapsed * 1.8) * 0.06

      // Head curious micro-tilt
      headGroup.rotation.y = Math.sin(elapsed * 1.2) * 0.14
      headGroup.rotation.z = Math.sin(elapsed * 0.8) * 0.06

      // Wing micro-flutter
      wingLeftGroup.rotation.z = -0.05 + Math.sin(elapsed * 2.4) * 0.04
      wingRightGroup.rotation.z = 0.05 - Math.sin(elapsed * 2.4) * 0.04

      // Orbit ring spin
      perchRing.rotation.z = elapsed * 0.35

      // Pulse spark opacity
      sparkMat.opacity = 0.6 + Math.sin(elapsed * 3) * 0.3

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
