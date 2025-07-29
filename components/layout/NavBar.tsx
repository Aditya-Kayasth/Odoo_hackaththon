"use client";
import { useEffect, useState } from "react";
import { ImBlogger } from "react-icons/im";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";
import SearchInput from "./SearchInput";
import Notifications from "./Notifications";
import Profile from "./Profile";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const session = useSession();
  const path = usePathname();
  const isLoggedIn = session.status === "authenticated";

  useEffect(() => {
    if (!isLoggedIn && path && typeof session.update === "function") {
      session.update();
    }
  }, [path, isLoggedIn, session]);

  return (
    <nav className="w-full sticky top-0 z-50 shadow-lg dark:shadow-gray-900 dark:bg-gray-950 dark:text-gray-300">
      <Container>
        <div className="flex justify-between items-center gap-2 py-2 px-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 cursor-pointer">
            <ImBlogger size={20} />
            <div className="font-bold text-xl">
              <h1>- LOGGER</h1>
            </div>
          </Link>

          {/* Hamburger menu for mobile */}
          <div className="flex md:hidden items-center gap-2">
            <SearchInput mobile />
            <button
              className="ml-2 p-2 rounded focus:outline-none"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex flex-1 items-center gap-8">
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-xs">
                <SearchInput />
              </div>
            </div>

            <div className="flex gap-4 md:gap-8 items-center">
              <ThemeToggle />
              {isLoggedIn && <Notifications />}
              {isLoggedIn && <Profile />}
              {!isLoggedIn && (
                <div className="flex flex-row items-center gap-4 font-bold text-lg">
                  <Link
                    href="/login"
                    className="hover:underline cursor-pointer"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="hover:underline cursor-pointer"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {open && (
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-40 z-50"
            onClick={() => setOpen(false)}
          >
            <div
              className="absolute top-0 right-0 w-3/4 max-w-xs bg-white dark:bg-gray-900 h-full shadow-lg flex flex-col gap-6 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end">
                <button onClick={() => setOpen(false)} aria-label="Close menu">
                  <X size={28} />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <SearchInput />
                <ThemeToggle />
                {isLoggedIn && <Notifications />}
                {isLoggedIn && <Profile />}
                {!isLoggedIn && (
                  <>
                    <Link
                      href="/login"
                      className="hover:underline cursor-pointer"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="hover:underline cursor-pointer"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
};

export default NavBar;
