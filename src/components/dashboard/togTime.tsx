import HoverModal from "../hoverModal";
import Button from "../button";

const TogTime = () => {
  return (
    <div className="relative">
      <HoverModal
        trigger={<Button text="waktu" style="w-32 bg-blue-500/50" />}
        content={
          <div className="absolute right-0 flex w-full items-end pt-3">
            <div className="w-full rounded-xl bg-gradient-to-tr from-cyan-200 to-blue-200 text-sm font-bold">
              <ul className="flex w-full flex-col items-center">
                <button className="w-full px-4 py-3 text-center text-gray-700 hover:bg-white/25">
                  Hari
                </button>
                <button className="w-full px-4 py-3 text-center text-gray-700 hover:bg-white/25">
                  Bulan
                </button>
                <button className="w-full px-4 py-3 text-center text-gray-700 hover:bg-white/25">
                  Tahun
                </button>
              </ul>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default TogTime;
