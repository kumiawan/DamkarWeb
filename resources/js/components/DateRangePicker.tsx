import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { useState } from 'react';

export default function DateRangePicker({
  onChange,
  value,
  className,
}: {
  onChange?: (range: DateRange | undefined) => void;
  value?: DateRange;
  className?: string;
}) {
  const handleChange = (range: DateRange | undefined) => {
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
          {value?.from ? (
            value.to ? (
              <>
                {format(value.from, 'dd MMM yyyy')} -{' '}
                {format(value.to, 'dd MMM yyyy')}
              </>
            ) : (
              format(value.from, 'dd MMM yyyy')
            )
          ) : (
            <span>Pilih rentang tanggal</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={value}
          onSelect={handleChange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
