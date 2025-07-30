import React from "react";
import Navbar from "./Navbar";
import Calendar from "./Calendar";

const CalendarPage = () => {
  return (
    <div className="flex h-screen bg-gray-900">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <Calendar />
        </main>
      </div>
    </div>
  );
};

export default CalendarPage;