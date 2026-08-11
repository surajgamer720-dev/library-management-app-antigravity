import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BookOpen, Calendar, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function MemberDashboard() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return <div>Please log in</div>
  }

  const userId = (session.user as any).id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      loans: {
        include: { book: true },
        orderBy: { issueDate: 'desc' }
      }
    }
  });

  if (!user) return <div>User not found</div>

  const activeLoans = user.loans.filter(l => l.status !== 'RETURNED');
  
  const stats = [
    { title: "Books Borrowed", value: activeLoans.length.toString(), icon: BookOpen },
    { title: "Pending Fines", value: `$${user.totalFines.toFixed(2)}`, icon: AlertCircle, color: "text-destructive" },
  ]

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user.name}! Here is your current library status.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-card/50 backdrop-blur-md border-border/50 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color || 'text-primary'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color || ''}`}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
        
        <Card className="bg-card/50 backdrop-blur-md border-border/50 shadow-sm flex items-center justify-center p-6">
           <Button className="w-full" variant="outline">
             Browse Catalog
           </Button>
        </Card>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Currently Borrowed</h2>
        {activeLoans.length === 0 ? (
          <p className="text-muted-foreground">You do not have any active book loans.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {activeLoans.map(loan => (
              <Card key={loan.id} className={`bg-card/50 backdrop-blur-md border-border/50 shadow-sm relative overflow-hidden ${loan.status === 'OVERDUE' ? 'border-destructive/30' : ''}`}>
                {loan.status === "OVERDUE" && (
                  <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                     <div className="absolute transform rotate-45 bg-destructive text-destructive-foreground text-[10px] font-bold py-1 right-[-35px] top-[15px] w-[120px] text-center shadow-sm">
                        OVERDUE
                     </div>
                  </div>
                )}
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{loan.book.title}</CardTitle>
                  <CardDescription>{loan.book.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm mt-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" /> Due: {new Date(loan.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
