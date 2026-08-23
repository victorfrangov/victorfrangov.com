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

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100)
    camera.position.set(0, 0.1, 6.8)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)

    // Soft Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8)
    keyLight.position.set(4, 8, 5)
    keyLight.castShadow = true
    scene.add(keyLight)

    const warmFill = new THREE.DirectionalLight(0xfef08a, 1.8)
    warmFill.position.set(-5, 4, 3)
    scene.add(warmFill)

    const emeraldRim = new THREE.DirectionalLight(0x4ade80, 2.2)
    emeraldRim.position.set(0, 4, -5)
    scene.add(emeraldRim)

    const bottomGlow = new THREE.PointLight(0x34d399, 1.6, 4)
    bottomGlow.position.set(0, -1.4, 1.2)
    scene.add(bottomGlow)

    // Master assembly group (rotates smoothly in 3D)
    const rootGroup = new THREE.Group()
    scene.add(rootGroup)

    const parrotGroup = new THREE.Group()
    parrotGroup.position.set(0, 0.15, 0)
    rootGroup.add(parrotGroup)

    // =========================================================
    // 1. Dynamic Canvas Textures for Smooth Color Transitions
    // =========================================================
    
    // Wing Texture: Smooth Gradient (Lime -> Golden Yellow -> Sunset Orange -> Coral Red)
    const wingCanvas = document.createElement("canvas")
    wingCanvas.width = 512
    wingCanvas.height = 512
    const wCtx = wingCanvas.getContext("2d")!
    const wGrad = wCtx.createLinearGradient(0, 50, 0, 500)
    wGrad.addColorStop(0.0, "#84cc16")   // Lime Green Upper Shoulder
    wGrad.addColorStop(0.32, "#84cc16")
    wGrad.addColorStop(0.55, "#eab308")  // Golden Yellow Mid-Wing
    wGrad.addColorStop(0.78, "#f97316")  // Warm Sunset Orange
    wGrad.addColorStop(1.0, "#ef4444")   // Coral Red Wing Tip
    wCtx.fillStyle = wGrad
    wCtx.fillRect(0, 0, 512, 512)
    const wingTexture = new THREE.CanvasTexture(wingCanvas)

    // Head Texture: Golden Yellow with Red Crown & Green Nape
    const headCanvas = document.createElement("canvas")
    headCanvas.width = 512
    headCanvas.height = 512
    const hCtx = headCanvas.getContext("2d")!
    hCtx.fillStyle = "#facc15" // Golden Yellow Face
    hCtx.fillRect(0, 0, 512, 512)

    // Crown Red/Coral Patch on top
    const crownGrad = hCtx.createRadialGradient(256, 110, 10, 256, 110, 140)
    crownGrad.addColorStop(0.0, "#ef4444")
    crownGrad.addColorStop(0.65, "#f97316")
    crownGrad.addColorStop(1.0, "rgba(250, 204, 21, 0)")
    hCtx.fillStyle = crownGrad
    hCtx.beginPath()
    hCtx.arc(256, 110, 140, 0, Math.PI * 2)
    hCtx.fill()
    const headTexture = new THREE.CanvasTexture(headCanvas)

    // =========================================================
    // 2. High-Quality Smooth Materials
    // =========================================================
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x65a30d, // Apple/Lime Green
      roughness: 0.4,
      metalness: 0.05,
    })

    const headMat = new THREE.MeshStandardMaterial({
      map: headTexture,
      roughness: 0.4,
      metalness: 0.05,
    })

    const wingMat = new THREE.MeshStandardMaterial({
      map: wingTexture,
      roughness: 0.38,
      metalness: 0.05,
    })

    const tailMat = new THREE.MeshStandardMaterial({
      color: 0x65a30d,
      roughness: 0.42,
      metalness: 0.05,
    })

    const beakMat = new THREE.MeshStandardMaterial({
      color: 0x273142, // Smooth Dark Slate Beak
      roughness: 0.3,
      metalness: 0.15,
    })

    const eyeRingMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.4,
    })

    const eyeGlossMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      roughness: 0.08,
      metalness: 0.9,
    })

    const feetMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.5,
    })

    // =========================================================
    // 3. Smooth Organic Body (Egg / Capsule Torso)
    // =========================================================
    const bodyGeo = new THREE.SphereGeometry(0.74, 36, 36)
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat)
    bodyMesh.scale.set(0.76, 1.22, 0.88)
    bodyMesh.rotation.x = 0.28
    bodyMesh.position.set(0, -0.08, -0.06)
    bodyMesh.castShadow = true
    parrotGroup.add(bodyMesh)

    // Smooth Chest Curvature
    const chestGeo = new THREE.SphereGeometry(0.58, 32, 32)
    const chestMesh = new THREE.Mesh(chestGeo, bodyMat)
    chestMesh.scale.set(0.72, 1.05, 0.82)
    chestMesh.position.set(0, 0.06, 0.16)
    parrotGroup.add(chestMesh)

    // =========================================================
    // 4. Head & Face (Golden Head with Coral Crown & Curved Beak)
    // =========================================================
    const headGroup = new THREE.Group()
    headGroup.position.set(0, 0.84, 0.22)
    parrotGroup.add(headGroup)

    const headGeo = new THREE.SphereGeometry(0.52, 36, 36)
    const headMesh = new THREE.Mesh(headGeo, headMat)
    headMesh.scale.set(0.88, 1.02, 0.96)
    headMesh.rotation.x = 0.15
    headMesh.castShadow = true
    headGroup.add(headMesh)

    // Curved Upper Beak (Hooked Mandible)
    const upperBeakGeo = new THREE.ConeGeometry(0.24, 0.62, 32)
    const upperBeak = new THREE.Mesh(upperBeakGeo, beakMat)
    upperBeak.scale.set(0.72, 1.0, 0.82)
    upperBeak.rotation.x = Math.PI / 2.35
    upperBeak.position.set(0, -0.04, 0.52)
    headGroup.add(upperBeak)

    // Lower Beak
    const lowerBeakGeo = new THREE.ConeGeometry(0.14, 0.26, 32)
    const lowerBeak = new THREE.Mesh(lowerBeakGeo, beakMat)
    lowerBeak.scale.set(0.72, 1.0, 0.78)
    lowerBeak.rotation.x = Math.PI / 2.15
    lowerBeak.position.set(0, -0.22, 0.44)
    headGroup.add(lowerBeak)

    // Eyes with Specular Sparkle
    for (const side of [-1, 1]) {
      const eyeSubGroup = new THREE.Group()
      eyeSubGroup.position.set(side * 0.38, 0.14, 0.24)
      eyeSubGroup.rotation.y = side * 0.42
      headGroup.add(eyeSubGroup)

      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.024, 16, 32), eyeRingMat)
      ring.rotation.y = Math.PI / 2
      eyeSubGroup.add(ring)

      const eyeball = new THREE.Mesh(new THREE.SphereGeometry(0.09, 24, 24), eyeGlossMat)
      eyeSubGroup.add(eyeball)

      const spec = new THREE.Mesh(new THREE.SphereGeometry(0.026, 12, 12), eyeRingMat)
      spec.position.set(side * 0.02, 0.035, 0.075)
      eyeSubGroup.add(spec)
    }

    // =========================================================
    // 5. Smooth Contiguous Wings (Single Curved Extruded Profile)
    // =========================================================
    const createSmoothWingGeometry = () => {
      const wingShape = new THREE.Shape()
      wingShape.moveTo(0, 0)
      wingShape.bezierCurveTo(0.25, -0.1, 0.42, -0.5, 0.38, -1.0)
      wingShape.bezierCurveTo(0.34, -1.45, 0.2, -1.85, 0, -2.15) // Tapered wingtip
      wingShape.bezierCurveTo(-0.16, -1.75, -0.28, -1.2, -0.24, -0.65)
      wingShape.bezierCurveTo(-0.2, -0.25, -0.1, -0.05, 0, 0)

      return new THREE.ExtrudeGeometry(wingShape, {
        depth: 0.12,
        bevelEnabled: true,
        bevelSegments: 16,
        steps: 4,
        bevelSize: 0.08,
        bevelThickness: 0.06,
      })
    }

    const wingGeo = createSmoothWingGeometry()

    // Left Wing
    const wingLeft = new THREE.Mesh(wingGeo, wingMat)
    wingLeft.position.set(-0.48, 0.42, 0.05)
    wingLeft.rotation.set(-0.25, 0.28, 0.18)
    wingLeft.scale.set(0.95, 0.95, 0.95)
    wingLeft.castShadow = true
    parrotGroup.add(wingLeft)

    // Right Wing
    const wingRight = new THREE.Mesh(wingGeo, wingMat)
    wingRight.position.set(0.48, 0.42, 0.05)
    wingRight.rotation.set(-0.25, -0.28, -0.18)
    wingRight.scale.set(0.95, 0.95, 0.95)
    wingRight.castShadow = true
    parrotGroup.add(wingRight)

    // =========================================================
    // 6. Smooth Tapering Tail Fan (No weird cones, flat plumage)
    // =========================================================
    const createSmoothTailGeometry = () => {
      const tailShape = new THREE.Shape()
      tailShape.moveTo(0, 0)
      tailShape.bezierCurveTo(0.18, -0.4, 0.22, -1.0, 0.08, -1.7)
      tailShape.lineTo(0, -1.85) // Center tail feather tip
      tailShape.lineTo(-0.08, -1.7)
      tailShape.bezierCurveTo(-0.22, -1.0, -0.18, -0.4, 0, 0)

      return new THREE.ExtrudeGeometry(tailShape, {
        depth: 0.04,
        bevelEnabled: true,
        bevelSegments: 12,
        steps: 2,
        bevelSize: 0.04,
        bevelThickness: 0.03,
      })
    }

    const tailGeo = createSmoothTailGeometry()
    const tailMesh = new THREE.Mesh(tailGeo, tailMat)
    tailMesh.position.set(0, -0.72, -0.32)
    tailMesh.rotation.set(0.55, 0, 0)
    tailMesh.castShadow = true
    parrotGroup.add(tailMesh)

    // =========================================================
    // 7. Perched Legs & Non-Clipping Perch Ring
    // =========================================================
    const legsGroup = new THREE.Group()
    legsGroup.position.set(0, -0.75, 0.08)
    parrotGroup.add(legsGroup)

    for (const side of [-1, 1]) {
      const leg = new THREE.Group()
      leg.position.set(side * 0.22, 0, 0)
      legsGroup.add(leg)

      const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.05, 0.45, 16), feetMat)
      thigh.position.set(0, -0.16, -0.04)
      thigh.rotation.x = -0.15
      leg.add(thigh)

      for (let c = -1; c <= 1; c++) {
        const claw = new THREE.Mesh(new THREE.ConeGeometry(0.038, 0.25, 12), feetMat)
        claw.position.set(c * 0.06, -0.35, 0.06)
        claw.rotation.x = Math.PI / 2.3
        claw.rotation.y = c * 0.25
        leg.add(claw)
      }

      const backClaw = new THREE.Mesh(new THREE.ConeGeometry(0.038, 0.22, 12), feetMat)
      backClaw.position.set(0, -0.35, -0.12)
      backClaw.rotation.x = -Math.PI / 2.4
      leg.add(backClaw)
    }

    // Glowing Perch Orbit Ring Placed Cleanly Underneath the Feet
    const perchRingGeo = new THREE.TorusGeometry(1.65, 0.016, 16, 64)
    const perchRingMat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      emissive: 0x059669,
      emissiveIntensity: 0.4,
      metalness: 0.8,
      roughness: 0.2,
    })
    const perchRing = new THREE.Mesh(perchRingGeo, perchRingMat)
    perchRing.rotation.x = Math.PI / 2.35
    perchRing.position.set(0, -1.35, 0) // Sits below the talons
    rootGroup.add(perchRing)

    // =========================================================
    // 8. Smooth Animation Loop
    // =========================================================
    let reqId: number
    const clock = new THREE.Clock()

    const animate = () => {
      reqId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      // Primary continuous 3D rotation
      rootGroup.rotation.y = elapsed * 0.62
      rootGroup.rotation.x = Math.sin(elapsed * 0.45) * 0.05
      rootGroup.rotation.z = Math.cos(elapsed * 0.35) * 0.025

      // Gentle organic breathing/hovering
      parrotGroup.position.y = 0.15 + Math.sin(elapsed * 1.8) * 0.035

      // Subtle curious head micro-tilt
      headGroup.rotation.y = Math.sin(elapsed * 1.1) * 0.1
      headGroup.rotation.z = Math.sin(elapsed * 0.7) * 0.04

      // Perch ring counter-rotation
      perchRing.rotation.z = elapsed * 0.25

      renderer.render(scene, camera)
    }

    animate()

    // Dynamic Resizing
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
