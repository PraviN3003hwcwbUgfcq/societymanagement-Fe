// import React from "react";
// import Complaint from "../Complaint/Complaint";

// const SecretaryComplaints = () => {
//   return <Complaint />;
// };

// export default SecretaryComplaints;
















import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { TriangleAlert, CheckCircle, Image } from "lucide-react";
import toast from "react-hot-toast";

const SecretaryComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");
  const [resolvedComplaints, setResolvedComplaints] = useState([]);

const fetchComplaints = async () => {
  try {
    setLoading(true);

    const [openRes, resolvedRes] = await Promise.all([
      axios.get(
        `${import.meta.env.VITE_URL_BACKEND}/api/v1/complain/getAllComplains`,
        { withCredentials: true }
      ),
      axios.get(
        `${import.meta.env.VITE_URL_BACKEND}/api/v1/complain/getComplains`,
        { withCredentials: true }
      ),
    ]);

    setComplaints(openRes.data.data || []);
    setResolvedComplaints(resolvedRes.data.data || []);
  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch complaints");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleResolve = async (complainId) => {
    try {
      setUpdatingId(complainId);

      await axios.patch(
        `${import.meta.env.VITE_URL_BACKEND}/api/v1/complain/toggleComplain/${complainId}`,
        {},
        { withCredentials: true }
      );

      toast.success("Complaint resolved successfully");
      fetchComplaints();
    } catch (error) {
      console.log(error);
      toast.error("Failed to resolve complaint");
    } finally {
      setUpdatingId("");
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

  return (
    <div className="min-h-screen bg-[#F4F7FE] p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Secretary Complaints
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          View resident complaints and mark them as resolved
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Open Complaints</p>
          <h2 className="text-2xl font-semibold text-red-600 mt-2">
            {complaints.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Pending Action</p>
          <h2 className="text-2xl font-semibold text-orange-500 mt-2">
            {complaints.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Resolved Today</p>
          <h2 className="text-2xl font-semibold text-green-600 mt-2">
  {resolvedComplaints.length}
</h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <TriangleAlert className="text-red-600" size={22} />
            <h2 className="text-lg font-semibold text-gray-900">
              Unresolved Complaints
            </h2>
          </div>

          <button
            onClick={fetchComplaints}
            className="text-sm bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : complaints.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            No unresolved complaints found
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {complaints.map((item) => (
              <div
                key={item._id}
                className="p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                      <TriangleAlert size={20} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.subject}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-3 text-xs text-gray-400 mt-3">
                        <span>
                          Flat:{" "}
                          {item.complainId?.block
                            ? `${item.complainId.block}-${item.complainId.houseNo}`
                            : item.byHouse}
                        </span>

                        <span>
                          By: {item.complainId?.name || "Resident"}
                        </span>

                        <span>Date: {formatDate(item.date || item.createdAt)}</span>
                      </div>

                      {item.proof && (
                        <a
                          href={item.proof}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 mt-3 text-sm text-blue-600 font-medium"
                        >
                          <Image size={16} />
                          View Proof
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600">
                    Pending
                  </span>

                  <button
                    onClick={() => handleResolve(item._id)}
                    disabled={updatingId === item._id}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-700 disabled:bg-green-400"
                  >
                    <CheckCircle size={16} />
                    {updatingId === item._id ? "Resolving..." : "Resolve"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SecretaryComplaints;