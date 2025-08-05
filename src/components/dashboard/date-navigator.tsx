
'use client';

import { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}`;
};

const isToday = (date: Date) => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
};

const DateItem = ({ date, isActive }: { date: Date, isActive: boolean }) => {
    const displayDate = useMemo(() => {
        if (isActive && isToday(date)) {
            return "Today";
        }
        return formatDate(date);
    }, [date, isActive]);

    const itemClasses = `
        flex items-center justify-center h-11
        text-base font-medium rounded-2xl transition-all duration-300
        ${isActive 
            ? 'bg-accent text-accent-foreground w-24 shadow-lg' 
            : 'text-muted-foreground w-20'
        }
    `;

    return (
        <div className={itemClasses}>
            {displayDate}
        </div>
    );
};

const DateNavigator = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  const { prevDay, nextDay } = useMemo(() => {
    if (!selectedDate) return { prevDay: null, nextDay: null };
    const prev = new Date(selectedDate);
    prev.setDate(selectedDate.getDate() - 1);
    const next = new Date(selectedDate);
    next.setDate(selectedDate.getDate() + 1);
    return { prevDay: prev, nextDay: next };
  }, [selectedDate]);

  const handlePrevDay = () => {
    setSelectedDate(prevDate => {
      if (!prevDate) return null;
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDay = () => {
    setSelectedDate(prevDate => {
      if (!prevDate) return null;
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };
  
  if (!selectedDate) {
    return (
        <div className="flex items-center justify-between bg-secondary p-1.5 rounded-full w-full max-w-sm font-sans h-[62px]">
            {/* You can add a skeleton loader here if you want */}
        </div>
    )
  }

  return (
    <div className="flex items-center justify-between bg-secondary p-1.5 rounded-full w-full max-w-sm font-sans select-none">
      <button 
        onClick={handlePrevDay} 
        className="h-11 w-11 flex items-center justify-center text-muted-foreground hover:text-foreground text-2xl font-bold transition-colors duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary focus:ring-accent" 
        aria-label="Previous day"
      >
        &lsaquo;
      </button>

      <div className="flex items-center justify-center flex-grow gap-2 overflow-hidden">
        {prevDay && <DateItem date={prevDay} isActive={false} />}
        <DateItem date={selectedDate} isActive={true} />
        {nextDay && <DateItem date={nextDay} isActive={false} />}
      </div>
      
      <button 
        onClick={handleNextDay} 
        className="h-11 w-11 flex items-center justify-center text-muted-foreground hover:text-foreground text-2xl font-bold transition-colors duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary focus:ring-accent" 
        aria-label="Next day"
      >
        &rsaquo;
      </button>
    </div>
  );
};

export default DateNavigator;
