import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { toast } from "react-hot-toast";

const StaffManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    employeeName: "",
    employeeRole: "",
    phoneNo: "",
    email: "",
    monthlySalary: "",
  });

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
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/employee/create", formData, {
        withCredentials: true,
      });

      toast.success("Employee added successfully");

      setFormData({
        employeeName: "",
        employeeRole: "",
        phoneNo: "",
        email: "",
        monthlySalary: "",
      });

      setShowForm(false);
      fetchEmployees();
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to add employee"
      );
    }
  };

  const handleToggleStatus = async (employeeId) => {
    try {
      await axios.patch(
        `/employee/toggle-status/${employeeId}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success("Employee status updated");
      fetchEmployees();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update employee");
    }
  };

  const handleDelete = async (employeeId) => {
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

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Staff Management
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Manage society staff and salary records
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition"
          >
            + Add Staff
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-6 border-b border-gray-100">
          <div className="bg-[#F4F7FE] rounded-2xl p-5">
            <p className="text-sm text-gray-500">Total Staff</p>

            <h2 className="text-3xl font-bold text-blue-600 mt-2">
              {employees.length}
            </h2>
          </div>

          <div className="bg-[#F4F7FE] rounded-2xl p-5">
            <p className="text-sm text-gray-500">Active Staff</p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {employees.filter((item) => item.isActive).length}
            </h2>
          </div>

          <div className="bg-[#F4F7FE] rounded-2xl p-5">
            <p className="text-sm text-gray-500">Monthly Salary Budget</p>

            <h2 className="text-3xl font-bold text-purple-600 mt-2">
              ₹
              {employees.reduce(
                (acc, item) => acc + Number(item.monthlySalary || 0),
                0
              )}
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">Employee</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Phone</th>
                <th className="px-6 py-4 font-medium">Salary</th>
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
                      {item.email || "No email"}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-gray-700">
                    {item.employeeRole}
                  </td>

                  <td className="px-6 py-5 text-gray-700">
                    {item.phoneNo || "-"}
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
                      onClick={() => handleToggleStatus(item._id)}
                      className="bg-amber-50 hover:bg-amber-100 text-amber-700 px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      Toggle
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {employees.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-400"
                  >
                    No staff records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-gray-900">
                Add Staff
              </h2>

              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleChange}
                  placeholder="Employee Name"
                  className="border border-gray-200 rounded-xl px-4 py-3"
                  required
                />

                <input
                  type="text"
                  name="employeeRole"
                  value={formData.employeeRole}
                  onChange={handleChange}
                  placeholder="Employee Role"
                  className="border border-gray-200 rounded-xl px-4 py-3"
                  required
                />

                <input
                  type="text"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="border border-gray-200 rounded-xl px-4 py-3"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="border border-gray-200 rounded-xl px-4 py-3"
                />

                <input
                  type="number"
                  name="monthlySalary"
                  value={formData.monthlySalary}
                  onChange={handleChange}
                  placeholder="Monthly Salary"
                  className="border border-gray-200 rounded-xl px-4 py-3 md:col-span-2"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700"
                >
                  Save Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;