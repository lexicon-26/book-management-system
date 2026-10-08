import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const links = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
  { label: "Create New Book", href: "/books/create" },
];

const linkClassBtn = buttonVariants({
  variant: "default",
  size: "lg",
});

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <>
      <nav className="flex justify-between bg-teal-800 px-5">
        <div className="container mx-auto flex h-15 items-center justify-items-start gap-3">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={linkClassBtn}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {/* session */}
          {session ? (
            <Button>Sign out</Button>
          ) : (
            <>
              <Link href="/sign-in" className={linkClassBtn}>
                Sign in
              </Link>
              <Link href="/register" className={linkClassBtn}>
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
