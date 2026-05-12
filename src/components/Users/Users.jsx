// import React from "react";

// const Users = () => {
//   return <div>Users Page</div>;
// };

// export default Users;


























import React, { useEffect, useState } from "react";
import axios from "../../axios";
import toast from "react-hot-toast";
import {
  Plus,
  Search,
  UserRound,
  ShieldCheck,
  Users,
  Briefcase,
} from "lucide-react";

const UsersPage = () => {
  const [selectedRole, setSelectedRole] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNo: "",
    phoneNo2: "",
    block: "",
    houseNo: "",
    role: "user",
  });

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/admin/users/all", {
        withCredentials: true,
      });

      setAllUsers(res.data.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateUser = async () => {
    try {
      await axios.post("/admin/users/create", formData, {
        withCredentials: true,
      });

      toast.success("User created successfully");

      setFormData({
        name: "",
        email: "",
        password: "",
        phoneNo: "",
        phoneNo2: "",
        block: "",
        houseNo: "",
        role: "user",
      });

      setShowForm(false);
      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to create user");
    }
  };

  const handleRoleChange = async (userId, role) => {
    try {
      await axios.patch(
        `/admin/users/role/${userId}`,
        { role },
        { withCredentials: true }
      );

      toast.success("Role updated");
      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update role");
    }
  };

  const handleToggleStatus = async (userId) => {
    try {
      await axios.patch(
        `/admin/users/status/${userId}`,
        {},
        { withCredentials: true }
      );

      toast.success("Status updated");
      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/admin/users/delete/${userId}`, {
        withCredentials: true,
      });

      toast.success("User deleted");
      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user");
    }
  };

  const normalizeRole = (role) => {
    if (!role) return "User";
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const filteredUsers = allUsers.filter((item) => {
    const roleMatch =
      selectedRole === "All" ||
      item.role?.toLowerCase() === selectedRole.toLowerCase();

    const searchMatch =
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phoneNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${item.block}-${item.houseNo}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return roleMatch && searchMatch;
  });

  const getRoleBadge = (role) => {
    const displayRole = normalizeRole(role);

    const styles = {
      User: "bg-blue-100 text-blue-700",
      Secretary: "bg-purple-100 text-purple-700",
      Treasurer: "bg-green-100 text-green-700",
      Security: "bg-amber-100 text-amber-700",
      Admin: "bg-red-100 text-red-700",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          styles[displayRole] || "bg-gray-100 text-gray-700"
        }`}
      >
        {displayRole}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F7FE] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            User Management
          </h1>
          <p className="text-gray-500 mt-1">
            Add users, assign roles and manage society members
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium flex items-center gap-2"
        >
          <Plus size={18} />
          Add User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <h2 className="text-3xl font-bold text-blue-600 mt-2">
                {allUsers.length}
              </h2>
            </div>
            <Users className="text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Residents</p>
              <h2 className="text-3xl font-bold text-green-600 mt-2">
                {allUsers.filter((u) => u.role === "user").length}
              </h2>
            </div>
            <UserRound className="text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Staff Roles</p>
              <h2 className="text-3xl font-bold text-purple-600 mt-2">
                {
                  allUsers.filter((u) =>
                    ["secretary", "treasurer", "security"].includes(u.role)
                  ).length
                }
              </h2>
            </div>
            <Briefcase className="text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Admins</p>
              <h2 className="text-3xl font-bold text-red-600 mt-2">
                {allUsers.filter((u) => u.role === "admin").length}
              </h2>
            </div>
            <ShieldCheck className="text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">All Users</h2>
            <p className="text-sm text-gray-500 mt-1">
              View and manage registered users
            </p>
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search user..."
                className="border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 outline-none"
              />
            </div>

            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 outline-none"
            >
              <option>All</option>
              <option>User</option>
              <option>Secretary</option>
              <option>Treasurer</option>
              <option>Security</option>
              <option>Admin</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Phone</th>
                <th className="px-6 py-4 font-medium">Flat</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-6 py-5">
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.email}</p>
                  </td>

                  <td className="px-6 py-5">{item.phoneNo || "-"}</td>

                  <td className="px-6 py-5">
                    {item.block && item.houseNo
                      ? `${item.block}-${item.houseNo}`
                      : "-"}
                  </td>

                  <td className="px-6 py-5">{getRoleBadge(item.role)}</td>

                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.isActive === false
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.isActive === false ? "Inactive" : "Active"}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex gap-2">
                      <select
                        value={item.role}
                        onChange={(e) =>
                          handleRoleChange(item._id, e.target.value)
                        }
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium outline-none"
                      >
                        <option value="user">User</option>
                        <option value="secretary">Secretary</option>
                        <option value="treasurer">Treasurer</option>
                        <option value="security">Security</option>
                        <option value="admin">Admin</option>
                      </select>

                      <button
                        onClick={() => handleToggleStatus(item._id)}
                        className="bg-amber-50 hover:bg-amber-100 text-amber-700 px-3 py-2 rounded-lg text-sm font-medium"
                      >
                        Toggle
                      </button>

                      <button
                        onClick={() => handleDeleteUser(item._id)}
                        className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-400">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999] p-4">
          <div className="bg-white rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl grid md:grid-cols-2">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-10 flex flex-col justify-center">
              <h2 className="text-4xl font-bold leading-tight">
                Create an Account
              </h2>

              <p className="mt-4 text-blue-100 text-lg">
                Add new society members, staff and admins with role-based
                access.
              </p>

              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    👤
                  </div>
                  <div>
                    <p className="font-semibold">Role Based Access</p>
                    <p className="text-sm text-blue-100">
                      Assign Secretary, Treasurer, Security & more
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    🔒
                  </div>
                  <div>
                    <p className="font-semibold">Secure Login</p>
                    <p className="text-sm text-blue-100">
                      Protected authentication for every user
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    🏢
                  </div>
                  <div>
                    <p className="font-semibold">Society Management</p>
                    <p className="text-sm text-blue-100">
                      Manage all members from one dashboard
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-10">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Add User
                  </h2>
                  <p className="text-gray-500 mt-1">
                    Create new society account
                  </p>
                </div>

                <button
                  onClick={() => setShowForm(false)}
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Full Name"
                />

                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email Address"
                />

                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                />

                <input
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone Number"
                />

                <input
                  name="phoneNo2"
                  value={formData.phoneNo2}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone Number 2 Optional"
                />

                <input
                  name="block"
                  value={formData.block}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Block"
                />

                <input
                  name="houseNo"
                  value={formData.houseNo}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="House No"
                />

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="user">User</option>
                  <option value="secretary">Secretary</option>
                  <option value="treasurer">Treasurer</option>
                  <option value="security">Security</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-5 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 font-medium"
                >
                  Cancel
                </button>

                <button
                  onClick={handleCreateUser}
                  className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;