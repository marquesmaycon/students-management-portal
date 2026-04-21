import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

import { ThemeProvider } from "./components/layout/theme-provider";
import { TooltipProvider } from "./components/ui/tooltip";
import { AuthProvider } from "./features/auth/auth-context";
import { queryClient } from "./lib/tanstack-query";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <AuthProvider>{children}</AuthProvider>
          <Toaster richColors />
          <ReactQueryDevtools initialIsOpen={false} />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
