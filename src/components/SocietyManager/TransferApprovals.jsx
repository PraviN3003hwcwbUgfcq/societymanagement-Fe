import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { toast } from "react-hot-toast";

const TransferApprovals = () => {
  const [transfers, setTransfers] = useState([]);

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

  const handleStatusChange = async (transferId, status) => {
    try {
      await axios.patch(
        `/society-transfer/status/${transferId}`,
        { status },
        { withCredentials: true }
      );

      toast.success(`Transfer ${status}`);
      fetchTransfers();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update transfer status");
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getBadge = (status) => {
    if (status === "Approved") {
      return (
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          Approved
        </span>
      );
    }

    if (status === "Rejected") {
      return (
        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
          Rejected
        </span>
      );
    }

    return (
      <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
        Pending
      </span>
    );
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">
            Transfer Approvals
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Review and approve society ownership transfer requests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 p-6 border-b border-gray-100">
          <div className="bg-[#F4F7FE] rounded-2xl p-5">
            <p className="text-sm text-gray-500">Total Requests</p>
            <h2 className="text-3xl font-bold text-blue-600 mt-2">
              {transfers.length}
            </h2>
          </div>

          <div className="bg-[#F4F7FE] rounded-2xl p-5">
            <p className="text-sm text-gray-500">Pending</p>
            <h2 className="text-3xl font-bold text-amber-500 mt-2">
              {transfers.filter((item) => item.status === "Pending").length}
            </h2>
          </div>

          <div className="bg-[#F4F7FE] rounded-2xl p-5">
            <p className="text-sm text-gray-500">Approved</p>
            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {transfers.filter((item) => item.status === "Approved").length}
            </h2>
          </div>

          <div className="bg-[#F4F7FE] rounded-2xl p-5">
            <p className="text-sm text-gray-500">Rejected</p>
            <h2 className="text-3xl font-bold text-red-600 mt-2">
              {transfers.filter((item) => item.status === "Rejected").length}
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">Old Owner</th>
                <th className="px-6 py-4 font-medium">New Owner</th>
                <th className="px-6 py-4 font-medium">Flat</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Document</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {transfers.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5 font-semibold text-gray-900">
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

                  <td className="px-6 py-5">
                    {item.documents ? (
                      <a
                        href={
                          item.documents?.startsWith("http")
                            ? item.documents
                            : `${import.meta.env.VITE_URL_BACKEND}/${item.documents}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 font-medium hover:underline"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-gray-400">No document</span>
                    )}
                  </td>

                  <td className="px-6 py-5">{getBadge(item.status)}</td>

                  <td className="px-6 py-5">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleStatusChange(item._id, "Approved")
                        }
                        disabled={item.status === "Approved"}
                        className="bg-green-600 disabled:bg-green-200 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          handleStatusChange(item._id, "Rejected")
                        }
                        disabled={item.status === "Rejected"}
                        className="bg-red-600 disabled:bg-red-200 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {transfers.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-gray-400">
                    No transfer requests found
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

export default TransferApprovals;