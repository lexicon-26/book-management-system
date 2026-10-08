"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

const updateBookSchema = z.object({
  id: z.string().min(1),
  title: z
    .string()
    .min(1, "Title must be at least 1 character")
    .max(50, "Title must be at most 50 characters"),
  author: z
    .string()
    .min(3, "Author name is required and must be at least 3 characters")
    .max(20, "Author name must be at most 20 characters"),
  published: z.iso.date("Invalid date"),
  isbn: z.string().regex(/^\d{13}$/, "ISBN must be exactly 13 digits"),
});

export async function updateBook(
  input: z.input<typeof updateBookSchema>,
  shouldRedirect = true
) {
  try {
    const data = updateBookSchema.parse(input);

    const book = await prisma.book.update({
      where: { id: data.id },
      data: {
        title: data.title,
        author: data.author,
        published: new Date(data.published),
        isbn: data.isbn,
      },
    });
    revalidatePath("/books");
    if (shouldRedirect) {
      redirect(`/books`);
    } else {
      return true;
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return false;
    }
    throw error;
  }
}
