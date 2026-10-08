"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

export async function deleteBook(bookId: string, redirectTo?: string) {
  try {
    const book = await prisma.book.delete({
      where: {
        id: bookId,
      },
    });

    revalidatePath("/books");
    redirect(redirectTo ?? "/books");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return false;
    }
    throw error;
  }
}
