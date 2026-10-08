import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookDeleteDialog } from "./_components/book-delete-dialog";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function BookDetailsPage(
  props: PageProps<"/books/[bookId]">
) {
  const { bookId } = await props.params;

  const book = await prisma.book.findUnique({
    where: { id: bookId },
  });

  if (!book) {
    notFound();
  }

  return (
    <div className="container mx-auto mt-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{book.title}</CardTitle>
          <CardDescription>
            <span className="text-black">By</span> {book.author}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Published:{" "}
            <span className="font-light text-gray-500">
              {book.published.toLocaleDateString()}
            </span>
          </p>
          <p>
            ISBN: <span className="font-light text-gray-500">{book.isbn}</span>
          </p>
          <p>
            Created:{" "}
            <span className="font-light text-gray-500">
              {book.createdAt.toLocaleDateString()}
            </span>
          </p>
          <p>
            Updated:{" "}
            <span className="font-light text-gray-500">
              {book.updatedAt.toLocaleDateString()}
            </span>
          </p>
        </CardContent>
        <CardFooter className="flex items-start gap-3">
          <Link
            href={`/books/${book.id}/update`}
            className={buttonVariants({
              variant: "default",
              size: "lg",
            })}
          >
            Update
          </Link>
          <BookDeleteDialog bookId={book.id} redirectTo="/books" />
        </CardFooter>
      </Card>
    </div>
  );
}
