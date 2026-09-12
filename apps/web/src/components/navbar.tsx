import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Accordion } from "./ui/accordion";

const links = [
  {
    to: "#home",
    text: "Home",
  },
  {
    to: "#about",
    text: "About Us",
  },
  {
    to: "#amenities-facilities",
    text: "Amenities & Facilities",
  },
  {
    to: "#our-rooms",
    text: "Our Rooms",
  },
  {
    to: "#faq",
    text: "FAQ",
  },
  {
    to: "#location",
    text: "Location",
  },
];

export const Navbar = ({ className }: { className?: string }) => {
  return (
    <section
      className={cn(
        "sticky top-0 z-50 border-b bg-background px-4 py-4",
        className
      )}
    >
      <div className="container mx-auto">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          {/* Logo */}
          <Link to={"/"}>
            <Logo />
          </Link>
          <div className="flex items-center">
            <NavigationMenu>
              <NavigationMenuList className={"gap-x-2"}>
                {links?.map((link) => (
                  <a
                    href={link.to}
                    key={link.to}
                    className="text-md font-semibold"
                  >
                    <Button variant={"ghost"}>{link.text}</Button>
                  </a>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex gap-2">
            <Link to={"/login"}>
              <Button variant="outline">Login</Button>
            </Link>
            <Link to={"/register"}>
              <Button>Book Now</Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to={"/"}>
              <Logo />
            </Link>
            <Sheet>
              <SheetTrigger render={<Button variant="outline" size="icon" />}>
                <Menu className="size-4" />
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link to={"/"}>
                      <Logo />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion className="flex w-full flex-col gap-4">
                    {links?.map((link) => (
                      <a href={link.to} className="text-md">
                        {link.text}
                      </a>
                    ))}
                  </Accordion>
                  <div className="flex flex-col gap-3">
                    <Link to={"/login"}>
                      <Button variant="outline" className={"w-full"}>
                        Login
                      </Button>
                    </Link>
                    <Link to={"/register"}>
                      <Button className={"w-full"}>Book Now</Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};
