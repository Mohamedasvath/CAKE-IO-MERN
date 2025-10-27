import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => {
    // Load directly from localStorage when component mounts
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  // Keep localStorage always updated when cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Remove specific item
  const handleRemoveItem = (itemId) => {
    const updated = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updated);
  };

  // Calculate total
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Proceed to checkout
  const handleCheckout = () => {
    navigate("/payment", {
      state: { cartItems, total: subtotal },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-10">
          Your <span className="text-pink-500">Cart</span>
        </h2>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            Your cart is empty.
          </div>
        ) : (
          <div className="lg:flex lg:gap-8">
            {/* Left side - cart list */}
            <div className="lg:w-2/3">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center bg-white rounded-lg shadow-md p-6 mb-6"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg mr-6"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-600">₹{item.price}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              ))}
            </div>

            {/* Right side - summary */}
            <div className="lg:w-1/3 bg-white rounded-lg shadow-md p-6 sticky top-8 h-fit">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Order Summary
              </h3>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold text-gray-800">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-semibold text-gray-800">Free</span>
              </div>
              <div className="border-t border-gray-300 my-4"></div>
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total:</span>
                <span className="text-pink-600">₹{subtotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-pink-500 rounded-full text-white font-semibold hover:bg-pink-600 transition-colors shadow-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
