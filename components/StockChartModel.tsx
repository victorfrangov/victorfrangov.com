"use client"

import React, { useEffect, useRef } from "react"
import * as THREE from "three"

export default function StockChartModel() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup with transparent background
    const scene = new THREE.Scene()

    const width = container.clientWidth || 600
    const height = container.clientHeight || 375

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100)
    camera.position.set(0, 2.6, 7.2)
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

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6)
    keyLight.position.set(4, 7, 5)
    scene.add(keyLight)

    const greenGlow = new THREE.PointLight(0x22c55e, 2.5, 4)
    greenGlow.position.set(1.5, 0.5, 1)
    scene.add(greenGlow)

    const macdGlow = new THREE.PointLight(0x818cf8, 2.0, 4)
    macdGlow.position.set(-1.0, -1.0, 1)
    scene.add(macdGlow)

    // Master assembly group (rotates in 3D)
    const rootGroup = new THREE.Group()
    scene.add(rootGroup)

    const gridW = 5.2
    const gridH = 3.2

    // --- 1. 3D Grid Coordinate Frame & RSI Bounds ---
    const gridLineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.15,
    })
    for (let y = -1.2; y <= 1.2; y += 0.6) {
      const gGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-gridW / 2, y, 0),
        new THREE.Vector3(gridW / 2, y, 0),
      ])
      const gLine = new THREE.Line(gGeo, gridLineMat)
      rootGroup.add(gLine)
    }

    // RSI Overbought (70) and Oversold (30) Reference Lines
    const rsiBoundMat = new THREE.LineDashedMaterial({
      color: 0xa855f7,
      dashSize: 0.1,
      gapSize: 0.08,
      transparent: true,
      opacity: 0.35,
    })
    ;[-1.0, -1.4].forEach((yLevel) => {
      const rsiLineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-gridW / 2, yLevel, 0.1),
        new THREE.Vector3(gridW / 2, yLevel, 0.1),
      ])
      const rsiLine = new THREE.Line(rsiLineGeo, rsiBoundMat)
      rsiLine.computeLineDistances()
      rootGroup.add(rsiLine)
    })

    // --- 2. Dynamic 3D Candlesticks Data & Objects ---
    const candleCount = 20
    const candleSpacing = gridW / (candleCount + 1)
    const candleStartX = -gridW / 2 + candleSpacing

    const greenMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      emissive: 0x15803d,
      emissiveIntensity: 0.4,
      roughness: 0.25,
      metalness: 0.2,
    })

    const redMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0x991b1b,
      emissiveIntensity: 0.4,
      roughness: 0.25,
      metalness: 0.2,
    })

    const wickMatGreen = new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.3 })
    const wickMatRed = new THREE.MeshStandardMaterial({ color: 0xf87171, roughness: 0.3 })

    interface CandleObject {
      bodyMesh: THREE.Mesh
      wickMesh: THREE.Mesh
      x: number
      baseOpen: number
      baseClose: number
      baseHigh: number
      baseLow: number
      isBullish: boolean
      phase: number
      speed: number
    }

    const candles: CandleObject[] = []

    let currentPrice = -0.4
    for (let i = 0; i < candleCount; i++) {
      const trendBias = 0.07
      const delta = (Math.random() - 0.42) * 0.38 + trendBias
      const open = currentPrice
      const close = open + delta
      currentPrice = close

      const high = Math.max(open, close) + Math.random() * 0.22 + 0.04
      const low = Math.min(open, close) - Math.random() * 0.22 - 0.04
      const isBullish = close >= open
      const x = candleStartX + i * candleSpacing

      // Candlestick 3D Body
      const bodyHeight = Math.max(Math.abs(close - open), 0.08)
      const bodyCenterY = (open + close) / 2 + 0.25
      const bodyGeo = new THREE.BoxGeometry(candleSpacing * 0.65, 1, 0.2)
      const bodyMesh = new THREE.Mesh(bodyGeo, isBullish ? greenMat : redMat)
      bodyMesh.position.set(x, bodyCenterY, 0)
      bodyMesh.scale.y = bodyHeight
      bodyMesh.castShadow = true
      rootGroup.add(bodyMesh)

      // Candlestick 3D Wick
      const wickHeight = Math.max(high - low, 0.15)
      const wickCenterY = (high + low) / 2 + 0.25
      const wickGeo = new THREE.CylinderGeometry(0.016, 0.016, 1, 8)
      const wickMesh = new THREE.Mesh(wickGeo, isBullish ? wickMatGreen : wickMatRed)
      wickMesh.position.set(x, wickCenterY, 0)
      wickMesh.scale.y = wickHeight
      rootGroup.add(wickMesh)

      candles.push({
        bodyMesh,
        wickMesh,
        x,
        baseOpen: open + 0.25,
        baseClose: close + 0.25,
        baseHigh: high + 0.25,
        baseLow: low + 0.25,
        isBullish,
        phase: Math.random() * Math.PI * 2,
        speed: 1.5 + Math.random() * 2.0,
      })
    }

    // --- 3. Dynamic Moving Average (EMA) Main Trendline Ribbon ---
    const emaPoints: THREE.Vector3[] = candles.map((c) => {
      const avgY = (c.baseOpen + c.baseClose) / 2
      return new THREE.Vector3(c.x, avgY + 0.12, 0.1)
    })
    const initialEmaY = emaPoints.map((p) => p.y)
    const emaCurve = new THREE.CatmullRomCurve3(emaPoints)
    const emaGeo = new THREE.TubeGeometry(emaCurve, 64, 0.032, 8, false)
    const emaMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8, // Cyan EMA
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.4,
    })
    const emaMesh = new THREE.Mesh(emaGeo, emaMat)
    rootGroup.add(emaMesh)

    // --- 4. Bollinger Bands (Upper & Lower Envelope Ribbons) ---
    const bbUpperPoints = candles.map((c) => new THREE.Vector3(c.x, c.baseHigh + 0.15, 0.05))
    const bbLowerPoints = candles.map((c) => new THREE.Vector3(c.x, c.baseLow - 0.15, 0.05))

    const bbUpperCurve = new THREE.CatmullRomCurve3(bbUpperPoints)
    const bbUpperGeo = new THREE.TubeGeometry(bbUpperCurve, 64, 0.018, 6, false)
    const bbMat = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.65,
      roughness: 0.3,
    })
    const bbUpperMesh = new THREE.Mesh(bbUpperGeo, bbMat)
    rootGroup.add(bbUpperMesh)

    const bbLowerCurve = new THREE.CatmullRomCurve3(bbLowerPoints)
    const bbLowerGeo = new THREE.TubeGeometry(bbLowerCurve, 64, 0.018, 6, false)
    const bbLowerMesh = new THREE.Mesh(bbLowerGeo, bbMat)
    rootGroup.add(bbLowerMesh)

    // --- 5. MACD Indicator Sub-lines (Fast Line & Signal Line) ---
    // Fast MACD Line (Cyan)
    const macdFastPoints = candles.map((c, i) => {
      const my = -0.85 + Math.sin(i * 0.45) * 0.22
      return new THREE.Vector3(c.x, my, 0.12)
    })
    const macdFastCurve = new THREE.CatmullRomCurve3(macdFastPoints)
    const macdFastGeo = new THREE.TubeGeometry(macdFastCurve, 64, 0.024, 6, false)
    const macdFastMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4, // Cyan Fast Line
      emissive: 0x0891b2,
      emissiveIntensity: 0.5,
    })
    const macdFastMesh = new THREE.Mesh(macdFastGeo, macdFastMat)
    rootGroup.add(macdFastMesh)

    // Signal MACD Line (Orange / Amber)
    const macdSignalPoints = candles.map((c, i) => {
      const my = -0.85 + Math.sin(i * 0.45 - 0.5) * 0.18
      return new THREE.Vector3(c.x, my, 0.12)
    })
    const macdSignalCurve = new THREE.CatmullRomCurve3(macdSignalPoints)
    const macdSignalGeo = new THREE.TubeGeometry(macdSignalCurve, 64, 0.024, 6, false)
    const macdSignalMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Amber Signal Line
      emissive: 0xd97706,
      emissiveIntensity: 0.5,
    })
    const macdSignalMesh = new THREE.Mesh(macdSignalGeo, macdSignalMat)
    rootGroup.add(macdSignalMesh)

    // MACD Histogram Bars
    const histGroup = new THREE.Group()
    rootGroup.add(histGroup)
    const histBars: THREE.Mesh[] = []
    const histBarGeo = new THREE.BoxGeometry(candleSpacing * 0.4, 1, 0.08)
    const histPosMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, opacity: 0.75, transparent: true })
    const histNegMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, opacity: 0.75, transparent: true })

    candles.forEach((c, i) => {
      const diff = macdFastPoints[i].y - macdSignalPoints[i].y
      const barH = Math.max(Math.abs(diff) * 2.0, 0.04)
      const barY = -0.85 + diff / 2
      const bar = new THREE.Mesh(histBarGeo, diff >= 0 ? histPosMat : histNegMat)
      bar.position.set(c.x, barY, 0.02)
      bar.scale.y = barH
      histGroup.add(bar)
      histBars.push(bar)
    })

    // --- 6. RSI (Relative Strength Index) Oscillating Line (Purple) ---
    const rsiPoints = candles.map((c, i) => {
      const ry = -1.2 + Math.sin(i * 0.6) * 0.18
      return new THREE.Vector3(c.x, ry, 0.14)
    })
    const rsiCurve = new THREE.CatmullRomCurve3(rsiPoints)
    const rsiGeo = new THREE.TubeGeometry(rsiCurve, 64, 0.022, 6, false)
    const rsiMat = new THREE.MeshStandardMaterial({
      color: 0xc084fc, // Electric Purple RSI
      emissive: 0x9333ea,
      emissiveIntensity: 0.6,
    })
    const rsiMesh = new THREE.Mesh(rsiGeo, rsiMat)
    rootGroup.add(rsiMesh)

    // --- 7. Live Price Cursor Tracker Line ---
    const cursorMat = new THREE.LineDashedMaterial({
      color: 0x22c55e,
      dashSize: 0.12,
      gapSize: 0.08,
      linewidth: 2,
    })
    const cursorGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-gridW / 2, 0, 0.05),
      new THREE.Vector3(gridW / 2, 0, 0.05),
    ])
    const cursorLine = new THREE.Line(cursorGeo, cursorMat)
    cursorLine.computeLineDistances()
    rootGroup.add(cursorLine)

    const beadGeo = new THREE.SphereGeometry(0.08, 16, 16)
    const beadMat = new THREE.MeshBasicMaterial({ color: 0x4ade80 })
    const bead = new THREE.Mesh(beadGeo, beadMat)
    rootGroup.add(bead)

    // --- 8. Animation & Continuous 360° Spin ---
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

      // Smooth rotation lerp + continuous 360° spin (slow & elegant)
      currentRotY += (targetRotY - currentRotY) * 0.06
      currentRotX += (targetRotX - currentRotX) * 0.06

      rootGroup.rotation.y = elapsed * 0.3 + currentRotY
      rootGroup.rotation.x = currentRotX + Math.sin(elapsed * 0.35) * 0.06
      rootGroup.rotation.z = Math.cos(elapsed * 0.3) * 0.03

      // Animate individual candle price vibrations & live updates
      candles.forEach((c, idx) => {
        const tick = Math.sin(elapsed * c.speed + c.phase) * 0.05
        const dynamicOpen = c.baseOpen
        const dynamicClose = c.baseClose + tick

        const bodyHeight = Math.max(Math.abs(dynamicClose - dynamicOpen), 0.08)
        const bodyCenterY = (dynamicOpen + dynamicClose) / 2
        c.bodyMesh.position.y = bodyCenterY
        c.bodyMesh.scale.y = bodyHeight

        const high = Math.max(dynamicOpen, dynamicClose) + 0.14 + Math.sin(elapsed * 2 + idx) * 0.03
        const low = Math.min(dynamicOpen, dynamicClose) - 0.14 - Math.cos(elapsed * 2 + idx) * 0.03
        const wickHeight = Math.max(high - low, 0.15)
        const wickCenterY = (high + low) / 2
        c.wickMesh.position.y = wickCenterY
        c.wickMesh.scale.y = wickHeight
      })

      // Update cursor line to latest candle price
      const lastCandle = candles[candles.length - 1]
      const currentLatestPrice = lastCandle.bodyMesh.position.y
      cursorLine.position.y = currentLatestPrice
      bead.position.set(lastCandle.x, currentLatestPrice, 0.08)

      // Oscillate MACD histogram
      histBars.forEach((bar, i) => {
        const osc = Math.sin(elapsed * 2.0 + i * 0.4) * 0.04
        bar.scale.y = Math.max(bar.scale.y + osc * 0.1, 0.04)
      })

      greenGlow.intensity = 2.0 + Math.sin(elapsed * 3.0) * 0.8
      macdGlow.intensity = 1.8 + Math.cos(elapsed * 2.5) * 0.6

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
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>RSI · MACD 3D</span>
      </div>
    </div>
  )
}
