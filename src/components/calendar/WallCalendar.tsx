import { useState, useCallback, useMemo, useEffect } from "react";
import { format, addMonths, subMonths, isBefore, isSameDay } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import CalendarGrid from "./CalendarGrid";
import NotesSidebar, { type CalendarNote } from "./NotesSidebar";
import SpiralBinding from "./SpiralBinding";
import heroImage from "@/assets/calendar-hero.jpg";

const STORAGE_KEY = "wall-calendar-notes";

// Using the same hero image for all months for now
// TODO: Add seasonal images for each month
const heroImages: Record<number, string> = {
  0: heroImage, 1: heroImage, 2: heroImage, 3: heroImage,
  4: heroImage, 5: heroImage, 6: heroImage, 7: heroImage,
  8: heroImage, 9: heroImage, 10: heroImage, 11: heroImage,
};

function loadNotes(): CalendarNote[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveNotes(notes: CalendarNote[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

const WallCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [allNotes, setAllNotes] = useState<CalendarNote[]>(loadNotes);
  const [direction, setDirection] = useState(0);

  useEffect(() => { saveNotes(allNotes); }, [allNotes]);

  const monthKey = format(currentMonth, "yyyy-MM");

  const monthNotes = useMemo(
    () => allNotes.filter((n) => !n.dateKey || n.dateKey.startsWith(monthKey)),
    [allNotes, monthKey]
  );

  const noteDates = useMemo(() => {
    const s = new Set<string>();
    allNotes.forEach((n) => { if (n.dateKey) s.add(n.dateKey); });
    return s;
  }, [allNotes]);

  const handleDateClick = useCallback((date: Date) => {
    // Handle date selection logic
    // First click sets start date, second click sets end date
    if (!startDate || endDate) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (isSameDay(date, startDate)) {
        setStartDate(null);
      } else {
        const [s, e] = isBefore(date, startDate) ? [date, startDate] : [startDate, date];
        setStartDate(s);
        setEndDate(e);
      }
    }
  }, [startDate, endDate]);

  const handleDateHover = useCallback((date: Date) => {
    setHoveredDate(date);
  }, []);

  const goNext = () => { setDirection(1); setCurrentMonth((m) => addMonths(m, 1)); };
  const goPrev = () => { setDirection(-1); setCurrentMonth((m) => subMonths(m, 1)); };

  const clearSelection = () => { setStartDate(null); setEndDate(null); };

  const handleAddNote = useCallback((text: string, dateKey: string | null) => {
    // Create new note with unique ID
    const note: CalendarNote = {
      id: crypto.randomUUID(),
      text,
      dateKey,
      rangeLabel: dateKey && startDate && endDate
        ? `${format(startDate, "MMM d")} – ${format(endDate, "MMM d")}`
        : undefined,
      createdAt: Date.now(),
    };
    setAllNotes((prev) => [note, ...prev]);
  }, [startDate, endDate]);

  const handleDeleteNote = useCallback((id: string) => {
    setAllNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const selectionLabel = startDate
    ? endDate
      ? `${format(startDate, "MMM d")} – ${format(endDate, "MMM d, yyyy")}`
      : format(startDate, "MMMM d, yyyy")
    : null;

  // Animation variants for page flip effect
  const flipVariants = {
    enter: (d: number) => ({
      rotateX: d > 0 ? 15 : -15,
      opacity: 0,
      y: d > 0 ? 30 : -30,
    }),
    center: { rotateX: 0, opacity: 1, y: 0 },
    exit: (d: number) => ({
      rotateX: d > 0 ? -15 : 15,
      opacity: 0,
      y: d > 0 ? -30 : 30,
    }),
  };

  return (
    <div className="min-h-screen bg-background flex items-start justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6">
        {/* Calendar Card */}
        <div className="flex-1 calendar-shadow rounded-lg overflow-hidden calendar-paper">
          {/* Spiral Binding */}
          <SpiralBinding />

          {/* Hero Image */}
          <div className="relative overflow-hidden">
            <img
              src={heroImages[currentMonth.getMonth()]}
              alt={`${format(currentMonth, "MMMM yyyy")} calendar`}
              className="w-full h-48 sm:h-64 md:h-72 object-cover"
              width={1200}
              height={800}
            />
            {/* Month/Year overlay */}
            <div className="absolute bottom-0 right-0 bg-primary/90 backdrop-blur-sm px-5 py-2.5">
              <p className="text-primary-foreground text-xs font-sans font-medium tracking-widest uppercase">
                {format(currentMonth, "yyyy")}
              </p>
              <p className="text-primary-foreground font-display text-xl font-bold tracking-wide">
                {format(currentMonth, "MMMM").toUpperCase()}
              </p>
            </div>
          </div>

          {/* Navigation & Selection */}
          <div className="px-4 sm:px-6 pt-4 flex items-center justify-between">
            <button
              onClick={goPrev}
              className="p-2 rounded-full hover:bg-secondary transition-colors text-foreground"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="text-center">
              {selectionLabel ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-primary">{selectionLabel}</span>
                  <button onClick={clearSelection} className="text-muted-foreground hover:text-destructive transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">Click to select dates</span>
              )}
            </div>

            <button
              onClick={goNext}
              className="p-2 rounded-full hover:bg-secondary transition-colors text-foreground"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Calendar Grid with Flip Animation */}
          <div className="px-4 sm:px-6 pb-6 pt-2" style={{ perspective: "800px" }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={monthKey}
                custom={direction}
                variants={flipVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformOrigin: "top center" }}
              >
                <CalendarGrid
                  currentMonth={currentMonth}
                  startDate={startDate}
                  endDate={endDate}
                  hoveredDate={hoveredDate}
                  noteDates={noteDates}
                  onDateClick={handleDateClick}
                  onDateHover={handleDateHover}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Notes Sidebar */}
        <div className="w-full lg:w-72 xl:w-80 calendar-shadow rounded-lg calendar-paper p-4 sm:p-5 lg:max-h-[700px]">
          <NotesSidebar
            currentMonth={currentMonth}
            startDate={startDate}
            endDate={endDate}
            notes={monthNotes}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
          />
        </div>
      </div>
    </div>
  );
};

export default WallCalendar;
