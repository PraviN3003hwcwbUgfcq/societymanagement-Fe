import React, { useEffect, useState } from "react";
import axios from "../../axios";

const MaintenanceCollection = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchMaintenance = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_URL_BACKEND}/api/v1/treasurer/maintenance`,
          { withCredentials: true }
        );

        setRecords(res.data.data?.records || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMaintenance();
  }, []);

  const formatAmount = (value) => Number(value || 0).toLocaleString("en-IN");

  return (
    <div className="min-h-screen bg-[#F4F7FE] px-6 py-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-2">
        Maintenance Collection
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        Check who paid maintenance and who is pending.
      </p>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-left">
                <th className="py-3 px-4">Flat</th>
                <th className="py-3 px-4">Owner</th>
                <th className="py-3 px-4">Total Due</th>
                <th className="py-3 px-4">Paid</th>
                <th className="py-3 px-4">Pending</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {records.map((item, index) => (
                <tr key={item._id || index} className="border-b border-gray-100">
                  <td className="py-3 px-4">{item.flatNo || item.houseNo}</td>
                  <td className="py-3 px-4">{item.ownerName || item.name}</td>
                  <td className="py-3 px-4">₹{formatAmount(item.totalDue)}</td>
                  <td className="py-3 px-4 text-green-600">
                    ₹{formatAmount(item.paid)}
                  </td>
                  <td className="py-3 px-4 text-red-600">
                    ₹{formatAmount(item.pending)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        Number(item.pending) > 0
                          ? "bg-red-50 text-red-600"
                          : "bg-green-50 text-green-600"
                      }`}
                    >
                      {Number(item.pending) > 0 ? "Pending" : "Paid"}
                    </span>
                  </td>
                </tr>
              ))}

              {records.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-gray-400">
                    No maintenance records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceCollection;