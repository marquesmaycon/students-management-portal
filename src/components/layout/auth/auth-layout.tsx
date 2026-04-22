import { Navigate, Outlet } from "react-router";

import { useAuth } from "@/features/auth/auth-context";

import { ThemeSwitcher } from "../theme-switcher";

export function AuthLayout() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-accent flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <img src="/favicon.svg" className="mx-auto mb-8" />

        <div className="fixed top-8 right-8">
          <ThemeSwitcher />
        </div>

        <Outlet />
      </div>
    </div>
  );
}
