import Cake from "../models/cake.js";

// ✅ Get all cakes
export const getCakes = async (req, res) => {
  try {
    const cakes = await Cake.find();
    res.status(200).json(cakes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cakes", error: err.message });
  }
};

// ✅ Get single cake by ID
export const getCakeById = async (req, res) => {
  try {
    const cake = await Cake.findById(req.params.id);
    if (!cake) {
      return res.status(404).json({ message: "Cake not found" });
    }
    res.status(200).json(cake);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cake", error: err.message });
  }
};

// ✅ Add new cake
export const addCake = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    const cake = new Cake({ name, description, price, image });
    await cake.save();
    res.status(201).json(cake);
  } catch (err) {
    res.status(500).json({ message: "Error adding cake", error: err.message });
  }
};

// ✅ Update cake
export const updateCake = async (req, res) => {
  try {
    const cake = await Cake.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cake) return res.status(404).json({ message: "Cake not found!" });
    res.status(200).json(cake);
  } catch (err) {
    res.status(500).json({ message: "Error updating cake", error: err.message });
  }
};

// ✅ Delete cake
export const deleteCake = async (req, res) => {
  try {
    const cake = await Cake.findByIdAndDelete(req.params.id);
    if (!cake) return res.status(404).json({ message: "Cake not found!" });
    res.status(200).json({ message: "Cake deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting cake", error: err.message });
  }
};
