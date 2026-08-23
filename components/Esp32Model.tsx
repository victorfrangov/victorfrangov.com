"use client"

import React, { useEffect, useRef } from "react"
import * as THREE from "three"

export default function Esp32Model() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup with transparent background
    const scene = new THREE.Scene()

    const width = container.clientWidth || 600
    const height = container.clientHeight || 375

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100)
    camera.position.set(0, 4.0, 6.6)
    camera.lookAt(0, 0.2, 0)

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
    keyLight.position.set(4, 8, 6)
    keyLight.castShadow = true
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0x7dd3fc, 1.2)
    fillLight.position.set(-6, 4, -4)
    scene.add(fillLight)

    const oledGlowLight = new THREE.PointLight(0x38bdf8, 2.5, 3.5)
    oledGlowLight.position.set(0, 0.3, 1.2)
    scene.add(oledGlowLight)

    // Master assembly group (rotates in 3D)
    const rootGroup = new THREE.Group()
    scene.add(rootGroup)

    // ==========================================
    // 1. ESP32 DevKit Board (Black PCB)
    // ==========================================
    const espGroup = new THREE.Group()
    espGroup.position.set(0, 0.3, -0.8)
    rootGroup.add(espGroup)

    // Black PCB Body
    const pcbW = 1.4
    const pcbH = 0.08
    const pcbL = 3.2
    const pcbGeo = new THREE.BoxGeometry(pcbW, pcbH, pcbL)
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x121212,
      roughness: 0.35,
      metalness: 0.2,
    })
    const pcb = new THREE.Mesh(pcbGeo, pcbMat)
    pcb.castShadow = true
    espGroup.add(pcb)

    // Metallic RF Shield (ESP-WROOM-32)
    const shieldGeo = new THREE.BoxGeometry(1.05, 0.14, 1.25)
    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0xd4d8de,
      roughness: 0.22,
      metalness: 0.9,
    })
    const shield = new THREE.Mesh(shieldGeo, shieldMat)
    shield.position.set(0, pcbH / 2 + 0.07, 0.5)
    shield.castShadow = true
    espGroup.add(shield)

    // Dual USB-C / Micro-USB ports at top end
    const usbGeo = new THREE.BoxGeometry(0.42, 0.18, 0.4)
    const usbMat = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      roughness: 0.25,
      metalness: 0.95,
    })
    ;[-0.32, 0.32].forEach((x) => {
      const usb = new THREE.Mesh(usbGeo, usbMat)
      usb.position.set(x, pcbH / 2 + 0.09, -pcbL / 2 + 0.15)
      usb.castShadow = true
      espGroup.add(usb)
    })

    // Main IC Chip
    const icGeo = new THREE.BoxGeometry(0.45, 0.06, 0.45)
    const icMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      roughness: 0.2,
      metalness: 0.1,
    })
    const ic = new THREE.Mesh(icGeo, icMat)
    ic.position.set(0, pcbH / 2 + 0.03, -0.35)
    ic.rotation.y = Math.PI / 4
    espGroup.add(ic)

    // Status LEDs (Blue & Red)
    const ledBlueGeo = new THREE.BoxGeometry(0.08, 0.06, 0.08)
    const ledBlueMat = new THREE.MeshBasicMaterial({ color: 0x00b4d8 })
    const ledBlue = new THREE.Mesh(ledBlueGeo, ledBlueMat)
    ledBlue.position.set(-0.38, pcbH / 2 + 0.03, 0.1)
    espGroup.add(ledBlue)

    const ledRedGeo = new THREE.BoxGeometry(0.08, 0.06, 0.08)
    const ledRedMat = new THREE.MeshBasicMaterial({ color: 0xef4444 })
    const ledRed = new THREE.Mesh(ledRedGeo, ledRedMat)
    ledRed.position.set(0.38, pcbH / 2 + 0.03, 0.1)
    espGroup.add(ledRed)

    // Push Buttons (EN & BOOT)
    const btnGeo = new THREE.BoxGeometry(0.18, 0.1, 0.18)
    const btnMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.8 })
    ;[-0.45, 0.45].forEach((x) => {
      const btn = new THREE.Mesh(btnGeo, btnMat)
      btn.position.set(x, pcbH / 2 + 0.05, -pcbL / 2 + 0.55)
      espGroup.add(btn)
    })

    // GPIO Pin Headers along Left & Right sides of the ESP32
    const pinHeaderGeo = new THREE.BoxGeometry(0.12, 0.25, pcbL - 0.25)
    const pinHeaderMat = new THREE.MeshStandardMaterial({ color: 0x181818, roughness: 0.6 })
    ;[-pcbW / 2 + 0.06, pcbW / 2 - 0.06].forEach((x) => {
      const header = new THREE.Mesh(pinHeaderGeo, pinHeaderMat)
      header.position.set(x, pcbH / 2 + 0.12, 0)
      espGroup.add(header)
    })

    // Gold GPIO pin contacts sticking up
    const pinStickGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.18, 6)
    const pinStickMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.2 })
    for (let i = -6; i <= 6; i++) {
      ;[-pcbW / 2 + 0.06, pcbW / 2 - 0.06].forEach((x) => {
        const pin = new THREE.Mesh(pinStickGeo, pinStickMat)
        pin.position.set(x, pcbH / 2 + 0.28, i * 0.22)
        espGroup.add(pin)
      })
    }

    // ==========================================
    // 2. OLED / LCD Screen (Standing Straight Up)
    // ==========================================
    const oledGroup = new THREE.Group()
    // Positioned in front, standing perfectly vertical (rotation = 0)
    oledGroup.position.set(0, 0.25, 0.9)
    rootGroup.add(oledGroup)

    // Green PCB base (standing vertically along Y and X)
    const oledW = 1.9
    const oledH = 1.6
    const oledDepth = 0.08
    const oledPcbGeo = new THREE.BoxGeometry(oledW, oledH, oledDepth)
    const oledPcbMat = new THREE.MeshStandardMaterial({
      color: 0x165b33, // Authentic PCB dark green
      roughness: 0.35,
      metalness: 0.15,
    })
    const oledPcb = new THREE.Mesh(oledPcbGeo, oledPcbMat)
    oledPcb.castShadow = true
    oledGroup.add(oledPcb)

    // 4 Corner Metal Mounting Ring Holes
    const mRingGeo = new THREE.TorusGeometry(0.09, 0.025, 8, 16)
    const mRingMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.9, roughness: 0.2 })
    const rx = oledW / 2 - 0.16
    const ry = oledH / 2 - 0.16
    ;[
      [-rx, -ry],
      [rx, -ry],
      [-rx, ry],
      [rx, ry],
    ].forEach(([x, y]) => {
      const ring = new THREE.Mesh(mRingGeo, mRingMat)
      ring.position.set(x, y, oledDepth / 2 + 0.01)
      oledGroup.add(ring)
    })

    // OLED Glass Display Surface (Facing front)
    const glassGeo = new THREE.BoxGeometry(1.5, 1.15, 0.04)
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x050d1a,
      roughness: 0.1,
      metalness: 0.85,
    })
    const glass = new THREE.Mesh(glassGeo, glassMat)
    glass.position.set(0, -0.05, oledDepth / 2 + 0.02)
    oledGroup.add(glass)

    // Glowing OLED UI Graphic Canvas
    const canvas = document.createElement("canvas")
    canvas.width = 256
    canvas.height = 160
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.fillStyle = "#020712"
      ctx.fillRect(0, 0, 256, 160)
      ctx.fillStyle = "#38bdf8"
      ctx.font = "bold 18px monospace"
      ctx.fillText("ESP32 IoT Node", 14, 26)
      ctx.fillStyle = "#e0f2fe"
      ctx.font = "14px monospace"
      ctx.fillText("TEMP: 24.6°C", 14, 56)
      ctx.fillText("HUM:  48.2%", 14, 80)
      ctx.fillText("WiFi: CONNECTED", 14, 104)
      // Green live waveform line
      ctx.strokeStyle = "#22c55e"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(14, 138)
      for (let i = 14; i < 240; i += 6) {
        ctx.lineTo(i, 138 + Math.sin(i * 0.18) * 8)
      }
      ctx.stroke()
    }
    const canvasTex = new THREE.CanvasTexture(canvas)
    const uiPlaneGeo = new THREE.PlaneGeometry(1.4, 1.05)
    const uiPlaneMat = new THREE.MeshBasicMaterial({
      map: canvasTex,
      transparent: true,
      opacity: 0.95,
    })
    const uiPlane = new THREE.Mesh(uiPlaneGeo, uiPlaneMat)
    uiPlane.position.set(0, -0.05, oledDepth / 2 + 0.045)
    oledGroup.add(uiPlane)

    // Black Header Connector on OLED top edge (where wires plug directly into)
    const oledConnGeo = new THREE.BoxGeometry(0.85, 0.28, 0.24)
    const oledConnMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.6 })
    const oledConn = new THREE.Mesh(oledConnGeo, oledConnMat)
    oledConn.position.set(0, oledH / 2 + 0.14, 0)
    oledGroup.add(oledConn)

    // ==========================================
    // 3. Jumper Wires Directly Hooked Up
    // ==========================================
    // Exact connection points:
    // OLED Header pins (Top of standing screen):
    // oledGroup.position = (0, 0.25, 0.9), top header connector is at Y = 0.25 + 0.8 + 0.14 = 1.19
    const oledPinGND = new THREE.Vector3(-0.3, 1.25, 0.9)
    const oledPinVCC = new THREE.Vector3(-0.1, 1.25, 0.9)
    const oledPinSCL = new THREE.Vector3(0.1, 1.25, 0.9)
    const oledPinSDA = new THREE.Vector3(0.3, 1.25, 0.9)

    // ESP32 GPIO Pins on left (-pcbW/2 + 0.06 = -0.64) and right (+0.64):
    // ESP32 position is (0, 0.3, -0.8), header height is Y = 0.3 + 0.04 + 0.25 = 0.59
    const espLeftPin1 = new THREE.Vector3(-0.64, 0.58, -0.8 + 0.3)
    const espLeftPin2 = new THREE.Vector3(-0.64, 0.58, -0.8 + 0.6)
    const espRightPin1 = new THREE.Vector3(0.64, 0.58, -0.8 + 0.3)
    const espRightPin2 = new THREE.Vector3(0.64, 0.58, -0.8 + 0.6)

    const wireConfigs = [
      {
        color: 0x2563eb, // Blue wire: ESP32 Left Pin 1 -> OLED GND
        points: [
          espLeftPin1,
          new THREE.Vector3(-1.1, 1.8, -0.3),
          new THREE.Vector3(-0.8, 1.9, 0.5),
          oledPinGND,
        ],
      },
      {
        color: 0xdc2626, // Red wire (Power): ESP32 Left Pin 2 -> OLED VCC
        points: [
          espLeftPin2,
          new THREE.Vector3(-0.9, 1.9, -0.1),
          new THREE.Vector3(-0.5, 1.8, 0.6),
          oledPinVCC,
        ],
      },
      {
        color: 0x16a34a, // Green wire (Clock): ESP32 Right Pin 1 -> OLED SCL
        points: [
          espRightPin1,
          new THREE.Vector3(0.9, 1.9, -0.1),
          new THREE.Vector3(0.5, 1.8, 0.6),
          oledPinSCL,
        ],
      },
      {
        color: 0xeab308, // Yellow wire (Data): ESP32 Right Pin 2 -> OLED SDA
        points: [
          espRightPin2,
          new THREE.Vector3(1.1, 1.8, -0.3),
          new THREE.Vector3(0.8, 1.9, 0.5),
          oledPinSDA,
        ],
      },
      {
        color: 0xf97316, // Orange wire: ESP32 Side GPIO Loop
        points: [
          new THREE.Vector3(0.64, 0.58, -0.8 - 0.3),
          new THREE.Vector3(1.3, 2.2, -0.8),
          new THREE.Vector3(1.1, 2.0, -0.1),
          new THREE.Vector3(0.64, 0.58, -0.8 + 0.8),
        ],
      },
      {
        color: 0xe5e7eb, // Light gray wire: ESP32 Left Side GPIO Loop
        points: [
          new THREE.Vector3(-0.64, 0.58, -0.8 - 0.4),
          new THREE.Vector3(-1.3, 2.3, -0.8),
          new THREE.Vector3(-1.1, 2.0, 0.0),
          new THREE.Vector3(-0.64, 0.58, -0.8 + 0.8),
        ],
      },
      {
        color: 0x9333ea, // Purple wire: Upper arch
        points: [
          new THREE.Vector3(0.64, 0.58, -0.8 - 0.6),
          new THREE.Vector3(1.0, 2.5, -1.0),
          new THREE.Vector3(0.5, 2.4, -0.5),
          new THREE.Vector3(0.64, 0.58, -0.8 - 0.1),
        ],
      },
    ]

    const dupontGeo = new THREE.BoxGeometry(0.1, 0.26, 0.1)
    const dupontMat = new THREE.MeshStandardMaterial({ color: 0x161616, roughness: 0.6 })

    wireConfigs.forEach(({ color, points }) => {
      const curve = new THREE.CatmullRomCurve3(points)
      const tubeGeo = new THREE.TubeGeometry(curve, 36, 0.046, 8, false)
      const tubeMat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.32,
        metalness: 0.08,
      })
      const wireMesh = new THREE.Mesh(tubeGeo, tubeMat)
      wireMesh.castShadow = true
      rootGroup.add(wireMesh)

      // Black Dupont connector boots at both ends
      const pStart = points[0]
      const pEnd = points[points.length - 1]

      const h1 = new THREE.Mesh(dupontGeo, dupontMat)
      h1.position.copy(pStart)
      h1.position.y += 0.08
      rootGroup.add(h1)

      const h2 = new THREE.Mesh(dupontGeo, dupontMat)
      h2.position.copy(pEnd)
      h2.position.y += 0.08
      rootGroup.add(h2)
    })

    // Center root assembly in the viewport
    rootGroup.position.set(0, -0.1, 0)

    // ==========================================
    // 4. Smooth 360° Spin Animation & Parallax
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

    const animate = () => {
      reqId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      // Smooth rotation lerp
      currentRotY += (targetRotY - currentRotY) * 0.06
      currentRotX += (targetRotX - currentRotX) * 0.06

      // Continuous 360° spin around vertical axis with dynamic tilt (slow and smooth)
      rootGroup.rotation.y = elapsed * 0.3 + currentRotY
      rootGroup.rotation.x = currentRotX + Math.sin(elapsed * 0.35) * 0.06
      rootGroup.rotation.z = Math.cos(elapsed * 0.3) * 0.03

      // Pulse the status LEDs & display glow
      ledBlueMat.color.setHex(Math.sin(elapsed * 5.0) > 0 ? 0x38bdf8 : 0x0369a1)
      oledGlowLight.intensity = 2.0 + Math.sin(elapsed * 3.0) * 0.8

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
        <span>3D Interactive</span>
      </div>
    </div>
  )
}
