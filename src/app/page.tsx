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

const fixEffects = {
  "fix 1": 0.05,
  "fix 2": -0.03,
  "fix 3": 0.10,
}

export default function Home() {
  const [activeFixes, setActiveFixes] = useState<string[]>([])
  const [numYears, setNumYears] = useState(4)
  const [yScale, setYScale] = useState(100)

  const toggleFix = (fix: string) => {
    setActiveFixes((prev) =>
      prev.includes(fix) ? prev.filter((f) => f !== fix) : [...prev, fix]
    )
  }

  const resetFixes = () => {
    setActiveFixes([])
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
      className="min-h-screen bg-[#14001c] flex items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Card className="w-full max-w-6xl bg-[#23022e] shadow-xl rounded-2xl border-0">
        <CardContent className="p-8 relative">
          {/* 🏷️ Title with Outfit font */}
          <h1 className="text-5xl font-bold tracking-tight mb-4 text-center leading-tight text-[#f5c542]" style={{ fontFamily: "Outfit, sans-serif" }}>
            Financial Simulation
          </h1>

          {/* 🛠️ Fix Buttons + Reset Button */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
            {["fix 1", "fix 2", "fix 3"].map((fix) => (
              <motion.button
                key={fix}
                whileTap={{ scale: 0.9 }}
                whileHover={{ boxShadow: "0px 0px 10px #f5c542" }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => toggleFix(fix)}
                className={`w-32 h-14 text-md font-medium rounded-xl transition-all tracking-wide ${
                  activeFixes.includes(fix)
                    ? "bg-yellow-400 text-black ring-2 ring-yellow-300"
                    : "bg-black text-white hover:bg-black hover:text-white"
                }`}
              >
                {fix.toUpperCase()}
              </motion.button>
            ))}

            {/* 🔁 Golden Reset Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ boxShadow: "0px 0px 10px #f5c542" }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={resetFixes}
              className="h-10 text-sm px-4 py-2 font-semibold rounded-lg bg-yellow-400 text-black hover:bg-black hover:text-yellow-400 border-none transition-all"
            >
              Reset
            </motion.button>
          </div>

          {/* 📈 Chart Area with Arrow Buttons NEXT to Axes */}
          <div className="relative flex justify-center items-center">
            {/* Y-Axis Buttons - Centered vertically left of the graph */}
            <div className="absolute left-[-60px] top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ boxShadow: "0px 0px 10px #f5c542" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-black hover:bg-yellow-400 text-white rounded-full p-2 shadow-md transition-all"
                onClick={() => setYScale((prev) => Math.min(prev + 50, 1000))}
              >
                <ChevronUp className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ boxShadow: "0px 0px 10px #f5c542" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-black hover:bg-yellow-400 text-white rounded-full p-2 shadow-md transition-all"
                onClick={() => setYScale((prev) => Math.max(prev - 50, 10))}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.button>
            </div>

            {/* X-Axis Buttons - Centered horizontally below the graph */}
            <div className="absolute bottom-[-40px] flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ boxShadow: "0px 0px 10px #f5c542" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-black hover:bg-yellow-400 text-white rounded-full p-2 shadow-md transition-all"
                onClick={() => setNumYears((prev) => Math.min(prev + 1, 15))}
              >
                <ChevronUp className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ boxShadow: "0px 0px 10px #f5c542" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-black hover:bg-yellow-400 text-white rounded-full p-2 shadow-md transition-all"
                onClick={() => setNumYears((prev) => Math.max(prev - 1, 1))}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.button>
            </div>

            {/* 📈 Actual Graph */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="w-full h-[500px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={adjustedData}
                  style={{ backgroundColor: "#1a0028", borderRadius: "12px" }}
                >
                  <CartesianGrid stroke="#ffffff" strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    dataKey="year"
                    domain={[1, numYears]}
                    tickCount={numYears}
                    stroke="#d6c2f7"
                    label={{
                      value: "Years",
                      position: "insideBottom",
                      offset: 10,
                      fill: "#d6c2f7",
                    }}
                  />
                  <YAxis
                    type="number"
                    domain={[0, "auto"]}
                    stroke="#d6c2f7"
                    label={{
                      value: "Projection (%)",
                      angle: -90,
                      position: "insideLeft",
                      fill: "#d6c2f7",
                    }}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#2f0a43", border: "1px solid #6a0dad" }}
                    itemStyle={{ color: "#ffffff" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#ffffff" // Pure white line
                    strokeWidth={3}
                    activeDot={{ r: 8, fill: "#c084fc", stroke: "#c084fc" }} // Luxury purple active dot
                    dot={{ r: 4, fill: "#c084fc", stroke: "#c084fc" }} // Normal dots
                    animationDuration={1000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

        </CardContent>
      </Card>
    </motion.main>
  )
}
