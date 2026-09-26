'use client'

import { motion, useReducedMotion } from 'motion/react'

// Everything is laid out around the sun at (C, C) in SVG units.
const C = 260
const R_SOURCES = 122
const R_PIPELINE = 182
const R_INTERFACES = 240

const sources = [
  { label: 'SAP ERP', angle: -60, color: '#67e8f9' },
  { label: 'Documents', angle: 30, color: '#a78bfa' },
  { label: 'Sensors', angle: 120, color: '#5eead4' },
  { label: 'Voice', angle: 210, color: '#f0abfc' },
]
const interfaces = [
  { label: 'Teams', angle: -20, color: '#93c5fd' },
  { label: 'Web apps', angle: 100, color: '#fcd34d' },
  { label: 'Dashboards', angle: 220, color: '#86efac' },
]

const PIPELINE_TEXT = 'data pipelines · lakehouse · change data capture · real-time streams · '

function polar(r: number, deg: number) {
  const a = (deg * Math.PI) / 180
  // rounded so server and browser render identical numbers
  const round = (n: number) => Math.round(n * 100) / 100
  return { x: round(C + r * Math.cos(a)), y: round(C + r * Math.sin(a)) }
}

function Planet({ x, y, color, label, size }: { x: number; y: number; color: string; label: string; size: number }) {
  const w = label.length * 8.6 + 20
  return (
    <g className="orbit-counter">
      <circle cx={x} cy={y} r={size * 2.4} fill={color} opacity="0.14" />
      <circle cx={x} cy={y} r={size} fill={`url(#planet-shade)`} />
      <circle cx={x} cy={y} r={size} fill={color} opacity="0.85" style={{ mixBlendMode: 'screen' }} />
      <rect x={x - w / 2} y={y + size + 6} width={w} height={24} rx={12} fill="#0a0e22" fillOpacity="0.85" stroke={color} strokeOpacity="0.45" />
      <text x={x} y={y + size + 22.5} textAnchor="middle" fill="#eef0fb" className="font-mono text-[13px]">
        {label}
      </text>
    </g>
  )
}

/** Pulse of light travelling along a spoke, forever. */
function Pulse({ from, to, begin, color }: { from: { x: number; y: number }; to: { x: number; y: number }; begin: number; color: string }) {
  const path = `M${from.x},${from.y} L${to.x},${to.y}`
  return (
    <circle className="flow-dot" r="3" fill={color} opacity="0">
      <animateMotion path={path} begin={`${begin}s`} dur="2.2s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.8;1" begin={`${begin}s`} dur="2.2s" repeatCount="indefinite" />
    </circle>
  )
}

export function SolarSystem() {
  const reduce = useReducedMotion()

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, scale: 0.85 },
          animate: { opacity: 1, scale: 1 },
          transition: { delay, duration: 1.1, ease: [0.22, 1, 0.36, 1] as const },
          style: { transformOrigin: `${C}px ${C}px` },
        }

  return (
    <svg viewBox="-50 -50 620 620" className="h-auto w-full" role="img" aria-labelledby="solar-title">
      <title id="solar-title">
        A solar system: LLM agents are the sun. SAP ERP, documents, sensors and voice orbit on the inner ring and send
        data inward through a ring of data pipelines. Answers flow out to Teams, web apps and dashboards on the outer ring.
      </title>

      <defs>
        <radialGradient id="sun-core" cx="40%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#fffbea" />
          <stop offset="35%" stopColor="#fde68a" />
          <stop offset="75%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>
        <radialGradient id="sun-glow">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#f59e0b" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="planet-shade" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#020308" />
        </radialGradient>
        <path id="pipeline-ring" d={`M ${C - R_PIPELINE},${C} a ${R_PIPELINE},${R_PIPELINE} 0 1,1 ${R_PIPELINE * 2},0 a ${R_PIPELINE},${R_PIPELINE} 0 1,1 -${R_PIPELINE * 2},0`} />
      </defs>

      {/* Orbit rings */}
      <motion.g {...enter(0.1)} fill="none">
        <circle cx={C} cy={C} r={R_SOURCES} stroke="#ffffff" strokeOpacity="0.1" />
        <circle cx={C} cy={C} r={R_PIPELINE} stroke="#67e8f9" strokeOpacity="0.12" strokeDasharray="2 6" />
        <circle cx={C} cy={C} r={R_INTERFACES} stroke="#ffffff" strokeOpacity="0.08" />
      </motion.g>

      {/* Pipeline ring: text travelling round the orbit */}
      <motion.g {...enter(0.35)}>
        <g className="orbit-spin reverse" style={{ ['--orbit-duration' as string]: '140s' }}>
          <text className="font-mono text-[12.5px]" fill="#67e8f9" fillOpacity="0.55" letterSpacing="1">
            <textPath href="#pipeline-ring">{PIPELINE_TEXT.repeat(2)}</textPath>
          </text>
        </g>
      </motion.g>

      {/* Outer orbit: interfaces people use (data flows out from the sun) */}
      <motion.g {...enter(0.6)}>
        <g className="orbit-spin" style={{ ['--orbit-duration' as string]: '120s' }}>
          {interfaces.map((p, i) => {
            const pos = polar(R_INTERFACES, p.angle)
            return (
              <g key={p.label}>
                <line x1={C} y1={C} x2={pos.x} y2={pos.y} stroke={p.color} strokeOpacity="0.16" strokeDasharray="3 5" />
                {!reduce && <Pulse from={{ x: C, y: C }} to={pos} begin={Math.round((1.2 + i * 0.7) * 10) / 10} color={p.color} />}
                <Planet x={pos.x} y={pos.y} color={p.color} label={p.label} size={11} />
              </g>
            )
          })}
        </g>
      </motion.g>

      {/* Inner orbit: data sources (data flows in to the sun) */}
      <motion.g {...enter(0.45)}>
        <g className="orbit-spin" style={{ ['--orbit-duration' as string]: '80s' }}>
          {sources.map((p, i) => {
            const pos = polar(R_SOURCES, p.angle)
            return (
              <g key={p.label}>
                <line x1={C} y1={C} x2={pos.x} y2={pos.y} stroke={p.color} strokeOpacity="0.2" strokeDasharray="3 5" />
                {!reduce && <Pulse from={pos} to={{ x: C, y: C }} begin={Math.round((0.4 + i * 0.55) * 100) / 100} color={p.color} />}
                <Planet x={pos.x} y={pos.y} color={p.color} label={p.label} size={8} />
              </g>
            )
          })}
        </g>
      </motion.g>

      {/* The sun: LLM agents */}
      <motion.g {...enter(0)}>
        <circle cx={C} cy={C} r="120" fill="url(#sun-glow)" className="sun-pulse" />
        <circle cx={C} cy={C} r="54" fill="url(#sun-core)" />
        <text x={C} y={C - 3} textAnchor="middle" fill="#1c1003" className="font-mono text-[16px] font-semibold">
          LLM
        </text>
        <text x={C} y={C + 16} textAnchor="middle" fill="#1c1003" className="font-mono text-[16px] font-semibold">
          agents
        </text>
      </motion.g>
    </svg>
  )
}
