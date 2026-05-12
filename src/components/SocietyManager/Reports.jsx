import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { toast } from "react-hot-toast";

const Reports = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [transfers, setTransfers] = useState([]);

  const fetchReports = async () => {
    try {
      const [payrollRes, employeeRes, transferRes] = await Promise.all([
        axios.get("/payroll/all", { withCredentials: true }),
        axios.get("/employee/all", { withCredentials: true }),
        axios.get("/society-transfer/all", { withCredentials: true }),
      ]);

      setPayrolls(payrollRes.data.data || []);
      setEmployees(employeeRes.data.data || []);
      setTransfers(transferRes.data.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch reports");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const totalSalary = payrolls.reduce(
    (acc, item) => acc + Number(item.salaryAmount || 0),
    0
  );

  const paidSalary = payrolls
    .filter((item) => item.status === "Paid")
    .reduce((acc, item) => acc + Number(item.salaryAmount || 0), 0);

  const pendingSalary = payrolls
    .filter((item) => item.status === "Pending")
    .reduce((acc, item) => acc + Number(item.salaryAmount || 0), 0);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Society Reports
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Summary of payroll, staff and transfer activities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Total Staff</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {employees.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Total Salary</p>
          <h2 className="text-3xl font-bold text-purple-600 mt-2">
            ₹{totalSalary}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Paid Salary</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
            ₹{paidSalary}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Pending Salary</p>
          <h2 className="text-3xl font-bold text-red-600 mt-2">
            ₹{pendingSalary}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Total Transfers</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {transfers.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Pending Transfers</p>
          <h2 className="text-3xl font-bold text-amber-500 mt-2">
            {transfers.filter((item) => item.status === "Pending").length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Approved Transfers</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {transfers.filter((item) => item.status === "Approved").length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Rejected Transfers</p>
          <h2 className="text-3xl font-bold text-red-600 mt-2">
            {transfers.filter((item) => item.status === "Rejected").length}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">
            Recent Payroll Records
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Latest salary records
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">Employee</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Month</th>
                <th className="px-6 py-4 font-medium">Salary</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {payrolls.slice(0, 5).map((item) => (
                <tr key={item._id} className="border-t border-gray-100">
                  <td className="px-6 py-5 font-semibold text-gray-900">
                    {item.employeeName}
                  </td>
                  <td className="px-6 py-5">{item.employeeRole}</td>
                  <td className="px-6 py-5">{item.month}</td>
                  <td className="px-6 py-5 font-semibold">
                    ₹{item.salaryAmount}
                  </td>
                  <td className="px-6 py-5">
                    {item.status === "Paid" ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        Paid
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {payrolls.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-400">
                    No payroll records found
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

export default Reports;