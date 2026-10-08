"use client";
import { deleteBook } from "@/actions/book-delete-action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { startTransition, useActionState } from "react";

interface BookDeleteDialogProps {
  bookId: string;
  redirectTo?: string;
}

export function BookDeleteDialog({
  bookId,
  redirectTo,
}: BookDeleteDialogProps) {
  const [_state, action, pending] = useActionState(
    deleteBook.bind(null, bookId, redirectTo),
    undefined
  );

  function handleClick() {
    startTransition(action);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" />}>
        Delete Book
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Book?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the book? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={pending}
            variant="default"
            onClick={handleClick}
          >
            Delete{pending && <Spinner />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
