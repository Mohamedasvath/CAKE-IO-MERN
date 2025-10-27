import mongoose from "mongoose";

const cakeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  price: { 
    type: Number, 
    required: true 
  },
  image: { // Add this new field for the image
    type: String, 
    required: false 
  },
});

export default mongoose.model("Cake", cakeSchema);