import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useState } from "react";

export default function DateRangePicker({
  onChange,
  className,
}: {
  onChange?: (range: DateRange | undefined) => void;
  className?: string;
}) {
  const [date, setDate] = useState<DateRange | undefined>();

  const handleChange = (range: DateRange | undefined) => {
    setDate(range);
    if (onChange) onChange(range);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-[300px] justify-start text-left font-normal ${className}`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "dd MMM yyyy")} -{" "}
                {format(date.to, "dd MMM yyyy")}
              </>
            ) : (
              format(date.from, "dd MMM yyyy")
            )
          ) : (
            <span>Pilih rentang tanggal</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={date}
          onSelect={handleChange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
