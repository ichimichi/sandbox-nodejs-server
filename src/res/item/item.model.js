import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

export const Item = mongoose.model('item', itemSchema);
