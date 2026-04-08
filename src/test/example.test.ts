import { describe, it, expect } from "vitest";
import { format } from "date-fns";

describe("Calendar utilities", () => {
  it("formats dates correctly", () => {
    const date = new Date(2024, 0, 15);
    expect(format(date, "yyyy-MM-dd")).toBe("2024-01-15");
  });

  it("handles month navigation", () => {
    const currentDate = new Date(2024, 5, 1);
    expect(currentDate.getMonth()).toBe(5);
  });
});
