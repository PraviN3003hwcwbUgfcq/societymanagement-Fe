// import React from "react";
// import Notice from "../Notice/Notice";

// const SecretaryNotice = () => {
//   return <Notice />;
// };

// export default SecretaryNotice;






















import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Bell,
    PlusCircle,
    Megaphone,
    CalendarDays,
} from "lucide-react";

import Notice from "../Notice/Notice";

const SecretaryNotice = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F4F7FE] p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Secretary Notices
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Create and manage society notices and announcements
                </p>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Active Notices</p>
                            <h2 className="text-2xl font-semibold text-purple-600 mt-2">
                                12
                            </h2>
                        </div>

                        <div className="bg-purple-50 text-purple-600 p-3 rounded-xl">
                            <Bell size={22} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Announcements</p>
                            <h2 className="text-2xl font-semibold text-blue-600 mt-2">
                                5
                            </h2>
                        </div>

                        <div className="bg-blue-50 text-blue-600 p-3 rounded-xl">
                            <Megaphone size={22} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Upcoming Notices</p>
                            <h2 className="text-2xl font-semibold text-green-600 mt-2">
                                3
                            </h2>
                        </div>

                        <div className="bg-green-50 text-green-600 p-3 rounded-xl">
                            <CalendarDays size={22} />
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
                    <button
                        onClick={() => {
                            const addNoticeBtn = document.querySelector(
                                ".add-notice-trigger"
                            );

                            if (addNoticeBtn) {
                                addNoticeBtn.click();
                            }
                        }}
                        className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition"
                    >
                        <PlusCircle className="text-blue-600" size={22} />

                        <div className="text-left">
                            <p className="font-semibold text-gray-900">Create Notice</p>
                            <p className="text-xs text-gray-500">
                                Publish new society notice
                            </p>
                        </div>
                    </button>

                    <button
                        onClick={() => navigate("/layout/SecretaryDashboard")}
                        className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition"
                    >
                        <Bell className="text-purple-600" size={22} />

                        <div className="text-left">
                            <p className="font-semibold text-gray-900">Dashboard</p>
                            <p className="text-xs text-gray-500">
                                Return to secretary dashboard
                            </p>
                        </div>
                    </button>

                    <button
                        onClick={() => navigate("/layout/SecretaryEvents")}
                        className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition"
                    >
                        <CalendarDays className="text-green-600" size={22} />

                        <div className="text-left">
                            <p className="font-semibold text-gray-900">Manage Events</p>
                            <p className="text-xs text-gray-500">
                                View and organize events
                            </p>
                        </div>
                    </button>
                </div>
            </div>

            {/* Actual Notice Component */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <Notice />
            </div>
        </div>
    );
};

export default SecretaryNotice;