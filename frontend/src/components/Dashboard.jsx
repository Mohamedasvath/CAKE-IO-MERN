import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Edit, Trash2, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [cakes, setCakes] = useState([]);
  const navigate = useNavigate();

  // Function to fetch cakes from the API
  const fetchCakes = () => {
    fetch("http://localhost:5000/api/cakes")
      .then((res) => res.json())
      .then((data) => setCakes(data))
      .catch((err) => console.error("Error fetching cakes:", err));
  };

  useEffect(() => {
    fetchCakes();
  }, []);

  const handleEdit = (cake) => {
    navigate("/cake-form", { state: { cakeToEdit: cake } });
  };

  const handleDelete = async (cakeId) => {
    if (window.confirm("Are you sure you want to delete this cake?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/cakes/${cakeId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete cake.");
        }

        toast.success("Cake deleted successfully!");
        // Refresh the list of cakes after deletion
        fetchCakes();
      } catch (error) {
        console.error("Error deleting cake:", error);
        toast.error("Failed to delete cake.");
      }
    }
  };

  return (
    <section className="relative min-h-screen font-sans bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-800">
            Developer <span className="text-purple-600">Dashboard</span>
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/cake-form")}
            className="px-6 py-3 bg-green-500 text-white rounded-full font-semibold flex items-center shadow-lg hover:bg-green-600 transition-colors"
          >
            <PlusCircle size={20} className="mr-2" />
            Add New Cake
          </motion.button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {cakes.map((cake) => (
            <motion.div
              key={cake._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between"
            >
              <div className="flex items-center space-x-6">
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{cake.name}</h3>
                  <p className="text-gray-600">{cake.description}</p>
                  <p className="text-purple-600 font-bold mt-1">₹{cake.price}</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleEdit(cake)}
                  className="p-3 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors"
                  title="Edit"
                >
                  <Edit size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(cake._id)}
                  className="p-3 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}