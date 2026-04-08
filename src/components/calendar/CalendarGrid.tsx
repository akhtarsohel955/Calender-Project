import { useMemo } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isSameDay,
  isWithinInterval,
  isAfter,
  isBefore,
} from "date-fns";
import DateCell from "./DateCell";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface CalendarGridProps {
  currentMonth: Date;
  startDate: Date | null;
  endDate: Date | null;
  hoveredDate: Date | null;
  noteDates: Set<string>;
  onDateClick: (date: Date) => void;
  onDateHover: (date: Date) => void;
}

const CalendarGrid = ({
  currentMonth,
  startDate,
  endDate,
  hoveredDate,
  noteDates,
  onDateClick,
  onDateHover,
}: CalendarGridProps) => {
  const days = useMemo(() => {
    // Calculate the full calendar grid including days from previous/next months
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
    return eachDayOfInterval({ start: calStart, end: calEnd });
  }, [currentMonth]);

  const isInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    const [s, e] = isBefore(startDate, endDate) ? [startDate, endDate] : [endDate, startDate];
    return isWithinInterval(date, { start: s, end: e }) && !isSameDay(date, s) && !isSameDay(date, e);
  };

  const isHoveredRange = (date: Date) => {
    if (!startDate || endDate || !hoveredDate) return false;
    const [s, e] = isBefore(startDate, hoveredDate) ? [startDate, hoveredDate] : [hoveredDate, startDate];
    return isWithinInterval(date, { start: s, end: e }) && !isSameDay(date, s) && !isSameDay(date, e);
  };

  return (
    <div>
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((date) => {
          const dateKey = date.toISOString().split("T")[0];
          return (
            <DateCell
              key={dateKey}
              date={date}
              isCurrentMonth={isSameMonth(date, currentMonth)}
              isToday={isToday(date)}
              isStart={!!startDate && isSameDay(date, startDate)}
              isEnd={!!endDate && isSameDay(date, endDate)}
              isInRange={isInRange(date)}
              isHoveredRange={isHoveredRange(date)}
              hasNote={noteDates.has(dateKey)}
              onClick={onDateClick}
              onMouseEnter={onDateHover}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
