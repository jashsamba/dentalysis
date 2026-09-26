'use client'

import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'

// Layout in SVG user units
const W = 520
const H = 330
const NODE_H = 38

const sources = [
  { label: 'SAP ERP', cy: 45 },
  { label: 'Documents', cy: 125 },
  { label: 'Sensors', cy: 205 },
  { label: 'Voice', cy: 285 },
]
const interfaces = [
  { label: 'Teams', cy: 85 },
  { label: 'Web apps', cy: 165 },
  { label: 'Dashboards', cy: 245 },
]
const pipeline = { x: 146, w: 100, cy: 165, h: 76 }
const agents = { x: 286, w: 92, cy: 165, h: 76 }

const srcEdge = (cy: number) => `M104,${cy} C125,${cy} 125,${pipeline.cy} ${pipeline.x},${pipeline.cy}`
const midEdge = `M${pipeline.x + pipeline.w},${pipeline.cy} L${agents.x},${agents.cy}`
const outEdge = (cy: number) =>
  `M${agents.x + agents.w},${agents.cy} C399,${agents.cy} 399,${cy} 420,${cy}`

// Timeline (seconds)
const T = {
  sources: 0.15,
  srcEdges: 0.55,
  pipeline: 1.0,
  midEdge: 1.25,
  agents: 1.45,
  outEdges: 1.7,
  interfaces: 2.0,
  dotsIn: 2.4,
  dotsMid: 3.25,
  dotsOut: 3.6,
  glow: 4.3,
}

function Dot({ path, begin, dur }: { path: string; begin: number; dur: number }) {
  return (
    <circle className="flow-dot" r="3.5" fill="var(--color-amber)" opacity="0">
      <animateMotion path={path} begin={`${begin}s`} dur={`${dur}s`} fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" keyTimes="0;1" />
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" begin={`${begin}s`} dur={`${dur}s`} fill="freeze" />
    </circle>
  )
}

export function HeroPipeline() {
  const reduce = useReducedMotion()
  const svgRef = useRef<SVGSVGElement>(null)

  // Restart the SMIL clock at hydration so the travelling dots stay in sync with the drawn lines.
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    if (reduce) svg.pauseAnimations()
    else svg.setCurrentTime(0)
  }, [reduce])

  const still = !!reduce

  const node = (delay: number) =>
    still
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
        }

  const edge = (delay: number) =>
    still
      ? { initial: false as const }
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { delay, duration: 0.55, ease: 'easeInOut' as const },
        }

  const box = 'fill-ink-2 stroke-white/20'
  const text = 'fill-paper font-mono text-[14px]'

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-labelledby="pipeline-title"
    >
      <title id="pipeline-title">
        Diagram: SAP ERP, documents, sensors and voice flow into data pipelines, then into LLM agents, then into the
        tools people use: Teams, web apps and dashboards.
      </title>

      {/* Edges */}
      <g fill="none" stroke="var(--color-mist)" strokeOpacity="0.45" strokeWidth="1.5">
        {sources.map((s, i) => (
          <motion.path key={s.label} d={srcEdge(s.cy)} {...edge(T.srcEdges + i * 0.06)} />
        ))}
        <motion.path d={midEdge} {...edge(T.midEdge)} />
        {interfaces.map((s, i) => (
          <motion.path key={s.label} d={outEdge(s.cy)} {...edge(T.outEdges + i * 0.06)} />
        ))}
      </g>

      {/* Sources */}
      {sources.map((s, i) => (
        <motion.g key={s.label} {...node(T.sources + i * 0.08)}>
          <rect x="0" y={s.cy - NODE_H / 2} width="104" height={NODE_H} rx="8" className={box} />
          <text x="52" y={s.cy + 5} textAnchor="middle" className={text}>
            {s.label}
          </text>
        </motion.g>
      ))}

      {/* Pipeline */}
      <motion.g {...node(T.pipeline)}>
        <rect x={pipeline.x} y={pipeline.cy - pipeline.h / 2} width={pipeline.w} height={pipeline.h} rx="10" className="fill-teal stroke-white/25" />
        <text x={pipeline.x + pipeline.w / 2} y={pipeline.cy - 3} textAnchor="middle" className={text}>
          Data
        </text>
        <text x={pipeline.x + pipeline.w / 2} y={pipeline.cy + 15} textAnchor="middle" className={text}>
          pipelines
        </text>
      </motion.g>

      {/* Agents */}
      <motion.g {...node(T.agents)}>
        <rect x={agents.x} y={agents.cy - agents.h / 2} width={agents.w} height={agents.h} rx="10" className="fill-teal stroke-white/25" />
        <text x={agents.x + agents.w / 2} y={agents.cy - 3} textAnchor="middle" className={text}>
          LLM
        </text>
        <text x={agents.x + agents.w / 2} y={agents.cy + 15} textAnchor="middle" className={text}>
          agents
        </text>
      </motion.g>

      {/* Interfaces */}
      {interfaces.map((s, i) => (
        <motion.g key={s.label} {...node(T.interfaces + i * 0.08)}>
          <motion.rect
            x="420"
            y={s.cy - NODE_H / 2}
            width="100"
            height={NODE_H}
            rx="8"
            strokeWidth="1.5"
            initial={still ? false : { fill: '#1c2c50', stroke: 'rgba(255,255,255,0.2)' }}
            animate={{ fill: '#2a3550', stroke: '#f2a541' }}
            transition={still ? undefined : { delay: T.glow + i * 0.1, duration: 0.6 }}
          />
          <text x="470" y={s.cy + 5} textAnchor="middle" className={text}>
            {s.label}
          </text>
        </motion.g>
      ))}

      {/* Data travelling through, once */}
      {!still && (
        <g>
          {sources.map((s, i) => (
            <Dot key={s.label} path={srcEdge(s.cy)} begin={T.dotsIn + i * 0.12} dur={0.8} />
          ))}
          <Dot path={midEdge} begin={T.dotsMid} dur={0.4} />
          <Dot path={midEdge} begin={T.dotsMid + 0.15} dur={0.4} />
          {interfaces.map((s, i) => (
            <Dot key={s.label} path={outEdge(s.cy)} begin={T.dotsOut + i * 0.1} dur={0.7} />
          ))}
        </g>
      )}
    </svg>
  )
}
