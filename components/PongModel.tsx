"use client"

import React, { useEffect, useRef } from "react"
import * as THREE from "three"

export default function PongModel() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup with transparent background
    const scene = new THREE.Scene()

    const width = container.clientWidth || 600
    const height = container.clientHeight || 375

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100)
    camera.position.set(0, 3.2, 7.5)
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

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8)
    keyLight.position.set(5, 8, 6)
    keyLight.castShadow = true
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xf43f5e, 1.2)
    fillLight.position.set(-6, 3, -4)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.2)
    rimLight.position.set(6, -2, -4)
    scene.add(rimLight)

    // Master group for the entire rotating assembly
    const rootGroup = new THREE.Group()
    scene.add(rootGroup)

    // Helper to construct a detailed Ping Pong Paddle / Racket
    function createPaddle(rubberColor: number, backRubberColor: number) {
      const paddleGroup = new THREE.Group()

      // 1. Wooden Blade Head (Oval cylinder)
      const bladeGeo = new THREE.CylinderGeometry(1.25, 1.25, 0.08, 36)
      const woodMat = new THREE.MeshStandardMaterial({
        color: 0xdeb887, // Natural wood tone
        roughness: 0.45,
        metalness: 0.05,
      })
      const blade = new THREE.Mesh(bladeGeo, woodMat)
      blade.scale.set(1.0, 1.0, 1.15)
      paddleGroup.add(blade)

      // 2. Front Rubber Layer
      const rubberFrontGeo = new THREE.CylinderGeometry(1.23, 1.23, 0.04, 36)
      const rubberFrontMat = new THREE.MeshStandardMaterial({
        color: rubberColor,
        roughness: 0.35,
        metalness: 0.08,
      })
      const rubberFront = new THREE.Mesh(rubberFrontGeo, rubberFrontMat)
      rubberFront.scale.set(1.0, 1.0, 1.15)
      rubberFront.position.y = 0.05
      paddleGroup.add(rubberFront)

      // 3. Back Rubber Layer
      const rubberBackGeo = new THREE.CylinderGeometry(1.23, 1.23, 0.04, 36)
      const rubberBackMat = new THREE.MeshStandardMaterial({
        color: backRubberColor,
        roughness: 0.35,
        metalness: 0.08,
      })
      const rubberBack = new THREE.Mesh(rubberBackGeo, rubberBackMat)
      rubberBack.scale.set(1.0, 1.0, 1.15)
      rubberBack.position.y = -0.05
      paddleGroup.add(rubberBack)

      // 4. Edge Tape Band
      const edgeTapeGeo = new THREE.CylinderGeometry(1.26, 1.26, 0.12, 36, 1, true)
      const edgeTapeMat = new THREE.MeshStandardMaterial({
        color: 0x18181b, // Black edge tape
        roughness: 0.5,
        side: THREE.DoubleSide,
      })
      const edgeTape = new THREE.Mesh(edgeTapeGeo, edgeTapeMat)
      edgeTape.scale.set(1.0, 1.0, 1.15)
      paddleGroup.add(edgeTape)

      // 5. Wooden Ergonomic Handle
      const handleGeo = new THREE.BoxGeometry(0.48, 0.28, 1.5)
      const handleWoodMat = new THREE.MeshStandardMaterial({
        color: 0xc89d6c,
        roughness: 0.4,
        metalness: 0.05,
      })
      const handle = new THREE.Mesh(handleGeo, handleWoodMat)
      handle.position.set(0, 0, 1.8)
      paddleGroup.add(handle)

      // Handle flared grips
      const gripGeo = new THREE.BoxGeometry(0.5, 0.3, 0.8)
      const gripMat = new THREE.MeshStandardMaterial({ color: 0xa07142, roughness: 0.35 })
      const grip = new THREE.Mesh(gripGeo, gripMat)
      grip.position.set(0, 0, 2.0)
      paddleGroup.add(grip)

      // Lens emblem in handle
      const lensGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.32, 16)
      const lensMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.8, roughness: 0.2 })
      const lens = new THREE.Mesh(lensGeo, lensMat)
      lens.position.set(0, 0, 2.2)
      paddleGroup.add(lens)

      return paddleGroup
    }

    // --- Stationary Dual Paddle Setup ---
    // Paddle 1: Left Red Paddle, angled inward
    const paddle1 = createPaddle(0xdc2626, 0x18181b)
    paddle1.position.set(-1.8, 0, 0)
    paddle1.rotation.set(0.15, 0.35, Math.PI / 2)
    rootGroup.add(paddle1)

    // Paddle 2: Right Black Paddle, angled inward
    const paddle2 = createPaddle(0x18181b, 0xdc2626)
    paddle2.position.set(1.8, 0, 0)
    paddle2.rotation.set(-0.15, -0.35, -Math.PI / 2)
    rootGroup.add(paddle2)

    // --- Stationary Ping Pong Ball in Center ---
    const ballGeo = new THREE.SphereGeometry(0.34, 32, 32)
    const ballMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.25,
      metalness: 0.05,
    })
    const ball = new THREE.Mesh(ballGeo, ballMat)
    ball.position.set(0, 0, 0)
    ball.castShadow = true
    rootGroup.add(ball)

    // Subtle orbital ring around ball
    const ringGeo = new THREE.TorusGeometry(0.55, 0.015, 16, 64)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.4,
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2.5
    rootGroup.add(ring)

    // --- Animation: Pure 360° Continuous Spin Around Axis ---
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

    const animate = () => {
      reqId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      // Smooth rotation lerp
      currentRotY += (targetRotY - currentRotY) * 0.06
      currentRotX += (targetRotX - currentRotX) * 0.06

      // Continuous 360° spin around central axis with gentle float (slow and smooth)
      rootGroup.rotation.y = elapsed * 0.3 + currentRotY
      rootGroup.rotation.x = currentRotX + Math.sin(elapsed * 0.35) * 0.06
      rootGroup.rotation.z = Math.cos(elapsed * 0.3) * 0.03

      // Gentle floating spin on center ball ring
      ring.rotation.z = elapsed * 0.6

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
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
        <span>3D Interactive</span>
      </div>
    </div>
  )
}
