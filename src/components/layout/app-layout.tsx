"use client"

import { ReactNode } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background relative flex">
      {/* Background ambient gradient (Glassmorphism effect support) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-chart-1/5 blur-[120px]" />
      </div>

      <Sidebar />
      
      <main className="flex-1 lg:pl-64 flex flex-col min-h-screen relative z-10">
        <Header />
        <div className="p-6 flex-1 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  )
}
