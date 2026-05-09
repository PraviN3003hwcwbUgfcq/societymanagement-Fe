import React, { useEffect, useState } from "react";
import axios from "../../axios";

const TreasurerExpenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_URL_BACKEND}/api/v1/treasurer/expenses`,
          { withCredentials: true }
        );

        setExpenses(res.data.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchExpenses();
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
        Treasurer Expenses
      </h1>

      <p className="text-gray-500 text-sm mb-6">
        All society expenses managed by treasurer.
      </p>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-left">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Amount</th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((item, index) => (
                <tr
                  key={item._id || index}
                  className="border-b border-gray-100"
                >
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {item.title}
                  </td>

                  <td className="py-3 px-4 text-gray-600">
                    {item.category}
                  </td>

                  <td className="py-3 px-4 text-gray-600">
                    {formatDate(item.date)}
                  </td>

                  <td className="py-3 px-4 font-semibold text-red-600">
                    ₹{formatAmount(item.amount)}
                  </td>
                </tr>
              ))}

              {expenses.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-400"
                  >
                    No expenses found
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

export default TreasurerExpenses;