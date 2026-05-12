import React, { useEffect, useState } from "react";

import { useContext } from "react"; 
import UserContext from "../../context/UserContext";
import axios from "../../axios";
import { toast } from "react-hot-toast";

const SocietyPayroll = () => {
    const { rolee } = useContext(UserContext);
const isTreasurer = rolee === "treasurer";
  const [payrolls, setPayrolls] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [showPayrollForm, setShowPayrollForm] = useState(false);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);

  const [generateMonth, setGenerateMonth] = useState("");

  const [payrollForm, setPayrollForm] = useState({
    employeeName: "",
    employeeRole: "",
    phoneNo: "",
    month: "",
    salaryAmount: "",
  });

  const [employeeForm, setEmployeeForm] = useState({
    employeeName: "",
    employeeRole: "",
    phoneNo: "",
    email: "",
    monthlySalary: "",
  });

  const fetchPayrolls = async () => {
    try {
      const res = await axios.get("/payroll/all", {
        withCredentials: true,
      });

      setPayrolls(res.data.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch payrolls");
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("/employee/all", {
        withCredentials: true,
      });

      setEmployees(res.data.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch employees");
    }
  };

  useEffect(() => {
    fetchPayrolls();
    fetchEmployees();
  }, []);

  const handlePayrollChange = (e) => {
    setPayrollForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEmployeeChange = (e) => {
    setEmployeeForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreatePayroll = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/payroll/create", payrollForm, {
        withCredentials: true,
      });

      toast.success("Payroll created successfully");

      setPayrollForm({
        employeeName: "",
        employeeRole: "",
        phoneNo: "",
        month: "",
        salaryAmount: "",
      });

      setShowPayrollForm(false);
      fetchPayrolls();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to create payroll");
    }
  };

  const handleCreateEmployee = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/employee/create", employeeForm, {
        withCredentials: true,
      });

      toast.success("Employee added successfully");

      setEmployeeForm({
        employeeName: "",
        employeeRole: "",
        phoneNo: "",
        email: "",
        monthlySalary: "",
      });

      setShowEmployeeForm(false);
      fetchEmployees();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to add employee");
    }
  };

  const handleGenerateMonthlyPayroll = async () => {
    if (!generateMonth) {
      toast.error("Please enter month");
      return;
    }

    try {
      const res = await axios.post(
        "/payroll/generate-monthly",
        { month: generateMonth },
        { withCredentials: true }
      );

      toast.success(
        `${res.data.data?.length || 0} payroll records generated`
      );

      setGenerateMonth("");
      fetchPayrolls();
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to generate payroll"
      );
    }
  };

  const handleMarkPaid = async (payrollId) => {
    try {
      await axios.patch(
        `/payroll/mark-paid/${payrollId}`,
        {},
        { withCredentials: true }
      );

      toast.success("Salary marked as paid");
      fetchPayrolls();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to update payroll");
    }
  };

  const handleDeletePayroll = async (payrollId) => {
    try {
      await axios.delete(`/payroll/delete/${payrollId}`, {
        withCredentials: true,
      });

      toast.success("Payroll deleted");
      fetchPayrolls();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete payroll");
    }
  };

  const handleToggleEmployee = async (employeeId) => {
    try {
      await axios.patch(
        `/employee/toggle-status/${employeeId}`,
        {},
        { withCredentials: true }
      );

      toast.success("Employee status updated");
      fetchEmployees();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update employee");
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await axios.delete(`/employee/delete/${employeeId}`, {
        withCredentials: true,
      });

      toast.success("Employee deleted");
      fetchEmployees();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete employee");
    }
  };

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
    <div className="min-h-screen bg-[#F4F7FE] p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Society Payroll</h1>
        <p className="text-gray-500 mt-1">
          Manage staff, salaries and monthly payroll records
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Active Employees</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {employees.filter((item) => item.isActive).length}
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
{!isTreasurer && (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Generate Monthly Payroll
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Generate pending salary records for all active employees
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={generateMonth}
              onChange={(e) => setGenerateMonth(e.target.value)}
              placeholder="Example: June 2026"
              className="border border-gray-200 rounded-xl px-4 py-3 outline-none"
            />

            <button
              onClick={handleGenerateMonthlyPayroll}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-medium transition"
            >
              Generate Payroll
            </button>

            <button
              onClick={() => setShowEmployeeForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition"
            >
              + Add Employee
            </button>

            <button
              onClick={() => setShowPayrollForm(true)}
              className="bg-gray-900 hover:bg-black text-white px-5 py-3 rounded-xl font-medium transition"
            >
              + Add Payroll
            </button>
          </div>
        </div>
      </div>
)}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            Employee List
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Permanent salary staff records
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">Employee</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Monthly Salary</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5">
                    <p className="font-semibold text-gray-900">
                      {item.employeeName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.phoneNo || item.email}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-gray-700">
                    {item.employeeRole}
                  </td>

                  <td className="px-6 py-5 font-semibold text-gray-900">
                    ₹{item.monthlySalary}
                  </td>

                  <td className="px-6 py-5">
                    {item.isActive ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        Active
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                        Inactive
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-5 flex gap-3">
                    <button
                      onClick={() => handleToggleEmployee(item._id)}
                      className="bg-amber-50 hover:bg-amber-100 text-amber-700 px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      Toggle
                    </button>

                    <button
                      onClick={() => handleDeleteEmployee(item._id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {employees.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-400">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            Payroll Records
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Monthly generated salary records
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
                <th className="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {payrolls.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5">
                    <p className="font-semibold text-gray-900">
                      {item.employeeName}
                    </p>
                    <p className="text-sm text-gray-500">{item.phoneNo}</p>
                  </td>

                  <td className="px-6 py-5 text-gray-700">
                    {item.employeeRole}
                  </td>

                  <td className="px-6 py-5 text-gray-700">{item.month}</td>

                  <td className="px-6 py-5 font-semibold text-gray-900">
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

                  <td className="px-6 py-5 flex gap-3">
                    {item.status === "Pending" && (
                      <button
                        onClick={() => handleMarkPaid(item._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        Mark Paid
                      </button>
                    )}

                    <button
                      onClick={() => handleDeletePayroll(item._id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {payrolls.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-400">
                    No payroll records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showEmployeeForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-gray-900">
                Add Employee
              </h2>

              <button
                onClick={() => setShowEmployeeForm(false)}
                className="text-gray-400 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateEmployee} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="employeeName"
                  value={employeeForm.employeeName}
                  onChange={handleEmployeeChange}
                  placeholder="Employee Name"
                  className="border border-gray-200 rounded-xl px-4 py-3"
                  required
                />

                <input
                  type="text"
                  name="employeeRole"
                  value={employeeForm.employeeRole}
                  onChange={handleEmployeeChange}
                  placeholder="Employee Role"
                  className="border border-gray-200 rounded-xl px-4 py-3"
                  required
                />

                <input
                  type="text"
                  name="phoneNo"
                  value={employeeForm.phoneNo}
                  onChange={handleEmployeeChange}
                  placeholder="Phone Number"
                  className="border border-gray-200 rounded-xl px-4 py-3"
                />

                <input
                  type="email"
                  name="email"
                  value={employeeForm.email}
                  onChange={handleEmployeeChange}
                  placeholder="Email"
                  className="border border-gray-200 rounded-xl px-4 py-3"
                />

                <input
                  type="number"
                  name="monthlySalary"
                  value={employeeForm.monthlySalary}
                  onChange={handleEmployeeChange}
                  placeholder="Monthly Salary"
                  className="border border-gray-200 rounded-xl px-4 py-3 md:col-span-2"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowEmployeeForm(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700"
                >
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPayrollForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-gray-900">
                Add Payroll Manually
              </h2>

              <button
                onClick={() => setShowPayrollForm(false)}
                className="text-gray-400 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePayroll} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="employeeName"
                  value={payrollForm.employeeName}
                  onChange={handlePayrollChange}
                  placeholder="Employee Name"
                  className="border border-gray-200 rounded-xl px-4 py-3"
                  required
                />

                <input
                  type="text"
                  name="employeeRole"
                  value={payrollForm.employeeRole}
                  onChange={handlePayrollChange}
                  placeholder="Employee Role"
                  className="border border-gray-200 rounded-xl px-4 py-3"
                  required
                />

                <input
                  type="text"
                  name="phoneNo"
                  value={payrollForm.phoneNo}
                  onChange={handlePayrollChange}
                  placeholder="Phone Number"
                  className="border border-gray-200 rounded-xl px-4 py-3"
                />

                <input
                  type="text"
                  name="month"
                  value={payrollForm.month}
                  onChange={handlePayrollChange}
                  placeholder="Month (Example: May 2026)"
                  className="border border-gray-200 rounded-xl px-4 py-3"
                  required
                />

                <input
                  type="number"
                  name="salaryAmount"
                  value={payrollForm.salaryAmount}
                  onChange={handlePayrollChange}
                  placeholder="Salary Amount"
                  className="border border-gray-200 rounded-xl px-4 py-3 md:col-span-2"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowPayrollForm(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700"
                >
                  Save Payroll
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocietyPayroll;