// components/AppointmentCalendar.tsx
"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useMemo } from "react";

type Appointment = {
  id: number;
  appointmentDate: string;
  // ... other fields not needed for display
};

type Props = {
  appointments: Appointment[];
};

export default function AppointmentCalendar({ appointments }: Props) {
  const events = useMemo(() => {
    if (!appointments) return []; // 👈 prevent .forEach crash

    const countMap: { [date: string]: number } = {};

    appointments.forEach((appt) => {
      const date = appt.appointmentDate;
      countMap[date] = (countMap[date] || 0) + 1;
    });

    return Object.entries(countMap).map(([date, count]) => ({
      title: `${count} Appointment${count > 1 ? "s" : ""}`,
      date,
      allDay: true,
    }));
  }, [appointments]);

  return (
    <div className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
      />
    </div>
  );
}
