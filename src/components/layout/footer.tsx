export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t px-4 py-4">
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row">
        <p className="m-0 text-sm">
          &copy; {year} Maycon Silva. All rights reserved.
        </p>
        <p className="island-kicker m-0 text-sm">Built with Vite</p>
      </div>
    </footer>
  );
}
