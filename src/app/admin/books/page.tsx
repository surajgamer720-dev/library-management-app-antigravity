"use client"

import { useState } from "react"
import { Plus, Search, MoreHorizontal, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { QRCodeSVG } from "qrcode.react"

// Mock Data
const mockBooks = [
  { id: "1", title: "The Martian", author: "Andy Weir", isbn: "978-0553418026", category: "Sci-Fi", shelf: "A-12", total: 5, available: 2 },
  { id: "2", title: "Atomic Habits", author: "James Clear", isbn: "978-0735211292", category: "Self-Help", shelf: "B-04", total: 10, available: 0 },
  { id: "3", title: "1984", author: "George Orwell", isbn: "978-0451524935", category: "Fiction", shelf: "F-99", total: 8, available: 8 },
]

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBookForQR, setSelectedBookForQR] = useState<any>(null)

  const filteredBooks = mockBooks.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.author.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Book Management</h1>
          <p className="text-muted-foreground">Manage library inventory, add new books, and generate QR codes.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add New Book
        </Button>
      </div>

      <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-md p-4 rounded-xl border border-border/50 shadow-sm">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search by title or author..." 
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="bg-card/50 backdrop-blur-md rounded-xl border border-border/50 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBooks.map((book) => (
              <TableRow key={book.id}>
                <TableCell className="font-medium">
                  <div>{book.title}</div>
                  <div className="text-xs text-muted-foreground font-mono">ISBN: {book.isbn}</div>
                </TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>{book.shelf}</TableCell>
                <TableCell className="text-center">
                  {book.available > 0 ? (
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                      {book.available} Available
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                      Issued Out
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setSelectedBookForQR(book)}>
                        <QrCode className="mr-2 h-4 w-4" />
                        Generate QR
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete Book</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* QR Code Dialog */}
      <Dialog open={!!selectedBookForQR} onOpenChange={(open) => !open && setSelectedBookForQR(null)}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-center">Book QR Code</DialogTitle>
            <DialogDescription className="text-center">
              Scan this code during issue or return transactions.
            </DialogDescription>
          </DialogHeader>
          {selectedBookForQR && (
            <div className="flex flex-col items-center justify-center p-6 space-y-4">
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <QRCodeSVG value={`book:${selectedBookForQR.id}`} size={200} />
              </div>
              <div className="text-sm font-medium">{selectedBookForQR.title}</div>
              <div className="text-xs text-muted-foreground font-mono">{selectedBookForQR.isbn}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
