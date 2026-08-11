"use client"

import { useState, useTransition } from "react"
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
} from "@/components/ui/dialog"
import { QRCodeSVG } from "qrcode.react"
import { deleteBook } from "../../actions/bookActions"
import AddBookModal from "./AddBookModal"

export default function BooksClient({ initialBooks }: { initialBooks: any[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBookForQR, setSelectedBookForQR] = useState<any>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const filteredBooks = initialBooks.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.isbn.includes(searchQuery)
  )

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this book?")) {
      startTransition(async () => {
        await deleteBook(id)
      })
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Book Management</h1>
          <p className="text-muted-foreground">Manage library inventory, add new books, and generate QR codes.</p>
        </div>
        <Button className="gap-2" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4" /> Add New Book
        </Button>
      </div>

      <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-md p-4 rounded-xl border border-border/50 shadow-sm">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search by title, author, or ISBN..." 
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
            {filteredBooks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No books found in the inventory.
                </TableCell>
              </TableRow>
            ) : filteredBooks.map((book) => (
              <TableRow key={book.id}>
                <TableCell className="font-medium">
                  <div>{book.title}</div>
                  <div className="text-xs text-muted-foreground font-mono">ISBN: {book.isbn}</div>
                </TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>{book.shelfLocation}</TableCell>
                <TableCell className="text-center">
                  {book.availableCopies > 0 ? (
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                      {book.availableCopies} Available
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
                      <Button variant="ghost" className="h-8 w-8 p-0" disabled={isPending}>
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
                      <DropdownMenuItem onClick={() => handleDelete(book.id)} className="text-destructive">
                        Delete Book
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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
      
      {isAddModalOpen && (
        <AddBookModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
      )}
    </div>
  )
}
