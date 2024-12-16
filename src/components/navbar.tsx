import AuthMenu from "./auth/authMenu";
import Link from "next/link";
import AcaraLogo from "./acaraLogo";
import SearchMenuMobile from "./search/searchMenuMobile";
import AuthhMobile from "./auth/authMobile";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full">
      <nav className="z-[3] mx-auto max-w-screen-xl px-4 py-3 md:px-8">
        <div className="flex w-full items-center justify-between">
          <div className="w-[33.33%] md:hidden">
            <SearchMenuMobile />
          </div>
          <Link
            className="flex w-[33.33%] place-content-center md:w-auto"
            href={"/"}
          >
            <AcaraLogo />
          </Link>
          <div className="flex w-[33.33%] place-content-end md:hidden">
            <AuthhMobile />
          </div>
          <div className="hidden md:block">
            <AuthMenu />
          </div>
        </div>
      </nav>
      <div className="absolute top-0 -z-[2] h-[120%] w-full bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 backdrop-blur-[30px] gradient-mask-b-[rgb(0,0,0)_50%,rgba(0,0,0,0.6)_70%,rgba(0,0,0,0.3)_85%,rgba(0,0,0,0)_100%]"></div>
    </header>
  );
}
