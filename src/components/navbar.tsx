import AuthDesktop from "./auth/authDesktop";
import Link from "next/link";
import AcaraLogo from "./acaraLogo";
import AuthMobile from "./auth/authMobile";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full">
      <nav className="z-[3] mx-auto max-w-screen-xl px-4 py-3 md:px-8">
        <div className="flex w-full items-center justify-between">
          <Link className="flex place-content-center" href={"/"}>
            <AcaraLogo />
          </Link>
          <div className="hidden place-content-end md:flex">
            <AuthDesktop />
          </div>
          <div className="flex place-content-end md:hidden">
            <AuthMobile />
          </div>
        </div>
      </nav>
      <div className="absolute top-0 -z-[2] h-[120%] w-full bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 backdrop-blur-[30px] gradient-mask-b-[rgb(0,0,0)_50%,rgba(0,0,0,0.6)_70%,rgba(0,0,0,0.3)_85%,rgba(0,0,0,0)_100%]"></div>
    </header>
  );
}
