"use client"

import { useState } from "react"
import { Search, Filter, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

const mockCatalog = [
  { id: "1", title: "The Martian", author: "Andy Weir", category: "Sci-Fi", available: 2, total: 5, image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400&q=80" },
  { id: "2", title: "Atomic Habits", author: "James Clear", category: "Self-Help", available: 0, total: 10, image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80" },
  { id: "3", title: "1984", author: "George Orwell", category: "Fiction", available: 8, total: 8, image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&q=80" },
  { id: "4", title: "Dune", author: "Frank Herbert", category: "Sci-Fi", available: 1, total: 4, image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=400&q=80" },
  { id: "5", title: "Sapiens", author: "Yuval Noah Harari", category: "History", available: 5, total: 7, image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80" },
]

export default function BookCatalog() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBooks = mockCatalog.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleReserve = (title: string) => {
    toast.success(`Reserved "${title}" successfully. Please collect it from the desk within 48 hours.`)
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Book Catalog</h1>
        <p className="text-muted-foreground">Search and reserve books from our collection.</p>
      </div>

      <div className="flex items-center gap-4 bg-card/50 backdrop-blur-md p-4 rounded-xl border border-border/50 shadow-sm">
        <div className="flex-1 flex items-center bg-muted/50 rounded-md px-3 border border-border/50 focus-within:ring-2 focus-within:ring-primary/20">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search by title, author, or category..." 
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2 shrink-0">
          <Filter className="w-4 h-4" /> Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredBooks.map(book => (
          <Card key={book.id} className="bg-card/50 backdrop-blur-md border-border/50 shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 group">
            <div className="h-48 overflow-hidden relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={book.image} 
                alt={book.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur-md text-foreground hover:bg-background/90">
                {book.category}
              </Badge>
            </div>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="line-clamp-1">{book.title}</CardTitle>
              <CardDescription className="line-clamp-1">{book.author}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-1">
              <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                {book.available} / {book.total} available
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button 
                className="w-full" 
                variant={book.available > 0 ? "default" : "secondary"}
                disabled={book.available === 0}
                onClick={() => handleReserve(book.title)}
              >
                {book.available > 0 ? "Reserve" : "Waitlist"}
              </Button>
            </CardFooter>
          </Card>
        ))}
        {filteredBooks.length === 0 && (
          <div className="col-span-full py-20 text-center text-muted-foreground">
            No books found matching your search.
          </div>
        )}
      </div>
    </div>
  )
}
