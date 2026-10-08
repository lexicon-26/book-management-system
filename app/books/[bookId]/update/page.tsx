import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { BookUpdateForm } from "./_components/book-update-form";

export default async function BookUpdatePage(
  props: PageProps<"/books/[bookId]/update">
) {
  const { bookId } = await props.params;

  const book = await prisma.book.findUnique({
    where: { id: bookId },
    select: {
      id: true,
      title: true,
      author: true,
      published: true,
      isbn: true,
    },
  });

  if (!book) {
    notFound();
  }

  return (
    <>
      <div className="container mx-auto mt-4 px-4">
        <h1 className="text-center text-2xl">Update Book</h1>
        <div className="mt-10">
          <BookUpdateForm book={book} />
        </div>
      </div>
    </>
  );
}
