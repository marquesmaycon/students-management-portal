import { Zap } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t px-4 py-4">
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row">
        <p className="m-0 text-sm">
          &copy; {year}{" "}
          <a
            href="https://github.com/marquesmaycon"
            target="_blank"
            className="underline"
          >
            Maycon Silva
          </a>
          . All rights reserved.
        </p>
        <p className="m-0 flex items-center gap-1 text-sm">
          Built with Vite <Zap className="size-4" />
        </p>
      </div>
    </footer>
  );
}
