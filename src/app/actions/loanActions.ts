"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getLoans() {
  try {
    const loans = await prisma.loan.findMany({
      include: {
        book: true,
        user: true,
      },
      orderBy: { issueDate: 'desc' }
    });
    return loans;
  } catch (error) {
    console.error("Failed to fetch loans:", error);
    return [];
  }
}

export async function issueBook(data: { userId: string, bookId: string, dueDate: Date }) {
  try {
    const book = await prisma.book.findUnique({ where: { id: data.bookId } });
    if (!book || book.availableCopies <= 0) {
      return { success: false, error: "Book not available" };
    }

    const loan = await prisma.$transaction(async (tx) => {
      const newLoan = await tx.loan.create({
        data: {
          userId: data.userId,
          bookId: data.bookId,
          dueDate: data.dueDate,
          status: 'ISSUED'
        }
      });

      await tx.book.update({
        where: { id: data.bookId },
        data: { availableCopies: { decrement: 1 } }
      });

      return newLoan;
    });

    revalidatePath("/admin/transactions");
    revalidatePath("/admin/books");
    revalidatePath("/member");
    return { success: true, loan };
  } catch (error: any) {
    console.error("Failed to issue book:", error);
    return { success: false, error: error.message };
  }
}

export async function returnBook(loanId: string) {
  try {
    const loan = await prisma.loan.findUnique({ where: { id: loanId } });
    if (!loan || loan.status === 'RETURNED') {
      return { success: false, error: "Invalid loan" };
    }

    await prisma.$transaction(async (tx) => {
      await tx.loan.update({
        where: { id: loanId },
        data: { 
          status: 'RETURNED', 
          returnDate: new Date() 
        }
      });

      await tx.book.update({
        where: { id: loan.bookId },
        data: { availableCopies: { increment: 1 } }
      });
    });

    revalidatePath("/admin/transactions");
    revalidatePath("/admin/books");
    revalidatePath("/member");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to return book:", error);
    return { success: false, error: error.message };
  }
}
