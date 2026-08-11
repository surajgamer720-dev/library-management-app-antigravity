"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getBooks() {
  try {
    const books = await prisma.book.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return books;
  } catch (error) {
    console.error("Failed to fetch books:", error);
    return [];
  }
}

export async function addBook(data: {
  title: string;
  author: string;
  isbn: string;
  category: string;
  shelfLocation: string;
  totalCopies: number;
}) {
  try {
    const book = await prisma.book.create({
      data: {
        ...data,
        availableCopies: data.totalCopies,
      }
    });
    revalidatePath("/admin/books");
    revalidatePath("/member");
    return { success: true, book };
  } catch (error: any) {
    console.error("Failed to add book:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteBook(id: string) {
  try {
    await prisma.book.delete({
      where: { id }
    });
    revalidatePath("/admin/books");
    revalidatePath("/member");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete book:", error);
    return { success: false, error: error.message };
  }
}
