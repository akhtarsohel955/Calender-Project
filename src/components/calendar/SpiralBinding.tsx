const HOLE_COUNT = 14;

const SpiralBinding = () => {
  return (
    <div className="relative w-full flex items-center justify-center py-3 bg-gradient-to-b from-foreground/5 to-transparent">
      {/* Wire */}
      <div className="absolute top-1/2 left-[8%] right-[8%] h-[2px] bg-calendar-spiral/40 rounded-full -translate-y-1/2" />

      {/* Holes */}
      <div className="relative flex items-center justify-between w-[84%]">
        {Array.from({ length: HOLE_COUNT }).map((_, i) => (
          <div key={i} className="spiral-hole" />
        ))}
      </div>

      {/* Nail/hanger in center */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-2 h-2 rounded-full bg-calendar-spiral/60 shadow-sm" />
        <div className="w-0.5 h-3 bg-calendar-spiral/40" />
      </div>
    </div>
  );
};

export default SpiralBinding;
