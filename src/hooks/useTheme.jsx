"use client"

import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export const useChartColors = () => {
  const colors = [
    'var(--chart-1)',
    'var(--chart-2)', 
    'var(--chart-3)',
    'var(--chart-4)',
    'var(--chart-5)',
    '#06B6D4',
    '#F97316',
    '#6366F1'
  ];
  
  return colors;
};
