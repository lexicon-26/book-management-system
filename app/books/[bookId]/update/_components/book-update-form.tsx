"use client";

import { updateBook } from "@/actions/book-update-action";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useForm } from "@tanstack/react-form";
import z from "zod";

interface BookUpdateFormProps {
  book: {
    id: string;
    title: string;
    author: string;
    published: Date;
    isbn: string;
  };
}

const updateBookSchema = z.object({
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

export function BookUpdateForm({ book }: BookUpdateFormProps) {
  const form = useForm({
    defaultValues: {
      title: book.title,
      author: book.author,
      published: book.published.toISOString().split("T")[0],
      isbn: book.isbn,
    },
    validators: {
      onSubmit: updateBookSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      const success = await updateBook(
        {
          id: book.id,
          ...value,
        },
        false
      );

      if (!success) {
        toast.add({
          type: "error",
          description: "Book can not be updated",
          priority: "high",
          positionerProps: {
            side: "bottom",
          },
        });
        return;
      }

      toast.add({
        type: "success",
        description: "Book updated",
      });
      formApi.reset(value);
    },
  });

  return (
    <>
      <form
        className="mx-auto w-full max-w-md"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          {/* title */}
          <form.Field name="title">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder=""
                    autoComplete="off"
                  />
                  {/* errors */}
                  {isInvalid && (
                    <FieldError
                      className="text-xs"
                      errors={field.state.meta.errors}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* author */}
          <form.Field name="author">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Author</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder=""
                    autoComplete="off"
                  />
                  {/* errors */}
                  {isInvalid && (
                    <FieldError
                      className="text-xs"
                      errors={field.state.meta.errors}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* published */}
          <form.Field name="published">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Published</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    type="date"
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder=""
                    autoComplete="off"
                  />
                  {/* errors */}
                  {isInvalid && (
                    <FieldError
                      className="text-xs"
                      errors={field.state.meta.errors}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* isbn */}
          <form.Field name="isbn">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>ISBN</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder=""
                    autoComplete="off"
                  />
                  {/* errors */}
                  {isInvalid && (
                    <FieldError
                      className="text-xs"
                      errors={field.state.meta.errors}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>
        <Field orientation="horizontal" className="mt-5">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit">Submit</Button>
        </Field>
      </form>
    </>
  );
}
