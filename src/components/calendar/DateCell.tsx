import { memo } from "react";
import { format, isSameDay, isWeekend } from "date-fns";
import { StickyNote } from "lucide-react";

interface DateCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  isHoveredRange: boolean;
  hasNote: boolean;
  onClick: (date: Date) => void;
  onMouseEnter: (date: Date) => void;
}

const DateCell = memo(({
  date,
  isCurrentMonth,
  isToday,
  isStart,
  isEnd,
  isInRange,
  isHoveredRange,
  hasNote,
  onClick,
  onMouseEnter,
}: DateCellProps) => {
  const day = date.getDate();
  const weekend = isWeekend(date);

  const isEndpoint = isStart || isEnd;

  // Determine cell styling based on state
  let cellBg = "";
  let textColor = isCurrentMonth ? "text-foreground" : "text-muted-foreground/40";
  let rounded = "rounded-md";

  if (isEndpoint) {
    cellBg = "bg-calendar-range-end";
    textColor = "text-primary-foreground";
    rounded = "rounded-full";
  } else if (isInRange || isHoveredRange) {
    cellBg = "bg-calendar-range";
    textColor = "text-foreground";
    rounded = "rounded-none";
  }

  if (isToday && !isEndpoint) {
    textColor = "text-calendar-today font-bold";
  }

  if (weekend && isCurrentMonth && !isEndpoint && !isInRange && !isHoveredRange) {
    textColor = "text-calendar-weekend";
  }

  return (
    <button
      type="button"
      onClick={() => onClick(date)}
      onMouseEnter={() => onMouseEnter(date)}
      className={`
        relative aspect-square flex items-center justify-center text-sm
        date-cell-hover cursor-pointer select-none
        ${cellBg} ${textColor} ${rounded}
        ${!isCurrentMonth ? "pointer-events-none opacity-30" : ""}
      `}
      aria-label={format(date, "MMMM d, yyyy")}
    >
      <span className={`z-10 ${isEndpoint ? "font-semibold" : ""}`}>{day}</span>
      {isToday && !isEndpoint && (
        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-calendar-today" />
      )}
      {hasNote && !isEndpoint && (
        <StickyNote className="absolute top-0.5 right-0.5 w-3 h-3 text-calendar-today opacity-70" />
      )}
    </button>
  );
});

DateCell.displayName = "DateCell";
export default DateCell;
