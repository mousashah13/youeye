"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { ChevronUp, ChevronDown } from "lucide-react"

const colors = {
  primaryBlue: "#0554F2",
  deepGreen: "#052608",
  mossGreen: "#76A646",
  limeGlow: "#BDF26D",
  softIvory: "#EFF2EB",
}

const fixEffects = {
  "fix-1": 0.05,
  "fix-2": -0.03,
  "fix-3": 0.1,
}

const buttons = [
  { id: "fix-1", label: "Fire CEO", description: "Description 1: +5% effect" },
  { id: "fix-2", label: "Downsizing", description: "Description 2: -3% effect" },
  { id: "fix-3", label: "Training", description: "Description 3: +10% effect" },
]

// ✅ Custom Tooltip showing x and y
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null

  return (
    <div className="p-2 rounded-md shadow-md bg-[#EFF2EB] text-[#052608] text-xs font-medium border border-[#76A646]">
      <p>x: {label}</p>
      <p>y: {payload[0].value}</p>
    </div>
  )
}

export default function Home() {
  const [activeFixes, setActiveFixes] = useState<string[]>([])
  const [activeDescriptions, setActiveDescriptions] = useState<string[]>([])
  const [numYears, setNumYears] = useState(4)
  const [yScale, setYScale] = useState(100)

  const toggleFix = (fix: string) => {
    setActiveFixes((prev) =>
      prev.includes(fix) ? prev.filter((f) => f !== fix) : [...prev, fix]
    )
  }

  const handleFixClick = (fix: string) => {
    toggleFix(fix)
    setActiveDescriptions((prev) =>
      prev.includes(fix) ? prev.filter((f) => f !== fix) : [...prev, fix]
    )
  }

  const resetFixes = () => {
    setActiveFixes([])
    setActiveDescriptions([])
  }

  const totalAdjustment = activeFixes.reduce(
    (sum, fix) => sum + (fixEffects[fix as keyof typeof fixEffects] || 0),
    0
  )

  const baseData = Array.from({ length: numYears }, (_, i) => ({
    year: i + 1,
    value: yScale + i * (80 + numYears * 5),
  }))

  const adjustedData = baseData.map((d) => ({
    year: d.year,
    value: d.value * (1 + totalAdjustment),
  }))

  return (
    <motion.main
      className="min-h-screen flex items-center justify-center p-8"
      style={{ backgroundColor: colors.softIvory }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Card className="w-full max-w-6xl shadow-xl rounded-2xl border-0" style={{ backgroundColor: colors.softIvory }}>
        <CardContent className="py-4 px-6 relative">

          {/* Fix Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
            {buttons.map((btn) => (
              <div key={btn.id} className="flex flex-col items-center">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ boxShadow: "0px 0px 10px #BDF26D" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => handleFixClick(btn.id)}
                  className={`text-xs font-semibold px-3 py-1 rounded-full transition-all tracking-wide shadow-md ${
                    activeFixes.includes(btn.id)
                      ? "bg-[#BDF26D] text-[#052608] ring-2 ring-[#76A646]"
                      : "bg-[#0554F2] text-white hover:bg-[#052608] hover:text-[#EFF2EB]"
                  }`}
                >
                  {btn.label}
                </motion.button>
              </div>
            ))}

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ boxShadow: "0px 0px 10px #76A646" }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={resetFixes}
              className="h-7 text-sm px-4 font-semibold rounded-lg bg-[#76A646] text-[#052608] hover:bg-[#BDF26D] hover:text-black transition-all"
            >
              Reset
            </motion.button>
          </div>

          {/* Chart */}
          <div className="relative flex justify-center items-center">
            <div className="absolute bottom-[-40px] flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ boxShadow: "0px 0px 10px #BDF26D" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-[#0554F2] hover:bg-[#76A646] text-white rounded-full p-2 shadow-lg transition-all"
                onClick={() => setNumYears((prev) => Math.min(prev + 1, 10))}
              >
                <ChevronUp className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ boxShadow: "0px 0px 10px #BDF26D" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-[#0554F2] hover:bg-[#76A646] text-white rounded-full p-2 shadow-lg transition-all"
                onClick={() => setNumYears((prev) => Math.max(prev - 1, 1))}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="w-full h-[500px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={adjustedData}
                  style={{ backgroundColor: "#052608", borderRadius: "14px" }}
                  margin={{ top: 30, right: 15, left: 15, bottom: 50 }}
                >
                  <CartesianGrid stroke="#BDF26D" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="year"
                    domain={[1, numYears]}
                    tickCount={numYears}
                    stroke="#EFF2EB"
                    label={{
                      value: "Years",
                      position: "insideBottom",
                      offset: -10,
                      fill: "#EFF2EB",
                      fontSize: 16,
                      dx: -20,
                    }}
                    tick={{ fontSize: 14, fill: "#EFF2EB" }}
                  />
                  <YAxis
                    type="number"
                    domain={[0, "auto"]}
                    stroke="#EFF2EB"
                    label={{
                      value: "Projection (%)",
                      angle: -90,
                      position: "insideLeft",
                      offset: -5,
                      dy: 30,
                      fill: "#EFF2EB",
                      fontSize: 16,
                    }}
                    tick={{ fontSize: 14, fill: "#EFF2EB" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#BDF26D"
                    strokeWidth={3}
                    activeDot={{ r: 6, fill: "#BDF26D", stroke: "#76A646" }}
                    dot={{ r: 4, fill: "#76A646" }}
                    animationDuration={1000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Fix Description (inline color-coded %) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-[#EFF2EB] text-[#052608] rounded-xl p-4 mt-6 shadow-md"
          >
            <h3 className="text-md font-bold mb-2">Fixes Applied:</h3>
            {activeDescriptions.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {buttons
                  .filter((btn) => activeDescriptions.includes(btn.id))
                  .map((btn) => {
                    const description = btn.description
                    const match = description.match(/([+-]\d+%?)/)
                    if (!match) return <li key={btn.id}>{description}</li>

                    const [value] = match
                    const isPositive = value.startsWith("+")
                    const isNegative = value.startsWith("-")
                    const parts = description.split(value)

                    return (
                      <li key={btn.id}>
                        {parts[0]}
                        <span
                          className={`font-bold ${
                            isPositive
                              ? "text-green-600"
                              : isNegative
                              ? "text-red-600"
                              : ""
                          }`}
                        >
                          {value}
                        </span>
                        {parts[1]}
                      </li>
                    )
                  })}
              </ul>
            ) : (
              <p className="text-sm italic">No fixes selected.</p>
            )}
          </motion.div>

        </CardContent>
      </Card>
    </motion.main>
  )
}
