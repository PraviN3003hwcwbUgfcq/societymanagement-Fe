import React, { useEffect, useState } from "react";
import axios from "../../axios";

const TreasurerTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_URL_BACKEND}/api/v1/treasurer/transactions`,
          { withCredentials: true }
        );

        setTransactions(res.data.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTransactions();
  }, []);

  const formatAmount = (value) =>
    Number(value || 0).toLocaleString("en-IN");

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F7FE] px-6 py-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-2">
        Treasurer Transactions
      </h1>

      <p className="text-gray-500 text-sm mb-6">
        Income and expense transaction history.
      </p>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-left">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((item, index) => (
                <tr
                  key={item._id || index}
                  className="border-b border-gray-100"
                >
                  <td className="py-3 px-4 text-gray-600">
                    {formatDate(item.date)}
                  </td>

                  <td className="py-3 px-4 font-medium text-gray-900">
                    {item.description || item.title}
                  </td>

                  <td
                    className={`py-3 px-4 font-semibold ${
                      item.type === "Income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.type}
                  </td>

                  <td className="py-3 px-4 font-medium">
                    ₹{formatAmount(item.amount)}
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-3 py-1 rounded-full text-xs bg-blue-50 text-blue-600 font-medium">
                      {item.status || "Completed"}
                    </span>
                  </td>
                </tr>
              ))}

              {transactions.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-400"
                  >
                    No transactions found
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

export default TreasurerTransactions;