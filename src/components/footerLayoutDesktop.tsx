import Link from "next/link";
import AcaraLogo from "./acaraLogo";

export default function FooterDesktop() {
  return (
    <div className="hidden w-full gap-6 px-4 pb-9 pt-3 sm:px-8 md:flex">
      <div className="w-60">
        <Link href={"/"}>
          <AcaraLogo />
        </Link>
        <div className="flex flex-col gap-1 text-sm text-neutral-600">
          <p>© 2024</p>
          <div>
            <span>Made with </span>
            <span className="text-pink-600">❤ </span>
            <span>by Fauzi and Salman</span>
          </div>
        </div>
      </div>
      <div className="flex w-[calc(100%-240px)] justify-around">
        <div className="flex flex-col gap-2 text-neutral-600">
          <p className="hover:cursor-pointer hover:underline">Tentang</p>
          <p className="hover:cursor-pointer hover:underline">Misi kami</p>
          <p className="hover:cursor-pointer hover:underline">
            Kebijakan privasi
          </p>
          <p className="hover:cursor-pointer hover:underline">
            Ketentuan layanan
          </p>
        </div>
        <div className="flex flex-col gap-2 text-neutral-600">
          <p className="hover:cursor-pointer hover:underline">Layanan</p>
          <p className="hover:cursor-pointer hover:underline">Produk</p>
          <p className="hover:cursor-pointer hover:underline">Karir</p>
          <p className="hover:cursor-pointer hover:underline">Kontak</p>
        </div>
      </div>
    </div>
  );
}
