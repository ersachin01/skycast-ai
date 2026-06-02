function Sk({ className = "" }) {
  return (
    <div className={`rounded-2xl bg-gradient-to-r from-white/[0.04] via-white/[0.08] to-white/[0.04] bg-[length:200%_100%] animate-shimmer ${className}`} />
  );
}

export default function Loader() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4 animate-fade-in">
      <div className="space-y-4">
        <Sk className="h-64 rounded-3xl" />
        <Sk className="h-36 rounded-3xl" />
        <Sk className="h-40 rounded-3xl" />
      </div>
      <div className="space-y-4">
        <Sk className="h-48 rounded-3xl" />
        <Sk className="h-28 rounded-3xl" />
        <Sk className="h-44 rounded-3xl" />
      </div>
    </div>
  );
}
