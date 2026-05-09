

import React from "react";
import {
  Bell,
  TriangleAlert,
  CalendarDays,
  Users,
  CheckCircle,
  Clock,
} from "lucide-react";

const SecretaryDashboard = () => {
  const stats = [
    {
      title: "Total Residents",
      value: "248",
      icon: Users,
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Active Notices",
      value: "12",
      icon: Bell,
      bg: "bg-purple-50",
      text: "text-purple-600",
    },
    {
      title: "Open Complaints",
      value: "8",
      icon: TriangleAlert,
      bg: "bg-red-50",
      text: "text-red-600",
    },
    {
      title: "Upcoming Events",
      value: "3",
      icon: CalendarDays,
      bg: "bg-green-50",
      text: "text-green-600",
    },
  ];

  const notices = [
    {
      title: "Water supply maintenance",
      date: "06 May 2026",
      status: "Active",
    },
    {
      title: "Society meeting on Sunday",
      date: "08 May 2026",
      status: "Active",
    },
    {
      title: "Parking rules update",
      date: "10 May 2026",
      status: "Draft",
    },
  ];

  const complaints = [
    {
      title: "Lift not working in B Wing",
      flat: "B-204",
      status: "Pending",
    },
    {
      title: "Water leakage near lobby",
      flat: "A-101",
      status: "In Progress",
    },
    {
      title: "Street light issue",
      flat: "C-302",
      status: "Resolved",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FE] p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Secretary Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage society notices, complaints, residents and events
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    {item.title}
                  </p>
                  <h2 className="text-2xl font-semibold text-gray-900 mt-2">
                    {item.value}
                  </h2>
                </div>

                <div className={`${item.bg} ${item.text} p-3 rounded-xl`}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Notices
            </h2>
            <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded-xl">
              + Add Notice
            </button>
          </div>

          <div className="space-y-3">
            {notices.map((notice) => (
              <div
                key={notice.title}
                className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-b-0"
              >
                <div>
                  <p className="font-medium text-gray-900">{notice.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{notice.date}</p>
                </div>

                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    notice.status === "Active"
                      ? "bg-green-50 text-green-600"
                      : "bg-yellow-50 text-yellow-600"
                  }`}
                >
                  {notice.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Complaint Overview
          </h2>

          <div className="space-y-3">
            {complaints.map((complaint) => (
              <div
                key={complaint.title}
                className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-b-0"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {complaint.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Flat {complaint.flat}
                  </p>
                </div>

                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    complaint.status === "Resolved"
                      ? "bg-green-50 text-green-600"
                      : complaint.status === "In Progress"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {complaint.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Secretary Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 p-4 rounded-xl text-left transition">
              <Bell className="text-blue-600" size={22} />
              <div>
                <p className="font-semibold text-gray-900">Create Notice</p>
                <p className="text-xs text-gray-500">Publish society update</p>
              </div>
            </button>

            <button className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 p-4 rounded-xl text-left transition">
              <TriangleAlert className="text-red-600" size={22} />
              <div>
                <p className="font-semibold text-gray-900">View Complaints</p>
                <p className="text-xs text-gray-500">Track resident issues</p>
              </div>
            </button>

            <button className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 p-4 rounded-xl text-left transition">
              <CheckCircle className="text-green-600" size={22} />
              <div>
                <p className="font-semibold text-gray-900">Mark Resolved</p>
                <p className="text-xs text-gray-500">Update issue status</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecretaryDashboard;