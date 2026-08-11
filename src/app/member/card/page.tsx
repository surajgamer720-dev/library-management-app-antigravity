"use client"

import { QRCodeSVG } from "qrcode.react"
import { Card, CardContent } from "@/components/ui/card"

export default function DigitalCardPage() {
  const user = {
    id: "MEM-2023-0842",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Member",
    joinDate: "Oct 2023",
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 h-full flex flex-col items-center justify-center min-h-[70vh]">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Digital Library Card</h1>
        <p className="text-muted-foreground mt-2">Present this code at the librarian desk to issue or return books.</p>
      </div>

      <div className="w-full max-w-md perspective-1000">
        <Card className="relative overflow-hidden bg-gradient-to-br from-primary/90 to-chart-1/90 text-primary-foreground border-none shadow-2xl rounded-2xl transform transition-transform duration-500 hover:rotate-y-12">
          {/* Ambient light effects for glassmorphism / gloss */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

          <CardContent className="p-8 relative z-10 flex flex-col items-center text-center">
            <div className="w-full flex justify-between items-start mb-8">
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center text-primary font-bold shadow-md">
                   L
                 </div>
                 <span className="font-bold text-xl tracking-tight opacity-90">LMS Pro</span>
              </div>
              <div className="text-right">
                <div className="text-xs opacity-70 font-semibold uppercase tracking-wider">Status</div>
                <div className="text-sm font-bold bg-white/20 px-2 py-0.5 rounded backdrop-blur-md">Active</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-inner mb-6">
              <QRCodeSVG 
                value={`member:${user.id}`} 
                size={180} 
                level="Q"
                includeMargin={false}
              />
            </div>

            <div className="w-full text-left space-y-1">
              <h2 className="text-2xl font-bold tracking-tight">{user.name}</h2>
              <p className="text-primary-foreground/80 font-mono text-sm">{user.id}</p>
            </div>
            
            <div className="w-full text-left mt-6 pt-4 border-t border-primary-foreground/20 flex justify-between text-sm opacity-80">
               <div>
                 <div className="text-xs uppercase tracking-wider mb-0.5">Role</div>
                 <div className="font-medium">{user.role}</div>
               </div>
               <div className="text-right">
                 <div className="text-xs uppercase tracking-wider mb-0.5">Member Since</div>
                 <div className="font-medium">{user.joinDate}</div>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
