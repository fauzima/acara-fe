import { Baloo_Tamma_2 } from "next/font/google";

const baloo = Baloo_Tamma_2({
  subsets: ["latin"],
});

export default function AcaraLogo() {
  return (
    <div
      className={`${baloo.className} max-w-fit bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 bg-clip-text text-4xl font-medium tracking-wide text-transparent`}
    >
      <span>acara</span>
      <span className="text-6xl leading-[0px]">.</span>
      <span>com</span>
    </div>
  );
}
