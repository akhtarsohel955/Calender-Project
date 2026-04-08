import { useState } from "react";
import { format } from "date-fns";
import { Plus, Trash2, Pin, CalendarDays } from "lucide-react";

export interface CalendarNote {
  id: string;
  text: string;
  dateKey: string | null; // null = general month note, "YYYY-MM-DD" = pinned to date
  rangeLabel?: string;
  createdAt: number;
}

interface NotesSidebarProps {
  currentMonth: Date;
  startDate: Date | null;
  endDate: Date | null;
  notes: CalendarNote[];
  onAddNote: (text: string, dateKey: string | null) => void;
  onDeleteNote: (id: string) => void;
}

const NotesSidebar = ({
  currentMonth,
  startDate,
  endDate,
  notes,
  onAddNote,
  onDeleteNote,
}: NotesSidebarProps) => {
  const [newNote, setNewNote] = useState("");
  const [pinToSelection, setPinToSelection] = useState(false);

  const hasSelection = !!startDate;

  const handleAdd = () => {
    if (!newNote.trim()) return;

    // Determine if note should be pinned to selected date
    let dateKey: string | null = null;
    if (pinToSelection && startDate) {
      dateKey = startDate.toISOString().split("T")[0];
    }

    onAddNote(newNote.trim(), dateKey);
    setNewNote("");
    setPinToSelection(false);
  };

  const selectionLabel = startDate
    ? endDate
      ? `${format(startDate, "MMM d")} – ${format(endDate, "MMM d")}`
      : format(startDate, "MMM d")
    : null;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="w-4 h-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Notes</h3>
      </div>

      {/* Add note */}
      <div className="mb-4 space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Add a note..."
            className="flex-1 px-3 py-2 text-sm rounded-md bg-calendar-paper border border-border
              focus:outline-none focus:ring-2 focus:ring-ring/30 placeholder:text-muted-foreground/50"
          />
          <button
            type="button"
            onClick={handleAdd}
            disabled={!newNote.trim()}
            className="p-2 rounded-md bg-primary text-primary-foreground hover:opacity-90
              disabled:opacity-40 transition-opacity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {hasSelection && (
          <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
            <input
              type="checkbox"
              checked={pinToSelection}
              onChange={(e) => setPinToSelection(e.target.checked)}
              className="rounded accent-primary"
            />
            <Pin className="w-3 h-3" />
            Pin to {selectionLabel}
          </label>
        )}
      </div>

      {/* Notes list */}
      <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CalendarDays className="w-8 h-8 text-muted-foreground/30 mb-2" />
            <p className="text-sm text-muted-foreground/60 italic">
              No plans yet — enjoy your month!
            </p>
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="group flex items-start gap-2 p-2.5 rounded-md bg-calendar-note/60
                border border-border/50 transition-colors hover:bg-calendar-note"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-snug break-words">{note.text}</p>
                {note.dateKey && (
                  <span className="inline-flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <Pin className="w-3 h-3" />
                    {note.rangeLabel || note.dateKey}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => onDeleteNote(note.id)}
                className="p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity
                  text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesSidebar;
