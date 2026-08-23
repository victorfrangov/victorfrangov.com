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
    camera.position.set(0, 0.05, 6.8)
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

    // Master assembly group (rotates continuously in 3D)
    const rootGroup = new THREE.Group()
    scene.add(rootGroup)

    const parrotGroup = new THREE.Group()
    parrotGroup.position.set(0, 0.15, 0)
    rootGroup.add(parrotGroup)

    // =========================================================
    // 1. High-Quality Organic Materials (Smooth Shading)
    // =========================================================
    const limeGreenMat = new THREE.MeshStandardMaterial({
      color: 0x65a30d, // Rich lime green body
      roughness: 0.45,
      metalness: 0.05,
    })

    const brightLimeMat = new THREE.MeshStandardMaterial({
      color: 0x84cc16, // Bright lime upper wing
      roughness: 0.4,
      metalness: 0.05,
    })

    const yellowHeadMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15, // Warm golden yellow head
      roughness: 0.4,
      metalness: 0.05,
    })

    const coralRedCrownMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e, // Vibrant coral red forehead patch
      roughness: 0.4,
      metalness: 0.05,
    })

    const yellowWingMat = new THREE.MeshStandardMaterial({
      color: 0xeab308, // Golden mid-wing feathers
      roughness: 0.4,
      metalness: 0.05,
    })

    const orangeFlightMat = new THREE.MeshStandardMaterial({
      color: 0xf97316, // Bright orange lower flight feathers
      roughness: 0.4,
      metalness: 0.05,
    })

    const redWingTipMat = new THREE.MeshStandardMaterial({
      color: 0xe11d48, // Crimson tip accents
      roughness: 0.4,
      metalness: 0.05,
    })

    const beakMat = new THREE.MeshStandardMaterial({
      color: 0x334155, // Dark slate/charcoal beak
      roughness: 0.35,
      metalness: 0.15,
    })

    const eyeRingMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0, // Light off-white eye ring
      roughness: 0.5,
    })

    const eyeGlossMat = new THREE.MeshStandardMaterial({
      color: 0x09090b, // Deep glossy black eye
      roughness: 0.1,
      metalness: 0.8,
    })

    const feetMat = new THREE.MeshStandardMaterial({
      color: 0x475569, // Slate gray legs and claws
      roughness: 0.55,
    })

    // =========================================================
    // 2. Smooth Organic Body (Egg / Capsule Torso)
    // =========================================================
    const bodyGeo = new THREE.SphereGeometry(0.72, 32, 32)
    const bodyMesh = new THREE.Mesh(bodyGeo, limeGreenMat)
    bodyMesh.scale.set(0.78, 1.25, 0.88)
    bodyMesh.rotation.x = 0.28
    bodyMesh.position.set(0, -0.05, -0.05)
    bodyMesh.castShadow = true
    parrotGroup.add(bodyMesh)

    // Smooth Chest Volume
    const chestGeo = new THREE.SphereGeometry(0.55, 32, 32)
    const chestMesh = new THREE.Mesh(chestGeo, limeGreenMat)
    chestMesh.scale.set(0.72, 1.05, 0.82)
    chestMesh.position.set(0, 0.08, 0.18)
    parrotGroup.add(chestMesh)

    // =========================================================
    // 3. Head & Facial Features (Matching Papagal Logo)
    // =========================================================
    const headGroup = new THREE.Group()
    headGroup.position.set(0, 0.82, 0.22)
    parrotGroup.add(headGroup)

    // Round Yellow Head
    const headGeo = new THREE.SphereGeometry(0.52, 32, 32)
    const headMesh = new THREE.Mesh(headGeo, yellowHeadMat)
    headMesh.scale.set(0.88, 1.02, 0.95)
    headMesh.castShadow = true
    headGroup.add(headMesh)

    // Coral / Red Forehead & Crown Patch (Distinctive Logo Feature)
    const crownGeo = new THREE.SphereGeometry(0.32, 24, 24)
    const crownMesh = new THREE.Mesh(crownGeo, coralRedCrownMat)
    crownMesh.scale.set(0.68, 0.72, 0.65)
    crownMesh.position.set(0, 0.34, 0.24)
    crownMesh.rotation.x = -0.35
    headGroup.add(crownMesh)

    // Curved Upper Beak (Hooked Mandible)
    const beakGroup = new THREE.Group()
    beakGroup.position.set(0, 0.02, 0.44)
    headGroup.add(beakGroup)

    const upperBeakGeo = new THREE.ConeGeometry(0.24, 0.62, 32)
    const upperBeak = new THREE.Mesh(upperBeakGeo, beakMat)
    upperBeak.scale.set(0.75, 1.0, 0.85)
    upperBeak.rotation.x = Math.PI / 2.35
    upperBeak.position.set(0, -0.06, 0.12)
    beakGroup.add(upperBeak)

    // Lower Beak Mandible
    const lowerBeakGeo = new THREE.ConeGeometry(0.15, 0.28, 32)
    const lowerBeak = new THREE.Mesh(lowerBeakGeo, beakMat)
    lowerBeak.scale.set(0.75, 1.0, 0.8)
    lowerBeak.rotation.x = Math.PI / 2.1
    lowerBeak.position.set(0, -0.22, 0.06)
    beakGroup.add(lowerBeak)

    // Eyes (Left & Right with White Ring & Specular Highlight)
    for (const side of [-1, 1]) {
      const eyeSubGroup = new THREE.Group()
      eyeSubGroup.position.set(side * 0.38, 0.12, 0.22)
      eyeSubGroup.rotation.y = side * 0.42
      headGroup.add(eyeSubGroup)

      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.025, 16, 32), eyeRingMat)
      ring.rotation.y = Math.PI / 2
      eyeSubGroup.add(ring)

      const eyeball = new THREE.Mesh(new THREE.SphereGeometry(0.09, 24, 24), eyeGlossMat)
      eyeSubGroup.add(eyeball)

      const spec = new THREE.Mesh(new THREE.SphereGeometry(0.024, 12, 12), eyeRingMat)
      spec.position.set(side * 0.02, 0.035, 0.075)
      eyeSubGroup.add(spec)
    }

    // =========================================================
    // 4. Layered Wings (Turned 45 Degrees)
    // =========================================================
    const wingLeftGroup = new THREE.Group()
    wingLeftGroup.position.set(-0.52, 0.32, -0.05)
    wingLeftGroup.rotation.y = Math.PI / 4 // Turned 45 degrees
    parrotGroup.add(wingLeftGroup)

    const wingRightGroup = new THREE.Group()
    wingRightGroup.position.set(0.52, 0.32, -0.05)
    wingRightGroup.rotation.y = -Math.PI / 4 // Turned 45 degrees
    parrotGroup.add(wingRightGroup)

    const buildOrganicWing = (group: THREE.Group, isLeft: boolean) => {
      const dir = isLeft ? -1 : 1

      // Layer 1: Upper Shoulder (Smooth Sphere Covert)
      const w1Geo = new THREE.SphereGeometry(0.48, 24, 24)
      const w1 = new THREE.Mesh(w1Geo, brightLimeMat)
      w1.scale.set(0.42, 1.25, 0.72)
      w1.position.set(dir * 0.06, -0.32, -0.06)
      w1.rotation.z = dir * 0.22
      w1.rotation.x = -0.32
      group.add(w1)

      // Layer 2: Mid-Wing (Golden Yellow) - Flipped
      const w2Geo = new THREE.ConeGeometry(0.35, 1.4, 24)
      const w2 = new THREE.Mesh(w2Geo, yellowWingMat)
      w2.scale.set(0.55, 1.0, 0.85)
      w2.position.set(dir * 0.08, -0.45, -0.12)
      w2.rotation.z = dir * 0.24
      w2.rotation.x = -0.42 // Flipped
      group.add(w2)

      // Layer 3: Lower Flight (Sunset Orange) - Flipped
      const w3Geo = new THREE.ConeGeometry(0.28, 1.3, 24)
      const w3 = new THREE.Mesh(w3Geo, orangeFlightMat)
      w3.scale.set(0.52, 1.0, 0.78)
      w3.position.set(dir * 0.09, -0.65, -0.22)
      w3.rotation.z = dir * 0.26
      w3.rotation.x = -0.52 // Flipped
      group.add(w3)

      // Layer 4: Tip Accent (Coral Red) - Flipped
      const w4Geo = new THREE.ConeGeometry(0.2, 1.0, 24)
      const w4 = new THREE.Mesh(w4Geo, redWingTipMat)
      w4.scale.set(0.45, 1.0, 0.72)
      w4.position.set(dir * 0.08, -0.85, -0.32)
      w4.rotation.z = dir * 0.28
      w4.rotation.x = -0.6 // Flipped
      group.add(w4)
    }

    buildOrganicWing(wingLeftGroup, true)
    buildOrganicWing(wingRightGroup, false)

    // =========================================================
    // 5. Tail Feathers (Pointy Tips Buried High Inside Lower Body)
    // =========================================================
    const tailGroup = new THREE.Group()
    // Positioned deep inside the body so tips remain hidden inside the torso
    tailGroup.position.set(0, -0.15, -0.25)
    parrotGroup.add(tailGroup)

    // Center Tail Feather (Flipped)
    const tailGeo = new THREE.ConeGeometry(0.24, 1.8, 24)
    const tailMain = new THREE.Mesh(tailGeo, limeGreenMat)
    tailMain.scale.set(0.65, 1.0, 0.9)
    tailMain.position.set(0, -0.45, -0.15)
    tailMain.rotation.x = 0.55 // Flipped
    tailGroup.add(tailMain)

    // Side Accent Feathers (Flipped)
    for (const side of [-1, 1]) {
      const tailSide = new THREE.Mesh(new THREE.ConeGeometry(0.16, 1.45, 24), brightLimeMat)
      tailSide.scale.set(0.6, 1.0, 0.85)
      tailSide.position.set(side * 0.12, -0.35, -0.1)
      tailSide.rotation.x = 0.52 // Flipped
      tailSide.rotation.z = side * 0.12
      tailGroup.add(tailSide)
    }

    // =========================================================
    // 6. Perched Legs & Talons
    // =========================================================
    const legsGroup = new THREE.Group()
    legsGroup.position.set(0, -0.75, 0.12)
    parrotGroup.add(legsGroup)

    for (const side of [-1, 1]) {
      const leg = new THREE.Group()
      leg.position.set(side * 0.22, 0, 0)
      legsGroup.add(leg)

      // Thigh / Leg Stem
      const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.055, 0.45, 16), feetMat)
      thigh.position.set(0, -0.18, -0.04)
      thigh.rotation.x = -0.15
      leg.add(thigh)

      // 3 Front Claws & 1 Back Claw
      for (let c = -1; c <= 1; c++) {
        const claw = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.26, 12), feetMat)
        claw.position.set(c * 0.065, -0.38, 0.08)
        claw.rotation.x = Math.PI / 2.3
        claw.rotation.y = c * 0.3
        leg.add(claw)
      }

      // Back Claw
      const backClaw = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.22, 12), feetMat)
      backClaw.position.set(0, -0.38, -0.12)
      backClaw.rotation.x = -Math.PI / 2.4
      leg.add(backClaw)
    }

    // =========================================================
    // 7. Smooth Animation Loop
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

      // Curious subtle head tilt
      headGroup.rotation.y = Math.sin(elapsed * 1.1) * 0.1
      headGroup.rotation.z = Math.sin(elapsed * 0.7) * 0.04

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
