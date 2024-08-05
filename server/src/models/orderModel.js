import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true }],
    status: { type: String, default: 'Pending', enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'] },
    total: { type: Number, required: true },
    deliveryAddress: { type: String, required: true },
});

export default mongoose.model('Order', OrderSchema);
