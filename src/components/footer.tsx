import FooterDesktop from "./footerLayoutDesktop";
import FooterMobile from "./footerLayoutMobile";

export default function Footer() {
  return (
    <footer className="relative z-10">
      <div className="mx-auto max-w-screen-xl">
        <FooterMobile />
        <FooterDesktop />
      </div>
      <div className="absolute bottom-0 -z-[1] h-[120%] w-full bg-gradient-to-tr from-cyan-500/30 via-blue-500/30 to-cyan-500/30 backdrop-blur-[30px] gradient-mask-t-[rgb(0,0,0)_50%,rgba(0,0,0,0.6)_65%,rgba(0,0,0,0.25)_80%,rgba(0,0,0,0)_100%]"></div>
    </footer>
  );
}
