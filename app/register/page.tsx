import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { RegisterForm } from "./_components/register-form";

export default async function RegisterPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return (
    <div className="container mx-auto mt-4 px-4">
      <h1 className="mb-8 text-center text-2xl">Register</h1>
      <RegisterForm />
    </div>
  );
}
