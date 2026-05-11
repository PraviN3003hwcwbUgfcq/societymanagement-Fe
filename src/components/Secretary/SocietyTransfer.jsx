// // import React from 'react'

// // const SocietyTransfer = () => {
// //   return (
// //     <div>
      
// //     </div>
// //   )
// // }

// // export default SocietyTransfer


























// import React, { useState } from "react";

// const SocietyTransfer = () => {

//   const [selectedStatus, setSelectedStatus] = useState("All");

//   const transfers = [
//     {
//       oldOwner: "Rahul Sharma",
//       newOwner: "Amit Verma",
//       flat: "A-302",
//       date: "10 May 2026",
//       status: "Approved",
//     },
//     {
//       oldOwner: "Suresh Patil",
//       newOwner: "Rohan Mehta",
//       flat: "B-105",
//       date: "12 May 2026",
//       status: "Pending",
//     },
//     {
//       oldOwner: "Neha Joshi",
//       newOwner: "Kiran Shah",
//       flat: "C-204",
//       date: "14 May 2026",
//       status: "Rejected",
//     },
//   ];

//   const filteredTransfers =
//     selectedStatus === "All"
//       ? transfers
//       : transfers.filter((item) => item.status === selectedStatus);

//   const getStatusBadge = (status) => {
//     if (status === "Approved") {
//       return (
//         <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
//           Approved
//         </span>
//       );
//     }

//     if (status === "Pending") {
//       return (
//         <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
//           Pending
//         </span>
//       );
//     }

//     return (
//       <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
//         Rejected
//       </span>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-[#F4F7FE] p-6">

//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-900">
//           Society Transfers
//         </h1>

//         <p className="text-gray-500 mt-1">
//           Manage flat ownership transfer records
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">

//         {/* Total */}
//         <div
//           onClick={() => setSelectedStatus("All")}
//           className={`bg-white rounded-2xl p-5 border shadow-sm cursor-pointer transition hover:scale-[1.02]
//           ${selectedStatus === "All"
//             ? "border-blue-500 ring-2 ring-blue-100"
//             : "border-gray-100"
//           }`}
//         >
//           <p className="text-sm text-gray-500">
//             Total Transfers
//           </p>

//           <h2 className="text-3xl font-bold text-blue-600 mt-2">
//             {transfers.length}
//           </h2>
//         </div>

//         {/* Pending */}
//         <div
//           onClick={() => setSelectedStatus("Pending")}
//           className={`bg-white rounded-2xl p-5 border shadow-sm cursor-pointer transition hover:scale-[1.02]
//           ${selectedStatus === "Pending"
//             ? "border-amber-500 ring-2 ring-amber-100"
//             : "border-gray-100"
//           }`}
//         >
//           <p className="text-sm text-gray-500">
//             Pending Approval
//           </p>

//           <h2 className="text-3xl font-bold text-amber-500 mt-2">
//             {transfers.filter((item) => item.status === "Pending").length}
//           </h2>
//         </div>

//         {/* Approved */}
//         <div
//           onClick={() => setSelectedStatus("Approved")}
//           className={`bg-white rounded-2xl p-5 border shadow-sm cursor-pointer transition hover:scale-[1.02]
//           ${selectedStatus === "Approved"
//             ? "border-green-500 ring-2 ring-green-100"
//             : "border-gray-100"
//           }`}
//         >
//           <p className="text-sm text-gray-500">
//             Approved Transfers
//           </p>

//           <h2 className="text-3xl font-bold text-green-600 mt-2">
//             {transfers.filter((item) => item.status === "Approved").length}
//           </h2>
//         </div>

//         {/* Rejected */}
//         <div
//           onClick={() => setSelectedStatus("Rejected")}
//           className={`bg-white rounded-2xl p-5 border shadow-sm cursor-pointer transition hover:scale-[1.02]
//           ${selectedStatus === "Rejected"
//             ? "border-red-500 ring-2 ring-red-100"
//             : "border-gray-100"
//           }`}
//         >
//           <p className="text-sm text-gray-500">
//             Rejected Transfers
//           </p>

//           <h2 className="text-3xl font-bold text-red-600 mt-2">
//             {transfers.filter((item) => item.status === "Rejected").length}
//           </h2>
//         </div>

//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

//         <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">

//           <div>
//             <h2 className="text-xl font-semibold text-gray-900">
//               Transfer Records
//             </h2>

//             <p className="text-sm text-gray-500 mt-1">
//               Society ownership transfer history
//             </p>
//           </div>

//           <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition">
//             + Add Transfer
//           </button>

//         </div>

//         <div className="overflow-x-auto">

//           <table className="w-full">

//             <thead className="bg-gray-50">
//               <tr className="text-left text-sm text-gray-500">

//                 <th className="px-6 py-4 font-medium">
//                   Old Owner
//                 </th>

//                 <th className="px-6 py-4 font-medium">
//                   New Owner
//                 </th>

//                 <th className="px-6 py-4 font-medium">
//                   Flat
//                 </th>

//                 <th className="px-6 py-4 font-medium">
//                   Date
//                 </th>

//                 <th className="px-6 py-4 font-medium">
//                   Status
//                 </th>

//               </tr>
//             </thead>

//             <tbody>

//               {filteredTransfers.map((item, index) => (
//                 <tr
//                   key={index}
//                   className="border-t border-gray-100 hover:bg-gray-50 transition"
//                 >

//                   <td className="px-6 py-5 font-medium text-gray-900">
//                     {item.oldOwner}
//                   </td>

//                   <td className="px-6 py-5 text-gray-700">
//                     {item.newOwner}
//                   </td>

//                   <td className="px-6 py-5 text-gray-700">
//                     {item.flat}
//                   </td>

//                   <td className="px-6 py-5 text-gray-700">
//                     {item.date}
//                   </td>

//                   <td className="px-6 py-5">
//                     {getStatusBadge(item.status)}
//                   </td>

//                 </tr>
//               ))}

//             </tbody>

//           </table>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default SocietyTransfer;













































import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { toast } from "react-hot-toast";

const SocietyTransfer = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [transfers, setTransfers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    oldOwnerName: "",
    oldOwnerEmail: "",
    oldOwnerPhone: "",
    newOwnerName: "",
    newOwnerEmail: "",
    newOwnerPhone: "",
    block: "",
    houseNo: "",
    transferDate: "",
    reason: "",
  });

  const fetchTransfers = async () => {
    try {
      const res = await axios.get("/society-transfer/all", {
        withCredentials: true,
      });
      setTransfers(res.data.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch transfers");
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  const filteredTransfers =
    selectedStatus === "All"
      ? transfers
      : transfers.filter((item) => item.status === selectedStatus);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateTransfer = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/society-transfer/create", formData, {
        withCredentials: true,
      });

      toast.success("Transfer record added");

      setFormData({
        oldOwnerName: "",
        oldOwnerEmail: "",
        oldOwnerPhone: "",
        newOwnerName: "",
        newOwnerEmail: "",
        newOwnerPhone: "",
        block: "",
        houseNo: "",
        transferDate: "",
        reason: "",
      });

      setShowForm(false);
      fetchTransfers();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to add transfer");
    }
  };

  const handleStatusChange = async (transferId, status) => {
    try {
      await axios.patch(
        `/society-transfer/status/${transferId}`,
        { status },
        { withCredentials: true }
      );

      toast.success("Status updated");
      fetchTransfers();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (transferId) => {
    try {
      await axios.delete(`/society-transfer/delete/${transferId}`, {
        withCredentials: true,
      });

      toast.success("Transfer deleted");
      fetchTransfers();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete transfer");
    }
  };

  const getStatusBadge = (status) => {
    if (status === "Approved") {
      return (
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          Approved
        </span>
      );
    }

    if (status === "Pending") {
      return (
        <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
          Pending
        </span>
      );
    }

    return (
      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
        Rejected
      </span>
    );
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F7FE] p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Society Transfers
        </h1>
        <p className="text-gray-500 mt-1">
          Manage flat ownership transfer records
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
        <div
          onClick={() => setSelectedStatus("All")}
          className={`bg-white rounded-2xl p-5 border shadow-sm cursor-pointer transition hover:scale-[1.02] ${
            selectedStatus === "All"
              ? "border-blue-500 ring-2 ring-blue-100"
              : "border-gray-100"
          }`}
        >
          <p className="text-sm text-gray-500">Total Transfers</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {transfers.length}
          </h2>
        </div>

        <div
          onClick={() => setSelectedStatus("Pending")}
          className={`bg-white rounded-2xl p-5 border shadow-sm cursor-pointer transition hover:scale-[1.02] ${
            selectedStatus === "Pending"
              ? "border-amber-500 ring-2 ring-amber-100"
              : "border-gray-100"
          }`}
        >
          <p className="text-sm text-gray-500">Pending Approval</p>
          <h2 className="text-3xl font-bold text-amber-500 mt-2">
            {transfers.filter((item) => item.status === "Pending").length}
          </h2>
        </div>

        <div
          onClick={() => setSelectedStatus("Approved")}
          className={`bg-white rounded-2xl p-5 border shadow-sm cursor-pointer transition hover:scale-[1.02] ${
            selectedStatus === "Approved"
              ? "border-green-500 ring-2 ring-green-100"
              : "border-gray-100"
          }`}
        >
          <p className="text-sm text-gray-500">Approved Transfers</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {transfers.filter((item) => item.status === "Approved").length}
          </h2>
        </div>

        <div
          onClick={() => setSelectedStatus("Rejected")}
          className={`bg-white rounded-2xl p-5 border shadow-sm cursor-pointer transition hover:scale-[1.02] ${
            selectedStatus === "Rejected"
              ? "border-red-500 ring-2 ring-red-100"
              : "border-gray-100"
          }`}
        >
          <p className="text-sm text-gray-500">Rejected Transfers</p>
          <h2 className="text-3xl font-bold text-red-600 mt-2">
            {transfers.filter((item) => item.status === "Rejected").length}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Transfer Records
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Society ownership transfer history
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition"
          >
            + Add Transfer
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">Old Owner</th>
                <th className="px-6 py-4 font-medium">New Owner</th>
                <th className="px-6 py-4 font-medium">Flat</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Change Status</th>
                <th className="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransfers.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5 font-medium text-gray-900">
                    {item.oldOwnerName}
                  </td>

                  <td className="px-6 py-5 text-gray-700">
                    {item.newOwnerName}
                  </td>

                  <td className="px-6 py-5 text-gray-700">
                    {item.block}-{item.houseNo}
                  </td>

                  <td className="px-6 py-5 text-gray-700">
                    {formatDate(item.transferDate)}
                  </td>

                  <td className="px-6 py-5">{getStatusBadge(item.status)}</td>

                  <td className="px-6 py-5">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item._id, e.target.value)
                      }
                      className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none bg-white"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>

                  <td className="px-6 py-5">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredTransfers.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-8 text-gray-400"
                  >
                    No transfer records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold text-gray-900">
                Add Society Transfer
              </h2>

              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTransfer} className="space-y-5">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">
                  Old Owner Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    name="oldOwnerName"
                    value={formData.oldOwnerName}
                    onChange={handleChange}
                    placeholder="Old Owner Name"
                    className="border border-gray-200 rounded-xl px-4 py-3"
                    required
                  />

                  <input
                    name="oldOwnerEmail"
                    value={formData.oldOwnerEmail}
                    onChange={handleChange}
                    placeholder="Old Owner Email"
                    className="border border-gray-200 rounded-xl px-4 py-3"
                  />

                  <input
                    name="oldOwnerPhone"
                    value={formData.oldOwnerPhone}
                    onChange={handleChange}
                    placeholder="Old Owner Phone"
                    className="border border-gray-200 rounded-xl px-4 py-3"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3">
                  New Owner Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    name="newOwnerName"
                    value={formData.newOwnerName}
                    onChange={handleChange}
                    placeholder="New Owner Name"
                    className="border border-gray-200 rounded-xl px-4 py-3"
                    required
                  />

                  <input
                    name="newOwnerEmail"
                    value={formData.newOwnerEmail}
                    onChange={handleChange}
                    placeholder="New Owner Email"
                    className="border border-gray-200 rounded-xl px-4 py-3"
                  />

                  <input
                    name="newOwnerPhone"
                    value={formData.newOwnerPhone}
                    onChange={handleChange}
                    placeholder="New Owner Phone"
                    className="border border-gray-200 rounded-xl px-4 py-3"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3">
                  Flat Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    name="block"
                    value={formData.block}
                    onChange={handleChange}
                    placeholder="Block"
                    className="border border-gray-200 rounded-xl px-4 py-3"
                    required
                  />

                  <input
                    name="houseNo"
                    value={formData.houseNo}
                    onChange={handleChange}
                    placeholder="House No"
                    className="border border-gray-200 rounded-xl px-4 py-3"
                    required
                  />

                  <input
                    type="date"
                    name="transferDate"
                    value={formData.transferDate}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-xl px-4 py-3"
                    required
                  />
                </div>
              </div>

              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Reason / Notes"
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-3"
              />

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
                  Save Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocietyTransfer;