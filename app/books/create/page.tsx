import { BookCreateForm } from "./_components/create-book-form";

export default function CreateBook() {
  return (
    <>
      <div className="mx-auto mt-4 max-w-4xl px-8">
        <h1 className="text-center text-2xl">Create New Book</h1>
        <div className="mt-10">
          <BookCreateForm />
        </div>
      </div>
    </>
  );
}
