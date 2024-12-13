import { Baloo_Tamma_2 } from "next/font/google";

const baloo = Baloo_Tamma_2({
  subsets: ["latin"],
});

export default function AcaraLogo() {
  return (
    <div
      className={`${baloo.className} bg-gradient-to-r from-fuchsia-600 via-blue-600 to-fuchsia-600 bg-clip-text text-4xl font-medium tracking-wide text-transparent max-w-fit`}
    >
      <span>acara</span>
      <span className="text-6xl leading-[0px]">.</span>
      <span>com</span>
    </div>
  );
}
