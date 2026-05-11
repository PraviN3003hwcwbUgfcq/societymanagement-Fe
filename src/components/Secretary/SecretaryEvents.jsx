// import React from "react";
// import Event from "../Event/Event";

// const SecretaryEvents = () => {
//   return <Event />;
// };

// export default SecretaryEvents;





import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  PlusCircle,
  Bell,
  ClipboardList,
} from "lucide-react";

import Event from "../Event/Event";

const SecretaryEvents = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F7FE] p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Secretary Events
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Manage society events and community activities
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Upcoming Events</p>

              <h2 className="text-2xl font-semibold text-green-600 mt-2">
                6
              </h2>
            </div>

            <div className="bg-green-50 text-green-600 p-3 rounded-xl">
              <CalendarDays size={22} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Activities</p>

              <h2 className="text-2xl font-semibold text-blue-600 mt-2">
                3
              </h2>
            </div>

            <div className="bg-blue-50 text-blue-600 p-3 rounded-xl">
              <ClipboardList size={22} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completed Events</p>

              <h2 className="text-2xl font-semibold text-purple-600 mt-2">
                12
              </h2>
            </div>

            <div className="bg-purple-50 text-purple-600 p-3 rounded-xl">
              <Bell size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Create Event */}
          <button
            onClick={() => {
              const addEventBtn = document.querySelector(
                ".add-event-trigger"
              );

              if (addEventBtn) {
                addEventBtn.click();
              }
            }}
            className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition"
          >
            <PlusCircle className="text-blue-600" size={22} />

            <div className="text-left">
              <p className="font-semibold text-gray-900">Create Event</p>

              <p className="text-xs text-gray-500">
                Add new society event
              </p>
            </div>
          </button>

          {/* Dashboard */}
          <button
            onClick={() => navigate("/layout/SecretaryDashboard")}
            className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition"
          >
            <Bell className="text-purple-600" size={22} />

            <div className="text-left">
              <p className="font-semibold text-gray-900">Dashboard</p>

              <p className="text-xs text-gray-500">
                Return to dashboard
              </p>
            </div>
          </button>

          {/* Notices */}
          <button
            onClick={() => navigate("/layout/SecretaryNotice")}
            className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition"
          >
            <ClipboardList className="text-green-600" size={22} />

            <div className="text-left">
              <p className="font-semibold text-gray-900">Manage Notices</p>

              <p className="text-xs text-gray-500">
                View society notices
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Event Component */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <Event />
      </div>
    </div>
  );
};

export default SecretaryEvents;