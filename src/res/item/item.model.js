import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

itemSchema.plugin(mongoosePaginate);

export const Item = mongoose.model('item', itemSchema);
