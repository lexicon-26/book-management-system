"use client";

import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import z from "zod";

// schema
const formSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.email("invalid email"),
  password: z
    .string()
    .min(4, "password needs to be at least 4 characters long"),
  confirmPassword: z.string(),
});

// component
export function RegisterForm() {
  const router = useRouter(); //next/navigation
  const myForm = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.signUp.email({
        name: value.name,
        email: value.email,
        password: value.password,
      });

      if (error) {
        toast.add({
          description: error.message ?? "failed to register",
          type: "error",
          priority: "high",
        });
        return;
      }

      //   show a success toast
      toast.add({
        description: "successfully registered",
        type: "succes",
      });

      //   redirect the user
      router.push("/");
      router.refresh();
    },
  });
}
