import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Truck, CheckCircle, AlertCircle } from 'lucide-react';

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const [userData, setUserData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
  });

  // ✅ Load your API base URL from .env
  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ Load cart data
  useEffect(() => {
    if (location.state) {
      setCartItems(location.state.cartItems || []);
      setTotal(location.state.total || 0);
    }
  }, [location.state]);

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Validate all fields before order
  const handleConfirmClick = () => {
    if (!userData.name || !userData.address || !userData.phoneNumber || !userData.email) {
      setShowErrorPopup(true);
      return;
    }
    setShowConfirmPopup(true);
  };

  // ✅ Place Order (using env URL)
  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    setShowConfirmPopup(false);

    try {
      const orderData = {
        items: cartItems.map((item) => ({
          productId: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        userDetails: userData,
        totalAmount: total,
        paymentMethod: 'Cash on Delivery',
        status: 'Placed',
      };

      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error('Failed to place order');
      const result = await response.json();

      // ✅ Save order details
      const storedOrder = {
        orderDetails: result,
        userData,
        cartItems,
        total,
      };
      localStorage.setItem('latestOrder', JSON.stringify(storedOrder));

      // ✅ Navigate to confirmation page
      navigate('/order-confirmation', { state: storedOrder });
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const isBlurred = showConfirmPopup || showErrorPopup || isPlacingOrder;

  return (
    <div className="relative">
      {/* Main content */}
      <div
        className={`min-h-screen bg-gray-100 py-20 transition-all duration-300 ${
          isBlurred ? 'blur-md pointer-events-none select-none' : ''
        }`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-10">
            <span className="text-pink-500">Checkout</span>
          </h2>

          {/* User Details */}
          <div className="bg-white rounded-lg shadow-md p-6 lg:w-2/3 mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={userData.name}
                onChange={handleUserDataChange}
                className="p-3 border rounded-lg"
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={userData.phoneNumber}
                onChange={handleUserDataChange}
                className="p-3 border rounded-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={userData.email}
                onChange={handleUserDataChange}
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                name="address"
                placeholder="Shipping Address (full details)"
                value={userData.address}
                onChange={handleUserDataChange}
                className="md:col-span-2 p-3 border rounded-lg"
              />
            </div>

            {/* Order Summary */}
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h3>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between items-center border-b pb-2">
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-xl font-bold mt-6 pt-4 border-t-2 border-gray-300">
              <span>Total:</span>
              <span className="text-pink-600">₹{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white rounded-lg shadow-md p-6 lg:w-2/3 mx-auto mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Choose Payment Method</h3>
            <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center">
                <Truck size={24} className="text-green-500 mr-4" />
                <span className="font-semibold">Cash on Delivery (COD)</span>
              </div>
              <button
                className="py-2 px-6 bg-green-500 rounded-full text-white font-semibold hover:bg-green-600 transition-colors shadow-lg"
                onClick={handleConfirmClick}
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ⚠️ Error Popup */}
      {showErrorPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center w-80 animate-fadeIn">
            <AlertCircle className="mx-auto text-red-500 mb-4" size={50} />
            <h3 className="text-xl font-bold mb-2 text-gray-800">Incomplete Details!</h3>
            <p className="text-gray-600 mb-6">
              Please fill all fields before confirming your order.
            </p>
            <button
              onClick={() => setShowErrorPopup(false)}
              className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {/* ✅ Confirmation Popup */}
      {showConfirmPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center w-80 animate-fadeIn">
            <CheckCircle className="mx-auto text-green-500 mb-4" size={50} />
            <h3 className="text-xl font-bold mb-2 text-gray-800">Confirm Your Order?</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to place this order?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handlePlaceOrder}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Yes, Place Order
              </button>
              <button
                onClick={() => setShowConfirmPopup(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
