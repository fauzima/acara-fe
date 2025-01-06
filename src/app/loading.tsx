import AcaraLogo from "@/components/acaraLogo";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex place-content-center items-center gap-2 bg-gradient-to-b from-cyan-200 via-white to-blue-200">
      <AcaraLogo />
      <div className="loader"></div>
    </div>
  );
}
