import { MdEventNote } from "react-icons/md";

export default function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-screen-lg px-4 py-4 md:px-8">
      <div className="flex flex-wrap content-start gap-x-6 gap-y-6">
        <div className="group flex w-full flex-col items-center rounded-md border border-neutral-500/50 p-5 text-xl md:w-[calc(50%-12px)] xl:w-[calc(33.33%-16px)]">
          <div className="flex w-full flex-col gap-5">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-3">
                <MdEventNote className="text-2xl" />
                <p>Event Aktif</p>
              </div>
              <p>Details</p>
            </div>
            <hr className="border-neutral-500" />
            <div className="text-start">
              <span className="text-5xl">0 </span>
              <span>Event</span>
            </div>
          </div>
        </div>
        <div className="group flex w-full flex-col items-center rounded-md border border-neutral-500/50 p-5 text-xl md:w-[calc(50%-12px)] xl:w-[calc(33.33%-16px)]">
          <div className="flex w-full flex-col gap-5">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-3">
                <MdEventNote className="text-2xl" />
                <p>Event Draf</p>
              </div>
              <p>Details</p>
            </div>
            <hr className="border-neutral-500" />
            <div className="text-start">
              <span className="text-5xl">0 </span>
              <span>Event</span>
            </div>
          </div>
        </div>
        <div className="group flex w-full flex-col items-center rounded-md border border-neutral-500/50 p-5 text-xl md:w-[calc(50%-12px)] xl:w-[calc(33.33%-16px)]">
          <div className="flex w-full flex-col gap-5">
            <div className="flex w-full items-center justify-between">
              <p>Total Transaksi</p>
              <p>Details</p>
            </div>
            <hr className="border-neutral-500" />
            <div className="text-start">
              <span className="text-5xl">0 </span>
              <span></span>
            </div>
          </div>
        </div>
        <div className="group flex w-full flex-col items-center rounded-md border border-neutral-500/50 p-5 text-xl md:w-[calc(50%-12px)] xl:w-[calc(33.33%-16px)]">
          <div className="flex w-full flex-col gap-5">
            <div className="flex w-full items-center justify-between">
              <p>Total Tiket Terjual</p>
              <p>Details</p>
            </div>
            <hr className="border-neutral-500" />
            <div className="text-start">
              <span className="text-5xl">0 </span>
              <span>Tiket</span>
            </div>
          </div>
        </div>
        <div className="group flex w-full flex-col items-center rounded-md border border-neutral-500/50 p-5 text-xl md:w-[calc(50%-12px)] xl:w-[calc(33.33%-16px)]">
          <div className="flex w-full flex-col gap-5">
            <div className="flex w-full items-center justify-between">
              <p>Total Penjualan</p>
              <p>Details</p>
            </div>
            <hr className="border-neutral-500" />
            <div className="text-start">
              <span className="text-5xl">Rp 0 </span>
              <span></span>
            </div>
          </div>
        </div>
        <div className="group flex w-full flex-col items-center rounded-md border border-neutral-500/50 p-5 text-xl md:w-[calc(50%-12px)] xl:w-[calc(33.33%-16px)]">
          <div className="flex w-full flex-col gap-5">
            <div className="flex w-full items-center justify-between">
              <p>Total Pengujung</p>
              <p>Details</p>
            </div>
            <hr className="border-neutral-500" />
            <div className="text-start">
              <span className="text-5xl">0 </span>
              <span>Orang</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
