import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import React from "react";
import { Container, Logo, LogoutBtn } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth && state.auth.status);
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navMenu = () => {
    setIsNavOpen(!isNavOpen);
  };

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <>
      <Container>
        <div className="relative w-full bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
            <div className="inline-flex items-center space-x-2">
              <span>
                <Link to={"/"}>
                  <Logo />
                </Link>
              </span>
              <span className="font-bold">BlogUI</span>
            </div>
            <div className="hidden lg:block">
              <ul className="inline-flex space-x-8">
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name} className="list-none">
                      <button
                        type="submit"
                        className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-black hover:text-white hover:bg-black/80"
                        onClick={() => navigate(item.slug)}
                      >
                        {item.name}
                      </button>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
            <div className="hidden lg:block">
              {authStatus && (
                <li className="list-none">
                  <LogoutBtn />
                </li>
              )}
            </div>
            <div className="lg:hidden">
              <Menu onClick={navMenu} className="h-6 w-6 cursor-pointer" />
            </div>
            {isNavOpen && (
              <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
                <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="px-5 pb-6 pt-5">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center space-x-2">
                        <span>
                          <Link to={"/"}>
                            <Logo />
                          </Link>
                        </span>
                        <span className="font-bold">BlogUI</span>
                      </div>
                      <div className="-mr-2">
                        <button
                          type="button"
                          onClick={navMenu}
                          className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                          <span className="sr-only">Close menu</span>
                          <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-6">
                      <nav className="grid gap-y-4">
                        {navItems.map((item) =>
                          item.active ? (
                            <li key={item.name} className="list-none">
                              <button
                                type="submit"
                                className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-black hover:text-white hover:bg-black/80"
                                onClick={() => navigate(item.slug)}
                              >
                                {item.name}
                              </button>
                            </li>
                          ) : null
                        )}
                      </nav>
                    </div>{" "}
                    {authStatus && (
                      <li className="list-none">
                        <LogoutBtn />
                      </li>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

export default Header;
