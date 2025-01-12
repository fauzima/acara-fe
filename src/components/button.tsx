export default function Button({
  text,
  style,
}: {
  text: string;
  style: string;
}) {
  return (
    <div
      className={`group relative h-fit items-center rounded-xl px-3 py-2 text-center text-sm font-bold backdrop-blur-sm ${style}`}
    >
      <div className="absolute left-0 top-0 z-[2] size-full rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 opacity-0 transition-opacity hover:opacity-100"></div>
      <p className="pointer-events-none absolute left-0 top-0 z-[3] size-full px-3 py-2 transition-colors group-hover:text-white">
        {text}
      </p>
      {text}
    </div>
  );
}
