// import React, { useEffect, useState } from "react";
// import axios from "../../axios";
// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { toast, Toaster } from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";

// const EventBuy = () => {
//   const { eventId } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [clientSecret, setClientSecret] = useState("");
//   const [eventData, setEventData] = useState({});
//   const [cardError, setCardError] = useState("");
//   const [error, setError] = useState("");
//   const [user , setUser] = useState({});
//   // const user = JSON.parse(localStorage.getItem("user"));
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async()=>{
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/api/v1/users/currentUser`, { withCredentials: true });
//         console.log(res.data.data)
//         setUser(res.data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchUser();
//   } , [])

//   // ✅ Fetch Event Payment Intent & Event Details
//   useEffect(() => {
//     const fetchEventData = async () => {
//       try {
//         const response = await axios.post(
//           `${import.meta.env.VITE_URL_BACKEND}/api/v1/events/payEvent/${eventId}`,
//           {},
//           { withCredentials: true }
//         );
//         setEventData(response.data.event);
//         setClientSecret(response.data.clientSecret);
//       } catch (err) {
//         console.error(err);
//         setError("Unable to fetch event details. Either event doesn't exist or you already paid.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEventData();
//   }, [eventId]);

//   // ✅ Handle Stripe Payment
//   const handleEventPayment = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       toast.error("Stripe has not loaded properly.");
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);
//     if (!cardElement) {
//       toast.error("Payment form not ready. Please refresh the page.");
//       return;
//     }

//     setLoading(true);
//     setCardError("");

//     try {
//       const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
//         type: "card",
//         card: cardElement,
//       });

//       if (paymentMethodError) {
//         console.error(paymentMethodError);
//         setCardError(paymentMethodError.message);
//         setLoading(false);
//         return;
//       }

//       const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: paymentMethod.id,
//       });

//       if (confirmError) {
//         console.error(confirmError);
//         setCardError(confirmError.message);
//         setLoading(false);
//         return;
//       }

//       if (paymentIntent.status === "succeeded") {
//         toast.success("Payment Successful!");

//         const paymentInfo = {
//           email: user?.email,
//           userId: user?._id,
//           eventId,
//           paymentIntentId: paymentIntent.id,
//           amount: paymentIntent.amount,
//           status: paymentIntent.status,
//           paidOn: new Date(),
//           societyId: user?.societyId,
//         };

//         await axios.post(`${import.meta.env.VITE_URL_BACKEND}/api/v1/events/save-event-order`, paymentInfo, {
//           withCredentials: true,
//         });

//         setTimeout(() => {
//           navigate("/layout/event");
//         }, 1500);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Payment failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading && !clientSecret) {
//     return <p className="text-center text-lg">Loading...</p>;
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen p-4">
//         <div className="bg-red-100 text-red-700 px-6 py-4 rounded-lg max-w-xs w-full">
//           <p className="text-lg font-semibold">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="flex flex-col sm:flex-row justify-center items-center my-20 mx-auto max-w-7xl px-4">
//         {/* Event Details */}
//         <div className="w-full sm:w-1/2 lg:w-1/3 mt-10">
//           <h1 className="text-xl font-semibold underline">Event Payment Details</h1>
//           <p><strong>Event Name:</strong> {eventData.eventName}</p>
//           <p><strong>Description:</strong> {eventData.description}</p>
//           <p><strong>Date:</strong> {new Date(eventData.eventDate).toLocaleDateString()}</p>
//           <p><strong>Amount:</strong> ₹{eventData.amtPerPerson}</p>
//         </div>

//         {/* Payment Form */}
//         <div className="w-full sm:w-1/2 lg:w-1/3 mt-10">
//           <div className="bg-white shadow-md rounded-lg p-6 w-full">
//             <h2 className="text-lg font-semibold mb-4">Pay for this Event</h2>
//             <form onSubmit={handleEventPayment}>
//               <CardElement
//                 options={{
//                   style: {
//                     base: {
//                       fontSize: '16px',
//                       color: '#424770',
//                       "::placeholder": { color: '#aab7c4' },
//                     },
//                     invalid: { color: '#9e2146' },
//                   },
//                 }}
//               />
//               <button
//                 type="submit"
//                 disabled={!stripe || !clientSecret || loading}
//                 className={`mt-6 w-full py-2 rounded-md text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"}`}
//               >
//                 {loading ? 'Processing...' : 'Pay Now'}
//               </button>
//             </form>
//             {cardError && <p className="text-red-500 text-xs mt-2">{cardError}</p>}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EventBuy;







































// import React, { useEffect, useState } from "react";
// import axios from "../../axios";
// import { toast } from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";

// const EventBuy = () => {
//   const { eventId } = useParams();

//   const [loading, setLoading] = useState(true);
//   const [eventData, setEventData] = useState({});
//   const [orderData, setOrderData] = useState(null);
//   const [error, setError] = useState("");
//   const [user, setUser] = useState({});

//   const navigate = useNavigate();

//   // 🔹 Get user
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(`/users/currentUser`, {
//           withCredentials: true,
//         });
//         setUser(res.data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchUser();
//   }, []);

//   // 🔹 Get event + Razorpay order
//   useEffect(() => {
//     const fetchEventData = async () => {
//       try {
//         const response = await axios.post(
//           `/events/payEvent/${eventId}`,
//           {},
//           { withCredentials: true }
//         );

//         setEventData(response.data.event);
//         setOrderData(response.data.order); // 🔥 Razorpay order
//       } catch (err) {
//         console.error(err);
//         setError("Event not found or already paid");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEventData();
//   }, [eventId]);

//   // 🔥 Load Razorpay script
//   const loadRazorpay = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   // 🔥 Handle payment
//   const handleEventPayment = async (e) => {
//     e.preventDefault();

//     setLoading(true);

//     const res = await loadRazorpay();

//     if (!res) {
//       toast.error("Razorpay failed to load");
//       return;
//     }

//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: orderData.amount,
//       currency: "INR",
//       name: "Event Payment",
//       description: eventData.eventName,
//       order_id: orderData.id,

//       handler: async function (response) {
//         try {
//           await axios.post(
//             `/events/save-event-order`,
//             {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               eventId,
//               amount: orderData.amount,
//             },
//             { withCredentials: true }
//           );

//           toast.success("Payment Successful!");

//           setTimeout(() => {
//             navigate("/layout/event");
//           }, 1500);
//         } catch (err) {
//           console.error(err);
//           toast.error("Payment verification failed");
//         }
//       },

//       prefill: {
//         email: user?.email,
//       },

//       theme: {
//         color: "#6366f1",
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();

//     setLoading(false);
//   };

//   if (loading && !orderData) {
//     return <p className="text-center text-lg">Loading...</p>;
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen p-4">
//         <div className="bg-red-100 text-red-700 px-6 py-4 rounded-lg max-w-xs w-full">
//           <p className="text-lg font-semibold">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col sm:flex-row justify-center items-center my-20 mx-auto max-w-7xl px-4">

//       {/* Event Details */}
//       <div className="w-full sm:w-1/2 lg:w-1/3 mt-10">
//         <h1 className="text-xl font-semibold underline">Event Payment Details</h1>

//         <p><strong>Event Name:</strong> {eventData.eventName}</p>
//         <p><strong>Description:</strong> {eventData.description}</p>
//         <p><strong>Date:</strong> {new Date(eventData.eventDate).toLocaleDateString()}</p>
//         <p><strong>Amount:</strong> ₹{eventData.amtPerPerson}</p>
//       </div>

//       {/* Pay Button */}
//       <div className="w-full sm:w-1/2 lg:w-1/3 mt-10">
//         <div className="bg-white shadow-md rounded-lg p-6 w-full">
//           <h2 className="text-lg font-semibold mb-4">Pay for this Event</h2>

//           <button
//             onClick={handleEventPayment}
//             disabled={loading || !orderData}
//             className={`mt-6 w-full py-2 rounded-md text-white ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-indigo-500 hover:bg-indigo-600"
//             }`}
//           >
//             {loading ? "Processing..." : "Pay Now"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventBuy;

















































import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  CalendarDays,
  IndianRupee,
  Ticket,
  ShieldCheck,
} from "lucide-react";

const EventBuy = () => {
  const { eventId } = useParams();

  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState({});
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  // 🔹 Get user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/currentUser`, {
          withCredentials: true,
        });

        setUser(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  // 🔹 Get event + Razorpay order
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.post(
          `/events/payEvent/${eventId}`,
          {},
          { withCredentials: true }
        );

        setEventData(response.data.event);
        setOrderData(response.data.order);
      } catch (err) {
        console.error(err);
        setError("Event not found or already paid");
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  // 🔥 Load Razorpay script
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  // 🔥 Handle payment
  const handleEventPayment = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await loadRazorpay();

    if (!res) {
      toast.error("Razorpay failed to load");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: "INR",
      name: "Event Payment",
      description: eventData.eventName,
      order_id: orderData.id,

      handler: async function (response) {
        try {
          await axios.post(
            `/events/save-event-order`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              eventId,
              amount: orderData.amount,
            },
            { withCredentials: true }
          );

          toast.success("Payment Successful!");

          setTimeout(() => {
            navigate("/layout/event");
          }, 1500);
        } catch (err) {
          console.error(err);
          toast.error("Payment verification failed");
        }
      },

      prefill: {
        email: user?.email,
      },

      theme: {
        color: "#4f46e5",
      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.open();

    setLoading(false);
  };

  if (loading && !orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7FE]">
        <div className="bg-white px-8 py-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-lg font-medium text-gray-700">
            Loading Payment Details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F4F7FE] px-4">
        <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-5 rounded-2xl shadow-sm">
          <p className="text-lg font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7FE] px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Event Payment
          </h1>

          <p className="text-gray-500 mt-2">
            Complete your event registration payment securely
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Event Details Card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">
                <Ticket className="text-indigo-600" size={30} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {eventData.eventName}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Society Event Registration
                </p>
              </div>
            </div>

            <div className="space-y-5">

              <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">
                  Description
                </p>

                <p className="text-gray-800 font-medium leading-relaxed">
                  {eventData.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarDays
                      className="text-indigo-500"
                      size={18}
                    />

                    <p className="text-sm text-gray-500">
                      Event Date
                    </p>
                  </div>

                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(
                      eventData.eventDate
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <IndianRupee
                      className="text-green-500"
                      size={18}
                    />

                    <p className="text-sm text-gray-500">
                      Amount
                    </p>
                  </div>

                  <p className="text-2xl font-bold text-green-600">
                    ₹{eventData.amtPerPerson}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col justify-between">

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                  <ShieldCheck
                    className="text-green-600"
                    size={28}
                  />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Secure Payment
                  </h2>

                  <p className="text-sm text-gray-500">
                    Powered by Razorpay
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-3xl p-6 text-white mb-8">

                <p className="text-sm opacity-80 mb-2">
                  Total Payable
                </p>

                <h1 className="text-5xl font-bold">
                  ₹{eventData.amtPerPerson}
                </h1>

                <p className="mt-4 text-sm opacity-80">
                  Fast • Secure • Trusted Payment Gateway
                </p>
              </div>

              <div className="space-y-4 text-sm text-gray-600">

                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span>Event Name</span>

                  <span className="font-medium text-gray-900">
                    {eventData.eventName}
                  </span>
                </div>

                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span>User Email</span>

                  <span className="font-medium text-gray-900">
                    {user?.email}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Payment Status</span>

                  <span className="text-amber-500 font-semibold">
                    Pending
                  </span>
                </div>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handleEventPayment}
              disabled={loading || !orderData}
              className={`mt-10 w-full py-4 rounded-2xl text-lg font-semibold transition-all duration-300 ${
                loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl text-white active:scale-[0.98]"
              }`}
            >
              {loading ? "Processing Payment..." : "Pay Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventBuy;