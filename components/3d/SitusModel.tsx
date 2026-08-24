"use client"

import React, { useEffect, useRef } from "react"
import * as THREE from "three"

export default function SitusModel() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup with transparent background
    const scene = new THREE.Scene()

    const width = container.clientWidth || 600
    const height = container.clientHeight || 375

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100)
    camera.position.set(0, 0, 8.2)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)

    // Studio lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.5)
    keyLight.position.set(4, 8, 6)
    keyLight.castShadow = true
    scene.add(keyLight)

    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 2.4)
    cyanRim.position.set(-6, 3, -4)
    scene.add(cyanRim)

    const purpleRim = new THREE.DirectionalLight(0xa855f7, 2.0)
    purpleRim.position.set(6, -3, -3)
    scene.add(purpleRim)

    const centerGlow = new THREE.PointLight(0x38bdf8, 2.5, 4.5)
    centerGlow.position.set(0, 0, 1.5)
    scene.add(centerGlow)

    // Master assembly group (oscillates smoothly without flipping backward)
    const rootGroup = new THREE.Group()
    scene.add(rootGroup)

    // Material: Solid Deep Black Swiss Typography
    const letterMat = new THREE.MeshPhysicalMaterial({
      color: 0x000000, // Pure black
      emissive: 0x0f172a,
      emissiveIntensity: 0.2,
      roughness: 0.25,
      metalness: 0.15,
      clearcoat: 0.6,
      clearcoatRoughness: 0.15,
    })

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.42,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.045,
      bevelThickness: 0.045,
    }

    // ==========================================
    // 1. Perfectly Balanced Swiss Lowercase "s"
    // ==========================================
    const sShape = new THREE.Shape()

    // Smooth outer and inner contour of bold lowercase "s"
    sShape.moveTo(0.85, 0.45)
    sShape.bezierCurveTo(0.85, 0.95, 0.50, 1.28, 0.0, 1.28)
    sShape.bezierCurveTo(-0.58, 1.28, -0.92, 0.92, -0.92, 0.45)
    sShape.lineTo(-0.42, 0.45)
    sShape.bezierCurveTo(-0.42, 0.72, -0.22, 0.88, 0.0, 0.88)
    sShape.bezierCurveTo(0.24, 0.88, 0.42, 0.70, 0.42, 0.45)
    sShape.bezierCurveTo(0.42, 0.18, 0.15, 0.05, -0.28, -0.15)
    sShape.bezierCurveTo(-0.75, -0.38, -0.98, -0.68, -0.98, -1.15)
    sShape.bezierCurveTo(-0.98, -1.68, -0.55, -2.0, 0.05, -2.0)
    sShape.bezierCurveTo(0.68, -2.0, 1.05, -1.62, 1.05, -1.1)
    sShape.lineTo(0.55, -1.1)
    sShape.bezierCurveTo(0.55, -1.42, 0.38, -1.60, 0.05, -1.60)
    sShape.bezierCurveTo(-0.25, -1.60, -0.48, -1.42, -0.48, -1.15)
    sShape.bezierCurveTo(-0.48, -0.88, -0.25, -0.72, 0.18, -0.52)
    sShape.bezierCurveTo(0.65, -0.30, 0.85, 0.02, 0.85, 0.45)

    const sGeo = new THREE.ExtrudeGeometry(sShape, extrudeSettings)
    sGeo.center()
    const sMesh = new THREE.Mesh(sGeo, letterMat)
    // Full width & thickness, but less tall (compressed Y height to match x-height)
    sMesh.scale.set(-0.75, 0.52, 0.75)
    sMesh.position.set(-1.05, -0.22, 0)
    sMesh.castShadow = true
    rootGroup.add(sMesh)

    // ==========================================
    // 2. Lowercase "d" Shape (Clean vertical stem, raised circular bulge)
    // ==========================================
    const dShape = new THREE.Shape()

    const stemLeft = 0.28
    const stemRight = 0.95
    const stemTop = 1.75
    const stemBottom = -1.15
    const bowlCenterY = -0.22 // Moved upwards

    // Outer contour: Straight vertical stem (no tail spur) + raised circular bowl on left
    dShape.moveTo(stemRight, stemTop)
    dShape.lineTo(stemRight, stemBottom)
    dShape.lineTo(stemLeft, stemBottom)
    // Left circular bowl (raised)
    dShape.bezierCurveTo(stemLeft, stemBottom, 0.1, stemBottom, -0.25, stemBottom)
    dShape.bezierCurveTo(-0.95, stemBottom, -1.35, -0.72, -1.35, bowlCenterY)
    dShape.bezierCurveTo(-1.35, 0.28, -0.95, 0.68, -0.25, 0.68)
    dShape.bezierCurveTo(0.1, 0.68, stemLeft, 0.55, stemLeft, 0.48)
    dShape.lineTo(stemLeft, stemTop)
    dShape.closePath()

    // Inner circular hole cut out of the raised bowl
    const dHole = new THREE.Path()
    const holeRadius = 0.52
    dHole.absarc(-0.25, bowlCenterY, holeRadius, 0, Math.PI * 2, true)
    dShape.holes.push(dHole)

    const dGeo = new THREE.ExtrudeGeometry(dShape, extrudeSettings)
    dGeo.center()
    const dMesh = new THREE.Mesh(dGeo, letterMat)
    dMesh.scale.set(1.05, 1.05, 1.05)
    dMesh.position.set(0.95, 0.12, 0)
    dMesh.castShadow = true
    rootGroup.add(dMesh)

    // ==========================================
    // 3. Orbital Brand Halo Rings & Floating Sparks
    // ==========================================
    const ringGeo1 = new THREE.TorusGeometry(2.7, 0.018, 16, 80)
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
    })
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1)
    ring1.rotation.x = Math.PI / 3.2
    rootGroup.add(ring1)

    const ringGeo2 = new THREE.TorusGeometry(2.9, 0.014, 16, 80)
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.35,
    })
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2)
    ring2.rotation.x = -Math.PI / 3.5
    ring2.rotation.y = Math.PI / 6
    rootGroup.add(ring2)

    // Orbiting Satellite Beads
    const beadGeo = new THREE.SphereGeometry(0.08, 16, 16)
    const beadMat1 = new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    const bead1 = new THREE.Mesh(beadGeo, beadMat1)
    rootGroup.add(bead1)

    const beadMat2 = new THREE.MeshBasicMaterial({ color: 0xc084fc })
    const bead2 = new THREE.Mesh(beadGeo, beadMat2)
    rootGroup.add(bead2)

    // Ambient floating constellation nodes
    const particleCount = 45
    const particleGeo = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 6.0
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 3.8
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 3.0
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3))
    const particleMat = new THREE.PointsMaterial({
      color: 0xbae6fd,
      size: 0.045,
      transparent: true,
      opacity: 0.6,
    })
    const particleSystem = new THREE.Points(particleGeo, particleMat)
    rootGroup.add(particleSystem)

    // ==========================================
    // 4. Smooth Front-Facing Pendulum 3D Rotation & Parallax
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
      targetRotY = x * 0.5
      targetRotX = -y * 0.25
    }

    container.addEventListener("mousemove", handleMouseMove)

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect()
        const touch = e.touches[0]
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1
        const y = -(((touch.clientY - touch.pageY) / rect.height) * 2 - 1)
        targetRotY = x * 0.5
        targetRotX = -y * 0.25
      }
    }
    container.addEventListener("touchmove", handleTouchMove, { passive: true })

    let isVisible = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { threshold: 0.05 }
    )
    observer.observe(container)

    const animate = () => {
      reqId = requestAnimationFrame(animate)
      if (!isVisible) return

      const elapsed = clock.getElapsedTime()

      // Smooth rotation lerp
      currentRotY += (targetRotY - currentRotY) * 0.06
      currentRotX += (targetRotX - currentRotX) * 0.06

      // Keep "sd" legible and front-facing with smooth oscillating 3D angle
      rootGroup.rotation.y = Math.sin(elapsed * 0.65) * 0.38 + currentRotY
      rootGroup.rotation.x = currentRotX + Math.sin(elapsed * 0.35) * 0.06
      rootGroup.rotation.z = Math.cos(elapsed * 0.3) * 0.03

      // Individual subtle dynamic floating motion on the s & d letters
      sMesh.position.y = -0.22 + Math.sin(elapsed * 1.5) * 0.03
      dMesh.position.y = 0.12 - Math.sin(elapsed * 1.5) * 0.03

      // Rotate orbital rings
      ring1.rotation.z = elapsed * 0.4
      ring2.rotation.z = -elapsed * 0.35

      // Satellite beads orbiting along rings
      const bAngle1 = elapsed * 1.2
      bead1.position.set(
        Math.cos(bAngle1) * 2.7,
        Math.sin(bAngle1) * Math.sin(Math.PI / 3.2) * 2.7,
        Math.sin(bAngle1) * Math.cos(Math.PI / 3.2) * 2.7
      )

      const bAngle2 = -elapsed * 1.0
      bead2.position.set(
        Math.cos(bAngle2) * 2.9,
        Math.sin(bAngle2) * Math.sin(-Math.PI / 3.5) * 2.9,
        Math.sin(bAngle2) * Math.cos(-Math.PI / 3.5) * 2.9
      )

      centerGlow.intensity = 2.2 + Math.sin(elapsed * 2.5) * 0.8

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
      observer.disconnect()
      window.removeEventListener("resize", handleResize)
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("touchmove", handleTouchMove)

      scene.traverse((object: any) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((mat: any) => {
              if (mat.map) mat.map.dispose()
              mat.dispose()
            })
          } else {
            if (object.material.map) object.material.map.dispose()
            object.material.dispose()
          }
        }
      })

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      renderer.forceContextLoss()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-transparent select-none pointer-events-none"
    />
  )
}
