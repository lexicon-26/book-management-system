import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return (
    <div className="container mx-auto mt-4 px-4">
      <h1 className="text-center text-2xl">Register</h1>
      {/* registerform */}
    </div>
  );
}
