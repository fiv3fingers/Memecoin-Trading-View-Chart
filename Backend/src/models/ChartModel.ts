import mongoose, { Schema } from 'mongoose';

const ChartDataSchema = new Schema({
    time: { type: Date, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true, enum: ['buy', 'sell'] },
    trader: { type: String, require: true },
});
const TVModel = mongoose.model("laikatrading", ChartDataSchema);
export default TVModel;