import React, { useState } from "react";
import SocietyPayroll from "./SocietyPayroll";
import StaffManagement from "./StaffManagement";
import TransferApprovals from "./TransferApprovals";
import Reports from "./Reports";

const SocietyManager = () => {
  const [activeTab, setActiveTab] = useState("Payroll");

  const tabs = ["Payroll", "Staff Management", "Transfer Approvals", "Reports"];

  return (
    <div className="min-h-screen bg-[#F4F7FE]">
      <div className="p-6 pb-0">
        <h1 className="text-3xl font-bold text-gray-900">Society Manager</h1>
        <p className="text-gray-500 mt-1">
          Manage payroll, staff, approvals and society reports
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl font-medium transition ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border border-gray-100 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {activeTab === "Payroll" && <SocietyPayroll />}

        {activeTab === "Staff Management" && (
          <div className="p-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <StaffManagement/>
            </div>
          </div>
        )}

        {activeTab === "Transfer Approvals" && (
          <div className="p-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <TransferApprovals/>
            </div>
          </div>
        )}

        {activeTab === "Reports" && (
          <div className="p-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <Reports/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocietyManager;