import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Truck, CheckCircle, Package, MapPin, ArrowLeft, Download } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const invoiceRef = useRef();

  const [orderDetails, setOrderDetails] = useState(null);
  const [userData, setUserData] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [trackingStage, setTrackingStage] = useState(0);

  // ✅ Load data from navigate state or localStorage
  useEffect(() => {
    if (location.state) {
      const { orderDetails, userData, cartItems, total } = location.state;
      setOrderDetails(orderDetails);
      setUserData(userData);
      setCartItems(cartItems);
      setTotal(total);
      localStorage.setItem(
        "latestOrder",
        JSON.stringify({ orderDetails, userData, cartItems, total })
      );
    } else {
      const saved = localStorage.getItem("latestOrder");
      if (saved) {
        const parsed = JSON.parse(saved);
        setOrderDetails(parsed.orderDetails);
        setUserData(parsed.userData);
        setCartItems(parsed.cartItems);
        setTotal(parsed.total);
      }
    }
  }, [location.state]);

  // ✅ Animate tracking status
  useEffect(() => {
    const timer = setInterval(() => {
      setTrackingStage((prev) => (prev < 3 ? prev + 1 : 3));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  // 🧾 Download invoice
  const handleDownloadInvoice = async () => {
    const input = invoiceRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const pageHeight = 280;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 10;

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`Invoice_${orderDetails?._id || "Order"}.pdf`);
  };

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-700">
        <p className="text-xl font-semibold mb-4">No Order Found 😢</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const steps = [
    { label: "Order Placed", icon: Package },
    { label: "Shipped", icon: Truck },
    { label: "Out for Delivery", icon: MapPin },
    { label: "Delivered", icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div
        ref={invoiceRef}
        className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-xl"
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-0">
            🎉 Order Confirmed
          </h2>
          <div className="flex gap-3">
            <button
              onClick={handleDownloadInvoice}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow transition"
            >
              <Download size={18} /> Invoice
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-pink-500 hover:underline"
            >
              <ArrowLeft size={18} /> Home
            </button>
          </div>
        </div>

        {/* 🧁 Order Summary */}
        <div className="border-t pt-4 mt-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Order Summary
          </h3>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-3"
              >
                <div className="flex items-center mb-3 sm:mb-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-700 text-sm sm:text-base">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-gray-700 text-right sm:text-base">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-lg sm:text-xl font-bold mt-6">
            <span>Total:</span>
            <span className="text-pink-600">₹{total.toFixed(2)}</span>
          </div>
        </div>

        {/* 📦 User Details */}
        <div className="border-t pt-6 mt-8">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Shipping Details
          </h3>
          <div className="bg-gray-50 p-4 rounded-xl text-sm sm:text-base">
            <p>
              <span className="font-bold">Name:</span> {userData.name}
            </p>
            <p>
              <span className="font-bold">Address:</span> {userData.address}
            </p>
            <p>
              <span className="font-bold">Phone:</span> {userData.phoneNumber}
            </p>
            <p>
              <span className="font-bold">Email:</span> {userData.email}
            </p>
          </div>
        </div>

        {/* 🚚 Tracking Progress */}
        <div className="border-t pt-8 mt-10">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 text-center">
            🚚 Order Tracking
          </h3>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-0 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const active = index <= trackingStage;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center flex-1 relative text-center"
                >
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full transition-all duration-500 ${
                      active
                        ? "bg-green-500 text-white shadow-lg scale-105"
                        : "bg-gray-300 text-gray-500"
                    }`}
                  >
                    <Icon size={24} />
                  </div>
                  <p
                    className={`text-sm sm:text-base mt-2 ${
                      active ? "text-green-600 font-semibold" : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </p>
                  {index < steps.length - 1 && (
                    <div
                      className={`hidden sm:block absolute top-6 left-[50%] h-1 w-full transition-all duration-700 ${
                        index < trackingStage ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
