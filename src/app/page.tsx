"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// 📊 Sample datasets
const revenueData = [
  { month: "Jan", value: 40 },
  { month: "Feb", value: 20 },
  { month: "Mar", value: 35 },
  { month: "Apr", value: 60 },
  { month: "May", value: 30 },
]

const expensesData = [
  { month: "Jan", value: 10 },
  { month: "Feb", value: 25 },
  { month: "Mar", value: 15 },
  { month: "Apr", value: 20 },
  { month: "May", value: 18 },
]

const profitData = [
  { month: "Jan", value: 30 },
  { month: "Feb", value: -5 },
  { month: "Mar", value: 20 },
  { month: "Apr", value: 40 },
  { month: "May", value: 12 },
]

const allMonths = ["COVID", "Change Management", "Bankruptcy", "Apr", "May"]

export default function Home() {
  // 🔍 Text input filter (optional, not used now but left in)
  const [filter, setFilter] = useState("")

  // 🔁 Dropdown selection
  const [dataset, setDataset] = useState("revenue")

  // ✅ Month slicer selection (checkboxes)
  const [selectedMonths, setSelectedMonths] = useState<string[]>(allMonths)

  // Handle checkbox slicer toggle
  const toggleMonth = (month: string) => {
    setSelectedMonths((prev) =>
      prev.includes(month)
        ? prev.filter((m) => m !== month)
        : [...prev, month]
    )
  }

  // Switch between datasets
  const dataMap: Record<string, { month: string; value: number }[]> = {
    revenue: revenueData,
    expenses: expensesData,
    profit: profitData,
  }

  const fullData = dataMap[dataset]

  // Final filtered graph data based on selected months
  const filteredData = fullData.filter((d) =>
    selectedMonths.includes(d.month)
  )

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">
            📊 Flounder's Interactive Finance Graph Thing
          </h1>

          {/* 🔍 Input field (optional, not required with slicer) */}
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Type month name (e.g. Jan)..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <Button onClick={() => setFilter("")}>Reset</Button>
          </div>

          {/* 🔽 Dropdown to select dataset */}
          <div className="mb-6">
            <Select onValueChange={setDataset} defaultValue="revenue">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select dataset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="expenses">Expenses</SelectItem>
                <SelectItem value="profit">Profit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ✅ Slicer checkboxes to select visible months */}
          <div className="mb-6">
            <p className="font-medium mb-2">Select Months:</p>
            <div className="flex flex-wrap gap-4">
              {allMonths.map((month) => (
                <div key={month} className="flex items-center space-x-2">
                  <Checkbox
                    id={month}
                    checked={selectedMonths.includes(month)}
                    onCheckedChange={() => toggleMonth(month)}
                  />
                  <Label htmlFor={month}>{month}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* 📈 Chart Area */}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </main>
  )
}
