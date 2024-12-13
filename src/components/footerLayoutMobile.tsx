import Link from "next/link";
import AcaraLogo from "./acaraLogo";

export default function FooterMobile() {
  return (
    <div className="flex w-full flex-col items-center px-4 pb-9 pt-3 sm:px-8 md:hidden">
      <Link href={"/"}>
        <AcaraLogo />
      </Link>
      <div className="flex w-full items-center rounded-lg py-6 text-neutral-600">
        <div className="flex w-full flex-col items-center gap-4">
          <p className="hover:cursor-pointer hover:underline">Tentang</p>
          <p className="hover:cursor-pointer hover:underline">Misi kami</p>
          <p className="hover:cursor-pointer hover:underline">
            Kebijakan privasi
          </p>
          <p className="hover:cursor-pointer hover:underline">
            Ketentuan layanan
          </p>
        </div>
        <div className="flex w-full flex-col items-center gap-4">
          <p className="hover:cursor-pointer hover:underline">Layanan</p>
          <p className="hover:cursor-pointer hover:underline">Produk</p>
          <p className="hover:cursor-pointer hover:underline">Karir</p>
          <p className="hover:cursor-pointer hover:underline">Kontak</p>
        </div>
      </div>
      <div className="flex flex-col items-center text-sm text-neutral-600 gap-1">
        <p>© 2024</p>
        <div>
          <span>Made with </span>
          <span className="text-pink-600">❤ </span>
          <span>by Fauzi and Salman</span>
        </div>
      </div>
    </div>
  );
}
