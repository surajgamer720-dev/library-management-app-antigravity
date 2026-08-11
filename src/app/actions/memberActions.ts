"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getMembers() {
  try {
    const members = await prisma.user.findMany({
      where: { role: 'MEMBER' },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { loans: { where: { status: 'ISSUED' } } }
        }
      }
    });
    return members;
  } catch (error) {
    console.error("Failed to fetch members:", error);
    return [];
  }
}

export async function deleteMember(id: string) {
  try {
    await prisma.user.delete({
      where: { id }
    });
    revalidatePath("/admin/members");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete member:", error);
    return { success: false, error: error.message };
  }
}
