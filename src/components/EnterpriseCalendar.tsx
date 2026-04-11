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
      className="h-[500px] w-full text-white bg-transparent rounded-xl overflow-hidden relative z-50 border border-white/5"
    >
      <style>{`
        /* Elite Dark Mode Reset for React Big Calendar */
        .rbc-calendar { font-family: inherit; color: #fff; }
        
        /* Headers & Grid */
        .rbc-header { border-bottom: 1px solid rgba(255,255,255,0.05) !important; border-left: 1px solid rgba(255,255,255,0.05) !important; padding: 10px 0; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; font-size: 10px; color: #cbd5e1; }
        .rbc-month-view, .rbc-month-row, .rbc-day-bg { border-color: rgba(255,255,255,0.05) !important; }
        .rbc-off-range-bg { background-color: rgba(0,0,0,0.4) !important; }
        
        /* Top Navigation Buttons */
        .rbc-toolbar button { border: 1px solid rgba(255,255,255,0.1) !important; color: #94a3b8 !important; background: transparent; border-radius: 8px; transition: all 0.2s; text-transform: uppercase; font-size: 10px; font-weight: bold; letter-spacing: 0.05em; margin-right: 4px;}
        .rbc-toolbar button.rbc-active { background-color: rgba(6, 182, 212, 0.1) !important; color: #06b6d4 !important; border-color: #06b6d4 !important; }
        .rbc-toolbar button:hover:not(.rbc-active) { background-color: rgba(255,255,255,0.05) !important; color: white !important; }
        .rbc-toolbar .rbc-toolbar-label { font-weight: 900; font-size: 16px; text-transform: uppercase; letter-spacing: 0.1em; }

        /* Day Cells */
        .rbc-today { background-color: rgba(255,255,255,0.02) !important; }
        .rbc-date-cell { padding-right: 8px; padding-top: 4px; font-weight: bold; font-size: 12px; color: #94a3b8; }
        .rbc-event { background-color: #1e293b; border-radius: 4px; border: none; padding: 4px 6px; font-size: 10px; text-transform: uppercase; font-weight: 900; letter-spacing: 0.05em; }
        
        /* Active Selection Focus state */
        .rbc-selected-date { 
           background-color: rgba(6, 182, 212, 0.1) !important; 
           border: 1px solid rgba(6, 182, 212, 0.5) !important; 
           box-shadow: inset 0 0 20px rgba(6,182,212,0.1) !important;
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
