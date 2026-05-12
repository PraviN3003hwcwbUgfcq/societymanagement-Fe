


// import React, { useEffect, useState } from "react";
// import axios from "../../axios";
// import {
//   Wallet,
//   ArrowDown,
//   ArrowUp,
//   ReceiptText,
//   Wrench,
//   User,
//   Zap,
//   Brush,
//   Package,
// } from "lucide-react";

// const TreasurerDashboard = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [expenses, setExpenses] = useState([]);

//   const [formData, setFormData] = useState({
//     title: "",
//     amount: "",
//     category: "",
//     date: "",
//   });

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_URL_BACKEND}/api/v1/treasurer/expenses`,
//           { withCredentials: true }
//         );
//         setExpenses(res.data.data || []);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchExpenses();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_URL_BACKEND}/api/v1/treasurer/add-expense`,
//         formData,
//         { withCredentials: true }
//       );

//       setExpenses([res.data.data, ...expenses]);

//       setFormData({
//         title: "",
//         amount: "",
//         category: "",
//         date: "",
//       });

//       setShowForm(false);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const totalIncome = 240000;
//   const pendingPayments = 25000;
//   const maintenanceTotalDue = 180000;
//   const maintenanceCollected = 135000;
//   const maintenancePending = 45000;
//   const collectionPercent = 75;

//   const totalExpense = expenses.reduce(
//     (acc, item) => acc + Number(item.amount || 0),
//     0
//   );

//   const totalBalance = totalIncome - totalExpense;

//   const fallbackExpenses = [
//     {
//       _id: "1",
//       title: "Plumbing Repair",
//       category: "Maintenance",
//       amount: 8500,
//       date: "2026-05-28",
//       icon: Wrench,
//     },
//     {
//       _id: "2",
//       title: "Security Salary - May",
//       category: "Salary",
//       amount: 45000,
//       date: "2026-05-25",
//       icon: User,
//     },
//     {
//       _id: "3",
//       title: "Electricity Bill - May",
//       category: "Utilities",
//       amount: 12600,
//       date: "2026-05-22",
//       icon: Zap,
//     },
//     {
//       _id: "4",
//       title: "Cleaning Services",
//       category: "Maintenance",
//       amount: 6400,
//       date: "2026-05-20",
//       icon: Brush,
//     },
//     {
//       _id: "5",
//       title: "Garden Maintenance",
//       category: "Maintenance",
//       amount: 4800,
//       date: "2026-05-18",
//       icon: Package,
//     },
//   ];

//   const expenseList = expenses.length > 0 ? expenses : fallbackExpenses;

//   const transactions = [
//     {
//       date: "31 May 2026",
//       description: "Maintenance Collection - A101",
//       type: "Income",
//       amount: 5000,
//       status: "Completed",
//     },
//     {
//       date: "30 May 2026",
//       description: "Maintenance Collection - B204",
//       type: "Income",
//       amount: 5000,
//       status: "Completed",
//     },
//     {
//       date: "29 May 2026",
//       description: "Plumbing Repair",
//       type: "Expense",
//       amount: 8500,
//       status: "Paid",
//     },
//     {
//       date: "28 May 2026",
//       description: "Security Salary - May",
//       type: "Expense",
//       amount: 45000,
//       status: "Paid",
//     },
//     {
//       date: "27 May 2026",
//       description: "Electricity Bill - May",
//       type: "Expense",
//       amount: 12600,
//       status: "Paid",
//     },
//   ];

//   const formatAmount = (value) => {
//     return Number(value || 0).toLocaleString("en-IN");
//   };

//   const formatDate = (date) => {
//     if (!date) return "-";
//     return new Date(date).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-[#F4F7FE] px-6 py-6">
//       <div className="flex items-start justify-between mb-6">
//         <div>
//           <h1 className="text-3xl font-semibold text-gray-900">
//             Treasurer Dashboard
//           </h1>
//           <p className="text-gray-500 text-sm mt-1">
//             Welcome, Treasurer! Here's the financial overview of your society.
//           </p>
//         </div>

//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-blue-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
//         >
//           + Add Expense
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5">
//           <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-green-600">
//             <Wallet size={28} />
//           </div>
//           <div>
//             <p className="text-gray-600 text-sm">Total Balance</p>
//             <h2 className="text-2xl font-semibold text-green-600">
//               ₹{formatAmount(totalBalance)}
//             </h2>
//             <p className="text-xs text-gray-500 mt-1">Total funds available</p>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5">
//           <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
//             <ArrowDown size={28} />
//           </div>
//           <div>
//             <p className="text-gray-600 text-sm">Total Income</p>
//             <h2 className="text-2xl font-semibold text-blue-600">
//               ₹{formatAmount(totalIncome)}
//             </h2>
//             <p className="text-xs text-gray-500 mt-1">Total money received</p>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5">
//           <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-red-600">
//             <ArrowUp size={28} />
//           </div>
//           <div>
//             <p className="text-gray-600 text-sm">Total Expenses</p>
//             <h2 className="text-2xl font-semibold text-red-600">
//               ₹{formatAmount(totalExpense)}
//             </h2>
//             <p className="text-xs text-gray-500 mt-1">Total money spent</p>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5">
//           <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center text-orange-500">
//             <ReceiptText size={28} />
//           </div>
//           <div>
//             <p className="text-gray-600 text-sm">Pending Payments</p>
//             <h2 className="text-2xl font-semibold text-orange-500">
//               ₹{formatAmount(pendingPayments)}
//             </h2>
//             <p className="text-xs text-gray-500 mt-1">Yet to be collected</p>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-5">
//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//           <div className="flex justify-between items-center mb-5">
//             <h2 className="text-lg font-semibold text-gray-900">
//               Maintenance Collection
//             </h2>
//             <button className="text-blue-600 text-sm font-medium">
//               View all
//             </button>
//           </div>

//           <div className="space-y-4">
//             <div className="flex justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
//               <span className="text-gray-600">Total Due</span>
//               <span className="font-semibold">
//                 ₹{formatAmount(maintenanceTotalDue)}
//               </span>
//             </div>

//             <div className="flex justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
//               <span className="text-gray-600">Collected</span>
//               <span className="font-semibold text-green-600">
//                 ₹{formatAmount(maintenanceCollected)}
//               </span>
//             </div>

//             <div className="flex justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
//               <span className="text-gray-600">Pending</span>
//               <span className="font-semibold text-red-600">
//                 ₹{formatAmount(maintenancePending)}
//               </span>
//             </div>

//             <div className="flex justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
//               <span className="text-gray-600">Collection %</span>
//               <span className="font-semibold text-blue-600">
//                 {collectionPercent}%
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//           <div className="flex justify-between items-center mb-5">
//             <h2 className="text-lg font-semibold text-gray-900">
//               Recent Expenses
//             </h2>
//             <button className="text-blue-600 text-sm font-medium">
//               View all
//             </button>
//           </div>

//           <div className="space-y-1">
//             {expenseList.slice(0, 5).map((item, index) => {
//               const Icon = item.icon || [Wrench, User, Zap, Brush, Package][index % 5];

//               return (
//                 <div
//                   key={item._id || item.id || index}
//                   className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
//                       <Icon size={20} />
//                     </div>

//                     <div>
//                       <p className="font-semibold text-gray-900">
//                         {item.title}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         {item.category || "Maintenance"}
//                       </p>
//                     </div>
//                   </div>

//                   <p className="text-sm text-gray-500">
//                     {formatDate(item.date)}
//                   </p>

//                   <p className="font-semibold text-red-600">
//                     ₹{formatAmount(item.amount)}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//         <div className="flex justify-between items-center mb-5">
//           <h2 className="text-lg font-semibold text-gray-900">
//             Recent Transactions
//           </h2>
//           <button className="text-blue-600 text-sm font-medium">
//             View all
//           </button>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="bg-gray-50 text-gray-500 text-left">
//                 <th className="py-3 px-4 font-medium">Date</th>
//                 <th className="py-3 px-4 font-medium">Description</th>
//                 <th className="py-3 px-4 font-medium">Type</th>
//                 <th className="py-3 px-4 font-medium">Amount</th>
//                 <th className="py-3 px-4 font-medium">Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {transactions.map((item, index) => (
//                 <tr key={index} className="border-b border-gray-100">
//                   <td className="py-3 px-4 text-gray-700">{item.date}</td>
//                   <td className="py-3 px-4 text-gray-900">
//                     {item.description}
//                   </td>
//                   <td
//                     className={`py-3 px-4 font-medium ${
//                       item.type === "Income"
//                         ? "text-green-600"
//                         : "text-red-600"
//                     }`}
//                   >
//                     {item.type}
//                   </td>
//                   <td className="py-3 px-4">₹{formatAmount(item.amount)}</td>
//                   <td className="py-3 px-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         item.status === "Completed"
//                           ? "bg-green-50 text-green-600"
//                           : "bg-blue-50 text-blue-600"
//                       }`}
//                     >
//                       {item.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}

//               {expenses.slice(0, 5).map((item) => (
//                 <tr key={item._id || item.id} className="border-b border-gray-100">
//                   <td className="py-3 px-4 text-gray-700">
//                     {formatDate(item.date)}
//                   </td>
//                   <td className="py-3 px-4 text-gray-900">{item.title}</td>
//                   <td className="py-3 px-4 font-medium text-red-600">
//                     Expense
//                   </td>
//                   <td className="py-3 px-4">₹{formatAmount(item.amount)}</td>
//                   <td className="py-3 px-4">
//                     <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
//                       Paid
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {showForm && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
//           <div className="bg-white p-6 rounded-2xl w-[380px] shadow-xl">
//             <h2 className="text-xl font-semibold mb-4">Add Expense</h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Expense Title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />

//               <input
//                 type="number"
//                 name="amount"
//                 placeholder="Amount"
//                 value={formData.amount}
//                 onChange={handleChange}
//                 className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />

//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Category</option>
//                 <option value="Electricity">Electricity</option>
//                 <option value="Maintenance">Maintenance</option>
//                 <option value="Security">Security</option>
//                 <option value="Cleaning">Cleaning</option>
//                 <option value="Garden">Garden</option>
//                 <option value="Repair">Repair</option>
//               </select>

//               <input
//                 type="date"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleChange}
//                 className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />

//               <div className="flex justify-end gap-3 pt-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowForm(false)}
//                   className="px-5 py-2.5 bg-gray-100 rounded-xl font-medium"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700"
//                 >
//                   Save Expense
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TreasurerDashboard;  












































// import React, { useEffect, useState } from "react";
// import axios from "../../axios";
// import {
//   Wallet,
//   ArrowDown,
//   ArrowUp,
//   ReceiptText,
//   Wrench,
//   User,
//   Zap,
//   Brush,
//   Package,
//   X,
// } from "lucide-react";

// const TreasurerDashboard = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [showAllExpenses, setShowAllExpenses] = useState(false);
//   const [showAllTransactions, setShowAllTransactions] = useState(false);

//   const [expenses, setExpenses] = useState([]);
//   const [transactions, setTransactions] = useState([]);
//   const [summary, setSummary] = useState({
//     totalIncome: 0,
//     totalExpense: 0,
//     totalBalance: 0,
//     pendingPayments: 0,
//   });

//   const [maintenance, setMaintenance] = useState({
//     totalDue: 0,
//     collected: 0,
//     pending: 0,
//     percentage: 0,
//   });

//   const [formData, setFormData] = useState({
//     title: "",
//     amount: "",
//     category: "",
//     date: "",
//   });

//   const fetchDashboardData = async () => {
//     try {
//       const expenseRes = await axios.get(
//         `${import.meta.env.VITE_URL_BACKEND}/api/v1/treasurer/expenses`,
//         { withCredentials: true }
//       );

//       const expenseData = expenseRes.data.data || [];
//       setExpenses(expenseData);

//       const totalExpense = expenseData.reduce(
//         (acc, item) => acc + Number(item.amount || 0),
//         0
//       );

//       setSummary((prev) => ({
//         ...prev,
//         totalExpense,
//         totalBalance: Number(prev.totalIncome || 0) - totalExpense,
//       }));

//       setTransactions(
//         expenseData.map((item) => ({
//           _id: item._id,
//           date: item.date,
//           description: item.title,
//           type: "Expense",
//           amount: item.amount,
//           status: "Paid",
//         }))
//       );
//     } catch (err) {
//       console.log(err);
//     }

//     try {
//       const summaryRes = await axios.get(
//         `${import.meta.env.VITE_URL_BACKEND}/api/v1/treasurer/summary`,
//         { withCredentials: true }
//       );

//       setSummary(summaryRes.data.data);
//     } catch (err) {
//       console.log("Summary API not ready yet");
//     }

//     try {
//       const maintenanceRes = await axios.get(
//         `${import.meta.env.VITE_URL_BACKEND}/api/v1/treasurer/maintenance`,
//         { withCredentials: true }
//       );

//       setMaintenance(maintenanceRes.data.data);
//     } catch (err) {
//       console.log("Maintenance API not ready yet");
//     }

//     try {
//       const transactionRes = await axios.get(
//         `${import.meta.env.VITE_URL_BACKEND}/api/v1/treasurer/transactions`,
//         { withCredentials: true }
//       );

//       setTransactions(transactionRes.data.data || []);
//     } catch (err) {
//       console.log("Transactions API not ready yet");
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(
//         `${import.meta.env.VITE_URL_BACKEND}/api/v1/treasurer/add-expense`,
//         formData,
//         { withCredentials: true }
//       );

//       setFormData({
//         title: "",
//         amount: "",
//         category: "",
//         date: "",
//       });

//       setShowForm(false);
//       fetchDashboardData();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const formatAmount = (value) => Number(value || 0).toLocaleString("en-IN");

//   const formatDate = (date) => {
//     if (!date) return "-";
//     return new Date(date).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   const iconList = [Wrench, User, Zap, Brush, Package];

//   return (
//     <div className="min-h-screen bg-[#F4F7FE] px-6 py-6">
//       <div className="flex items-start justify-between mb-6">
//         <div>
//           <h1 className="text-3xl font-semibold text-gray-900">
//             Treasurer Dashboard
//           </h1>
//           <p className="text-gray-500 text-sm mt-1">
//             Welcome, Treasurer! Here's the financial overview of your society.
//           </p>
//         </div>

//         <div className="flex gap-3">
//   <button
//     onClick={() => setShowMaintenanceForm(true)}
//     className="bg-green-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-green-700 transition"
//   >
//     + Generate Maintenance
//   </button>

//   <button
//     onClick={() => setShowForm(true)}
//     className="bg-blue-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
//   >
//     + Add Expense
//   </button>
// </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
//         <Card
//           icon={Wallet}
//           title="Total Balance"
//            value={`₹${formatAmount(Math.max(Number(summary.totalBalance || 0), 0))}`}
//           color="green"
//           sub="Total funds available"
//         />
//         <Card
//           icon={ArrowDown}
//           title="Total Income"
//           value={`₹${formatAmount(summary.totalIncome)}`}
//           color="blue"
//           sub="Total money received"
//         />
//         <Card
//           icon={ArrowUp}
//           title="Total Expenses"
//           value={`₹${formatAmount(summary.totalExpense)}`}
//           color="red"
//           sub="Total money spent"
//         />
//         <Card
//           icon={ReceiptText}
//           title="Pending Payments"
//           value={`₹${formatAmount(summary.pendingPayments)}`}
//           color="orange"
//           sub="Yet to be collected"
//         />
//       </div>

//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-5">
//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//           <div className="flex justify-between items-center mb-5">
//             <h2 className="text-lg font-semibold text-gray-900">
//               Maintenance Collection
//             </h2>
//             <button className="text-blue-600 text-sm font-medium">
//               View all
//             </button>
//           </div>

//           <InfoRow label="Total Due" value={`₹${formatAmount(maintenance.totalDue)}`} />
//           <InfoRow label="Collected" value={`₹${formatAmount(maintenance.collected)}`} color="text-green-600" />
//           <InfoRow label="Pending" value={`₹${formatAmount(maintenance.pending)}`} color="text-red-600" />
//           <InfoRow label="Collection %" value={`${maintenance.percentage || 0}%`} color="text-blue-600" />
//         </div>

//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//           <div className="flex justify-between items-center mb-5">
//             <h2 className="text-lg font-semibold text-gray-900">
//               Recent Expenses
//             </h2>
//             <button
//               onClick={() => setShowAllExpenses(true)}
//               className="text-blue-600 text-sm font-medium"
//             >
//               View all
//             </button>
//           </div>

//           {expenses.slice(0, 5).map((item, index) => {
//             const Icon = iconList[index % iconList.length];

//             return (
//               <ExpenseRow
//                 key={item._id || index}
//                 item={item}
//                 Icon={Icon}
//                 formatDate={formatDate}
//                 formatAmount={formatAmount}
//               />
//             );
//           })}

//           {expenses.length === 0 && (
//             <p className="text-gray-400 text-sm">No expenses found</p>
//           )}
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//         <div className="flex justify-between items-center mb-5">
//           <h2 className="text-lg font-semibold text-gray-900">
//             Recent Transactions
//           </h2>
//           <button
//             onClick={() => setShowAllTransactions(true)}
//             className="text-blue-600 text-sm font-medium"
//           >
//             View all
//           </button>
//         </div>

//         <TransactionTable
//           data={transactions.slice(0, 5)}
//           formatDate={formatDate}
//           formatAmount={formatAmount}
//         />
//       </div>

//       {showForm && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
//           <div className="bg-white p-6 rounded-2xl w-[380px] shadow-xl">
//             <h2 className="text-xl font-semibold mb-4">Add Expense</h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Expense Title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />

//               <input
//                 type="number"
//                 name="amount"
//                 placeholder="Amount"
//                 value={formData.amount}
//                 onChange={handleChange}
//                 className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />

//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Category</option>
//                 <option value="Electricity">Electricity</option>
//                 <option value="Maintenance">Maintenance</option>
//                 <option value="Security">Security</option>
//                 <option value="Cleaning">Cleaning</option>
//                 <option value="Garden">Garden</option>
//                 <option value="Repair">Repair</option>
//               </select>

//               <input
//                 type="date"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleChange}
//                 className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />

//               <div className="flex justify-end gap-3 pt-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowForm(false)}
//                   className="px-5 py-2.5 bg-gray-100 rounded-xl font-medium"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700"
//                 >
//                   Save Expense
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {showAllExpenses && (
//         <Modal title="All Expenses" onClose={() => setShowAllExpenses(false)}>
//           {expenses.map((item, index) => {
//             const Icon = iconList[index % iconList.length];

//             return (
//               <ExpenseRow
//                 key={item._id || index}
//                 item={item}
//                 Icon={Icon}
//                 formatDate={formatDate}
//                 formatAmount={formatAmount}
//               />
//             );
//           })}
//         </Modal>
//       )}

//       {showAllTransactions && (
//         <Modal title="All Transactions" onClose={() => setShowAllTransactions(false)}>
//           <TransactionTable
//             data={transactions}
//             formatDate={formatDate}
//             formatAmount={formatAmount}
//           />
//         </Modal>
//       )}
//     </div>
//   );
// };

// const Card = ({ icon: Icon, title, value, sub, color }) => {
//   const styles = {
//     green: "bg-green-50 text-green-600",
//     blue: "bg-blue-50 text-blue-600",
//     red: "bg-red-50 text-red-600",
//     orange: "bg-orange-50 text-orange-500",
//   };

//   return (
//     <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5">
//       <div className={`w-14 h-14 rounded-full flex items-center justify-center ${styles[color]}`}>
//         <Icon size={28} />
//       </div>
//       <div>
//         <p className="text-gray-600 text-sm">{title}</p>
//         <h2 className={`text-2xl font-semibold ${styles[color].split(" ")[1]}`}>
//           {value}
//         </h2>
//         <p className="text-xs text-gray-500 mt-1">{sub}</p>
//       </div>
//     </div>
//   );
// };

// const InfoRow = ({ label, value, color = "text-gray-900" }) => (
//   <div className="flex justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 mb-4">
//     <span className="text-gray-600">{label}</span>
//     <span className={`font-semibold ${color}`}>{value}</span>
//   </div>
// );

// const ExpenseRow = ({ item, Icon, formatDate, formatAmount }) => (
//   <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
//     <div className="flex items-center gap-4">
//       <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
//         <Icon size={20} />
//       </div>
//       <div>
//         <p className="font-semibold text-gray-900">{item.title}</p>
//         <p className="text-xs text-gray-500">{item.category || "Maintenance"}</p>
//       </div>
//     </div>
//     <p className="text-sm text-gray-500">{formatDate(item.date)}</p>
//     <p className="font-semibold text-red-600">₹{formatAmount(item.amount)}</p>
//   </div>
// );

// const TransactionTable = ({ data, formatDate, formatAmount }) => (
//   <div className="overflow-x-auto">
//     <table className="w-full text-sm">
//       <thead>
//         <tr className="bg-gray-50 text-gray-500 text-left">
//           <th className="py-3 px-4 font-medium">Date</th>
//           <th className="py-3 px-4 font-medium">Description</th>
//           <th className="py-3 px-4 font-medium">Type</th>
//           <th className="py-3 px-4 font-medium">Amount</th>
//           <th className="py-3 px-4 font-medium">Status</th>
//         </tr>
//       </thead>

//       <tbody>
//         {data.map((item, index) => (
//           <tr key={item._id || index} className="border-b border-gray-100">
//             <td className="py-3 px-4 text-gray-700">{formatDate(item.date)}</td>
//             <td className="py-3 px-4 text-gray-900">{item.description || item.title}</td>
//             <td className={`py-3 px-4 font-medium ${item.type === "Income" ? "text-green-600" : "text-red-600"}`}>
//               {item.type || "Expense"}
//             </td>
//             <td className="py-3 px-4">₹{formatAmount(item.amount)}</td>
//             <td className="py-3 px-4">
//               <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
//                 {item.status || "Paid"}
//               </span>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

// const Modal = ({ title, children, onClose }) => (
//   <div className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center">
//     <div className="bg-white w-[90%] max-w-5xl max-h-[85vh] overflow-y-auto rounded-2xl p-6 shadow-xl">
//       <div className="flex items-center justify-between mb-5">
//         <h2 className="text-xl font-semibold">{title}</h2>
//         <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
//           <X size={20} />
//         </button>
//       </div>
//       {children}
//     </div>
//   </div>
// );

// export default TreasurerDashboard;








































import React, { useEffect, useState } from "react";
import axios from "../../axios";
import {
  Wallet,
  ArrowDown,
  ArrowUp,
  ReceiptText,
  Wrench,
  User,
  Zap,
  Brush,
  Package,
  X,
} from "lucide-react";

const TreasurerDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
  const [showAllExpenses, setShowAllExpenses] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  const [expenses, setExpenses] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    totalBalance: 0,
    pendingPayments: 0,
  });

  const [maintenance, setMaintenance] = useState({
    totalDue: 0,
    collected: 0,
    pending: 0,
    percentage: 0,
  });

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const [maintenanceForm, setMaintenanceForm] = useState({
    description: "",
    amount: "",
    dueDate: "",
    month: "",
  });

  const fetchDashboardData = async () => {
    try {
      const expenseRes = await axios.get(
        `${import.meta.env.VITE_URL_BACKEND}/api/v1/treasurer/expenses`,
        { withCredentials: true }
      );

      const expenseData = expenseRes.data.data || [];
      setExpenses(expenseData);

      const totalExpense = expenseData.reduce(
        (acc, item) => acc + Number(item.amount || 0),
        0
      );

      setSummary((prev) => ({
        ...prev,
        totalExpense,
        totalBalance: Number(prev.totalIncome || 0) - totalExpense,
      }));

      setTransactions(
        expenseData.map((item) => ({
          _id: item._id,
          date: item.date,
          description: item.title,
          type: "Expense",
          amount: item.amount,
          status: "Paid",
        }))
      );
    } catch (err) {
      console.log(err);
    }

    try {
      const summaryRes = await axios.get(
        `${import.meta.env.VITE_URL_BACKEND}/api/v1/treasurer/summary`,
        { withCredentials: true }
      );

      setSummary(summaryRes.data.data);
    } catch (err) {
      console.log("Summary API not ready yet");
    }

    try {
      const maintenanceRes = await axios.get(
        `${import.meta.env.VITE_URL_BACKEND}/api/v1/treasurer/maintenance`,
        { withCredentials: true }
      );

      setMaintenance(maintenanceRes.data.data);
    } catch (err) {
      console.log("Maintenance API not ready yet");
    }

    try {
      const transactionRes = await axios.get(
        `${import.meta.env.VITE_URL_BACKEND}/api/v1/treasurer/transactions`,
        { withCredentials: true }
      );

      setTransactions(transactionRes.data.data || []);
    } catch (err) {
      console.log("Transactions API not ready yet");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMaintenanceChange = (e) => {
    setMaintenanceForm({
      ...maintenanceForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateMaintenance = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_URL_BACKEND}/api/v1/payment/generate-monthly`,
        maintenanceForm,
        { withCredentials: true }
      );

      setMaintenanceForm({
        description: "",
        amount: "",
        dueDate: "",
        month: "",
      });

      setShowMaintenanceForm(false);
      fetchDashboardData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_URL_BACKEND}/api/v1/treasurer/add-expense`,
        formData,
        { withCredentials: true }
      );

      setFormData({
        title: "",
        amount: "",
        category: "",
        date: "",
      });

      setShowForm(false);
      fetchDashboardData();
    } catch (err) {
      console.log(err);
    }
  };

  const formatAmount = (value) => Number(value || 0).toLocaleString("en-IN");

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const iconList = [Wrench, User, Zap, Brush, Package];

  return (
    <div className="min-h-screen bg-[#F4F7FE] px-6 py-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Treasurer Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome, Treasurer! Here's the financial overview of your society.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowMaintenanceForm(true)}
            className="bg-green-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-green-700 transition"
          >
            + Generate Maintenance
          </button>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
          >
            + Add Expense
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
        <Card
          icon={Wallet}
          title="Total Balance"
          value={`₹${formatAmount(Math.max(Number(summary.totalBalance || 0), 0))}`}
          color="green"
          sub="Total funds available"
        />
        <Card
          icon={ArrowDown}
          title="Total Income"
          value={`₹${formatAmount(summary.totalIncome)}`}
          color="blue"
          sub="Total money received"
        />
        <Card
          icon={ArrowUp}
          title="Total Expenses"
          value={`₹${formatAmount(summary.totalExpense)}`}
          color="red"
          sub="Total money spent"
        />
        <Card
          icon={ReceiptText}
          title="Pending Payments"
          value={`₹${formatAmount(summary.pendingPayments)}`}
          color="orange"
          sub="Yet to be collected"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-5">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Maintenance Collection
            </h2>
            <button className="text-blue-600 text-sm font-medium">
              View all
            </button>
          </div>

          <InfoRow label="Total Due" value={`₹${formatAmount(maintenance.totalDue)}`} />
          <InfoRow label="Collected" value={`₹${formatAmount(maintenance.collected)}`} color="text-green-600" />
          <InfoRow label="Pending" value={`₹${formatAmount(maintenance.pending)}`} color="text-red-600" />
          <InfoRow label="Collection %" value={`${maintenance.percentage || 0}%`} color="text-blue-600" />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Expenses
            </h2>
            <button
              onClick={() => setShowAllExpenses(true)}
              className="text-blue-600 text-sm font-medium"
            >
              View all
            </button>
          </div>

          {expenses.slice(0, 5).map((item, index) => {
            const Icon = iconList[index % iconList.length];

            return (
              <ExpenseRow
                key={item._id || index}
                item={item}
                Icon={Icon}
                formatDate={formatDate}
                formatAmount={formatAmount}
              />
            );
          })}

          {expenses.length === 0 && (
            <p className="text-gray-400 text-sm">No expenses found</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Transactions
          </h2>
          <button
            onClick={() => setShowAllTransactions(true)}
            className="text-blue-600 text-sm font-medium"
          >
            View all
          </button>
        </div>

        <TransactionTable
          data={transactions.slice(0, 5)}
          formatDate={formatDate}
          formatAmount={formatAmount}
        />
      </div>

      {showMaintenanceForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
          <div className="bg-white p-6 rounded-2xl w-[420px] shadow-xl">
            <h2 className="text-2xl font-semibold mb-5">
              Generate Monthly Maintenance
            </h2>

            <form onSubmit={handleGenerateMaintenance} className="space-y-4">
              <input
                type="text"
                name="description"
                placeholder="Maintenance Description"
                value={maintenanceForm.description}
                onChange={handleMaintenanceChange}
                className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={maintenanceForm.amount}
                onChange={handleMaintenanceChange}
                className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />

              <input
                type="text"
                name="month"
                placeholder="Example: June 2026"
                value={maintenanceForm.month}
                onChange={handleMaintenanceChange}
                className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />

              <input
                type="date"
                name="dueDate"
                value={maintenanceForm.dueDate}
                onChange={handleMaintenanceChange}
                className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowMaintenanceForm(false)}
                  className="px-5 py-2.5 bg-gray-100 rounded-xl font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700"
                >
                  Generate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
          <div className="bg-white p-6 rounded-2xl w-[380px] shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Add Expense</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Expense Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="Electricity">Electricity</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Security">Security</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Garden">Garden</option>
                <option value="Repair">Repair</option>
              </select>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 bg-gray-100 rounded-xl font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAllExpenses && (
        <Modal title="All Expenses" onClose={() => setShowAllExpenses(false)}>
          {expenses.map((item, index) => {
            const Icon = iconList[index % iconList.length];

            return (
              <ExpenseRow
                key={item._id || index}
                item={item}
                Icon={Icon}
                formatDate={formatDate}
                formatAmount={formatAmount}
              />
            );
          })}
        </Modal>
      )}

      {showAllTransactions && (
        <Modal title="All Transactions" onClose={() => setShowAllTransactions(false)}>
          <TransactionTable
            data={transactions}
            formatDate={formatDate}
            formatAmount={formatAmount}
          />
        </Modal>
      )}
    </div>
  );
};

const Card = ({ icon: Icon, title, value, sub, color }) => {
  const styles = {
    green: "bg-green-50 text-green-600",
    blue: "bg-blue-50 text-blue-600",
    red: "bg-red-50 text-red-600",
    orange: "bg-orange-50 text-orange-500",
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${styles[color]}`}>
        <Icon size={28} />
      </div>
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <h2 className={`text-2xl font-semibold ${styles[color].split(" ")[1]}`}>
          {value}
        </h2>
        <p className="text-xs text-gray-500 mt-1">{sub}</p>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, color = "text-gray-900" }) => (
  <div className="flex justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 mb-4">
    <span className="text-gray-600">{label}</span>
    <span className={`font-semibold ${color}`}>{value}</span>
  </div>
);

const ExpenseRow = ({ item, Icon, formatDate, formatAmount }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
    <div className="flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
        <Icon size={20} />
      </div>
      <div>
        <p className="font-semibold text-gray-900">{item.title}</p>
        <p className="text-xs text-gray-500">{item.category || "Maintenance"}</p>
      </div>
    </div>
    <p className="text-sm text-gray-500">{formatDate(item.date)}</p>
    <p className="font-semibold text-red-600">₹{formatAmount(item.amount)}</p>
  </div>
);

const TransactionTable = ({ data, formatDate, formatAmount }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-gray-50 text-gray-500 text-left">
          <th className="py-3 px-4 font-medium">Date</th>
          <th className="py-3 px-4 font-medium">Description</th>
          <th className="py-3 px-4 font-medium">Type</th>
          <th className="py-3 px-4 font-medium">Amount</th>
          <th className="py-3 px-4 font-medium">Status</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item, index) => (
          <tr key={item._id || index} className="border-b border-gray-100">
            <td className="py-3 px-4 text-gray-700">{formatDate(item.date)}</td>
            <td className="py-3 px-4 text-gray-900">{item.description || item.title}</td>
            <td className={`py-3 px-4 font-medium ${item.type === "Income" ? "text-green-600" : "text-red-600"}`}>
              {item.type || "Expense"}
            </td>
            <td className="py-3 px-4">₹{formatAmount(item.amount)}</td>
            <td className="py-3 px-4">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                {item.status || "Paid"}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center">
    <div className="bg-white w-[90%] max-w-5xl max-h-[85vh] overflow-y-auto rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <X size={20} />
        </button>
      </div>
      {children}
    </div>
  </div>
);

export default TreasurerDashboard;