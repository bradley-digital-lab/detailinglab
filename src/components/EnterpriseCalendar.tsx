"use client";
import React, { useState, useCallback } from 'react';
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { motion } from 'framer-motion';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export interface DetailingEvent extends Event {
  resourceId?: string;
  isAvailable?: boolean;
}

export function EnterpriseCalendar({ onSelectSlot, events = [] }: { onSelectSlot: (start: Date, end: Date) => void, events?: DetailingEvent[] }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      setSelectedDate(start);
      onSelectSlot(start, end);
    },
    [onSelectSlot]
  );

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-[500px] w-full text-black bg-white rounded-xl overflow-hidden p-6 shadow-2xl relative z-50"
    >
      <style>{`
        /* Minimal Reset for React Big Calendar inside Dark App */
        .rbc-calendar { font-family: inherit; }
        .rbc-btn-group button { border-color: #cbd5e1; color: #334155; }
        .rbc-btn-group button.rbc-active { background-color: #06b6d4; color: white; border-color: #06b6d4; }
        .rbc-btn-group button:hover:not(.rbc-active) { background-color: #f1f5f9; }
        .rbc-today { background-color: #f0fdfa !important; }
        .rbc-event { background-color: #0f172a; border-radius: 6px; border: none; padding: 4px; }
        .rbc-selected-date { 
           background-color: rgba(6, 182, 212, 0.15) !important; 
           border: 1px solid #06b6d4 !important; 
           box-shadow: inset 0 0 15px rgba(6,182,212,0.2) !important;
        }
      `}</style>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        views={['month', 'week', 'day']}
        defaultView="month"
        selectable
        onSelectSlot={handleSelectSlot}
        dayPropGetter={(date: Date) => {
          if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
            return { className: 'rbc-selected-date' };
          }
          return {};
        }}
        eventPropGetter={(event: DetailingEvent) => ({
          style: {
            backgroundColor: event.isAvailable ? '#06b6d4' : '#0f172a',
            color: 'white',
          }
        })}
      />
    </motion.div>
  );
}
