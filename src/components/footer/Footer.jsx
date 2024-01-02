import { Link } from "react-router-dom";
import Logo from "../Logo";
import { RiLinkedinFill, RiGithubFill, RiTwitterXFill } from "@remixicon/react";

function Footer() {
  return (
    <>
      <section className="relative overflow-hidden bg-white py-8">
        <div className="container relative z-10 mx-auto px-4">
          <div className="-m-8 flex flex-wrap items-center justify-between">
            <div className="w-auto p-8">
              <a href="#">
                <div className="inline-flex items-center">
                  <Link to={"/"}>
                    <Logo />
                  </Link>
                  <span className="ml-4 text-lg font-bold">BlogUI</span>
                </div>
              </a>
            </div>
            <div className="w-auto p-8">
              <ul className="-m-5 flex flex-wrap items-center">
                <li className="p-5">
                  <Link
                    className="font-medium text-gray-600 hover:text-gray-700"
                    to={"/"}
                  >
                    All &copy; reserved made with ❤️
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-auto p-8">
              <div className="-m-1.5 flex flex-wrap">
                <div className="w-auto p-1.5">
                  <Link to={"https://www.linkedin.com/in/avinash-pandey2492/"}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                      <RiLinkedinFill className="my-icon" />
                    </div>
                  </Link>
                </div>
                <div className="w-auto p-1.5">
                  <Link to={"https://github.com/Avi2492"}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                      <RiGithubFill className="my-icon" />
                    </div>
                  </Link>
                </div>
                <div className="w-auto p-1.5">
                  <Link to={"https://twitter.com/Avinash2492"}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                      <RiTwitterXFill className="my-icon" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer;
