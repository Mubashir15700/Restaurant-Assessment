import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
});

export default mongoose.model('MenuItem', MenuItemSchema);
