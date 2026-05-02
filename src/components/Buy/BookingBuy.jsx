// import React, { useEffect, useState } from "react";
// import axios from "../../axios";
// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { toast, Toaster } from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";
// const BookingBuy = () => {
//       const { bookingId } = useParams();
//       console.log("Booking ID:", bookingId);
//   const [loading, setLoading] = useState(true);
//   const [clientSecret, setClientSecret] = useState("");
//   const [bookingData, setBookingData] = useState({});
//   const [cardError, setCardError] = useState("");
//   const [error, setError] = useState("");
//   const [user , setUser] = useState({});
//   // const user = JSON.parse(localStorage.getItem("user"));
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

// useEffect(() => {
//     const fetchBookingData = async () => {
//       try {
//         const response = await axios.post(
//           `${import.meta.env.VITE_URL_BACKEND}/api/v1/booking/payBooking/${bookingId}`,
//           {},
//           { withCredentials: true }
//         );
//         console.log("Booking Data:", response.data.bookings);
//         setBookingData(response.data.bookings);
//         setClientSecret(response.data.clientSecret);
//       } catch (err) {
//         console.error(err);
//         setError("Unable to fetch booking details. Either booking doesn't exist or you already paid.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookingData();
//   }, [bookingId]);

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

// const handleBookingPayment = async (e) => {
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
//           bookingId,
//           paymentIntentId: paymentIntent.id,
//           amount: paymentIntent.amount,
//           status: paymentIntent.status,
//           paidOn: new Date(),
//           societyId: user?.societyId,
//         };
// console.log("Payment Info:", paymentInfo);
//         await axios.post(`${import.meta.env.VITE_URL_BACKEND}/api/v1/booking/save-booking-order`, paymentInfo, {
//           withCredentials: true,
//         });

//         setTimeout(() => {
//           navigate("/layout/booking");
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



//  return (
//      <>
//        <div className="flex flex-col sm:flex-row justify-center items-center my-20 mx-auto max-w-7xl px-4">
//          {/* Event Details */}
//          <div className="w-full sm:w-1/2 lg:w-1/3 mt-10">
//            <h1 className="text-xl font-semibold underline">Booking Payment Details</h1>
//            <p><strong>Booking type:</strong> {bookingData.bookingType}</p>
//            <p><strong>Description:</strong> {bookingData.description}</p>
//            <p><strong>Date:</strong> {new Date(bookingData.date).toLocaleDateString()}</p>
//            {/* <p><strong>Amount:</strong> ₹99</p> */}
//          </div>
 
//          {/* Payment Form */}
//          <div className="w-full sm:w-1/2 lg:w-1/3 mt-10">
//            <div className="bg-white shadow-md rounded-lg p-6 w-full">
//              <h2 className="text-lg font-semibold mb-4">Pay for this Booking</h2>
//              <form onSubmit={handleBookingPayment}>
//                <CardElement
//                  options={{
//                    style: {
//                      base: {
//                        fontSize: '16px',
//                        color: '#424770',
//                        "::placeholder": { color: '#aab7c4' },
//                      },
//                      invalid: { color: '#9e2146' },
//                    },
//                  }}
//                />
//                <button
//                  type="submit"
//                  disabled={!stripe || !clientSecret || loading}
//                  className={`mt-6 w-full py-2 rounded-md text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"}`}
//                >
//                  {loading ? 'Processing...' : 'Pay Now'}
//                </button>
//              </form>
//              {cardError && <p className="text-red-500 text-xs mt-2">{cardError}</p>}
//            </div>
//          </div>
//        </div>
//      </>
//    );
// }

// export default BookingBuy

































import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const BookingBuy = () => {
  const { bookingId } = useParams();

  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({});
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  // 🔹 get booking + order (same API)
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.post(
          `/booking/payBooking/${bookingId}`,
          {},
          { withCredentials: true }
        );

        setBookingData(response.data.bookings);
        setOrderData(response.data.order); // 🔥 Razorpay order
      } catch (err) {
        console.error(err);
        setError("Booking not found or already paid");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, [bookingId]);

  // 🔹 get user
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

  // 🔥 LOAD RAZORPAY
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // 🔥 HANDLE PAYMENT
  const handleBookingPayment = async (e) => {
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
      name: "Booking Payment",
      description: bookingData.bookingType,
      order_id: orderData.id,

      handler: async function (response) {
        try {
          // 🔥 VERIFY
          await axios.post(
            `/booking/saveBookingOrder`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId,
              amount: orderData.amount,
            },
            { withCredentials: true }
          );

          toast.success("Payment Successful!");

          setTimeout(() => {
            navigate("/layout/booking");
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
        color: "#6366f1",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    setLoading(false);
  };

  if (loading && !orderData) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="bg-red-100 text-red-700 px-6 py-4 rounded-lg max-w-xs w-full">
          <p className="text-lg font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center my-20 mx-auto max-w-7xl px-4">

      {/* Booking Details */}
      <div className="w-full sm:w-1/2 lg:w-1/3 mt-10">
        <h1 className="text-xl font-semibold underline">Booking Payment Details</h1>

        <p><strong>Booking Type:</strong> {bookingData.bookingType}</p>
        <p><strong>Description:</strong> {bookingData.bookDescription}</p>
        <p><strong>Date:</strong> {new Date(bookingData.date).toLocaleDateString()}</p>
      </div>

      {/* Payment Button */}
      <div className="w-full sm:w-1/2 lg:w-1/3 mt-10">
        <div className="bg-white shadow-md rounded-lg p-6 w-full">
          <h2 className="text-lg font-semibold mb-4">Pay for this Booking</h2>

          <button
            onClick={handleBookingPayment}
            disabled={loading || !orderData}
            className={`mt-6 w-full py-2 rounded-md text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600"
            }`}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingBuy;