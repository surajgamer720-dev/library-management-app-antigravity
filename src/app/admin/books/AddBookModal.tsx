"use client"

import { useState, useTransition } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addBook } from "../../actions/bookActions"

export default function AddBookModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState({
    title: "", author: "", isbn: "", category: "", shelfLocation: "", totalCopies: "1"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      const res = await addBook({
        ...formData,
        totalCopies: parseInt(formData.totalCopies) || 1
      })
      if (res.success) {
        onOpenChange(false)
      } else {
        alert(res.error)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label>Title</Label>
            <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          </div>
          <div className="grid gap-2">
            <Label>Author</Label>
            <Input required value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>ISBN</Label>
              <Input required value={formData.isbn} onChange={e => setFormData({...formData, isbn: e.target.value})} />
            </div>
            <div className="grid gap-2">
              <Label>Category</Label>
              <Input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Shelf Location</Label>
              <Input required value={formData.shelfLocation} onChange={e => setFormData({...formData, shelfLocation: e.target.value})} />
            </div>
            <div className="grid gap-2">
              <Label>Total Copies</Label>
              <Input type="number" min="1" required value={formData.totalCopies} onChange={e => setFormData({...formData, totalCopies: e.target.value})} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isPending}>{isPending ? 'Adding...' : 'Add Book'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
