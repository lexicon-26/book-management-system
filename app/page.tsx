import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="container mx-auto flex h-15 items-center justify-items-start gap-3">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="container mx-auto text-3xl">Book Management System</h1>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  );
}
