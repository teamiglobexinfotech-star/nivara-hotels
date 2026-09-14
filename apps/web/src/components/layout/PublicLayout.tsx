import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar onOpenBooking={() => {}} />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
